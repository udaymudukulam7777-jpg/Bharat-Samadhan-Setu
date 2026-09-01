import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum, Text, Float, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class ProblemStatus(str, enum.Enum):
    SUBMITTED = "SUBMITTED"
    UNDER_REVIEW = "UNDER_REVIEW"
    VERIFIED = "VERIFIED"
    REJECTED = "REJECTED"
    OPEN_FOR_SOLUTIONS = "OPEN_FOR_SOLUTIONS"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    IMPACT_VERIFIED = "IMPACT_VERIFIED"

class PriorityLevel(str, enum.Enum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"

class Problem(Base):
    __tablename__ = "problems"

    id = Column(Integer, primary_key=True, index=True)
    problem_code = Column(String(50), unique=True, index=True, nullable=False) # e.g. P-JH-2026-001042
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=False)
    category = Column(String(100), nullable=False, index=True) # Water & Sanitation, Healthcare, Agriculture, Road & Infrastructure, Education, Clean Energy, Mining Safety
    subcategory = Column(String(100), nullable=True)
    
    # Location Hierarchy
    state = Column(String(100), default="Jharkhand")
    district = Column(String(100), nullable=False, index=True) # Ranchi, Dhanbad, Bokaro, etc.
    block = Column(String(100), nullable=True)
    panchayat = Column(String(100), nullable=True)
    village_or_landmark = Column(String(255), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    # Impact Scale
    affected_population = Column(Integer, default=500)
    
    # Submission Metadata
    media_urls = Column(JSON, default=list) # ["/uploads/img1.jpg"]
    voice_recording_url = Column(String(500), nullable=True)
    voice_transcript = Column(Text, nullable=True)
    is_qr_submitted = Column(Boolean, default=False)
    qr_facility_code = Column(String(100), nullable=True)
    
    # Workflow
    status = Column(Enum(ProblemStatus), default=ProblemStatus.SUBMITTED, index=True)
    created_by_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    department_name = Column(String(255), nullable=True)
    assigned_officer_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    cluster_id = Column(Integer, ForeignKey("problem_clusters.id"), nullable=True)
    sla_deadline = Column(DateTime, nullable=True)
    government_remarks = Column(Text, nullable=True)
    
    # Metrics
    support_count = Column(Integer, default=1)
    affected_count = Column(Integer, default=1)
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    reporter = relationship("User", back_populates="reported_problems", foreign_keys=[created_by_id])
    assigned_officer = relationship("User", back_populates="assigned_problems", foreign_keys=[assigned_officer_id])
    dna = relationship("ProblemDNA", back_populates="problem", uselist=False, cascade="all, delete-orphan")
    priority = relationship("PriorityScore", back_populates="problem", uselist=False, cascade="all, delete-orphan")
    cluster = relationship("ProblemCluster", back_populates="problems")
    supporters = relationship("ProblemSupport", back_populates="problem", cascade="all, delete-orphan")
    solutions = relationship("Solution", back_populates="problem", cascade="all, delete-orphan")
    projects = relationship("Project", back_populates="problem", cascade="all, delete-orphan")
    similar_as_source = relationship("ProblemSimilarity", foreign_keys="ProblemSimilarity.source_problem_id", back_populates="source_problem")
    similar_as_target = relationship("ProblemSimilarity", foreign_keys="ProblemSimilarity.target_problem_id", back_populates="target_problem")
    assignment_history = relationship("GovernmentAssignment", back_populates="problem", cascade="all, delete-orphan")

class ProblemDNA(Base):
    __tablename__ = "problem_dnas"

    id = Column(Integer, primary_key=True, index=True)
    problem_id = Column(Integer, ForeignKey("problems.id"), unique=True, nullable=False)
    
    domain = Column(String(100), nullable=False) # e.g. "Hydro-geology & Water Sanitation"
    subdomain = Column(String(100), nullable=True)
    severity_rating = Column(Float, default=8.5) # 1.0 - 10.0
    urgency_rating = Column(Float, default=9.0) # 1.0 - 10.0
    complexity_level = Column(String(50), default="High") # Low, Medium, High, Extreme
    
    # Capability Footprint
    required_skills = Column(JSON, default=list) # ["IoT Sensors", "Water Chemistry", "GIS Mapping", "Edge Computing"]
    required_domains = Column(JSON, default=list) # ["Environmental Engineering", "Rural Development", "IoT"]
    required_resources = Column(JSON, default=list) # ["Water Testing Lab", "Solar Power Units", "Filtration Media"]
    potential_solution_types = Column(JSON, default=list) # ["Hardware Device", "Community Kiosk", "Software Monitoring"]
    constraints = Column(JSON, default=list) # ["Low Power Grid", "Tribal Language Barrier", "Monsoon Flooding"]
    dependencies = Column(JSON, default=list) # ["Panchayat Approval", "Groundwater Data Access"]
    
    dna_fingerprint = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    problem = relationship("Problem", back_populates="dna")

class PriorityScore(Base):
    __tablename__ = "priority_scores"

    id = Column(Integer, primary_key=True, index=True)
    problem_id = Column(Integer, ForeignKey("problems.id"), unique=True, nullable=False)
    
    total_score = Column(Float, nullable=False, default=85.0) # 0 to 100
    priority_level = Column(Enum(PriorityLevel), default=PriorityLevel.HIGH)
    
    # Explainable Component Factors
    severity_factor = Column(Float, default=20.0) # out of 20
    urgency_factor = Column(Float, default=15.0) # out of 15
    affected_population_factor = Column(Float, default=15.0) # out of 15
    safety_risk_factor = Column(Float, default=10.0) # out of 10
    geographic_spread_factor = Column(Float, default=10.0) # out of 10
    frequency_factor = Column(Float, default=5.0) # out of 5
    community_support_factor = Column(Float, default=10.0) # out of 10
    environmental_factor = Column(Float, default=10.0) # out of 10
    govt_priority_factor = Column(Float, default=5.0) # out of 5
    
    explanation = Column(Text, nullable=True)
    calculated_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    problem = relationship("Problem", back_populates="priority")

class ProblemCluster(Base):
    __tablename__ = "problem_clusters"

    id = Column(Integer, primary_key=True, index=True)
    cluster_code = Column(String(50), unique=True, nullable=False) # e.g. CLU-WATER-RANCHI-01
    name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    districts = Column(JSON, default=list) # ["Ranchi", "Khunti", "Gumla"]
    problem_count = Column(Integer, default=1)
    total_affected_population = Column(Integer, default=0)
    average_priority_score = Column(Float, default=0.0)
    dominant_keywords = Column(JSON, default=list)
    centroid_lat = Column(Float, nullable=True)
    centroid_lng = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    problems = relationship("Problem", back_populates="cluster")

class ProblemSimilarity(Base):
    __tablename__ = "problem_similarities"

    id = Column(Integer, primary_key=True, index=True)
    source_problem_id = Column(Integer, ForeignKey("problems.id"), nullable=False)
    target_problem_id = Column(Integer, ForeignKey("problems.id"), nullable=False)
    similarity_percentage = Column(Float, nullable=False) # e.g. 88.5
    shared_keywords = Column(JSON, default=list)
    reason = Column(Text, nullable=True)
    is_merged = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    source_problem = relationship("Problem", foreign_keys=[source_problem_id], back_populates="similar_as_source")
    target_problem = relationship("Problem", foreign_keys=[target_problem_id], back_populates="similar_as_target")

class ProblemSupport(Base):
    __tablename__ = "problem_supports"

    id = Column(Integer, primary_key=True, index=True)
    problem_id = Column(Integer, ForeignKey("problems.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    is_directly_affected = Column(Boolean, default=True)
    comment = Column(Text, nullable=True)
    evidence_media_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    problem = relationship("Problem", back_populates="supporters")
    user = relationship("User", back_populates="supported_problems")

class GovernmentAssignment(Base):
    __tablename__ = "government_assignments"

    id = Column(Integer, primary_key=True, index=True)
    problem_id = Column(Integer, ForeignKey("problems.id"), nullable=False)
    assigned_by_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    assigned_officer_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    department_name = Column(String(255), nullable=False)
    officer_name = Column(String(255), nullable=False)
    officer_phone = Column(String(50), nullable=True)
    sla_days = Column(Integer, default=30)
    action_notes = Column(Text, nullable=True)
    assigned_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    problem = relationship("Problem", back_populates="assignment_history")
