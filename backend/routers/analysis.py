from fastapi import APIRouter

router = APIRouter(
    prefix="/api/analysis",
    tags=["Analysis"]
)

@router.get("/")
def get_analysis():
    return {
        "message": "Analysis API"
    }