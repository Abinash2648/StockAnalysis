"""
services/company_service.py

Fetch company fundamentals from Yahoo Finance.
"""

import traceback

import yfinance as yf
from fastapi import HTTPException


def get_company_details(symbol: str):
    """
    Fetch company information from Yahoo Finance.
    """

    try:
        ticker = yf.Ticker(f"{symbol}.NS")

        print(f"\nFetching company details for: {symbol}")

        info = ticker.info

        # Debug: Print the complete Yahoo response
        print("Yahoo Response:")
        print(info)

        return {
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

    except Exception as e:

        print("\n========== YAHOO FINANCE ERROR ==========")
        traceback.print_exc()
        print("=========================================\n")

        raise HTTPException(
            status_code=503,
            detail=str(e),
        )