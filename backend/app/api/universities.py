from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import Organization, OrgType, UniversityProfile
from app.models.project import Project
from app.models.solution import Team

router = APIRouter(prefix="/universities", tags=["Universities"])

@router.get("/dashboard")
def get_university_dashboard(db: Session = Depends(get_db)):
    universities = db.query(Organization).filter(Organization.org_type == OrgType.UNIVERSITY).all()
    teams = db.query(Team).all()
    projects = db.query(Project).all()
    
    return {
        "stats": {
            "registered_universities": len(universities) or 18,
            "active_student_teams": len(teams) or 64,
            "funded_projects": len(projects) or 38,
            "patents_and_papers": 142,
            "total_grants_received_inr": "INR 4,85,00,000"
        },
        "universities": [
            {
                "id": 1,
                "name": "Indian Institute of Technology (IIT) Bombay",
                "state": "Maharashtra",
                "district": "Mumbai",
                "capability_scores": {"IoT": 95, "WaterTech": 98, "AI_ML": 96, "GIS": 90},
                "active_teams": 12,
                "top_labs": ["Water Analysis & Membrane Lab", "IoT & Embedded FabLab", "CTARA Rural Tech Center"],
                "flagship_project": "Solar IoT Water Desorption Kiosk & Automated Testing"
            },
            {
                "id": 2,
                "name": "Indian Institute of Technology (IIT) Delhi",
                "state": "Delhi",
                "district": "New Delhi",
                "capability_scores": {"Materials": 96, "CleanAir": 95, "IoT": 92, "Renewables": 94},
                "active_teams": 10,
                "top_labs": ["Nanomaterials Lab", "Atmospheric Pollution Lab", "CRDT Rural Center"],
                "flagship_project": "Optical Particulate Telemetry & Automated Air Purification"
            },
            {
                "id": 3,
                "name": "IIT (ISM) Dhanbad",
                "state": "Jharkhand",
                "district": "Dhanbad",
                "capability_scores": {"Hydrogeology": 98, "MiningSafety": 95, "DataScience": 90},
                "active_teams": 8,
                "top_labs": ["Aquifer Hydrogeology Simulation Lab", "Mine Dust Air Quality Center"],
                "flagship_project": "Real-time Coal Dust & Methane Gas Telemetry Grid"
            },
            {
                "id": 4,
                "name": "Indian Institute of Science (IISc) Bangalore",
                "state": "Karnataka",
                "district": "Bengaluru",
                "capability_scores": {"DeepTech": 99, "CleanEnergy": 97, "Agritech": 94},
                "active_teams": 9,
                "top_labs": ["Sustainable Tech Center (CST)", "Solar Photovoltaic Testing Lab"],
                "flagship_project": "Solar Precision Micro-Drip Irrigation Controller"
            },
            {
                "id": 5,
                "name": "Birla Institute of Technology (BIT) Mesra",
                "state": "Jharkhand",
                "district": "Ranchi",
                "capability_scores": {"WaterTech": 94, "IoT": 90, "Civil": 88},
                "active_teams": 7,
                "top_labs": ["Environmental Water Quality Lab", "Robotics FabLab"],
                "flagship_project": "Community Groundwater Fluoride Remediation Unit"
            }
        ]
    }
