import re
from typing import Dict, Any, List
from app.ai.base import AIServiceInterface

class MockAIService(AIServiceInterface):
    def analyze_problem(self, title: str, description: str, category: str, district: str) -> Dict[str, Any]:
        text = f"{title} {description}".lower()
        
        # Domain & Subdomain inference
        if any(w in text for w in ["water", "fluoride", "arsenic", "handpump", "drinking", "paani", "contamination", "jal"]):
            cat = "Water & Sanitation"
            subcat = "Groundwater Quality & Aquifer Safety"
            urgency = 9.2
            severity = 9.5
            skills = ["IoT Water Sensors", "Chemical Filtration", "GIS Hydrology", "Embedded Systems", "Public Health"]
            domains = ["Environmental Engineering", "Hydro-geology", "IoT & Telemetry"]
            stakeholders = ["Ministry of Jal Shakti", "District Administration", "Public Health Department"]
            sol_types = ["Solar Powered Filtration Kiosk", "IoT Water Quality Monitor", "Mobile Testing Rig"]
            complexity = "High"
        elif any(w in text for w in ["road", "bridge", "pothole", "highway", "traffic", "culvert"]):
            cat = "Road & Infrastructure"
            subcat = "National & Rural Road Connectivity"
            urgency = 7.5
            severity = 8.0
            skills = ["Computer Vision Pothole Detection", "Civil Engineering", "GIS Mapping", "Smart Materials"]
            domains = ["Civil & Structural", "GIS", "Computer Vision"]
            stakeholders = ["Ministry of Road Transport & Highways", "State PWD", "Rural Development Dept"]
            sol_types = ["Eco-friendly Bitumen", "Automated Road Defect Scanner"]
            complexity = "Medium"
        elif any(w in text for w in ["crop", "irrigation", "soil", "pest", "farmer", "farming", "agriculture"]):
            cat = "Agriculture"
            subcat = "Smart Irrigation & Soil Health"
            urgency = 8.0
            severity = 8.5
            skills = ["Soil Moisture Telemetry", "Drone Crop Health Analysis", "Edge AI", "Solar Pumps"]
            domains = ["Agritech", "Embedded Systems", "Data Science"]
            stakeholders = ["Ministry of Agriculture & Farmers Welfare", "ICAR Research Institutes", "Local FPOs"]
            sol_types = ["Solar Micro-Drip Controller", "Soil NPK Optical Scanner"]
            complexity = "Medium"
        else:
            cat = category or "Public Infrastructure"
            subcat = "Civic Amenities & Safety"
            urgency = 7.0
            severity = 7.5
            skills = ["Data Analytics", "Mobile App Development", "IoT Telemetry"]
            domains = ["Civic Tech", "Urban Planning"]
            stakeholders = ["Municipal Corporation", "District Administration"]
            sol_types = ["Civic Monitoring Platform", "Smart Sensor Grid"]
            complexity = "Medium"

        return {
            "title": title,
            "category": cat,
            "subcategory": subcat,
            "district": district,
            "severity": severity,
            "urgency": urgency,
            "affectedPopulationEstimate": 12500 if "water" in text else 3500,
            "keywords": ["Groundwater", "Heavy Metal", "Health Hazard", "National Water Grid", district],
            "requiredSkills": skills,
            "requiredDomains": domains,
            "stakeholders": stakeholders,
            "estimatedComplexity": complexity,
            "potentialSolutionTypes": sol_types
        }

    def generate_problem_dna(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
        analysis = self.analyze_problem(
            problem_data.get("title", ""),
            problem_data.get("description", ""),
            problem_data.get("category", ""),
            problem_data.get("district", "Mumbai")
        )
        
        return {
            "domain": analysis["requiredDomains"][0] if analysis["requiredDomains"] else "Civil & Environmental",
            "subdomain": analysis["subcategory"],
            "severity_rating": analysis["severity"],
            "urgency_rating": analysis["urgency"],
            "complexity_level": analysis["estimatedComplexity"],
            "required_skills": analysis["requiredSkills"],
            "required_domains": analysis["requiredDomains"],
            "required_resources": [
                "NABL Certified Water Testing Rig",
                "Activated Alumina / Nano-Adsorbent Media",
                "Solar PV Arrays (2kW)",
                "LoRaWAN Gateways"
            ],
            "potential_solution_types": analysis["potentialSolutionTypes"],
            "constraints": [
                "Intermittent rural grid power supply",
                "High monsoon moisture and environmental wear",
                "Community digital accessibility requirements",
                "Low-latency offline telemetry caching"
            ],
            "dependencies": [
                "Local Civic Authority & District Administration NOC",
                "Ministry of Jal Shakti / State Water Lab Certification",
                "National Groundwater Directorate Aquifer Data"
            ]
        }

    def calculate_priority_score(self, problem_data: Dict[str, Any], dna_data: Dict[str, Any]) -> Dict[str, Any]:
        severity = dna_data.get("severity_rating", 8.5) * 2.0 # max 20
        urgency = dna_data.get("urgency_rating", 9.0) * 1.66 # max 15
        pop = min(15.0, (problem_data.get("affected_population", 12500) / 1000.0) * 1.2) # max 15
        safety_risk = 9.5 # out of 10
        geographic_spread = 8.5 # out of 10
        frequency = 4.5 # out of 5
        community_support = 9.0 # out of 10
        environmental_impact = 9.2 # out of 10
        govt_priority = 4.8 # out of 5
        
        total = round(severity + urgency + pop + safety_risk + geographic_spread + frequency + community_support + environmental_impact + govt_priority, 1)
        total = min(99.4, max(45.0, total))
        
        level = "CRITICAL" if total >= 85 else "HIGH" if total >= 70 else "MEDIUM" if total >= 50 else "LOW"
        
        explanation = (
            f"Calculated Priority Score of {total}/100 ({level}) driven by critical groundwater toxicity "
            f"(Severity: {round(severity,1)}/20, Health Risk: {safety_risk}/10) affecting over "
            f"{problem_data.get('affected_population', 12500):,} citizens in {problem_data.get('district', 'Mumbai')} district."
        )

        return {
            "total_score": total,
            "priority_level": level,
            "severity_factor": round(severity, 1),
            "urgency_factor": round(urgency, 1),
            "affected_population_factor": round(pop, 1),
            "safety_risk_factor": safety_risk,
            "geographic_spread_factor": geographic_spread,
            "frequency_factor": frequency,
            "community_support_factor": community_support,
            "environmental_factor": environmental_impact,
            "govt_priority_factor": govt_priority,
            "explanation": explanation
        }

    def detect_duplicates(self, new_problem: Dict[str, Any], existing_problems: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        results = []
        new_text = f"{new_problem.get('title','')} {new_problem.get('description','')}".lower()
        
        for ep in existing_problems:
            if ep.get("id") == new_problem.get("id"):
                continue
            ep_text = f"{ep.get('title','')} {ep.get('description','')}".lower()
            
            score = 0.0
            shared = []
            if ("water" in new_text or "fluoride" in new_text) and ("water" in ep_text or "fluoride" in ep_text or "handpump" in ep_text):
                score = 88.5
                shared = ["Groundwater Contamination", "Fluoride", "Drinking Water Supply", "Aquifer Health"]
                reason = "88.5% semantic similarity with existing registered aquifer contamination report in adjacent block."
            elif ep.get("district") == new_problem.get("district") and ep.get("category") == new_problem.get("category"):
                score = 72.0
                shared = [ep.get("category"), ep.get("district")]
                reason = "72% similarity: Matching category and geographic district."
            
            if score >= 60.0:
                results.append({
                    "problem_id": ep.get("id"),
                    "problem_code": ep.get("problem_code", "P-IND-2026-000381"),
                    "title": ep.get("title"),
                    "similarity_percentage": score,
                    "shared_keywords": shared,
                    "reason": reason
                })
        return sorted(results, key=lambda x: x["similarity_percentage"], reverse=True)

    def match_capabilities(self, problem_dna: Dict[str, Any], candidates: Dict[str, List[Dict[str, Any]]]) -> Dict[str, Any]:
        # Premier National Institutes across India
        universities = [
            {
                "id": 1,
                "name": "Indian Institute of Technology (IIT) Bombay",
                "state": "Maharashtra",
                "match_percentage": 96.5,
                "strengths": [
                    "National NABL-Accredited Environmental Water Quality Lab",
                    "Center for Technology Alternatives for Rural Areas (CTARA)",
                    "Advanced IoT & Embedded Systems FabLab"
                ],
                "recommended_labs": ["Water Analysis & Filtration Lab", "Sensors & Actuators FabLab"],
                "faculty_mentors": ["Prof. A. S. Moharir (Chemical Engg)", "Prof. Preeti Rao (IoT/Embedded)"]
            },
            {
                "id": 2,
                "name": "Indian Institute of Technology (IIT) Delhi",
                "state": "Delhi",
                "match_percentage": 93.0,
                "strengths": [
                    "Rural Development & Technology Center (CRDT)",
                    "Advanced Membrane Filtration & Nanotechnology Lab"
                ],
                "recommended_labs": ["Nanomaterials Lab", "Environmental Fluid Mechanics Lab"],
                "faculty_mentors": ["Prof. V. K. Vijay", "Prof. Anushree Malik"]
            },
            {
                "id": 3,
                "name": "IIT (Indian School of Mines) Dhanbad",
                "state": "Jharkhand",
                "match_percentage": 88.5,
                "strengths": ["Dept of Applied Geology & Hydrogeology", "Environmental Science & Engineering"],
                "recommended_labs": ["Hydrogeology Aquifer Modelling Lab"],
                "faculty_mentors": ["Prof. P. K. Singh"]
            },
            {
                "id": 4,
                "name": "Indian Institute of Science (IISc) Bangalore",
                "state": "Karnataka",
                "match_percentage": 87.0,
                "strengths": ["Center for Sustainable Technologies", "Atmospheric & Oceanic Sciences"],
                "recommended_labs": ["Water Research Facility", "Solar Energy Lab"],
                "faculty_mentors": ["Prof. M. S. Mohan Kumar"]
            }
        ]

        # Student teams
        student_teams = [
            {
                "id": 1,
                "name": "Team JalSuraksha (IIT Bombay)",
                "match_percentage": 95.0,
                "members_count": 4,
                "skills_covered": ["IoT Sensors (✓)", "Firmware / C++ (✓)", "Machine Learning (✓)", "Solar Power Integration (✓)"],
                "missing_skills": ["Hydrogeological Aquifer Mapping (✗)"],
                "team_lead": "Aarav Sharma (Electrical Engg, 4th Year)"
            },
            {
                "id": 2,
                "name": "EcoInnovators (IIT Delhi)",
                "match_percentage": 89.5,
                "members_count": 5,
                "skills_covered": ["Chemical Adsorption (✓)", "CAD Design (✓)", "React Web Dashboard (✓)"],
                "missing_skills": ["LoRaWAN Edge Telemetry (✗)"],
                "team_lead": "Pooja Deshmukh (Chemical Engg, 4th Year)"
            }
        ]

        # Domain Experts
        experts = [
            {
                "id": 1,
                "name": "Dr. Arvind Kumar",
                "designation": "Professor & Head of Environmental Sciences",
                "institution": "CSIR-NEERI (National Environmental Engineering Research Institute)",
                "match_percentage": 97.0,
                "expertise": ["Hydrogeology", "Fluoride Remediation", "Water Quality GIS"],
                "experience_years": 20,
                "recommended_role": "Lead Scientific Advisor"
            },
            {
                "id": 2,
                "name": "Er. Sunita Menon",
                "designation": "Senior Water Quality Specialist",
                "institution": "National Water Development Agency",
                "match_percentage": 92.5,
                "expertise": ["Community Water Management", "Field Chlorination", "Rural WASH"],
                "experience_years": 15,
                "recommended_role": "Field Deployment Advisor"
            }
        ]

        # National CSR Innovation Funds
        industry_partners = [
            {
                "id": 1,
                "name": "Tata Trusts / Tata Steel CSR Foundation",
                "match_percentage": 96.0,
                "csr_focus": ["Rural Clean Drinking Water", "Public Health", "Indigenous Tribal Empowerment"],
                "offered_resources": ["INR 25,00,000 Hardware Seed Grant", "Field Test Equipment", "Tata Community Center Deployment"],
                "grant_window": "Open for SIH 2026 Innovation Scale-ups"
            },
            {
                "id": 2,
                "name": "Reliance Foundation",
                "match_percentage": 91.5,
                "csr_focus": ["Smart Water & Agriculture", "Rural Health", "Digital Empowerment"],
                "offered_resources": ["Jio IoT Cloud Compute Credits", "Solar Power Battery Packs", "INR 18,00,000 Scaling Grant"],
                "grant_window": "Active FY2026-27 Pool"
            },
            {
                "id": 3,
                "name": "Infosys Foundation",
                "match_percentage": 88.0,
                "csr_focus": ["Digital Education", "Rural Healthcare", "Clean Water"],
                "offered_resources": ["Cloud Platform Sponsorship", "IoT Sensor Dev Kits"],
                "grant_window": "Rolling National Grant"
            }
        ]

        return {
            "universities": universities,
            "student_teams": student_teams,
            "experts": experts,
            "industry_partners": industry_partners
        }

    def perform_gap_analysis(self, problem_dna: Dict[str, Any], solution_proposal: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "coverage_percentage": 88.0,
            "covered_requirements": [
                "High-capacity fluoride reduction (0.4 mg/L achieved vs 4.8 mg/L baseline)",
                "Solar DC off-grid micro-power system (24/7 continuous operation)",
                "Local sensor telemetry node (pH, Turbidity, Fluoride ISE)",
                "Open telemetry cloud dashboard for Public Health Engineers"
            ],
            "missing_requirements": [
                "Autonomous backwash flushing valve automation (Currently manual)",
                "NABL calibration certificate documentation before community commissioning"
            ],
            "technical_gaps": [
                "LoRaWAN long-range antenna range testing under heavy forest canopy"
            ],
            "domain_gaps": [
                "Field toxicologist sign-off on disposal of spent media filter sludge"
            ],
            "resource_gaps": [
                "Secondary 48V Lithium-Iron-Phosphate (LiFePO4) Battery Pack for monsoon backup"
            ],
            "funding_gaps": [
                "INR 45,000 estimated shortfall for pilot housing enclosure and weatherproofing"
            ],
            "deployment_gaps": [
                "Panchayat community water committee maintenance training curriculum"
            ],
            "recommended_experts": [
                {
                    "name": "Dr. Arvind Kumar (CSIR-NEERI)",
                    "gap_addressed": "Sludge disposal protocol & NABL validation",
                    "role": "Scientific Advisor"
                }
            ],
            "recommended_universities": [
                {
                    "name": "IIT Bombay Environmental Engineering Lab",
                    "gap_addressed": "Membrane longevity testing & accelerated wear trials"
                }
            ],
            "recommended_industries": [
                {
                    "name": "Tata Trusts CSR Innovation Cell",
                    "gap_addressed": "INR 45,000 gap-funding grant & enclosure fabrication"
                }
            ]
        }

    def detect_project_blockers(self, project_data: Dict[str, Any], milestones: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        return [
            {
                "id": 1,
                "stage_number": 3,
                "blocker_type": "TESTING_LAB_CALIBRATION",
                "title": "Awaiting NABL Ion-Selective Electrode Calibration Report",
                "description": "Prototype hardware assembly completed, but calibration against certified fluoride standards is pending lab slot availability.",
                "severity": "HIGH",
                "status": "ACTIVE",
                "recommended_action": "Request prioritized express testing slot through India Samadhan Setu R&D network.",
                "ai_suggested_fix": "System matched open test slot at IIT Bombay Water Quality Lab (Slot ID: WQL-IITB-2026-04). 1-click dispatch available.",
                "recommended_partners": [
                    {
                        "partner_name": "IIT Bombay Environmental Testing Lab",
                        "partner_type": "UNIVERSITY",
                        "contact_person": "Lab Superintendent (lab@iitb.ac.in)",
                        "eta_resolution_days": 3
                    }
                ]
            }
        ]

    def analyze_solution_dna(self, solution_data: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "covered_technologies": solution_data.get("tech_stack", ["IoT", "Chemical Adsorption", "Solar DC"]),
            "required_skills": ["Chemical Adsorption", "Solar DC Sizing", "Embedded Firmware", "Cloud Analytics"],
            "required_resources": ["NABL Certified Testing Rig", "Activated Alumina Media", "Solar Charge Controllers"],
            "scalability_rating": 9.4,
            "deployment_readiness": "Production-Ready (TRL-8)",
            "estimated_budget": solution_data.get("estimated_cost_inr", 145000.0),
            "timeline_weeks": 6,
            "risk_factors": ["Spent media sludge disposal protocol", "Monsoon cloud cover reducing solar yield"],
            "dependencies": ["Panchayat water kiosk space", "NABL lab validation sign-off"],
            "expected_outcomes": ["91.6% fluoride reduction", "4,500 Liters safe drinking water daily", "Zero recurring grid power cost"]
        }

    def calculate_impact_score(self, deployment_data: Dict[str, Any], metrics: List[Dict[str, Any]]) -> Dict[str, Any]:
        return {
            "total_score": 94.5,
            "reach_score": 24.5,
            "outcome_improvement_score": 24.0,
            "adoption_score": 19.0,
            "sustainability_score": 14.5,
            "problem_severity_score": 12.5,
            "explanation": "High impact achieved across 12,500 residents with 91.6% biomarker reduction and 100% solar uptime."
        }

    def generate_chatbot_response(self, message: str, context: Dict[str, Any]) -> Dict[str, Any]:
        msg = message.lower()
        if "problem" in msg or "report" in msg or "water" in msg:
            reply = "I can assist you with diagnosing and registering civic problems across India. You can submit water quality issues, road potholes, healthcare shortages, and agricultural challenges with automated 9-factor Priority Scoring."
            chips = ["Diagnose Groundwater Fluoride", "Report Road Pothole", "Request CSR Grant", "Find IIT Testing Lab"]
        elif "lab" in msg or "iit" in msg or "university" in msg:
            reply = "India Samadhan Setu is connected with premier national institutes including IIT Bombay, IIT Delhi, IIT ISM Dhanbad, and IISc Bangalore for NABL testing, prototype incubation, and student mentorship."
            chips = ["View IIT Bombay Water Lab", "Book NABL Testing Slot", "Match Student Team"]
        elif "csr" in msg or "grant" in msg or "funding" in msg:
            reply = "We have an active CSR innovation pool of INR 28.5+ Crores from Tata Trusts, Reliance Foundation, Infosys Foundation, and Mahindra Rise for funding verified civic prototypes."
            chips = ["Apply for Tata Trusts Grant", "View Reliance Foundation RFP", "Explore Hardware Seed Grants"]
        else:
            reply = "Welcome to India Samadhan Setu AI Copilot. I can help you report grassroots civic issues, explore active national problem statements, discover IIT/NIT research labs, and apply for CSR innovation funding."
            chips = ["Browse National Problems", "Report a Civic Issue", "National GIS Heatmap", "Explore CSR Grants"]

        return {
            "reply": reply,
            "suggested_chips": chips,
            "context": context
        }

mock_ai_service = MockAIService()
