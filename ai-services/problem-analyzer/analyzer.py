"""
Problem Analyzer & DNA Synthesis Module
Extracts domain, subcategory, urgency, severity, required skills, and constraints from free-form citizen text, voice transcripts, or photo metadata.
"""

from typing import Dict, Any, List

class ProblemAnalyzer:
    def __init__(self, mode: str = "mock"):
        self.mode = mode

    def analyze(self, title: str, description: str, category: str, district: str) -> Dict[str, Any]:
        text = f"{title} {description}".lower()
        
        if any(w in text for w in ["water", "fluoride", "arsenic", "handpump", "drinking", "paani", "contamination", "jal"]):
            cat = "Water & Sanitation"
            subcat = "Groundwater Quality & Aquifer Safety"
            urgency = 9.2
            severity = 9.5
            skills = ["IoT Water Sensors", "Chemical Filtration", "GIS Hydrology", "Embedded Systems", "Public Health"]
            domains = ["Environmental Engineering", "Hydro-geology", "IoT & Telemetry"]
            stakeholders = ["Gram Panchayat", "Dept of Drinking Water & Sanitation", "Local PHC"]
            sol_types = ["Solar Powered Filtration Kiosk", "IoT Water Quality Monitor", "Mobile Testing Rig"]
            complexity = "High"
            pop = 12500
        elif any(w in text for w in ["road", "bridge", "pothole", "sadak", "traffic", "culvert"]):
            cat = "Road & Infrastructure"
            subcat = "Rural Road Connectivity"
            urgency = 7.5
            severity = 8.0
            skills = ["Computer Vision Pothole Detection", "Civil Engineering", "GIS Mapping", "Smart Materials"]
            domains = ["Civil & Structural", "GIS", "Computer Vision"]
            stakeholders = ["Road Construction Dept", "Rural Development Dept"]
            sol_types = ["Eco-friendly Bitumen", "Automated Road Defect Scanner"]
            complexity = "Medium"
            pop = 3500
        elif any(w in text for w in ["crop", "irrigation", "soil", "pest", "kisan", "farming", "krishi", "lac"]):
            cat = "Agriculture & Irrigation"
            subcat = "Smart Irrigation & Soil Health"
            urgency = 8.0
            severity = 8.5
            skills = ["Soil Moisture Telemetry", "Drone Crop Health Analysis", "Edge AI", "Solar Pumps"]
            domains = ["Agritech", "Embedded Systems", "Data Science"]
            stakeholders = ["Birsa Agricultural University", "Dept of Agriculture", "FPOs"]
            sol_types = ["Solar Micro-Drip Controller", "Soil NPK Optical Scanner"]
            complexity = "Medium"
            pop = 8200
        else:
            cat = category or "Public Infrastructure"
            subcat = "Civic Amenities & Safety"
            urgency = 7.0
            severity = 7.5
            skills = ["Data Analytics", "Mobile App Development", "IoT Telemetry"]
            domains = ["Civic Tech", "Urban Planning"]
            stakeholders = ["District Administration", "Municipal Corporation"]
            sol_types = ["Civic Monitoring Platform", "Smart Sensor Grid"]
            complexity = "Medium"
            pop = 5000

        return {
            "title": title,
            "category": cat,
            "subcategory": subcat,
            "district": district,
            "severity": severity,
            "urgency": urgency,
            "affectedPopulationEstimate": pop,
            "keywords": ["Groundwater", "Heavy Metal", "Health Hazard", "Jharkhand Rural", "Bero Block"],
            "requiredSkills": skills,
            "requiredDomains": domains,
            "stakeholders": stakeholders,
            "estimatedComplexity": complexity,
            "potentialSolutionTypes": sol_types
        }

    def generate_dna(self, problem_data: Dict[str, Any]) -> Dict[str, Any]:
        analysis = self.analyze(
            problem_data.get("title", ""),
            problem_data.get("description", ""),
            problem_data.get("category", ""),
            problem_data.get("district", "Ranchi")
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
                "High monsoon moisture and humidity",
                "Low digital literacy in remote hamlets",
                "Local tribal dialect UI requirements (Mundari / Ho / Santali)"
            ],
            "dependencies": [
                "Bero Block Gram Panchayat NOC",
                "Drinking Water & Sanitation Dept Lab Access",
                "State Groundwater Directorate Aquifer Data"
            ]
        }
