from fastapi import APIRouter

from services.company_service import get_company_details

router = APIRouter(
    prefix="/api/company",
    tags=["Company"]
)


@router.get("/{symbol}")
def company_details(symbol: str):
    return get_company_details(symbol)