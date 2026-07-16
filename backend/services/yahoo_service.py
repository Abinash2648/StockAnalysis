"""
services/yahoo_service.py

Handles downloading historical stock data
from Yahoo Finance.
"""

from concurrent.futures import ThreadPoolExecutor, as_completed
import logging

import pandas as pd
import yfinance as yf

from Config import (
    LOOKBACK_PERIOD,
    INTERVAL,
    SYMBOL_FILE,
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def load_symbols() -> list[str]:
    """
    Load stock symbols from CSV.
    """

    df = pd.read_csv(SYMBOL_FILE)

    return (
        df["Symbol"]
        .dropna()
        .astype(str)
        .str.strip()
        .tolist()
    )


def download_stock(symbol: str) -> tuple[str, pd.DataFrame | None]:
    """
    Download one stock from Yahoo Finance.
    """

    yahoo_symbol = f"{symbol}.NS"

    try:

        df = yf.download(
            yahoo_symbol,
            period=LOOKBACK_PERIOD,
            interval=INTERVAL,
            auto_adjust=False,
            progress=False,
            threads=False,
        )

        if df.empty:
            return symbol, None

        # Remove MultiIndex if present
        if isinstance(df.columns, pd.MultiIndex):
            df.columns = df.columns.get_level_values(0)

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

        df["Volume"] = df["Volume"].astype("int64")

        return symbol, df

    except Exception as e:

        logger.error(f"{symbol} : {e}")

        return symbol, None


def load_all_data(max_workers: int = 10):

    symbols = load_symbols()

    logger.info(f"Downloading {len(symbols)} stocks...")
    stock_data = {}

    with ThreadPoolExecutor(max_workers=max_workers) as executor:

        futures = {
            executor.submit(download_stock, symbol): symbol
            for symbol in symbols
        }

        for future in as_completed(futures):

            symbol, df = future.result()

            if df is not None:
                stock_data[symbol] = df

    logger.info(f"Downloaded {len(stock_data)} stocks.")

    return stock_data
# ==========================================================
# Company Metadata
# ==========================================================

def load_metadata():
    """
    Load company metadata from Nifty 500 CSV.
    """

    df = pd.read_csv(SYMBOL_FILE)

    return (
        df[
            ["Symbol", "Company Name", "Industry"]
        ]
        .fillna("Unknown")
    )


# ==========================================================
# Lookup Dictionaries
# ==========================================================

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