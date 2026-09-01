from app.api.auth import router as auth_router
from app.api.problems import router as problems_router
from app.api.solutions import router as solutions_router
from app.api.projects import router as projects_router
from app.api.matching import router as matching_router
from app.api.government import router as government_router
from app.api.universities import router as universities_router
from app.api.industry import router as industry_router
from app.api.impact import router as impact_router
from app.api.chatbot import router as chatbot_router
from app.api.admin import router as admin_router

__all__ = [
    "auth_router",
    "problems_router",
    "solutions_router",
    "projects_router",
    "matching_router",
    "government_router",
    "universities_router",
    "industry_router",
    "impact_router",
    "chatbot_router",
    "admin_router"
]
