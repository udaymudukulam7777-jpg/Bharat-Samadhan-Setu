from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.problem import Problem
from app.ai import get_ai_service

router = APIRouter(prefix="/matching", tags=["Matching Engine"])

@router.get("/{problem_id_or_code}")
def get_capability_matches(problem_id_or_code: str, db: Session = Depends(get_db)):
    if problem_id_or_code.isdigit():
        problem = db.query(Problem).filter(Problem.id == int(problem_id_or_code)).first()
    else:
        problem = db.query(Problem).filter(Problem.problem_code == problem_id_or_code).first()

    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    ai_service = get_ai_service()
    dna_dict = {
        "domain": problem.dna.domain if problem.dna else "Environmental Engineering",
        "required_skills": problem.dna.required_skills if problem.dna else ["IoT", "Water Filtration"],
        "category": problem.category,
        "district": problem.district
    }

    matches = ai_service.match_capabilities(dna_dict, {})
    return {
        "problem_id": problem.id,
        "problem_code": problem.problem_code,
        "title": problem.title,
        "district": problem.district,
        "matches": matches
    }

@router.post("/{problem_id}/re-match")
def dynamic_rematch(problem_id: int, db: Session = Depends(get_db)):
    """Re-runs dynamic matching when project scope changes."""
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    ai_service = get_ai_service()
    dna_dict = {
        "domain": problem.dna.domain if problem.dna else "Environmental Engineering",
        "required_skills": problem.dna.required_skills if problem.dna else ["IoT", "Water Filtration"],
        "category": problem.category,
        "district": problem.district
    }
    matches = ai_service.match_capabilities(dna_dict, {})
    return {"message": "Matching recalculation complete", "matches": matches}
