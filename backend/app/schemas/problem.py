from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models.problem import ProblemStatus, PriorityLevel

class ProblemCreate(BaseModel):
    title: str
    description: str
    category: str
    subcategory: Optional[str] = None
    state: Optional[str] = "Maharashtra"
    district: str
    block: Optional[str] = None
    panchayat: Optional[str] = None
    village_or_landmark: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    affected_population: Optional[int] = 500
    media_urls: Optional[List[str]] = []
    voice_transcript: Optional[str] = None
    is_qr_submitted: Optional[bool] = False
    qr_facility_code: Optional[str] = None

class ProblemDNAOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    domain: str
    subdomain: Optional[str] = None
    severity_rating: float
    urgency_rating: float
    complexity_level: str
    required_skills: List[str]
    required_domains: List[str]
    required_resources: List[str]
    potential_solution_types: List[str]
    constraints: List[str]
    dependencies: List[str]

class PriorityScoreOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    total_score: float
    priority_level: PriorityLevel
    severity_factor: float
    urgency_factor: float
    affected_population_factor: float
    safety_risk_factor: float
    geographic_spread_factor: float
    frequency_factor: float
    community_support_factor: float
    environmental_factor: float
    govt_priority_factor: float
    explanation: Optional[str] = None

class ProblemSupportCreate(BaseModel):
    is_directly_affected: bool = True
    comment: Optional[str] = None
    evidence_media_url: Optional[str] = None

class GovernmentVerifyRequest(BaseModel):
    action: str # "VERIFY", "REJECT", "REQUEST_CLARIFICATION", "OPEN_FOR_SOLUTIONS"
    remarks: Optional[str] = None
    department_name: Optional[str] = None
    assigned_officer_id: Optional[int] = None
    sla_days: Optional[int] = 30
    priority_override: Optional[PriorityLevel] = None

class ProblemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    problem_code: str
    title: str
    description: str
    category: str
    subcategory: Optional[str] = None
    state: Optional[str] = "India"
    district: str
    block: Optional[str] = None
    panchayat: Optional[str] = None
    village_or_landmark: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    affected_population: int
    media_urls: List[str] = []
    voice_transcript: Optional[str] = None
    status: ProblemStatus
    created_by_id: Optional[int] = None
    department_name: Optional[str] = None
    assigned_officer_id: Optional[int] = None
    support_count: int = 1
    affected_count: int = 1
    created_at: datetime
    dna: Optional[ProblemDNAOut] = None
    priority: Optional[PriorityScoreOut] = None
