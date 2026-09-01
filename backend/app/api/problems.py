import random
from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.problem import (
    Problem, ProblemStatus, PriorityLevel, ProblemDNA,
    PriorityScore, ProblemCluster, ProblemSimilarity, ProblemSupport, GovernmentAssignment
)
from app.models.user import User, UserRole
from app.schemas.problem import (
    ProblemCreate, ProblemOut, GovernmentVerifyRequest, ProblemSupportCreate
)
from app.services.auth_service import get_current_user, require_roles
from app.services.audit_service import record_audit, create_notification
from app.ai import get_ai_service

router = APIRouter(prefix="/problems", tags=["Problems"])

def generate_problem_code(db: Session) -> str:
    count = db.query(Problem).count() + 1
    random_suffix = random.randint(1000, 9999)
    return f"P-JH-2026-{count:04d}{random_suffix % 100:02d}"

@router.post("", response_model=ProblemOut)
def create_problem(
    req: ProblemCreate,
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    ai_service = get_ai_service()
    code = generate_problem_code(db)
    
    # 1. Create Problem Record
    problem = Problem(
        problem_code=code,
        title=req.title,
        description=req.description,
        category=req.category,
        subcategory=req.subcategory,
        district=req.district,
        block=req.block or "Bero",
        panchayat=req.panchayat or "Bero Central",
        village_or_landmark=req.village_or_landmark,
        latitude=req.latitude or 23.3441,
        longitude=req.longitude or 85.3096,
        affected_population=req.affected_population or 5000,
        media_urls=req.media_urls or [],
        voice_transcript=req.voice_transcript,
        is_qr_submitted=req.is_qr_submitted or False,
        qr_facility_code=req.qr_facility_code,
        status=ProblemStatus.SUBMITTED,
        created_by_id=current_user.id if current_user else None
    )
    db.add(problem)
    db.commit()
    db.refresh(problem)

    # 2. AI Problem DNA Synthesis
    dna_data = ai_service.generate_problem_dna({
        "title": req.title,
        "description": req.description,
        "category": req.category,
        "district": req.district
    })
    problem_dna = ProblemDNA(
        problem_id=problem.id,
        domain=dna_data.get("domain", "Environmental & Civil Engineering"),
        subdomain=dna_data.get("subdomain", "Water Quality"),
        severity_rating=dna_data.get("severity_rating", 8.5),
        urgency_rating=dna_data.get("urgency_rating", 9.0),
        complexity_level=dna_data.get("complexity_level", "High"),
        required_skills=dna_data.get("required_skills", []),
        required_domains=dna_data.get("required_domains", []),
        required_resources=dna_data.get("required_resources", []),
        potential_solution_types=dna_data.get("potential_solution_types", []),
        constraints=dna_data.get("constraints", []),
        dependencies=dna_data.get("dependencies", [])
    )
    db.add(problem_dna)

    # 3. Transparent Priority Engine Scoring
    priority_data = ai_service.calculate_priority_score(
        {"affected_population": problem.affected_population, "district": problem.district},
        dna_data
    )
    priority_score = PriorityScore(
        problem_id=problem.id,
        total_score=priority_data.get("total_score", 88.0),
        priority_level=PriorityLevel(priority_data.get("priority_level", "HIGH")),
        severity_factor=priority_data.get("severity_factor", 18.0),
        urgency_factor=priority_data.get("urgency_factor", 14.0),
        affected_population_factor=priority_data.get("affected_population_factor", 12.0),
        safety_risk_factor=priority_data.get("safety_risk_factor", 9.0),
        geographic_spread_factor=priority_data.get("geographic_spread_factor", 8.0),
        frequency_factor=priority_data.get("frequency_factor", 4.0),
        community_support_factor=priority_data.get("community_support_factor", 8.0),
        environmental_factor=priority_data.get("environmental_factor", 9.0),
        govt_priority_factor=priority_data.get("govt_priority_factor", 5.0),
        explanation=priority_data.get("explanation")
    )
    db.add(priority_score)
    db.commit()

    # 4. Duplicate Detection & Clustering
    existing = db.query(Problem).filter(Problem.id != problem.id).all()
    existing_dicts = [{"id": p.id, "problem_code": p.problem_code, "title": p.title, "description": p.description, "category": p.category, "district": p.district} for p in existing]
    dups = ai_service.detect_duplicates({"id": problem.id, "title": problem.title, "description": problem.description, "category": problem.category, "district": problem.district}, existing_dicts)
    
    for d in dups[:3]:
        sim = ProblemSimilarity(
            source_problem_id=problem.id,
            target_problem_id=d["problem_id"],
            similarity_percentage=d["similarity_percentage"],
            shared_keywords=d.get("shared_keywords", []),
            reason=d.get("reason", "Semantic keyword and geographic match.")
        )
        db.add(sim)
    db.commit()
    db.refresh(problem)

    record_audit(db, "PROBLEM_REPORTED", "PROBLEM", problem.problem_code, current_user, {"category": problem.category})
    return problem

@router.get("", response_model=List[ProblemOut])
def list_problems(
    district: Optional[str] = None,
    category: Optional[str] = None,
    status_filter: Optional[ProblemStatus] = Query(None, alias="status"),
    priority_level: Optional[PriorityLevel] = None,
    search: Optional[str] = None,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    query = db.query(Problem)
    if district and district != "All":
        query = query.filter(Problem.district == district)
    if category and category != "All":
        query = query.filter(Problem.category == category)
    if status_filter:
        query = query.filter(Problem.status == status_filter)
    if search:
        search_pattern = f"%{search}%"
        query = query.filter((Problem.title.ilike(search_pattern)) | (Problem.description.ilike(search_pattern)) | (Problem.problem_code.ilike(search_pattern)))
    
    problems = query.order_by(Problem.created_at.desc()).limit(limit).all()
    return problems

@router.get("/clusters")
def get_problem_clusters(db: Session = Depends(get_db)):
    clusters = db.query(ProblemCluster).all()
    return clusters

@router.get("/{problem_id_or_code}")
def get_problem_detail(problem_id_or_code: str, db: Session = Depends(get_db)):
    """Fetch complete interconnected Problem Graph: DNA, Priority, Similar, Solutions, Project, Impact."""
    if problem_id_or_code.isdigit():
        problem = db.query(Problem).filter(Problem.id == int(problem_id_or_code)).first()
    else:
        problem = db.query(Problem).filter(Problem.problem_code == problem_id_or_code).first()
        
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    # Fetch similar problems
    similars = db.query(ProblemSimilarity).filter(
        (ProblemSimilarity.source_problem_id == problem.id) | (ProblemSimilarity.target_problem_id == problem.id)
    ).all()
    
    similar_list = []
    for s in similars:
        other_id = s.target_problem_id if s.source_problem_id == problem.id else s.source_problem_id
        other_prob = db.query(Problem).filter(Problem.id == other_id).first()
        if other_prob:
            similar_list.append({
                "problem_id": other_prob.id,
                "problem_code": other_prob.problem_code,
                "title": other_prob.title,
                "district": other_prob.district,
                "similarity_percentage": s.similarity_percentage,
                "reason": s.reason
            })

    return {
        "problem": problem,
        "dna": problem.dna,
        "priority": problem.priority,
        "similar_problems": similar_list,
        "solutions": problem.solutions,
        "projects": problem.projects,
        "supporters_count": problem.support_count,
        "affected_count": problem.affected_count,
        "assignment_history": problem.assignment_history
    }

@router.post("/{problem_id}/support")
def support_problem(
    problem_id: int,
    req: ProblemSupportCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    support = ProblemSupport(
        problem_id=problem.id,
        user_id=current_user.id,
        is_directly_affected=req.is_directly_affected,
        comment=req.comment,
        evidence_media_url=req.evidence_media_url
    )
    db.add(support)
    problem.support_count += 1
    if req.is_directly_affected:
        problem.affected_count += 1
    db.commit()
    return {"message": "Support recorded successfully", "support_count": problem.support_count}

@router.post("/{problem_id}/verify")
def government_verify_problem(
    problem_id: int,
    req: GovernmentVerifyRequest,
    current_user: User = Depends(require_roles([UserRole.GOVT_OFFICER, UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    if req.action == "VERIFY":
        problem.status = ProblemStatus.VERIFIED
    elif req.action == "OPEN_FOR_SOLUTIONS":
        problem.status = ProblemStatus.OPEN_FOR_SOLUTIONS
    elif req.action == "REJECT":
        problem.status = ProblemStatus.REJECTED
    elif req.action == "REQUEST_CLARIFICATION":
        problem.status = ProblemStatus.UNDER_REVIEW

    problem.department_name = req.department_name or problem.department_name or "Dept. of Drinking Water & Sanitation"
    problem.government_remarks = req.remarks
    problem.sla_deadline = datetime.utcnow() + timedelta(days=req.sla_days or 30)

    assignment = GovernmentAssignment(
        problem_id=problem.id,
        assigned_by_id=current_user.id,
        assigned_officer_id=req.assigned_officer_id or current_user.id,
        department_name=problem.department_name,
        officer_name=current_user.full_name,
        officer_phone=current_user.phone or "+91-651-2400123",
        sla_days=req.sla_days or 30,
        action_notes=req.remarks or "Verified and designated high priority for SIH 2026 solution matching."
    )
    db.add(assignment)
    db.commit()
    db.refresh(problem)

    record_audit(db, f"GOVT_ACTION_{req.action}", "PROBLEM", problem.problem_code, current_user, {"dept": problem.department_name})
    return {"message": f"Problem status updated to {problem.status.value}", "problem": problem}
