from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, UserRole, Organization, OrgType, CitizenProfile, StudentProfile, UniversityProfile, IndustryProfile, ExpertProfile
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse, UserOut
from app.services.auth_service import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse)
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == req.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    org_id = None
    if req.organization_name and req.org_type:
        org = db.query(Organization).filter(Organization.name == req.organization_name).first()
        if not org:
            org = Organization(
                name=req.organization_name,
                org_type=req.org_type,
                district=req.district
            )
            db.add(org)
            db.commit()
            db.refresh(org)
        org_id = org.id

    user = User(
        email=req.email,
        hashed_password=hash_password(req.password),
        full_name=req.full_name,
        phone=req.phone,
        role=req.role,
        district=req.district,
        organization_id=org_id,
        designation=req.designation
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Initialize Role-Specific Profiles
    if req.role == UserRole.CITIZEN:
        db.add(CitizenProfile(user_id=user.id, district=req.district))
    elif req.role == UserRole.STUDENT:
        db.add(StudentProfile(user_id=user.id, university_name=req.organization_name or "BIT Mesra"))
    elif req.role == UserRole.UNIVERSITY:
        db.add(UniversityProfile(user_id=user.id))
    elif req.role == UserRole.INDUSTRY:
        db.add(IndustryProfile(user_id=user.id, industry_sector="Technology & Infrastructure"))
    elif req.role == UserRole.EXPERT:
        db.add(ExpertProfile(user_id=user.id))
    db.commit()

    token = create_access_token({"sub": str(user.id), "role": user.role.value, "email": user.email})
    return {"access_token": token, "token_type": "bearer", "user": user}

@router.post("/login", response_model=TokenResponse)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token({"sub": str(user.id), "role": user.role.value, "email": user.email})
    return {"access_token": token, "token_type": "bearer", "user": user}

@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/profile", response_model=UserOut)
def update_profile(
    profile_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if "full_name" in profile_data and profile_data["full_name"]:
        current_user.full_name = profile_data["full_name"]
    if "phone" in profile_data:
        current_user.phone = profile_data["phone"]
    if "district" in profile_data and profile_data["district"]:
        current_user.district = profile_data["district"]
    if "designation" in profile_data:
        current_user.designation = profile_data["designation"]

    db.commit()
    db.refresh(current_user)
    return current_user

@router.post("/demo-login/{role_name}", response_model=TokenResponse)
def demo_login(role_name: str, db: Session = Depends(get_db)):
    """Convenience endpoint for SIH judges to switch roles instantly."""
    role_map = {
        "citizen": UserRole.CITIZEN,
        "student": UserRole.STUDENT,
        "university": UserRole.UNIVERSITY,
        "faculty": UserRole.FACULTY_MENTOR,
        "expert": UserRole.EXPERT,
        "industry": UserRole.INDUSTRY,
        "government": UserRole.GOVT_OFFICER,
        "admin": UserRole.ADMIN,
    }
    target_role = role_map.get(role_name.lower())
    if not target_role:
        raise HTTPException(status_code=400, detail=f"Invalid demo role. Choose from {list(role_map.keys())}")

    user = db.query(User).filter(User.role == target_role).first()
    if not user:
        # Fallback or create demo user
        user = User(
            email=f"demo.{role_name.lower()}@jharkhand.gov.in",
            hashed_password=hash_password("Demo@123"),
            full_name=f"Demo {role_name.capitalize()}",
            role=target_role,
            district="Ranchi"
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    token = create_access_token({"sub": str(user.id), "role": user.role.value, "email": user.email})
    return {"access_token": token, "token_type": "bearer", "user": user}
