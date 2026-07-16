"""
services/cache_service.py

Thread-safe in-memory cache for stock data.
"""

from threading import Lock


class CacheManager:

    def __init__(self):
        self._lock = Lock()
        self._stock_cache = {}

    def get(self):
        with self._lock:
            return self._stock_cache.copy()

    def set(self, data):
        with self._lock:
            self._stock_cache = data

    def is_empty(self):
        with self._lock:
            return len(self._stock_cache) == 0


cache = CacheManager()