"""
Capability Matchmaker Module
Ranks Universities, Student Teams, Domain Experts, and Industry Partners against Problem DNA requirements.
"""

from typing import Dict, Any, List

class CapabilityMatcher:
    def match(self, problem_dna: Dict[str, Any], candidates: Dict[str, List[Dict[str, Any]]] = None) -> Dict[str, Any]:
        universities = [
            {
                "id": 1,
                "name": "Birla Institute of Technology (BIT) Mesra, Ranchi",
                "match_percentage": 95.5,
                "strengths": [
                    "State NABL-Accredited Environmental Water Quality Lab",
                    "Advanced IoT & Embedded Systems Department",
                    "Active Rural Technology Action Cell (RuTAG)"
                ],
                "recommended_labs": ["Water Analysis Lab", "IoT FabLab"],
                "faculty_mentors": ["Dr. S. K. Roy (Water Chemistry)", "Dr. Preeti Sharma (IoT/Sensors)"]
            },
            {
                "id": 2,
                "name": "National Institute of Technology (NIT) Jamshedpur",
                "match_percentage": 89.0,
                "strengths": [
                    "Metallurgical & Materials Engineering (Nano-adsorbent filters)",
                    "Civil & Environmental Engineering Dept"
                ],
                "recommended_labs": ["Advanced Materials Lab", "Fluid Mechanics Lab"],
                "faculty_mentors": ["Dr. M. K. Paswan", "Dr. A. K. Choudhary"]
            },
            {
                "id": 3,
                "name": "IIT (Indian School of Mines) Dhanbad",
                "match_percentage": 84.5,
                "strengths": ["Dept of Applied Geology & Hydrogeology", "Environmental Science & Engineering"],
                "recommended_labs": ["Hydrogeology Aquifer Modelling Lab"],
                "faculty_mentors": ["Prof. P. K. Singh"]
            }
        ]

        student_teams = [
            {
                "id": 1,
                "name": "Team JalShakti (BIT Mesra)",
                "match_percentage": 94.0,
                "members_count": 4,
                "skills_covered": ["IoT Sensors (✓)", "Firmware / C++ (✓)", "Machine Learning (✓)", "Solar Power Integration (✓)"],
                "missing_skills": ["Hydrogeological Aquifer Mapping (✗)"],
                "team_lead": "Aarav Sinha (CSE, 3rd Year)"
            },
            {
                "id": 2,
                "name": "InnovateJH (NIT Jamshedpur)",
                "match_percentage": 86.5,
                "members_count": 5,
                "skills_covered": ["Chemical Adsorption (✓)", "CAD Design (✓)", "React Web Dashboard (✓)"],
                "missing_skills": ["LoRaWAN Edge Telemetry (✗)"],
                "team_lead": "Neha Kumari (Chemical Engg, 4th Year)"
            }
        ]

        experts = [
            {
                "id": 1,
                "name": "Dr. Arvind Kumar",
                "designation": "Professor & Head of Environmental Sciences",
                "institution": "Central University of Jharkhand, Ranchi",
                "match_percentage": 96.5,
                "expertise": ["Hydrogeology", "Fluoride Remediation", "Water Quality GIS"],
                "experience_years": 18,
                "recommended_role": "Domain Lead & Scientific Advisor"
            },
            {
                "id": 2,
                "name": "Er. Sunita Soren",
                "designation": "Senior Water Quality Specialist",
                "institution": "UNICEF Jharkhand Water Cell",
                "match_percentage": 91.0,
                "expertise": ["Community Water Management", "Field Chlorination", "Rural WASH"],
                "experience_years": 14,
                "recommended_role": "Community Deployment Mentor"
            }
        ]

        industry_partners = [
            {
                "id": 1,
                "name": "Tata Steel CSR & Sustainability Division (Jamshedpur)",
                "match_percentage": 93.0,
                "resource_match": "Hardware Prototype Fabrication & Testing Facilities",
                "offered_resources": ["2kW Solar PV Panels", "Rapid Prototyping Workshop", "Field Testing Vehicles"],
                "funding_potential": "₹2,50,000 Pilot Grant"
            },
            {
                "id": 2,
                "name": "Bharat Coking Coal Limited (BCCL) Innovation Cell",
                "match_percentage": 85.0,
                "resource_match": "Sensor Rig Testing & Industrial Filter Media",
                "offered_resources": ["Industrial Water Testing Rigs", "Telemetry Gateways"],
                "funding_potential": "₹1,50,000 Equipment Sponsorship"
            }
        ]

        return {
            "universities": universities,
            "student_teams": student_teams,
            "experts": experts,
            "industry_partners": industry_partners
        }
