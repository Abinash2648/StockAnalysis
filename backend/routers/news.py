from fastapi import APIRouter

from services.news_service import get_company_news

router = APIRouter(
    prefix="/api/news",
    tags=["Company News"]
)


@router.get("/{symbol}")
def company_news(symbol: str):
    return get_company_news(symbol)