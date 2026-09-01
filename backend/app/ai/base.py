from abc import ABC, abstractmethod
from typing import Dict, Any, List

class AIServiceInterface(ABC):
    @abstractmethod
    def analyze_problem(self, title: str, description: str, category: str, district: str) -> Dict[str, Any]:
        """Analyzes unstructured citizen problem and extracts metadata."""
        pass

    @abstractmethod
    def generate_problem_dna(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generates multi-dimensional Problem DNA."""
        pass

    @abstractmethod
    def calculate_priority_score(self, problem_data: Dict[str, Any], dna_data: Dict[str, Any]) -> Dict[str, Any]:
        """Calculates transparent explainable priority score (0-100)."""
        pass

    @abstractmethod
    def detect_duplicates(self, new_problem: Dict[str, Any], existing_problems: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Checks for semantic duplicates and similarity ranking."""
        pass

    @abstractmethod
    def match_capabilities(self, problem_dna: Dict[str, Any], candidates: Dict[str, List[Dict[str, Any]]]) -> Dict[str, Any]:
        """Matches Problem DNA with Universities, Student Teams, Experts, and Industry."""
        pass

    @abstractmethod
    def analyze_solution_dna(self, solution_data: Dict[str, Any]) -> Dict[str, Any]:
        """Synthesizes Solution DNA from proposal text."""
        pass

    @abstractmethod
    def perform_gap_analysis(self, problem_dna: Dict[str, Any], solution_dna: Dict[str, Any]) -> Dict[str, Any]:
        """Compares Problem DNA vs Solution DNA and recommends remediation."""
        pass

    @abstractmethod
    def detect_project_blockers(self, project_data: Dict[str, Any], milestones: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Diagnoses bottlenecks, delays, and recommends partners."""
        pass

    @abstractmethod
    def calculate_impact_score(self, deployment_data: Dict[str, Any], metrics: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Synthesizes verified Impact Score (0-100)."""
        pass

    @abstractmethod
    def generate_chatbot_response(self, message: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Handles conversational problem reporting and citizen queries."""
        pass
