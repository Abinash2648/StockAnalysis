"""
services/indicators.py

Calculates all technical indicators required
for the screener.
"""

import pandas as pd

from Config import (
    SMA_SHORT,
    SMA_LONG,
    EMA_LONG,
    HIGH_LOOKBACK,
    LOW_LOOKBACK,
    DIP_LOOKBACK,
)


def calculate_indicators(df):
    """
    Calculate all technical indicators.
    """

    df = df.copy()

    # Ensure ascending order
    df["Date"] = pd.to_datetime(df["Date"])
    df = df.sort_values("Date").reset_index(drop=True)

    # -----------------------------
    # Moving averages
    # -----------------------------

    df["SMA50"] = (
        df["Close"]
        .rolling(SMA_SHORT)
        .mean()
    )

    df["SMA150"] = (
        df["Close"]
        .rolling(SMA_LONG)
        .mean()
    )

    df["EMA220"] = (
        df["Close"]
        .ewm(span=EMA_LONG, adjust=False)
        .mean()
    )

    # -----------------------------
    # Previous 52 Week High
    # -----------------------------

    df["Previous_52W_High"] = (
        df["Close"]
        .shift(1)
        .rolling(HIGH_LOOKBACK)
        .max()
    )

    # -----------------------------
    # 52 Week Low
    # -----------------------------

    df["52W_Low"] = (
        df["Close"]
        .rolling(LOW_LOOKBACK)
        .min()
    )

    # -----------------------------
    # EMA220 Dip
    # -----------------------------

    dipped = df["Low"] < df["EMA220"]

    df["Dip_Below_EMA220"] = (
        dipped
        .rolling(DIP_LOOKBACK)
        .max()
        .fillna(False)
        .astype(bool)
    )

    return df