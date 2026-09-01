from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models.project import ProjectStatus, MilestoneStage, MilestoneStatus

class MilestoneOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    project_id: int
    stage: MilestoneStage
    order_index: int
    title: str
    description: Optional[str] = None
    owner_name: Optional[str] = None
    status: MilestoneStatus
    progress_pct: float = 0.0
    due_date: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    evidence_url: Optional[str] = None
    evidence_description: Optional[str] = None
    verification_badge_hash: Optional[str] = None
    verified_by_officer_name: Optional[str] = None
    verified_at: Optional[datetime] = None

class MilestoneUpdate(BaseModel):
    status: Optional[MilestoneStatus] = None
    progress_pct: Optional[float] = None
    evidence_url: Optional[str] = None
    evidence_description: Optional[str] = None

class ProjectTaskOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    project_id: int
    milestone_id: Optional[int] = None
    title: str
    description: Optional[str] = None
    assigned_to_name: Optional[str] = None
    status: str = "TODO"
    priority: str = "MEDIUM"
    due_date: Optional[datetime] = None

class ProjectBlockerOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    project_id: int
    blocker_type: str
    severity: str = "HIGH"
    title: str
    diagnostic_reason: str
    is_resolved: bool = False
    resolution_notes: Optional[str] = None
    recommended_partners: List[Dict[str, Any]] = []
    detected_at: datetime
    resolved_at: Optional[datetime] = None

class ProjectOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    project_code: str
    problem_id: int
    solution_id: int
    title: str
    description: Optional[str] = None
    status: ProjectStatus
    health_score: float = 95.0
    overall_progress_pct: float = 0.0
    target_completion_date: Optional[datetime] = None
    created_at: datetime
    milestones: List[MilestoneOut] = []
    blockers: List[ProjectBlockerOut] = []
