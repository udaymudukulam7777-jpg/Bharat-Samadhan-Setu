from app.database import Base
from app.models.user import (
    User, UserRole, Organization, OrgType,
    CitizenProfile, StudentProfile, UniversityProfile, IndustryProfile, ExpertProfile
)
from app.models.problem import (
    Problem, ProblemStatus, PriorityLevel, ProblemDNA,
    PriorityScore, ProblemCluster, ProblemSimilarity,
    ProblemSupport, GovernmentAssignment
)
from app.models.solution import (
    Team, Solution, SolutionStatus, SolutionDNA,
    SolutionGapAnalysis, SolutionEvaluation
)
from app.models.project import (
    Project, ProjectStatus, MilestoneStage, MilestoneStatus,
    ProjectMilestone, ProjectTask, ProjectBlocker,
    ResourceOffer, IndustryPartnership, PrototypeSubmission, PilotRecord
)
from app.models.impact import (
    DeploymentRecord, DeploymentStatus, DeploymentEvidence,
    ImpactMetric, ImpactScore
)
from app.models.audit import AuditLog, NotificationRecord

__all__ = [
    "Base",
    "User", "UserRole", "Organization", "OrgType",
    "CitizenProfile", "StudentProfile", "UniversityProfile", "IndustryProfile", "ExpertProfile",
    "Problem", "ProblemStatus", "PriorityLevel", "ProblemDNA",
    "PriorityScore", "ProblemCluster", "ProblemSimilarity",
    "ProblemSupport", "GovernmentAssignment",
    "Team", "Solution", "SolutionStatus", "SolutionDNA",
    "SolutionGapAnalysis", "SolutionEvaluation",
    "Project", "ProjectStatus", "MilestoneStage", "MilestoneStatus",
    "ProjectMilestone", "ProjectTask", "ProjectBlocker",
    "ResourceOffer", "IndustryPartnership", "PrototypeSubmission", "PilotRecord",
    "DeploymentRecord", "DeploymentStatus", "DeploymentEvidence",
    "ImpactMetric", "ImpactScore",
    "AuditLog", "NotificationRecord"
]
