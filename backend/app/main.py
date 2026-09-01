import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.config import settings
from app.database import engine, Base
import app.models # Load all models for metadata creation
from app.api import (
    auth_router,
    problems_router,
    solutions_router,
    projects_router,
    matching_router,
    government_router,
    universities_router,
    industry_router,
    impact_router,
    chatbot_router,
    admin_router
)

# Initialize Tables
Base.metadata.create_all(bind=engine)

# Ensure upload directory exists
os.makedirs(settings.STORAGE_LOCAL_DIR, exist_ok=True)

app = FastAPI(
    title="India Samadhan Setu API",
    description="National AI Problem-to-Impact Platform for India (Smart India Hackathon 2026 Prototype)",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Static Uploads
app.mount("/uploads", StaticFiles(directory=settings.STORAGE_LOCAL_DIR), name="uploads")

# Include Routers
app.include_router(auth_router, prefix=settings.API_PREFIX)
app.include_router(problems_router, prefix=settings.API_PREFIX)
app.include_router(solutions_router, prefix=settings.API_PREFIX)
app.include_router(projects_router, prefix=settings.API_PREFIX)
app.include_router(matching_router, prefix=settings.API_PREFIX)
app.include_router(government_router, prefix=settings.API_PREFIX)
app.include_router(universities_router, prefix=settings.API_PREFIX)
app.include_router(industry_router, prefix=settings.API_PREFIX)
app.include_router(impact_router, prefix=settings.API_PREFIX)
app.include_router(chatbot_router, prefix=settings.API_PREFIX)
app.include_router(admin_router, prefix=settings.API_PREFIX)

@app.get("/")
def root():
    return {
        "platform": "India Samadhan Setu",
        "description": "National AI Problem-to-Impact Platform for India (SIH 2026)",
        "version": settings.VERSION,
        "ai_mode": settings.AI_MODE,
        "status": "ONLINE",
        "documentation": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "HEALTHY", "ai_mode": settings.AI_MODE, "database": "CONNECTED"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
