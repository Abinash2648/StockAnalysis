"""
services/company_cache.py

In-memory cache for company details.
"""

import time
from threading import Lock


class CompanyCache:
    def __init__(self, ttl=1800):
        self.ttl = ttl
        self.cache = {}
        self.lock = Lock()

    def get(self, symbol):
        with self.lock:

            item = self.cache.get(symbol.upper())

            if item is None:
                return None

            if time.time() - item["timestamp"] > self.ttl:
                del self.cache[symbol.upper()]
                return None

            return item["data"]

    def set(self, symbol, data):
        with self.lock:

            self.cache[symbol.upper()] = {
                "timestamp": time.time(),
                "data": data,
            }

    def clear(self):
        with self.lock:
            self.cache.clear()


company_cache = CompanyCache(ttl=1800)