from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models.impact import DeploymentStatus

class ImpactMetricOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    metric_name: str
    baseline_value: float
    achieved_value: float
    unit: str
    improvement_percentage: float
    category: str

class ImpactScoreOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    total_score: float
    reach_score: float
    outcome_improvement_score: float
    adoption_score: float
    sustainability_score: float
    problem_severity_score: float
    explanation: Optional[str] = None

class DeploymentRecordOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    deployment_code: str
    site_name: str
    state: Optional[str] = "India"
    district: str
    block: Optional[str] = None
    panchayat: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    implementing_org_name: str
    beneficiaries_count: int
    status: DeploymentStatus
    is_verified: bool
    verified_by_officer_name: Optional[str] = None
    verification_badge_hash: Optional[str] = None
    deployment_date: datetime
    metrics: List[ImpactMetricOut] = []
    impact_score: Optional[ImpactScoreOut] = None
