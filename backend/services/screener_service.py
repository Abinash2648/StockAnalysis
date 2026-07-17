"""
services/screener_service.py

Business logic for Nifty 500 Stock Screener.
"""
import logging

import pandas as pd
from services.cache_service import cache    

from services.yahoo_service import (
    company_lookup,
    sector_lookup,
)
from services.indicator_service import calculate_indicators
from Config import LOW_MULTIPLIER
logger = logging.getLogger(__name__)


# ==========================================================
# Helper Function
# ==========================================================

def get_status(condition: bool):
    """
    Returns check or cross symbol.
    """

    return "✅" if condition else "❌"


# ==========================================================
# Main Screener
# ==========================================================

def screen_stocks(min_score=0) -> pd.DataFrame:
    """
    Run stock screener and return results.
    """

    stocks = cache.get()

    if not stocks:
     print("Stock cache is empty.")
     return pd.DataFrame()
    results = []

    logger.info("Applying Screening Conditions...")

    # ------------------------------------------------------
    # Process each stock
    # ------------------------------------------------------

    for symbol, df in stocks.items():

        # Skip insufficient history
        if len(df) < 252:
            continue

        # Calculate indicators
        df = calculate_indicators(df)

        # Latest candle
        latest = df.iloc[-1]

        # --------------------------------------------------
        # Strategy Conditions
        # --------------------------------------------------

        condition1 = latest["SMA150"] > latest["EMA220"]

        condition2 = latest["Close"] > latest["SMA50"]

        condition3 = latest["SMA50"] > latest["SMA150"]

        required_price = LOW_MULTIPLIER * latest["52W_Low"]

        condition4 = latest["Close"] > required_price

        condition5 = latest["Dip_Below_EMA220"]

        condition6 = latest["Close"] > latest["Previous_52W_High"]

        # --------------------------------------------------
        # Score
        # --------------------------------------------------

        score = sum([
            condition1,
            condition2,
            condition3,
            condition4,
            condition5,
            condition6
        ])
                # --------------------------------------------------
        # Status
        # --------------------------------------------------

        trend_status = get_status(condition1)
        price_status = get_status(condition2)
        sma_status = get_status(condition3)
        low_status = get_status(condition4)
        breakout_status = get_status(condition6)

        dip_status = (
            "✅ Yes (Dip found)"
            if condition5
            else "❌ No (No dip)"
        )

        # --------------------------------------------------
        # Display Values
        # --------------------------------------------------

        trend_operator = ">" if condition1 else "<="
        price_operator = ">" if condition2 else "<="
        sma_operator = ">" if condition3 else "<="
        low_operator = ">" if condition4 else "<="
        breakout_operator = ">" if condition6 else "<="

        trend_value = (
            f"{latest['SMA150']:.2f} "
            f"{trend_operator} "
            f"{latest['EMA220']:.2f}"
        )

        price_value = (
            f"{latest['Close']:.2f} "
            f"{price_operator} "
            f"{latest['SMA50']:.2f}"
        )

        sma_value = (
            f"{latest['SMA50']:.2f} "
            f"{sma_operator} "
            f"{latest['SMA150']:.2f}"
        )

        low_value = (
            f"{latest['Close']:.2f} "
            f"{low_operator} "
            f"{required_price:.2f}"
        )

        breakout_value = (
            f"{latest['Close']:.2f} "
            f"{breakout_operator} "
            f"{latest['Previous_52W_High']:.2f}"
        )

        # --------------------------------------------------
        # Save Result
        # --------------------------------------------------

        results.append({

            "Symbol": symbol,
            "Company": company_lookup.get(symbol, symbol),

            "Sector": sector_lookup.get(symbol, "Unknown"),

            "Score": f"{score}/6",

            # Condition 1
            "Trend": trend_status,
            "Trend Value": trend_value,

            # Condition 2
            "Price > SMA50": price_status,
            "Price Value": price_value,

            # Condition 3
            "SMA Trend": sma_status,
            "SMA Value": sma_value,

            # Condition 4
            "25% Above Low": low_status,
            "Low Value": low_value,

            # Condition 5
            "EMA Dip": dip_status,

            # Condition 6
            "Breakout": breakout_status,
            "Breakout Value": breakout_value,

            # Raw Values
            "Close": round(latest["Close"], 2),
            "SMA50": round(latest["SMA50"], 2),
            "SMA150": round(latest["SMA150"], 2),
            "EMA220": round(latest["EMA220"], 2),
            "52W High": round(latest["Previous_52W_High"], 2),
            "52W Low": round(latest["52W_Low"], 2)

        })
            # ------------------------------------------------------
    # Convert to DataFrame
    # ------------------------------------------------------

    results = pd.DataFrame(results)

    if results.empty:
        return results

    # ------------------------------------------------------
    # Sort by Score
    # ------------------------------------------------------

    results["SortScore"] = (
        results["Score"]
        .str.split("/")
        .str[0]
        .astype(int)
    )

    results = (
    results
    .sort_values(
        by=["SortScore", "Symbol"],
        ascending=[False, True]
    )
    .drop(columns=["SortScore"])
    .reset_index(drop=True)
)

# Apply Minimum Score Filter
    if min_score > 0:
     results = results[
        results["Score"]
        .str.split("/")
        .str[0]
        .astype(int) >= min_score
    ].reset_index(drop=True)

    return results

# ==========================================================
# Test
# ==========================================================

if __name__ == "__main__":

    df = screen_stocks()

    print(df.head(20))