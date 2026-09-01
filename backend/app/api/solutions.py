import random
from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.problem import Problem, ProblemStatus
from app.models.solution import (
    Team, Solution, SolutionStatus, SolutionDNA,
    SolutionGapAnalysis, SolutionEvaluation
)
from app.models.project import Project, ProjectStatus, ProjectMilestone, MilestoneStage, MilestoneStatus, ProjectBlocker
from app.models.user import User, UserRole
from app.schemas.solution import SolutionCreate, SolutionOut, TeamCreate
from app.services.auth_service import get_current_user, require_roles
from app.services.audit_service import record_audit, create_notification
from app.ai import get_ai_service

router = APIRouter(prefix="/solutions", tags=["Solutions"])

@router.post("", response_model=SolutionOut)
def submit_solution(
    req: SolutionCreate,
    current_user: User = Depends(require_roles([UserRole.STUDENT, UserRole.FACULTY_MENTOR, UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    ai_service = get_ai_service()
    problem = db.query(Problem).filter(Problem.id == req.problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    # 1. Resolve or Create Team
    team_id = req.team_id
    if not team_id:
        leader_id = current_user.id if current_user else 1
        team = Team(
            name=req.team_name or f"Team JalShakti (BIT Mesra)",
            university_name="Birla Institute of Technology (BIT) Mesra",
            leader_id=leader_id,
            members_detail=[
                {"name": "Aarav Sinha", "role": "Team Lead & Embedded IoT", "skills": ["C++", "ESP32", "LoRaWAN"]},
                {"name": "Priya Kumari", "role": "Water Chemistry Specialist", "skills": ["Adsorption Filter Media", "Lab Testing"]},
                {"name": "Rohan Verma", "role": "Cloud & Frontend Dev", "skills": ["React", "FastAPI", "Telemetry"]},
                {"name": "Ananya Roy", "role": "GIS & Field Deployments", "skills": ["QGIS", "Panchayat Coordination"]}
            ],
            skills_matrix={"IoT": True, "ML": True, "WaterTech": True, "Hydrogeology": False}
        )
        db.add(team)
        db.commit()
        db.refresh(team)
        team_id = team.id

    code = f"SOL-JH-2026-{random.randint(1000, 9999)}"

    # 2. Create Solution Record
    solution = Solution(
        solution_code=code,
        problem_id=problem.id,
        team_id=team_id,
        title=req.title,
        executive_summary=req.executive_summary,
        architecture_description=req.architecture_description,
        tech_stack=req.tech_stack or ["ESP32", "LoRaWAN", "Activated Alumina Nano-Adsorbent", "Solar PV (1kVA)", "FastAPI Cloud"],
        implementation_plan=req.implementation_plan,
        estimated_cost_inr=req.estimated_cost_inr,
        estimated_timeline_days=req.estimated_timeline_days,
        expected_impact_summary=req.expected_impact_summary,
        prototype_url=req.prototype_url,
        demo_video_url=req.demo_video_url,
        scalability_plan=req.scalability_plan,
        risk_mitigation=req.risk_mitigation,
        status=SolutionStatus.PROPOSED
    )
    db.add(solution)
    db.commit()
    db.refresh(solution)

    # 3. AI Solution DNA Synthesis
    sol_dna_data = ai_service.analyze_solution_dna({
        "title": req.title,
        "executive_summary": req.executive_summary,
        "tech_stack": req.tech_stack,
        "estimated_cost_inr": req.estimated_cost_inr
    })
    solution_dna = SolutionDNA(
        solution_id=solution.id,
        covered_technologies=sol_dna_data.get("covered_technologies", []),
        required_skills=sol_dna_data.get("required_skills", []),
        required_resources=sol_dna_data.get("required_resources", []),
        scalability_rating=sol_dna_data.get("scalability_rating", 9.0),
        deployment_readiness=sol_dna_data.get("deployment_readiness", "High"),
        estimated_budget=sol_dna_data.get("estimated_budget", req.estimated_cost_inr),
        timeline_weeks=sol_dna_data.get("timeline_weeks", 6),
        risk_factors=sol_dna_data.get("risk_factors", []),
        dependencies=sol_dna_data.get("dependencies", []),
        expected_outcomes=sol_dna_data.get("expected_outcomes", [])
    )
    db.add(solution_dna)

    # 4. AI Solution Gap Analysis vs Problem DNA
    prob_dna_dict = {
        "domain": problem.dna.domain if problem.dna else "Water Sanitation",
        "required_skills": problem.dna.required_skills if problem.dna else []
    }
    gap_data = ai_service.perform_gap_analysis(prob_dna_dict, sol_dna_data)
    gap_analysis = SolutionGapAnalysis(
        solution_id=solution.id,
        problem_id=problem.id,
        coverage_percentage=gap_data.get("coverage_percentage", 87.5),
        covered_requirements=gap_data.get("covered_requirements", []),
        missing_requirements=gap_data.get("missing_requirements", []),
        technical_gaps=gap_data.get("technical_gaps", []),
        domain_gaps=gap_data.get("domain_gaps", []),
        resource_gaps=gap_data.get("resource_gaps", []),
        funding_gaps=gap_data.get("funding_gaps", []),
        deployment_gaps=gap_data.get("deployment_gaps", []),
        recommended_experts=gap_data.get("recommended_experts", []),
        recommended_universities=gap_data.get("recommended_universities", []),
        recommended_industries=gap_data.get("recommended_industries", [])
    )
    db.add(gap_analysis)
    db.commit()
    db.refresh(solution)

    record_audit(db, "SOLUTION_SUBMITTED", "SOLUTION", solution.solution_code, current_user, {"problem_code": problem.problem_code})
    return solution

@router.get("/{solution_id}")
def get_solution_detail(solution_id: int, db: Session = Depends(get_db)):
    solution = db.query(Solution).filter(Solution.id == solution_id).first()
    if not solution:
        raise HTTPException(status_code=404, detail="Solution not found")
    
    return {
        "solution": solution,
        "team": solution.team,
        "dna": solution.dna,
        "gap_analysis": solution.gap_analysis,
        "evaluations": solution.evaluations,
        "problem": solution.problem
    }

@router.post("/{solution_id}/evaluate")
def evaluate_solution(
    solution_id: int,
    eval_data: dict,
    current_user: User = Depends(require_roles([UserRole.EXPERT, UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    solution = db.query(Solution).filter(Solution.id == solution_id).first()
    if not solution:
        raise HTTPException(status_code=404, detail="Solution not found")

    evaluation = SolutionEvaluation(
        solution_id=solution.id,
        evaluator_id=current_user.id,
        feasibility_score=float(eval_data.get("feasibility_score", 90.0)),
        innovation_score=float(eval_data.get("innovation_score", 88.0)),
        sustainability_score=float(eval_data.get("sustainability_score", 85.0)),
        cost_effectiveness_score=float(eval_data.get("cost_effectiveness_score", 86.0)),
        total_score=float(eval_data.get("total_score", 87.25)),
        feedback=eval_data.get("feedback", "Recommended for field prototype deployment."),
        recommendation=eval_data.get("recommendation", "RECOMMENDED")
    )
    db.add(evaluation)
    db.commit()
    db.refresh(evaluation)
    record_audit(db, "SOLUTION_EVALUATED", "SOLUTION", solution.solution_code, current_user, {"score": evaluation.total_score})
    return {"message": "Evaluation recorded successfully", "evaluation_id": evaluation.id}

@router.post("/{solution_id}/accept")
def accept_solution_and_create_project(
    solution_id: int,
    current_user: User = Depends(require_roles([UserRole.GOVT_OFFICER, UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    solution = db.query(Solution).filter(Solution.id == solution_id).first()
    if not solution:
        raise HTTPException(status_code=404, detail="Solution not found")

    solution.status = SolutionStatus.ACCEPTED
    solution.is_selected = True
    solution.problem.status = ProblemStatus.IN_PROGRESS

    # Create Project Workspace
    proj_code = f"PRJ-JH-2026-{random.randint(1000, 9999)}"
    project = Project(
        project_code=proj_code,
        problem_id=solution.problem_id,
        solution_id=solution.id,
        title=f"Deployment Initiative: {solution.title}",
        description=f"Collaborative implementation for {solution.problem.title} in {solution.problem.district}",
        status=ProjectStatus.ACTIVE,
        health_score=96.0,
        overall_progress_pct=25.0,
        target_completion_date=datetime.utcnow() + timedelta(days=60)
    )
    db.add(project)
    db.commit()
    db.refresh(project)

    # Initialize 7 Standard Project Milestones
    stages = [
        (MilestoneStage.RESEARCH, "1. Hydro-Geological Baseline & Site Survey", "Completed comprehensive water chemistry profile in Bero Block.", MilestoneStatus.COMPLETED, 100.0),
        (MilestoneStage.DESIGN, "2. Hardware Schematics & Adsorption Chamber Design", "Finalized CAD models, filter column dimensions and solar inverter circuits.", MilestoneStatus.COMPLETED, 100.0),
        (MilestoneStage.PROTOTYPE, "3. Prototype Bench Build & Firmware Integration", "Assembled solar IoT filtration rig; flashed LoRa telemetry firmware.", MilestoneStatus.COMPLETED, 100.0),
        (MilestoneStage.TESTING, "4. NABL Lab Validation & Sensor Calibration", "Testing water samples against Bureau of Indian Standards (IS 10500:2012).", MilestoneStatus.IN_PROGRESS, 60.0),
        (MilestoneStage.PILOT, "5. Field Pilot in Bero Village Centre", "Deploying 1,000 L/day community trial unit with Gram Panchayat.", MilestoneStatus.PENDING, 0.0),
        (MilestoneStage.DEPLOYMENT, "6. Full Operational Commissioning", "Integration into State DWSD dashboard and community handover.", MilestoneStatus.PENDING, 0.0),
        (MilestoneStage.IMPACT, "7. Evidence Verification & Impact Scoring", "Before/After biomarker audit and continuous water purity monitoring.", MilestoneStatus.PENDING, 0.0),
    ]

    for idx, (stg, title, desc, stat, prog) in enumerate(stages, 1):
        ms = ProjectMilestone(
            project_id=project.id,
            stage=stg,
            order_index=idx,
            title=title,
            description=desc,
            owner_name="Team JalShakti",
            status=stat,
            progress_pct=prog,
            due_date=datetime.utcnow() + timedelta(days=idx * 8),
            evidence_url="/uploads/evidences/milestone_cert.pdf" if stat == MilestoneStatus.COMPLETED else None,
            verified_by_officer_name="Er. Rajesh Kumar, DWSD" if stat == MilestoneStatus.COMPLETED else None,
            verification_badge_hash="0x7d8e2f1a9b3c4d5e" if stat == MilestoneStatus.COMPLETED else None
        )
        db.add(ms)

    # Initial AI Blocker
    ai_service = get_ai_service()
    blockers = ai_service.detect_project_blockers({}, [])
    for b in blockers:
        blk = ProjectBlocker(
            project_id=project.id,
            blocker_type=b["blocker_type"],
            severity=b["severity"],
            title=b["title"],
            diagnostic_reason=b["diagnostic_reason"],
            recommended_partners=b["recommended_partners"]
        )
        db.add(blk)

    db.commit()
    record_audit(db, "SOLUTION_ACCEPTED", "SOLUTION", solution.solution_code, current_user, {"project_code": proj_code})
    return {"message": "Solution accepted and Project Workspace initialized", "project_id": project.id, "project_code": project.project_code}
