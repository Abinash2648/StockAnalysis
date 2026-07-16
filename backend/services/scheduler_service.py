"""
services/scheduler_service.py
"""

from apscheduler.schedulers.background import BackgroundScheduler

from services.yahoo_service import load_all_data
from services.cache_service import cache

scheduler = BackgroundScheduler()


def refresh_stock_cache():
    print("\nDownloading latest stock data...")

    new_data = load_all_data()

    cache.set(new_data)

    print(f"Stock cache updated ({len(new_data)} stocks).")


def start_scheduler():

    # Initial download
    refresh_stock_cache()

    # Refresh every 3 hours
    scheduler.add_job(
    refresh_stock_cache,
    trigger="interval",
    hours=3,
    id="stock_refresh",
    replace_existing=True,
    max_instances=1,
    coalesce=True,
    misfire_grace_time=300,
)
    scheduler.start()