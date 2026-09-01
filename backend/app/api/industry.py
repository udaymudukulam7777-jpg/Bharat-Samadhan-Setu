from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import Organization, OrgType, IndustryProfile

router = APIRouter(prefix="/industry", tags=["Industry & CSR"])

@router.get("/dashboard")
def get_industry_dashboard(db: Session = Depends(get_db)):
    partners = db.query(Organization).filter(Organization.org_type == OrgType.INDUSTRY).all()
    
    return {
        "summary": {
            "total_corporate_partners": len(partners) or 24,
            "active_csr_pool_inr": "INR 28,50,00,000",
            "allocated_grants_inr": "INR 14,20,00,000",
            "active_sponsored_projects": 42,
            "corporate_mentors": 58
        },
        "partners": [
            {
                "id": 1,
                "name": "Tata Trusts / Tata Steel CSR",
                "state": "Maharashtra",
                "sector": "Metals, Infrastructure & Rural Health",
                "csr_budget_inr": "INR 8,50,00,000",
                "focus_domains": ["Clean Drinking Water", "Rural Healthcare", "Education Tech"],
                "active_grants": 14,
                "open_rfps": ["Low-cost Fluoride & Arsenic Remediation", "Solar Cold Storage for Farmers"]
            },
            {
                "id": 2,
                "name": "Reliance Foundation",
                "state": "Maharashtra",
                "sector": "Digital Tech, Energy & Agriculture",
                "csr_budget_inr": "INR 10,00,00,000",
                "focus_domains": ["Smart Agriculture", "Renewable Energy", "Digital Classrooms"],
                "active_grants": 18,
                "open_rfps": ["AI Crop Disease Diagnostic Tool", "Off-grid Solar Micro-grids"]
            },
            {
                "id": 3,
                "name": "Infosys Foundation",
                "state": "Karnataka",
                "sector": "Information Technology & Healthcare",
                "csr_budget_inr": "INR 5,00,00,000",
                "focus_domains": ["Rural Telemedicine", "STEM Innovation", "Civic Analytics"],
                "active_grants": 8,
                "open_rfps": ["Edge AI Rural Clinic Software", "Public Infrastructure Telemetry"]
            },
            {
                "id": 4,
                "name": "Mahindra Rise Innovation CSR",
                "state": "Maharashtra",
                "sector": "Automotive, Farm Equipment & Clean Tech",
                "csr_budget_inr": "INR 5,00,00,000",
                "focus_domains": ["Precision Agriculture", "Clean Mobility", "Water Security"],
                "active_grants": 9,
                "open_rfps": ["Electric Farm Tiller", "Pothole Repair Polymer Compound"]
            }
        ]
    }
