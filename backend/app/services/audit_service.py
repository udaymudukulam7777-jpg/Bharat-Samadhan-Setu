from sqlalchemy.orm import Session
from app.models.audit import AuditLog, NotificationRecord
from app.models.user import User

def record_audit(
    db: Session,
    action: str,
    entity_type: str,
    entity_id: str,
    actor: User,
    details: dict = None
):
    audit_entry = AuditLog(
        action=action,
        entity_type=entity_type,
        entity_id=str(entity_id),
        actor_id=actor.id if actor else None,
        actor_name=actor.full_name if actor else "System AI Engine",
        actor_role=actor.role.value if actor else "SYSTEM",
        details=details or {}
    )
    db.add(audit_entry)
    db.commit()

def create_notification(
    db: Session,
    user_id: int,
    title: str,
    message: str,
    category: str = "UPDATE",
    link_url: str = None
):
    notification = NotificationRecord(
        user_id=user_id,
        title=title,
        message=message,
        category=category,
        link_url=link_url
    )
    db.add(notification)
    db.commit()
