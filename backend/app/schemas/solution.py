from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models.solution import SolutionStatus

class TeamCreate(BaseModel):
    name: str
    university_name: Optional[str] = None
    members_detail: List[Dict[str, Any]] = [] # [{"name": "...", "role": "...", "skills": [...]}]
    skills_matrix: Optional[Dict[str, bool]] = {}

class SolutionCreate(BaseModel):
    problem_id: int
    team_id: Optional[int] = None
    team_name: Optional[str] = None
    title: str
    executive_summary: str
    architecture_description: Optional[str] = None
    tech_stack: List[str] = []
    implementation_plan: Optional[str] = None
    estimated_cost_inr: float = 75000.0
    estimated_timeline_days: int = 45
    expected_impact_summary: Optional[str] = None
    prototype_url: Optional[str] = None
    demo_video_url: Optional[str] = None
    scalability_plan: Optional[str] = None
    risk_mitigation: Optional[str] = None

class SolutionDNAOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    covered_technologies: List[str]
    required_skills: List[str]
    required_resources: List[str]
    scalability_rating: float
    deployment_readiness: str
    estimated_budget: float
    timeline_weeks: int
    risk_factors: List[str]
    dependencies: List[str]
    expected_outcomes: List[str]

class SolutionGapAnalysisOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    coverage_percentage: float
    covered_requirements: List[str]
    missing_requirements: List[str]
    technical_gaps: List[str]
    domain_gaps: List[str]
    resource_gaps: List[str]
    funding_gaps: List[str]
    deployment_gaps: List[str]
    recommended_experts: List[Dict[str, Any]]
    recommended_universities: List[Dict[str, Any]]
    recommended_industries: List[Dict[str, Any]]

class SolutionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    solution_code: str
    problem_id: int
    team_id: int
    title: str
    executive_summary: str
    architecture_description: Optional[str] = None
    tech_stack: List[str] = []
    estimated_cost_inr: float
    estimated_timeline_days: int
    status: SolutionStatus
    is_selected: bool
    created_at: datetime
    dna: Optional[SolutionDNAOut] = None
    gap_analysis: Optional[SolutionGapAnalysisOut] = None
