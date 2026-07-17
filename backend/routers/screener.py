import logging

import numpy as np
from fastapi import APIRouter, HTTPException

from services.cache_service import cache
from services.screener_service import screen_stocks

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api/screener",
    tags=["Stock Screener"]
)


@router.get("/")
def get_screener(min_score: int = 0):
    logger.info("GET /api/screener called")

    # Check whether the cache has finished loading
    stock_data = cache.get()

    if not stock_data:
        logger.warning("Stock cache is empty.")

        raise HTTPException(
            status_code=503,
            detail="Stock data is loading. Please wait 1-2 minutes and try again."
        )

    # Run screening
    results = screen_stocks(min_score)

    # Replace NaN with None
    results = results.replace({np.nan: None})

    return results.to_dict(orient="records")