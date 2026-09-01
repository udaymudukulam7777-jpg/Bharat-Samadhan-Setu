from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models.user import UserRole, OrgType

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserOut"

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    full_name: str
    phone: Optional[str] = None
    role: UserRole = UserRole.CITIZEN
    state: Optional[str] = "Maharashtra"
    district: Optional[str] = "Mumbai"
    organization_name: Optional[str] = None
    org_type: Optional[OrgType] = None
    designation: Optional[str] = None

class OrganizationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    org_type: OrgType
    state: Optional[str] = "India"
    district: Optional[str] = None
    is_verified: bool = True

class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    full_name: str
    phone: Optional[str] = None
    role: UserRole
    organization_id: Optional[int] = None
    organization: Optional[OrganizationOut] = None
    designation: Optional[str] = None
    state: Optional[str] = "India"
    district: Optional[str] = None
    avatar_url: Optional[str] = None
    created_at: datetime
