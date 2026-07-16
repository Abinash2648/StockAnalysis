"""
services/news_service.py

Fetch latest company news from Yahoo Finance.
"""

import yfinance as yf


def get_company_news(symbol: str):
    try:

        ticker = yf.Ticker(f"{symbol}.NS")

        news = ticker.news or []

        articles = []

        for item in news[:10]:

            content = item.get("content")

            if not content:
                continue

            provider = content.get("provider") or {}
            canonical = content.get("canonicalUrl") or {}
            thumbnail = content.get("thumbnail") or {}

            image = None

            resolutions = thumbnail.get("resolutions")

            if resolutions and len(resolutions) > 0:
                image = resolutions[0].get("url")

            articles.append({
                "title": content.get("title"),
                "summary": content.get("summary"),
                "publisher": provider.get("displayName"),
                "published": content.get("pubDate"),
                "url": canonical.get("url"),
                "thumbnail": image,
            })

        return articles

    except Exception as e:
        print("News Error:", e)
        return []