"""
services/company_profile_service.py

Fetch company profile & fundamentals.
Uses 12-hour in-memory cache with JSON backup.
"""

import json
from pathlib import Path
import traceback

import yfinance as yf

from services.company_cache import company_cache

# =====================================================
# JSON Cache File
# =====================================================

CACHE_FILE = (
    Path(__file__).resolve().parent.parent
    / "cache"
    / "company_profiles.json"
)


# =====================================================
# JSON Cache Helpers
# =====================================================

def load_json_cache():
    """Load company profiles from JSON."""

    try:
        if CACHE_FILE.exists():
            with open(CACHE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
    except Exception:
        traceback.print_exc()

    return {}


def save_json_cache(data):
    """Save company profiles to JSON."""

    try:
        with open(CACHE_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)
    except Exception:
        traceback.print_exc()


# =====================================================
# Company Profile
# =====================================================

def get_company_profile(symbol: str):
    """
    Fetch company profile & financial fundamentals.

    Order:
    1. RAM Cache
    2. JSON Cache (backup)
    3. Yahoo Finance
    """

    symbol = symbol.upper()

    # =====================================================
    # Check RAM Cache
    # =====================================================

    cached = company_cache.get(symbol)

    if cached:
        print(f"[CACHE] Returning cached profile for {symbol}")
        return cached

    # =====================================================
    # Load JSON Cache (Backup)
    # =====================================================

    json_cache = load_json_cache()

    json_profile = None

    if symbol in json_cache:

        print(f"[JSON] Found cached profile for {symbol}")

        json_profile = json_cache[symbol]

        # Load JSON into RAM as backup
        company_cache.set(symbol, json_profile)

        print(f"[CACHE] Loaded JSON profile into RAM for {symbol}")

    # Don't return here.
    # Always try Yahoo for fresh data.

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
        # Update RAM Cache
        # =====================================================

        company_cache.set(symbol, profile)

        # =====================================================
        # Update JSON Cache
        # =====================================================

        json_cache[symbol] = profile
        save_json_cache(json_cache)

        print(f"[CACHE] Updated RAM cache for {symbol}")
        print(f"[JSON] Updated JSON cache for {symbol}")

        return profile
    except Exception:

        print("\n========== COMPANY PROFILE ERROR ==========")
        traceback.print_exc()
        print("===========================================\n")

        # =====================================================
        # Return RAM Cache
        # =====================================================

        cached = company_cache.get(symbol)

        if cached:

            print(f"[CACHE] Yahoo failed. Returning cached profile for {symbol}")

            return cached

        # =====================================================
        # Return JSON Cache
        # =====================================================

        if json_profile is not None:

            print(f"[JSON] Yahoo failed. Returning JSON profile for {symbol}")

            company_cache.set(symbol, json_profile)

            return json_profile

        # =====================================================
        # No Cache Available
        # =====================================================

        print(f"[CACHE] No RAM/JSON cache available for {symbol}")

        # =====================================================
        # Default Object
        # =====================================================

        return {

            # =====================================================
            # Company Profile
            # =====================================================

            "companyName": symbol,
            "sector": None,
            "industry": None,
            "website": None,
            "country": None,
            "currency": "INR",
            "exchange": "NSE",
            "employees": None,
            "businessSummary": None,

            # =====================================================
            # Company Statistics
            # =====================================================

            "marketCap": None,
            "enterpriseValue": None,

            # =====================================================
            # Today's Statistics
            # =====================================================

            "previousClose": None,
            "open": None,
            "dayHigh": None,
            "dayLow": None,
            "volume": None,
            "averageVolume": None,

            # =====================================================
            # Valuation
            # =====================================================

            "trailingPE": None,
            "forwardPE": None,
            "pegRatio": None,
            "bookValue": None,
            "priceToBook": None,
            "eps": None,
            "dividendYield": None,
            "beta": None,

            # =====================================================
            # Financial Health
            # =====================================================

            "roe": None,
            "profitMargins": None,
            "operatingMargins": None,
            "debtToEquity": None,
            "currentRatio": None,
        }