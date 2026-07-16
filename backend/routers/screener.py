from fastapi import APIRouter
import pandas as pd
import numpy as np

from services.screener_service import screen_stocks

router = APIRouter(
    prefix="/api/screener",
    tags=["Stock Screener"]
)


@router.get("/")
def get_screener(min_score: int = 0):

    results = screen_stocks(min_score)

    # Replace NaN with None
    results = results.replace({np.nan: None})

    return results.to_dict(orient="records")