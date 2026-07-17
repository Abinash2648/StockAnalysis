"""
services/company_service.py

Fetch company fundamentals from Yahoo Finance.
Uses in-memory cache and graceful fallback.
"""

import traceback

import yfinance as yf

from services.company_cache import company_cache


def get_company_details(symbol: str):
    """
    Fetch company information from Yahoo Finance.

    Flow:
    1. Check cache
    2. If cached -> return immediately
    3. Fetch from Yahoo
    4. Save to cache
    5. If Yahoo fails:
          - return cached data if available
          - otherwise return default values
    """

    symbol = symbol.upper()

    # =====================================================
    # Check Cache
    # =====================================================

    cached = company_cache.get(symbol)

    if cached:
        print(f"Returning {symbol} from cache.")
        return cached

    try:

        print(f"\nFetching company details for: {symbol}")

        ticker = yf.Ticker(f"{symbol}.NS")

        info = ticker.info

        print("Yahoo Response Received.")

        company = {
            "symbol": symbol,

            "companyName": info.get("longName"),

            "sector": info.get("sector"),
            "industry": info.get("industry"),

            "website": info.get("website"),

            "country": info.get("country"),

            "currency": info.get("currency"),

            "exchange": info.get("exchange"),

            "marketCap": info.get("marketCap"),

            "enterpriseValue": info.get("enterpriseValue"),

            "currentPrice": info.get("currentPrice"),

            "previousClose": info.get("previousClose"),

            "open": info.get("open"),

            "dayHigh": info.get("dayHigh"),

            "dayLow": info.get("dayLow"),

            "fiftyTwoWeekHigh": info.get("fiftyTwoWeekHigh"),

            "fiftyTwoWeekLow": info.get("fiftyTwoWeekLow"),

            "volume": info.get("volume"),

            "averageVolume": info.get("averageVolume"),

            "trailingPE": info.get("trailingPE"),

            "forwardPE": info.get("forwardPE"),

            "pegRatio": info.get("pegRatio"),

            "bookValue": info.get("bookValue"),

            "priceToBook": info.get("priceToBook"),

            "eps": info.get("trailingEps"),

            "dividendYield": info.get("dividendYield"),

            "beta": info.get("beta"),

            "roe": info.get("returnOnEquity"),

            "profitMargins": info.get("profitMargins"),

            "operatingMargins": info.get("operatingMargins"),

            "debtToEquity": info.get("debtToEquity"),

            "currentRatio": info.get("currentRatio"),

            "employees": info.get("fullTimeEmployees"),

            "businessSummary": info.get("longBusinessSummary"),
        }

        # ==========================================
        # Store in Cache
        # ==========================================

        company_cache.set(symbol, company)

        print(f"{symbol} stored in company cache.")

        return company

    except Exception as e:

        print("\n========== YAHOO ERROR ==========")
        traceback.print_exc()
        print("=================================\n")

        # ==========================================
        # Try cache again
        # ==========================================

        cached = company_cache.get(symbol)

        if cached:

            print(f"Yahoo failed. Returning cached data for {symbol}.")

            return cached

        print(f"No cache available for {symbol}. Returning default values.")

        # ==========================================
        # Default Object
        # ==========================================

        return {

            "symbol": symbol,

            "companyName": symbol,

            "sector": None,

            "industry": None,

            "website": None,

            "country": None,

            "currency": "INR",

            "exchange": "NSE",

            "marketCap": None,

            "enterpriseValue": None,

            "currentPrice": None,

            "previousClose": None,

            "open": None,

            "dayHigh": None,

            "dayLow": None,

            "fiftyTwoWeekHigh": None,

            "fiftyTwoWeekLow": None,

            "volume": None,

            "averageVolume": None,

            "trailingPE": None,

            "forwardPE": None,

            "pegRatio": None,

            "bookValue": None,

            "priceToBook": None,

            "eps": None,

            "dividendYield": None,

            "beta": None,

            "roe": None,

            "profitMargins": None,

            "operatingMargins": None,

            "debtToEquity": None,

            "currentRatio": None,

            "employees": None,

            "businessSummary": None,
        }