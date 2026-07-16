from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.screener import router as screener_router
from routers.company import router as company_router
from routers.news import router as news_router

app = FastAPI(
    title="Stock Analysis API",
    description="Nifty 500 Stock Screener API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        # "https://your-vercel-app.vercel.app",  # Add after frontend deployment
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(screener_router)
app.include_router(company_router)
app.include_router(news_router)


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "Stock Analysis API Running 🚀"
    }