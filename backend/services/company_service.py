"""
services/company_service.py

Company Service

Merges:
1. Live stock data (from screener cache)
2. Company profile & fundamentals (12-hour cache)
"""

from services.company_profile_service import get_company_profile
from services.screener_service import get_live_stock_data


def get_company_details(symbol: str):
    """
    Returns complete company details.

    Live Data:
        - Current Price
        - 52 Week High
        - 52 Week Low
        - SMA50
        - SMA150
        - EMA220

    Cached Profile:
        - Company Profile
        - Company Statistics
        - Financial Ratios
        - Financial Health
        - Today's Statistics
    """

    symbol = symbol.upper()

    # -----------------------------------------
    # Get Live Technical Data
    # -----------------------------------------

    live_data = get_live_stock_data(symbol)

    # -----------------------------------------
    # Get Cached Company Profile
    # -----------------------------------------

    profile_data = get_company_profile(symbol)

    # -----------------------------------------
    # Merge Both
    # -----------------------------------------

    company = {
        "symbol": symbol,
        **live_data,
        **profile_data,
    }

    return company