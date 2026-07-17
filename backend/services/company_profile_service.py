"""
services/company_profile_service.py

Fetch company profile & fundamentals.
Uses 12-hour in-memory cache.
"""

import traceback
import yfinance as yf

from services.company_cache import company_cache


def get_company_profile(symbol: str):
    """
    Fetch company profile & financial fundamentals.

    Uses cache first.
    Falls back to cache if Yahoo fails.
    """

    symbol = symbol.upper()

    # =====================================================
    # Check Cache
    # =====================================================

    cached = company_cache.get(symbol)

    if cached:
        print(f"[CACHE] Returning cached profile for {symbol}")
        return cached

    try:

        print(f"[YAHOO] Fetching company profile for {symbol}")

        ticker = yf.Ticker(f"{symbol}.NS")

        info = ticker.info

        if not info:
            raise Exception("Yahoo returned empty profile.")

        profile = {

            # =====================================================
            # Company Profile
            # =====================================================

            "companyName": info.get("longName"),
            "sector": info.get("sector"),
            "industry": info.get("industry"),
            "website": info.get("website"),
            "country": info.get("country"),
            "currency": info.get("currency"),
            "exchange": info.get("exchange"),
            "employees": info.get("fullTimeEmployees"),
            "businessSummary": info.get("longBusinessSummary"),

            # =====================================================
            # Company Statistics
            # =====================================================

            "marketCap": info.get("marketCap"),
            "enterpriseValue": info.get("enterpriseValue"),

            # =====================================================
            # Today's Statistics
            # (12-hour cached)
            # =====================================================

            "previousClose": info.get("previousClose"),
            "open": info.get("open"),
            "dayHigh": info.get("dayHigh"),
            "dayLow": info.get("dayLow"),
            "volume": info.get("volume"),
            "averageVolume": info.get("averageVolume"),

            # =====================================================
            # Valuation
            # =====================================================

            "trailingPE": info.get("trailingPE"),
            "forwardPE": info.get("forwardPE"),
            "pegRatio": info.get("pegRatio"),
            "bookValue": info.get("bookValue"),
            "priceToBook": info.get("priceToBook"),
            "eps": info.get("trailingEps"),
            "dividendYield": info.get("dividendYield"),
            "beta": info.get("beta"),

            # =====================================================
            # Financial Health
            # =====================================================

            "roe": info.get("returnOnEquity"),
            "profitMargins": info.get("profitMargins"),
            "operatingMargins": info.get("operatingMargins"),
            "debtToEquity": info.get("debtToEquity"),
            "currentRatio": info.get("currentRatio"),
        }

        # =====================================================
        # Store in Cache
        # =====================================================

        company_cache.set(symbol, profile)

        print(f"[CACHE] Stored company profile for {symbol}")

        return profile

    except Exception:

        print("\n========== COMPANY PROFILE ERROR ==========")
        traceback.print_exc()
        print("===========================================\n")

        # =====================================================
        # Return Cached Data
        # =====================================================

        cached = company_cache.get(symbol)

        if cached:

            print(f"[CACHE] Yahoo failed. Returning cached profile for {symbol}")

            return cached

        print(f"[CACHE] No cache available for {symbol}")

        # =====================================================
        # Default Object
        # =====================================================

        return {

            # Company Profile
            "companyName": symbol,
            "sector": None,
            "industry": None,
            "website": None,
            "country": None,
            "currency": "INR",
            "exchange": "NSE",
            "employees": None,
            "businessSummary": None,

            # Company Statistics
            "marketCap": None,
            "enterpriseValue": None,

            # Today's Statistics
            "previousClose": None,
            "open": None,
            "dayHigh": None,
            "dayLow": None,
            "volume": None,
            "averageVolume": None,

            # Valuation
            "trailingPE": None,
            "forwardPE": None,
            "pegRatio": None,
            "bookValue": None,
            "priceToBook": None,
            "eps": None,
            "dividendYield": None,
            "beta": None,

            # Financial Health
            "roe": None,
            "profitMargins": None,
            "operatingMargins": None,
            "debtToEquity": None,
            "currentRatio": None,
        }