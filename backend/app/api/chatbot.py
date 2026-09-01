from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from app.ai import get_ai_service

router = APIRouter(prefix="/chatbot", tags=["AI Conversational Assistant"])

class ChatRequest(BaseModel):
    message: str
    language: Optional[str] = "en" # "en", "hi", "santali", "ho", "mundari"
    context: Optional[Dict[str, Any]] = {}

@router.post("/query")
@router.post("/message")
def chat_with_ai(req: ChatRequest):
    ai_service = get_ai_service()
    res = ai_service.generate_chatbot_response(req.message, req.context or {})
    return res
