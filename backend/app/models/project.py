import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum, Text, Float, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class ProjectStatus(str, enum.Enum):
    INITIATED = "INITIATED"
    ACTIVE = "ACTIVE"
    BLOCKED = "BLOCKED"
    PILOT_DEPLOYED = "PILOT_DEPLOYED"
    VERIFIED_COMPLETE = "VERIFIED_COMPLETE"
    ARCHIVED = "ARCHIVED"

class MilestoneStage(str, enum.Enum):
    RESEARCH = "RESEARCH"
    DESIGN = "DESIGN"
    PROTOTYPE = "PROTOTYPE"
    TESTING = "TESTING"
    PILOT = "PILOT"
    DEPLOYMENT = "DEPLOYMENT"
    IMPACT = "IMPACT"

class MilestoneStatus(str, enum.Enum):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    VERIFIED = "VERIFIED"

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    project_code = Column(String(50), unique=True, index=True, nullable=False) # e.g. PRJ-JH-2026-0042
    problem_id = Column(Integer, ForeignKey("problems.id"), nullable=False)
    solution_id = Column(Integer, ForeignKey("solutions.id"), unique=True, nullable=False)
    
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(Enum(ProjectStatus), default=ProjectStatus.ACTIVE, index=True)
    health_score = Column(Float, default=95.0) # 0 to 100
    overall_progress_pct = Column(Float, default=15.0) # 0 to 100
    target_completion_date = Column(DateTime, nullable=True)
    
    # Relationships
    problem = relationship("Problem", back_populates="projects")
    solution = relationship("Solution", back_populates="project")
    milestones = relationship("ProjectMilestone", back_populates="project", cascade="all, delete-orphan")
    tasks = relationship("ProjectTask", back_populates="project", cascade="all, delete-orphan")
    blockers = relationship("ProjectBlocker", back_populates="project", cascade="all, delete-orphan")
    resource_offers = relationship("ResourceOffer", back_populates="project", cascade="all, delete-orphan")
    partnerships = relationship("IndustryPartnership", back_populates="project", cascade="all, delete-orphan")
    prototypes = relationship("PrototypeSubmission", back_populates="project", cascade="all, delete-orphan")
    pilots = relationship("PilotRecord", back_populates="project", cascade="all, delete-orphan")
    deployment = relationship("DeploymentRecord", back_populates="project", uselist=False, cascade="all, delete-orphan")

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ProjectMilestone(Base):
    __tablename__ = "project_milestones"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    
    stage = Column(Enum(MilestoneStage), nullable=False)
    order_index = Column(Integer, default=1)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    owner_name = Column(String(255), nullable=True)
    status = Column(Enum(MilestoneStatus), default=MilestoneStatus.PENDING)
    progress_pct = Column(Float, default=0.0)
    due_date = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    
    # Evidence & Verification
    evidence_url = Column(String(500), nullable=True)
    evidence_description = Column(Text, nullable=True)
    verification_badge_hash = Column(String(255), nullable=True) # Cryptographic verification receipt
    verified_by_officer_name = Column(String(255), nullable=True)
    verified_at = Column(DateTime, nullable=True)

    # Relationships
    project = relationship("Project", back_populates="milestones")

class ProjectTask(Base):
    __tablename__ = "project_tasks"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    milestone_id = Column(Integer, ForeignKey("project_milestones.id"), nullable=True)
    
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    assigned_to_name = Column(String(255), nullable=True)
    status = Column(String(50), default="TODO") # TODO, IN_PROGRESS, DONE
    priority = Column(String(50), default="MEDIUM") # LOW, MEDIUM, HIGH, URGENT
    due_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    project = relationship("Project", back_populates="tasks")

class ProjectBlocker(Base):
    __tablename__ = "project_blockers"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    
    blocker_type = Column(String(100), nullable=False) # "DOMAIN_EXPERTISE_MISSING", "TESTING_LAB_REQUIRED", "FUNDING_DELAY", "HARDWARE_SUPPLY"
    severity = Column(String(50), default="HIGH") # CRITICAL, HIGH, MEDIUM
    title = Column(String(255), nullable=False)
    diagnostic_reason = Column(Text, nullable=False) # e.g. "Milestone 4 delayed by 18 days: Water quality lab test required before pilot deployment."
    is_resolved = Column(Boolean, default=False)
    resolution_notes = Column(Text, nullable=True)
    
    # Auto-recommendations
    recommended_partners = Column(JSON, default=list) # [{"type": "LAB", "name": "BIT Mesra Env Lab", "contact": "envlab@bitmesra.ac.in"}]
    
    detected_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)

    # Relationships
    project = relationship("Project", back_populates="blockers")

class ResourceOffer(Base):
    __tablename__ = "resource_offers"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    offering_organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    provider_name = Column(String(255), nullable=False)
    resource_type = Column(String(100), nullable=False) # "HARDWARE", "TESTING_RIG", "CLOUD_CREDITS", "MENTOR", "FUNDING"
    description = Column(Text, nullable=False)
    status = Column(String(50), default="OFFERED") # OFFERED, ACCEPTED, DELIVERED
    offered_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    project = relationship("Project", back_populates="resource_offers")

class IndustryPartnership(Base):
    __tablename__ = "industry_partnerships"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    industry_name = Column(String(255), nullable=False)
    partnership_role = Column(String(255), nullable=False) # "CSR Sponsor & Hardware Provider"
    committed_support = Column(Text, nullable=True)
    status = Column(String(50), default="ACTIVE")
    joined_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    project = relationship("Project", back_populates="partnerships")

class PrototypeSubmission(Base):
    __tablename__ = "prototype_submissions"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    version = Column(String(50), default="v1.0-alpha")
    github_url = Column(String(500), nullable=True)
    demo_video_url = Column(String(500), nullable=True)
    schematic_docs_url = Column(String(500), nullable=True)
    test_metrics = Column(JSON, default=dict) # {"adsorption_rate": "94.2%", "flow_rate_lpm": "8.5"}
    is_approved = Column(Boolean, default=False)
    evaluator_remarks = Column(Text, nullable=True)
    submitted_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    project = relationship("Project", back_populates="prototypes")

class PilotRecord(Base):
    __tablename__ = "pilot_records"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    location_name = Column(String(255), nullable=False) # "Bero Village Panchayat Centre"
    district = Column(String(100), nullable=False)
    beneficiaries_served = Column(Integer, default=500)
    duration_days = Column(Integer, default=30)
    results_summary = Column(Text, nullable=True)
    test_data_url = Column(String(500), nullable=True)
    is_verified = Column(Boolean, default=True)
    verified_by_officer_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    project = relationship("Project", back_populates="pilots")
