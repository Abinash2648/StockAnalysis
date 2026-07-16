from fastapi import APIRouter

router = APIRouter(
    prefix="/api/stocks",
    tags=["Stocks"]
)

@router.get("/")
def get_stocks():
    return {
        "message": "Stocks API"
    }