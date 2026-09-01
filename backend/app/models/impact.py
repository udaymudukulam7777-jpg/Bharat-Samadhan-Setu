import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum, Text, Float, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class DeploymentStatus(str, enum.Enum):
    OPERATIONAL = "OPERATIONAL"
    MAINTENANCE = "MAINTENANCE"
    SCALED = "SCALED"
    DECOMMISSIONED = "DECOMMISSIONED"

class DeploymentRecord(Base):
    __tablename__ = "deployment_records"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), unique=True, nullable=False)
    deployment_code = Column(String(50), unique=True, index=True, nullable=False) # e.g. DEP-JH-2026-0042
    
    site_name = Column(String(255), nullable=False) # "Bero Central Water Kiosk, Ranchi"
    state = Column(String(100), default="Jharkhand")
    district = Column(String(100), nullable=False, index=True)
    block = Column(String(100), nullable=True)
    panchayat = Column(String(100), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    implementing_org_name = Column(String(255), nullable=False)
    beneficiaries_count = Column(Integer, default=12500)
    deployment_date = Column(DateTime, default=datetime.utcnow)
    status = Column(Enum(DeploymentStatus), default=DeploymentStatus.OPERATIONAL)
    
    # Official Verification Badge
    is_verified = Column(Boolean, default=True)
    verified_by_officer_name = Column(String(255), default="Er. Rajesh Kumar, Executive Engineer, DWSD Ranchi")
    verification_badge_hash = Column(String(255), default="0x8f2a4e9b7c1d3f5e0a6b8c9d2e4f7a1b3c5d8e9f")
    verified_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    project = relationship("Project", back_populates="deployment")
    evidences = relationship("DeploymentEvidence", back_populates="deployment", cascade="all, delete-orphan")
    metrics = relationship("ImpactMetric", back_populates="deployment", cascade="all, delete-orphan")
    impact_score = relationship("ImpactScore", back_populates="deployment", uselist=False, cascade="all, delete-orphan")

class DeploymentEvidence(Base):
    __tablename__ = "deployment_evidences"

    id = Column(Integer, primary_key=True, index=True)
    deployment_id = Column(Integer, ForeignKey("deployment_records.id"), nullable=False)
    
    evidence_type = Column(String(100), nullable=False) # "NABL_LAB_TEST", "IOT_DASHBOARD_FEED", "FIELD_PHOTOGRAPH", "GRAM_PABCHAYAT_SIGN_OFF"
    title = Column(String(255), nullable=False)
    file_url = Column(String(500), nullable=False)
    verification_notes = Column(Text, nullable=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    deployment = relationship("DeploymentRecord", back_populates="evidences")

class ImpactMetric(Base):
    __tablename__ = "impact_metrics"

    id = Column(Integer, primary_key=True, index=True)
    deployment_id = Column(Integer, ForeignKey("deployment_records.id"), nullable=False)
    
    metric_name = Column(String(255), nullable=False) # "Fluoride Level (mg/L)", "Daily Potable Water Output (Liters)", "Childhood Waterborne Illnesses", "Monthly Household Water Expenditure"
    baseline_value = Column(Float, nullable=False) # 4.8
    achieved_value = Column(Float, nullable=False) # 0.4
    unit = Column(String(50), nullable=False) # "mg/L", "L/day", "Cases/month", "INR/month"
    improvement_percentage = Column(Float, default=91.6) # 91.6%
    category = Column(String(100), default="Health & Quality of Life")
    measured_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    deployment = relationship("DeploymentRecord", back_populates="metrics")

class ImpactScore(Base):
    __tablename__ = "impact_scores"

    id = Column(Integer, primary_key=True, index=True)
    deployment_id = Column(Integer, ForeignKey("deployment_records.id"), unique=True, nullable=False)
    
    total_score = Column(Float, default=92.5) # out of 100
    
    # 5 Explainable Factors
    reach_score = Column(Float, default=24.0) # out of 25 (Beneficiaries count, geographic penetration)
    outcome_improvement_score = Column(Float, default=23.5) # out of 25 (Direct biomarker / performance deltas)
    adoption_score = Column(Float, default=18.5) # out of 20 (Active daily usage, community ownership)
    sustainability_score = Column(Float, default=14.0) # out of 15 (Solar longevity, maintenance model)
    problem_severity_score = Column(Float, default=12.5) # out of 15 (Criticality of initial problem)
    
    explanation = Column(Text, nullable=True)
    calculated_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    deployment = relationship("DeploymentRecord", back_populates="impact_score")
