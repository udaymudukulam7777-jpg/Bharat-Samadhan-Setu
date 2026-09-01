from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    action = Column(String(100), nullable=False) # e.g. "PROBLEM_VERIFIED", "PRIORITY_CHANGED", "DEPARTMENT_ASSIGNED", "SOLUTION_APPROVED", "DEPLOYMENT_VERIFIED"
    entity_type = Column(String(100), nullable=False) # "PROBLEM", "SOLUTION", "PROJECT", "DEPLOYMENT"
    entity_id = Column(String(100), nullable=False) # e.g. "P-JH-2026-001042"
    actor_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    actor_name = Column(String(255), nullable=False)
    actor_role = Column(String(100), nullable=False)
    details = Column(JSON, default=dict)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

class NotificationRecord(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    category = Column(String(100), default="UPDATE") # "MATCH", "VERIFICATION", "ASSIGNMENT", "BLOCKER", "IMPACT"
    link_url = Column(String(500), nullable=True)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="notifications")
