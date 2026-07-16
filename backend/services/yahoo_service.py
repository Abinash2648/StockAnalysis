"""
services/yahoo_service.py

Downloads historical stock data from Yahoo Finance
using a SINGLE request for all symbols.
"""

import logging
import pandas as pd
import yfinance as yf

from Config import (
    LOOKBACK_PERIOD,
    INTERVAL,
    SYMBOL_FILE,
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def load_symbols() -> list[str]:
    df = pd.read_csv(SYMBOL_FILE)

    return (
        df["Symbol"]
        .dropna()
        .astype(str)
        .str.strip()
        .tolist()
    )


def load_all_data():

    symbols = load_symbols()

    yahoo_symbols = [f"{symbol}.NS" for symbol in symbols]

    logger.info(f"Downloading {len(symbols)} stocks...")

    try:

        data = yf.download(
            tickers=yahoo_symbols,
            period=LOOKBACK_PERIOD,
            interval=INTERVAL,
            group_by="ticker",
            auto_adjust=False,
            threads=False,
            progress=False,
        )

    except Exception as e:
        logger.error(e)
        return {}

    stock_data = {}

    for symbol in symbols:

        yahoo_symbol = f"{symbol}.NS"

        try:

            if yahoo_symbol not in data.columns.levels[0]:
                continue

            df = data[yahoo_symbol].copy()

            if df.empty:
                continue

            df.reset_index(inplace=True)

            required_columns = [
                "Date",
                "Open",
                "High",
                "Low",
                "Close",
                "Adj Close",
                "Volume",
            ]

            df = df[required_columns]

            price_columns = [
                "Open",
                "High",
                "Low",
                "Close",
                "Adj Close",
            ]

            df[price_columns] = df[price_columns].round(2)
            df["Volume"] = df["Volume"].fillna(0).astype("int64")

            stock_data[symbol] = df

        except Exception as e:
            logger.warning(f"{symbol}: {e}")

    logger.info(f"Downloaded {len(stock_data)} stocks.")

    return stock_data


# ==========================================================
# Company Metadata
# ==========================================================

def load_metadata():

    df = pd.read_csv(SYMBOL_FILE)

    return (
        df[
            ["Symbol", "Company Name", "Industry"]
        ]
        .fillna("Unknown")
    )


_metadata = load_metadata()

company_lookup = (
    _metadata
    .set_index("Symbol")["Company Name"]
    .to_dict()
)

sector_lookup = (
    _metadata
    .set_index("Symbol")["Industry"]
    .to_dict()
)