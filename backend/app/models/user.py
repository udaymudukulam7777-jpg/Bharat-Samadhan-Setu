import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum, Text, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class UserRole(str, enum.Enum):
    CITIZEN = "CITIZEN"
    STUDENT = "STUDENT"
    UNIVERSITY = "UNIVERSITY"
    FACULTY_MENTOR = "FACULTY_MENTOR"
    EXPERT = "EXPERT"
    INDUSTRY = "INDUSTRY"
    GOVT_OFFICER = "GOVT_OFFICER"
    ADMIN = "ADMIN"

class OrgType(str, enum.Enum):
    UNIVERSITY = "UNIVERSITY"
    INDUSTRY = "INDUSTRY"
    GOVERNMENT_DEPT = "GOVERNMENT_DEPT"
    RESEARCH_INSTITUTE = "RESEARCH_INSTITUTE"
    NGO = "NGO"

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True)
    org_type = Column(Enum(OrgType), nullable=False)
    district = Column(String(100), nullable=True)
    state = Column(String(100), default="Jharkhand")
    address = Column(String(500), nullable=True)
    website = Column(String(255), nullable=True)
    contact_email = Column(String(255), nullable=True)
    contact_phone = Column(String(50), nullable=True)
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    users = relationship("User", back_populates="organization")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.CITIZEN)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    designation = Column(String(255), nullable=True)
    state = Column(String(100), default="India")
    district = Column(String(100), nullable=True)
    avatar_url = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    organization = relationship("Organization", back_populates="users")
    citizen_profile = relationship("CitizenProfile", back_populates="user", uselist=False)
    student_profile = relationship("StudentProfile", back_populates="user", uselist=False)
    university_profile = relationship("UniversityProfile", back_populates="user", uselist=False)
    industry_profile = relationship("IndustryProfile", back_populates="user", uselist=False)
    expert_profile = relationship("ExpertProfile", back_populates="user", uselist=False)
    reported_problems = relationship("Problem", back_populates="reporter", foreign_keys="Problem.created_by_id")
    assigned_problems = relationship("Problem", back_populates="assigned_officer", foreign_keys="Problem.assigned_officer_id")
    supported_problems = relationship("ProblemSupport", back_populates="user")
    notifications = relationship("NotificationRecord", back_populates="user")

class CitizenProfile(Base):
    __tablename__ = "citizen_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    panchayat = Column(String(100), nullable=True)
    block = Column(String(100), nullable=True)
    district = Column(String(100), nullable=True)
    preferred_language = Column(String(50), default="hi") # hi, en, santali, ho, kurukh, mundari
    total_reported = Column(Integer, default=0)
    total_upvoted = Column(Integer, default=0)

    user = relationship("User", back_populates="citizen_profile")

class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    enrollment_number = Column(String(100), nullable=True)
    university_name = Column(String(255), nullable=True)
    branch = Column(String(100), nullable=True)
    graduation_year = Column(Integer, nullable=True)
    skills = Column(JSON, default=list) # ["Python", "IoT", "React", "GIS", "Machine Learning"]
    interests = Column(JSON, default=list) # ["Water Conservation", "Rural Healthcare", "Clean Energy"]
    github_profile = Column(String(255), nullable=True)
    linkedin_profile = Column(String(255), nullable=True)
    availability_hours_per_week = Column(Integer, default=15)
    reputation_score = Column(Integer, default=100)

    user = relationship("User", back_populates="student_profile")

class UniversityProfile(Base):
    __tablename__ = "university_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    departments = Column(JSON, default=list) # ["Computer Science", "Environmental Engineering", "Agriculture"]
    laboratories = Column(JSON, default=list) # ["Water Quality Lab", "IoT & Robotics FabLab", "GIS Remote Sensing Lab"]
    research_domains = Column(JSON, default=list)
    capability_scores = Column(JSON, default=dict) # {"AI_ML": 92, "IoT": 88, "WaterTech": 95, "GIS": 80}
    faculty_count = Column(Integer, default=50)
    student_count = Column(Integer, default=2000)
    active_projects_count = Column(Integer, default=0)

    user = relationship("User", back_populates="university_profile")

class IndustryProfile(Base):
    __tablename__ = "industry_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    industry_sector = Column(String(255), nullable=True) # "Mining & Metallurgy", "IT & Cloud", "Water Management", "Renewable Energy"
    offered_resources = Column(JSON, default=list) # ["IoT Sensor Kits", "Cloud Compute Credits", "Testing Labs", "Mentorship", "Seed Grant"]
    technology_stacks = Column(JSON, default=list)
    csr_budget_available = Column(String(100), nullable=True)
    mentorship_capacity = Column(Integer, default=5)

    user = relationship("User", back_populates="industry_profile")

class ExpertProfile(Base):
    __tablename__ = "expert_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    domain_expertise = Column(JSON, default=list) # ["Hydrogeology", "Water Filtration", "Rural Electrification", "Public Health"]
    highest_degree = Column(String(100), default="Ph.D.")
    years_experience = Column(Integer, default=10)
    publications_count = Column(Integer, default=12)
    organization_name = Column(String(255), nullable=True)
    is_available = Column(Boolean, default=True)

    user = relationship("User", back_populates="expert_profile")
