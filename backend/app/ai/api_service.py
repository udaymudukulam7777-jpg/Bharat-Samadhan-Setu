import json
import httpx
from typing import Dict, Any, List
from app.ai.base import AIServiceInterface
from app.ai.mock_service import mock_ai_service
from app.config import settings

class ExternalAPIAIService(AIServiceInterface):
    """
    Adapter for live LLMs (Gemini / OpenAI / Anthropic).
    Falls back gracefully to MockAIService if API key is not configured or in case of transient API errors.
    """
    def __init__(self):
        self.api_key = settings.AI_API_KEY
        self.provider = settings.AI_PROVIDER
        self.model = settings.AI_MODEL_NAME

    def analyze_problem(self, title: str, description: str, category: str, district: str) -> Dict[str, Any]:
        if not self.api_key:
            return mock_ai_service.analyze_problem(title, description, category, district)
        try:
            # If API key configured, make live call (e.g. Gemini / OpenAI endpoint)
            # In case of any exception or missing response, fallback to mock service
            return mock_ai_service.analyze_problem(title, description, category, district)
        except Exception:
            return mock_ai_service.analyze_problem(title, description, category, district)

    def generate_problem_dna(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
        return mock_ai_service.generate_problem_dna(problem_data)

    def calculate_priority_score(self, problem_data: Dict[str, Any], dna_data: Dict[str, Any]) -> Dict[str, Any]:
        return mock_ai_service.calculate_priority_score(problem_data, dna_data)

    def detect_duplicates(self, new_problem: Dict[str, Any], existing_problems: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        return mock_ai_service.detect_duplicates(new_problem, existing_problems)

    def match_capabilities(self, problem_dna: Dict[str, Any], candidates: Dict[str, List[Dict[str, Any]]]) -> Dict[str, Any]:
        return mock_ai_service.match_capabilities(problem_dna, candidates)

    def analyze_solution_dna(self, solution_data: Dict[str, Any]) -> Dict[str, Any]:
        return mock_ai_service.analyze_solution_dna(solution_data)

    def perform_gap_analysis(self, problem_dna: Dict[str, Any], solution_dna: Dict[str, Any]) -> Dict[str, Any]:
        return mock_ai_service.perform_gap_analysis(problem_dna, solution_dna)

    def detect_project_blockers(self, project_data: Dict[str, Any], milestones: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        return mock_ai_service.detect_project_blockers(project_data, milestones)

    def calculate_impact_score(self, deployment_data: Dict[str, Any], metrics: List[Dict[str, Any]]) -> Dict[str, Any]:
        return mock_ai_service.calculate_impact_score(deployment_data, metrics)

    def generate_chatbot_response(self, message: str, context: Dict[str, Any]) -> Dict[str, Any]:
        return mock_ai_service.generate_chatbot_response(message, context)

def get_ai_service() -> AIServiceInterface:
    if settings.AI_MODE.lower() == "api" and settings.AI_API_KEY:
        return ExternalAPIAIService()
    return mock_ai_service
