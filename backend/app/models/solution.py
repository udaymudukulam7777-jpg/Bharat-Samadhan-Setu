import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum, Text, Float, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class SolutionStatus(str, enum.Enum):
    PROPOSED = "PROPOSED"
    UNDER_EVALUATION = "UNDER_EVALUATION"
    SHORTLISTED = "SHORTLISTED"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"

class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    university_name = Column(String(255), nullable=True)
    leader_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    member_ids = Column(JSON, default=list) # [user_id_1, user_id_2, ...]
    members_detail = Column(JSON, default=list) # [{"name": "Aarav", "role": "IoT Lead", "skills": ["C++", "Sensors"]}]
    skills_matrix = Column(JSON, default=dict) # {"ML": true, "IoT": true, "WaterTech": false}
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    leader = relationship("User", foreign_keys=[leader_id])
    solutions = relationship("Solution", back_populates="team")

class Solution(Base):
    __tablename__ = "solutions"

    id = Column(Integer, primary_key=True, index=True)
    solution_code = Column(String(50), unique=True, index=True, nullable=False) # e.g. SOL-JH-2026-0042
    problem_id = Column(Integer, ForeignKey("problems.id"), nullable=False)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)
    
    title = Column(String(255), nullable=False)
    executive_summary = Column(Text, nullable=False)
    architecture_description = Column(Text, nullable=True)
    tech_stack = Column(JSON, default=list) # ["ESP32", "LoRaWAN", "Activated Alumina Filter", "FastAPI", "React"]
    implementation_plan = Column(Text, nullable=True)
    estimated_cost_inr = Column(Float, default=75000.0)
    estimated_timeline_days = Column(Integer, default=45)
    expected_impact_summary = Column(Text, nullable=True)
    prototype_url = Column(String(500), nullable=True)
    demo_video_url = Column(String(500), nullable=True)
    scalability_plan = Column(Text, nullable=True)
    risk_mitigation = Column(Text, nullable=True)
    
    status = Column(Enum(SolutionStatus), default=SolutionStatus.PROPOSED, index=True)
    is_selected = Column(Boolean, default=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    problem = relationship("Problem", back_populates="solutions")
    team = relationship("Team", back_populates="solutions")
    dna = relationship("SolutionDNA", back_populates="solution", uselist=False, cascade="all, delete-orphan")
    gap_analysis = relationship("SolutionGapAnalysis", back_populates="solution", uselist=False, cascade="all, delete-orphan")
    evaluations = relationship("SolutionEvaluation", back_populates="solution", cascade="all, delete-orphan")
    project = relationship("Project", back_populates="solution", uselist=False)

class SolutionDNA(Base):
    __tablename__ = "solution_dnas"

    id = Column(Integer, primary_key=True, index=True)
    solution_id = Column(Integer, ForeignKey("solutions.id"), unique=True, nullable=False)
    
    covered_technologies = Column(JSON, default=list) # ["IoT", "Edge Telemetry", "Chemical Nano-Adsorption"]
    required_skills = Column(JSON, default=list)
    required_resources = Column(JSON, default=list) # ["Solar Panels", "Testing Rig", "Panchayat Site Access"]
    scalability_rating = Column(Float, default=9.0) # 1-10
    deployment_readiness = Column(String(50), default="High") # Low, Medium, High, Production-Ready
    estimated_budget = Column(Float, default=75000.0)
    timeline_weeks = Column(Integer, default=6)
    risk_factors = Column(JSON, default=list)
    dependencies = Column(JSON, default=list)
    expected_outcomes = Column(JSON, default=list)
    
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    solution = relationship("Solution", back_populates="dna")

class SolutionGapAnalysis(Base):
    __tablename__ = "solution_gap_analyses"

    id = Column(Integer, primary_key=True, index=True)
    solution_id = Column(Integer, ForeignKey("solutions.id"), unique=True, nullable=False)
    problem_id = Column(Integer, ForeignKey("problems.id"), nullable=False)
    
    coverage_percentage = Column(Float, default=85.0) # e.g. 85.0%
    covered_requirements = Column(JSON, default=list) # ["IoT Telemetry", "Heavy Metal Adsorption", "Solar Autonomy"]
    missing_requirements = Column(JSON, default=list) # ["Hydrogeological Aquifer Mapping", "Sludge Regeneration Protocol"]
    technical_gaps = Column(JSON, default=list)
    domain_gaps = Column(JSON, default=list) # ["Hydrogeology Expert Required"]
    resource_gaps = Column(JSON, default=list) # ["NABL Certified Lab Testing Facility Required"]
    funding_gaps = Column(JSON, default=list)
    deployment_gaps = Column(JSON, default=list)
    
    # AI Recommended remediations
    recommended_experts = Column(JSON, default=list) # [{"name": "Dr. Arvind Kumar", "domain": "Hydrogeology", "match": 96}]
    recommended_universities = Column(JSON, default=list) # [{"name": "BIT Mesra", "facility": "Environmental Water Lab"}]
    recommended_industries = Column(JSON, default=list) # [{"name": "Tata Steel Water Division", "resource": "Field Sensors"}]
    
    analyzed_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    solution = relationship("Solution", back_populates="gap_analysis")

class SolutionEvaluation(Base):
    __tablename__ = "solution_evaluations"

    id = Column(Integer, primary_key=True, index=True)
    solution_id = Column(Integer, ForeignKey("solutions.id"), nullable=False)
    evaluator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    innovation_score = Column(Float, default=9.0) # 1-10
    feasibility_score = Column(Float, default=8.5)
    cost_effectiveness_score = Column(Float, default=9.0)
    scalability_score = Column(Float, default=8.5)
    social_impact_score = Column(Float, default=9.5)
    sustainability_score = Column(Float, default=9.0)
    technical_quality_score = Column(Float, default=8.5)
    total_score = Column(Float, default=89.5) # out of 100
    
    evaluator_feedback = Column(Text, nullable=True)
    ai_assisted_summary = Column(Text, nullable=True)
    evaluated_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    solution = relationship("Solution", back_populates="evaluations")
    evaluator = relationship("User", foreign_keys=[evaluator_id])
