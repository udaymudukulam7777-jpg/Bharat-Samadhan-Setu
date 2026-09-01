from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, UserRole, Organization
from app.models.audit import AuditLog
from app.services.auth_service import require_roles
from app.config import settings

router = APIRouter(prefix="/admin", tags=["Admin Portal"])

@router.get("/users")
def list_users(current_user: User = Depends(require_roles([UserRole.ADMIN, UserRole.GOVT_OFFICER])), db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.created_at.desc()).limit(100).all()
    return [{
        "id": u.id,
        "email": u.email,
        "full_name": u.full_name,
        "role": u.role.value,
        "district": u.district,
        "organization_id": u.organization_id,
        "is_active": u.is_active,
        "created_at": u.created_at
    } for u in users]

@router.get("/audit-logs")
def get_audit_logs(current_user: User = Depends(require_roles([UserRole.ADMIN, UserRole.GOVT_OFFICER])), db: Session = Depends(get_db)):
    logs = db.query(AuditLog).order_by(AuditLog.timestamp.desc()).limit(100).all()
    return logs

@router.get("/system-status")
def get_system_status(current_user: User = Depends(require_roles([UserRole.ADMIN])), db: Session = Depends(get_db)):
    return {
        "status": "OPERATIONAL",
        "environment": settings.ENVIRONMENT,
        "ai_mode": settings.AI_MODE,
        "ai_provider": settings.AI_PROVIDER,
        "storage_type": settings.STORAGE_TYPE,
        "database_connected": True,
        "total_users": db.query(User).count(),
        "version": settings.VERSION
    }
