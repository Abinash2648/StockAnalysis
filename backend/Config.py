from pathlib import Path

# ============================================
# CONFIGURATION
# ============================================

BASE_DIR = Path(__file__).resolve().parent

DATA_DIR = BASE_DIR / "data"

# Yahoo Finance

LOOKBACK_PERIOD = "3y"
INTERVAL = "1d"

# Moving Averages

SMA_SHORT = 50
SMA_LONG = 150
EMA_LONG = 220

# Lookbacks

HIGH_LOOKBACK = 252
LOW_LOOKBACK = 252
DIP_LOOKBACK = 90

# Strategy

LOW_MULTIPLIER = 1.25

# Files

SYMBOL_FILE = DATA_DIR / "nifty500list.csv"

# Dashboard

REFRESH_SECONDS = 60