import os
import sys
from datetime import datetime, timedelta, timezone

# Add backend to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../backend")))

from app.database import SessionLocal, engine, Base
from app.models.user import (
    User, UserRole, Organization, OrgType,
    CitizenProfile, StudentProfile, UniversityProfile, IndustryProfile, ExpertProfile
)
from app.models.problem import (
    Problem, ProblemStatus, PriorityLevel, ProblemDNA,
    PriorityScore, ProblemCluster, ProblemSimilarity, ProblemSupport, GovernmentAssignment
)
from app.models.solution import (
    Team, Solution, SolutionStatus, SolutionDNA,
    SolutionGapAnalysis, SolutionEvaluation
)
from app.models.project import (
    Project, ProjectStatus, MilestoneStage, MilestoneStatus,
    ProjectMilestone, ProjectTask, ProjectBlocker, ResourceOffer, IndustryPartnership
)
from app.models.impact import (
    DeploymentRecord, DeploymentStatus, DeploymentEvidence,
    ImpactMetric, ImpactScore
)
from app.services.auth_service import hash_password

def seed_database():
    print("Resetting and seeding Pan-India database in 100% English...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    now = datetime.now(timezone.utc)

    # 1. ORGANIZATIONS
    iit_bombay = Organization(name="Indian Institute of Technology (IIT) Bombay", org_type=OrgType.UNIVERSITY, district="Mumbai", state="Maharashtra", website="https://www.iitb.ac.in")
    iit_delhi = Organization(name="Indian Institute of Technology (IIT) Delhi", org_type=OrgType.UNIVERSITY, district="New Delhi", state="Delhi", website="https://home.iitd.ac.in")
    iit_dhanbad = Organization(name="IIT (ISM) Dhanbad", org_type=OrgType.UNIVERSITY, district="Dhanbad", state="Jharkhand", website="https://www.iitism.ac.in")
    iisc_blr = Organization(name="Indian Institute of Science (IISc) Bangalore", org_type=OrgType.UNIVERSITY, district="Bengaluru", state="Karnataka", website="https://iisc.ac.in")
    bit_mesra = Organization(name="Birla Institute of Technology (BIT) Mesra", org_type=OrgType.UNIVERSITY, district="Ranchi", state="Jharkhand", website="https://www.bitmesra.ac.in")
    csir_neeri = Organization(name="CSIR-NEERI (National Environmental Engineering Research Institute)", org_type=OrgType.RESEARCH_INSTITUTE, district="Nagpur", state="Maharashtra", website="https://www.neeri.res.in")
    
    tata_trusts = Organization(name="Tata Trusts & Tata Steel CSR Foundation", org_type=OrgType.INDUSTRY, district="Mumbai", state="Maharashtra", website="https://www.tatatrusts.org")
    reliance_fdn = Organization(name="Reliance Foundation CSR & Innovation", org_type=OrgType.INDUSTRY, district="Mumbai", state="Maharashtra", website="https://www.reliancefoundation.org")
    infosys_fdn = Organization(name="Infosys Foundation", org_type=OrgType.INDUSTRY, district="Bengaluru", state="Karnataka", website="https://www.infosys.org")
    mahindra_rise = Organization(name="Mahindra Rise Innovation Cell", org_type=OrgType.INDUSTRY, district="Mumbai", state="Maharashtra", website="https://www.mahindra.com")
    
    ministry_jal = Organization(name="Ministry of Jal Shakti, Government of India", org_type=OrgType.GOVERNMENT_DEPT, district="New Delhi", state="Delhi", website="https://jalshakti.gov.in")
    ministry_morth = Organization(name="Ministry of Road Transport & Highways (MoRTH)", org_type=OrgType.GOVERNMENT_DEPT, district="New Delhi", state="Delhi", website="https://morth.nic.in")
    
    db.add_all([iit_bombay, iit_delhi, iit_dhanbad, iisc_blr, bit_mesra, csir_neeri, tata_trusts, reliance_fdn, infosys_fdn, mahindra_rise, ministry_jal, ministry_morth])
    db.commit()

    # 2. SEED USERS & PROFILES
    pwd = hash_password("password123")
    
    citizen = User(email="citizen@indiasamadhan.gov.in", hashed_password=pwd, full_name="Rohan Sharma (Citizen)", role=UserRole.CITIZEN, state="Maharashtra", district="Chandrapur", designation="Community Resident", phone="+91-9876543210")
    student = User(email="student@iitb.ac.in", hashed_password=pwd, full_name="Aarav Sharma (Student Lead)", role=UserRole.STUDENT, state="Maharashtra", district="Mumbai", organization_id=iit_bombay.id, designation="IoT & Embedded Systems Lead", phone="+91-9876543211")
    univ = User(email="dean.rnd@iitb.ac.in", hashed_password=pwd, full_name="Prof. Preeti Rao (Dean R&D)", role=UserRole.UNIVERSITY, state="Maharashtra", district="Mumbai", organization_id=iit_bombay.id, designation="Dean of Research & Innovation", phone="+91-9876543212")
    faculty = User(email="faculty@iitd.ac.in", hashed_password=pwd, full_name="Prof. V. K. Vijay (Faculty Mentor)", role=UserRole.FACULTY_MENTOR, state="Delhi", district="New Delhi", organization_id=iit_delhi.id, designation="Professor, Rural Technologies & Clean Tech", phone="+91-9876543213")
    expert = User(email="expert@csir-neeri.res.in", hashed_password=pwd, full_name="Dr. Arvind Kumar (Lead Scientist)", role=UserRole.EXPERT, state="Maharashtra", district="Nagpur", organization_id=csir_neeri.id, designation="Chief Scientist & Head, Water Quality", phone="+91-9876543214")
    industry = User(email="csr@tatatrusts.org", hashed_password=pwd, full_name="Vikramaditya Sengupta (CSR Director)", role=UserRole.INDUSTRY, state="Maharashtra", district="Mumbai", organization_id=tata_trusts.id, designation="Head, Clean Water & Rural Development Grants", phone="+91-9876543215")
    govt = User(email="officer@jalshakti.gov.in", hashed_password=pwd, full_name="Er. Rajesh Kumar (Govt Officer)", role=UserRole.GOVT_OFFICER, state="Delhi", district="New Delhi", organization_id=ministry_jal.id, designation="Executive Nodal Engineer, Jal Jeevan Mission", phone="+91-9876543216")
    admin = User(email="admin@indiasamadhan.gov.in", hashed_password=pwd, full_name="Dr. Anil Verma (National Admin)", role=UserRole.ADMIN, state="Delhi", district="New Delhi", designation="National Platform Director, SIH Innovation", phone="+91-9876543217")

    db.add_all([citizen, student, univ, faculty, expert, industry, govt, admin])
    db.commit()

    # Profiles
    db.add(CitizenProfile(user_id=citizen.id, district="Chandrapur", block="Warora", panchayat="Shegaon Central", preferred_language="en", total_reported=5, total_upvoted=18))
    db.add(StudentProfile(user_id=student.id, university_name="IIT Bombay", branch="Electrical Engineering & IoT", graduation_year=2026, skills=["IoT", "ESP32", "LoRaWAN", "FastAPI", "React", "Machine Learning", "Edge Computing"], interests=["Rural Clean Water", "Renewable Energy Grid"]))
    db.add(UniversityProfile(user_id=univ.id, departments=["Environmental Engineering", "Computer Science", "Chemical Engineering", "CTARA"], laboratories=["National NABL Water Quality Lab", "Sensors & IoT FabLab", "Solar Tech Facility"], capability_scores={"IoT": 95, "WaterTech": 98, "AI_ML": 96, "GIS": 90}))
    db.add(IndustryProfile(user_id=industry.id, industry_sector="Infrastructure, Clean Water & Healthcare", offered_resources=["2kW Solar PV Array Grants", "NABL Mobile Testing Rig", "INR 25,00,000 Hardware Seed Grant"], csr_budget_available="INR 25,00,000"))
    db.add(ExpertProfile(user_id=expert.id, domain_expertise=["Hydrogeology", "Fluoride Remediation", "Groundwater Aquifer Modelling", "NABL Lab Verification"], highest_degree="Ph.D. in Environmental Hydrogeology", years_experience=20, publications_count=36))
    db.commit()

    # 3. PROBLEM CLUSTER
    cluster = ProblemCluster(
        cluster_code="CLU-WATER-INDIA-01",
        name="National Groundwater Fluoride & Heavy Metal Contamination Corridor",
        category="Water & Sanitation",
        districts=["Chandrapur", "Nagpur", "Ranchi", "Jodhpur", "Dharmapuri"],
        problem_count=8,
        total_affected_population=185000,
        average_priority_score=93.4,
        dominant_keywords=["Groundwater", "Fluoride", "Skeletal Fluorosis", "Heavy Metal", "Safe Aquifer"],
        centroid_lat=21.1458,
        centroid_lng=79.0882
    )
    db.add(cluster)
    db.commit()

    # 4. FLAGSHIP PROBLEM P-JH-2026-001042 / P-IND-2026-001042
    flagship_problem = Problem(
        problem_code="P-JH-2026-001042",
        title="High Groundwater Fluoride & Heavy Metal Contamination in Bero Block",
        description="Over 12,500 villagers across 14 hamlets are suffering from severe groundwater contamination with fluoride levels reaching 4.8 mg/L (safe limit: 1.0 mg/L). Children exhibit visible dental fluorosis and adults suffer from chronic joint stiffness.",
        category="Water & Sanitation",
        subcategory="Groundwater Quality & Aquifer Safety",
        state="Maharashtra",
        district="Chandrapur",
        block="Bero",
        panchayat="Bero Central",
        village_or_landmark="Primary Health Centre Ward 4",
        latitude=19.9615,
        longitude=79.2961,
        affected_population=12500,
        media_urls=["https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80"],
        voice_transcript="Our village handpump water turns yellow when boiled and leaves a chalky sediment. Many children have yellow stained teeth and elder villagers cannot walk due to severe joint pain. Please install an automated purification unit.",
        is_qr_submitted=True,
        qr_facility_code="QR-HP-2026-0842",
        status=ProblemStatus.IMPACT_VERIFIED,
        created_by_id=citizen.id,
        department_name="Ministry of Jal Shakti / State Water & Sanitation Department",
        assigned_officer_id=govt.id,
        cluster_id=cluster.id,
        sla_deadline=now + timedelta(days=20),
        government_remarks="Critical public health emergency verified on-site by Executive Engineer. Fast-track hardware deployment authorized under National Jal Jeevan Innovation Mission.",
        support_count=482,
        affected_count=12500
    )
    db.add(flagship_problem)
    db.commit()

    # 5. PROBLEM DNA & PRIORITY SCORE
    dna = ProblemDNA(
        problem_id=flagship_problem.id,
        domain="Hydro-geology & Environmental Engineering",
        subdomain="Fluoride & Heavy Metal Adsorption",
        severity_rating=9.6,
        urgency_rating=9.4,
        complexity_level="High",
        required_skills=["IoT Sensors (Fluoride/pH/TDS)", "Activated Alumina Chemistry", "Embedded Firmware (ESP32/LoRaWAN)", "Solar DC Micro-Grid Sizing", "Telemetry Cloud Dashboard"],
        required_domains=["Environmental Engineering", "Chemical Engineering", "Embedded Systems", "Civic Tech"],
        required_resources=["NABL Certified Water Testing Rig", "Activated Alumina / Nano-Adsorbent Media", "2kW Solar PV Array & Battery", "Submersible DC Pump", "LoRaWAN Gateway"],
        potential_solution_types=["Solar-Powered Community Water Purification Kiosk", "IoT Multi-Parameter Real-time Quality Monitor", "Automated Backwash Desorption Filter"],
        constraints=["Intermittent rural electricity grid", "High summer temperatures up to 45°C", "Community digital accessibility", "Low maintenance budget"],
        dependencies=["Panchayat Land NOC", "Water Sample Baseline Testing", "Community Water Committee Formation"],
        dna_fingerprint="DNA-WATER-FLUORIDE-SOLAR-IOT-2026-A1"
    )
    
    priority = PriorityScore(
        problem_id=flagship_problem.id,
        total_score=94.5,
        priority_level=PriorityLevel.CRITICAL,
        severity_factor=19.2,
        urgency_factor=14.5,
        affected_population_factor=14.2,
        safety_risk_factor=9.8,
        geographic_spread_factor=8.8,
        frequency_factor=4.8,
        community_support_factor=9.5,
        environmental_factor=9.2,
        govt_priority_factor=4.5,
        explanation="Calculated Priority Score of 94.5/100 (CRITICAL) driven by dangerous fluoride toxicity (4.8 mg/L vs 1.0 mg/L safe limit) causing active skeletal fluorosis across 12,500 residents."
    )
    db.add_all([dna, priority])
    db.commit()

    # 6. MORE PAN-INDIA PROBLEMS
    p2 = Problem(
        problem_code="P-IND-2026-000843",
        title="Industrial Particulate & Emission Telemetry Network in Industrial Corridor",
        description="Heavy particulate coal and flue gas emissions exceed 350 ug/m3 PM2.5 in township residential zones, causing chronic respiratory distress in 45,000 residents.",
        category="Clean Energy & Environment",
        subcategory="Atmospheric Quality & Industrial Emissions",
        state="Delhi NCR",
        district="New Delhi",
        block="Anand Vihar",
        panchayat="Industrial Belt Zone 2",
        village_or_landmark="Near Thermal Station Gate 1",
        latitude=28.6139,
        longitude=77.2090,
        affected_population=45000,
        status=ProblemStatus.IN_PROGRESS,
        created_by_id=citizen.id,
        department_name="Ministry of Environment, Forest & Climate Change / State Pollution Control Board",
        assigned_officer_id=govt.id,
        support_count=320,
        affected_count=45000
    )
    db.add(p2)
    db.commit()

    db.add(ProblemDNA(
        problem_id=p2.id,
        domain="Atmospheric Physics & Environmental Sensing",
        subdomain="Laser Particle Telemetry & Fogger Automation",
        severity_rating=8.8,
        urgency_rating=8.5,
        complexity_level="High",
        required_skills=["Laser Optical Particle Sensing", "LoRaWAN Mesh Networking", "Automated Water Misting Systems"],
        required_domains=["Environmental Engineering", "Embedded Systems"],
        required_resources=["Optical PM Sensors", "Water Fogging Cannons", "Solar Power Units"],
        potential_solution_types=["Automated Particulate Barrier & Fogger Array", "Open Air Quality Map"],
        constraints=["High ambient industrial dust", "24/7 continuous operation"],
        dependencies=["Pollution Control Board Sensor Telemetry Integration"]
    ))
    db.add(PriorityScore(
        problem_id=p2.id,
        total_score=88.5,
        priority_level=PriorityLevel.CRITICAL,
        severity_factor=17.5,
        urgency_factor=13.5,
        affected_population_factor=14.5,
        safety_risk_factor=9.2,
        geographic_spread_factor=8.5,
        frequency_factor=4.5,
        community_support_factor=8.8,
        environmental_factor=9.0,
        govt_priority_factor=4.0,
        explanation="High severity particulate contamination (PM2.5 > 350 ug/m3) threatening public respiratory health across industrial zones."
    ))

    p3 = Problem(
        problem_code="P-IND-2026-000712",
        title="Smart Solar Micro-Irrigation & Soil Moisture Grid for Arid Farming",
        description="Smallholder farmers in arid regions face severe drought and groundwater depletion, losing 60% of annual crop yield due to unmetered flood irrigation.",
        category="Agriculture",
        subcategory="Precision Irrigation & Aquifer Preservation",
        state="Rajasthan",
        district="Jodhpur",
        block="Mandore",
        panchayat="Mandore Krishi Belt",
        village_or_landmark="Krishi Vigyan Kendra Zone 3",
        latitude=26.2389,
        longitude=73.0243,
        affected_population=22000,
        status=ProblemStatus.OPEN_FOR_SOLUTIONS,
        created_by_id=citizen.id,
        department_name="Ministry of Agriculture & Farmers Welfare",
        assigned_officer_id=govt.id,
        support_count=210,
        affected_count=22000
    )
    db.add(p3)
    db.commit()

    db.add(ProblemDNA(
        problem_id=p3.id,
        domain="Agritech & Soil Hydrology",
        subdomain="Precision Drip Telemetry",
        severity_rating=8.2,
        urgency_rating=8.0,
        complexity_level="Medium",
        required_skills=["Soil Moisture Capacitive Probes", "LoRa Micro-Controllers", "Solar DC Pump Controllers"],
        required_domains=["Agritech", "Embedded Systems"],
        required_resources=["Capacitive Probes", "Drip Lines", "Solar Pump Arrays"],
        potential_solution_types=["Solar Precision Micro-Drip Controller", "Soil Health Cloud Ticker"],
        constraints=["High heat and direct sunlight", "Low rural cellular reception"],
        dependencies=["Local Farmers Producer Organization (FPO) Cooperation"]
    ))
    db.add(PriorityScore(
        problem_id=p3.id,
        total_score=82.0,
        priority_level=PriorityLevel.HIGH,
        severity_factor=16.0,
        urgency_factor=12.5,
        affected_population_factor=13.0,
        safety_risk_factor=7.5,
        geographic_spread_factor=8.0,
        frequency_factor=4.0,
        community_support_factor=8.5,
        environmental_factor=8.5,
        govt_priority_factor=4.0,
        explanation="Severe water scarcity and crop stress across 22,000 agrarian beneficiaries requiring automated micro-drip optimization."
    ))

    p4 = Problem(
        problem_code="P-IND-2026-000521",
        title="Rural Primary Healthcare AI Triage & Telemedicine Node",
        description="Remote rural health sub-centres lack diagnostic doctors, causing critical delays in maternal and cardiac diagnostics for 14,200 village residents.",
        category="Healthcare",
        subcategory="Rural Diagnostic Accessibility & Telemedicine",
        state="Tamil Nadu",
        district="Dharmapuri",
        block="Pennagaram",
        panchayat="Hogenakkal Health Zone",
        village_or_landmark="Primary Health Centre Ward 1",
        latitude=12.1211,
        longitude=78.1582,
        affected_population=14200,
        status=ProblemStatus.IN_PROGRESS,
        created_by_id=citizen.id,
        department_name="Ministry of Health & Family Welfare",
        assigned_officer_id=govt.id,
        support_count=190,
        affected_count=14200
    )
    db.add(p4)
    db.commit()

    db.add(ProblemDNA(
        problem_id=p4.id,
        domain="Biomedical Engineering & AI Health Informatics",
        subdomain="Point-of-Care Triage & Satellite Telemedicine",
        severity_rating=8.6,
        urgency_rating=8.8,
        complexity_level="High",
        required_skills=["Digital 12-Lead ECG Processing", "Edge AI Diagnostic Classification", "WebRTC Video Consultation"],
        required_domains=["Biomedical", "AI & ML", "Telehealth"],
        required_resources=["Portable Point-of-Care Kit", "Tablet Console", "Satellite/4G Link"],
        potential_solution_types=["Smart Telemedicine Health Kiosk", "Point-of-Care Diagnostic Tablet"],
        constraints=["Intermittent internet bandwidth in hilly tracts"],
        dependencies=["State Health Mission Approval", "District Hospital Physician Roster"]
    ))
    db.add(PriorityScore(
        problem_id=p4.id,
        total_score=86.0,
        priority_level=PriorityLevel.HIGH,
        severity_factor=17.0,
        urgency_factor=13.5,
        affected_population_factor=12.5,
        safety_risk_factor=9.0,
        geographic_spread_factor=7.5,
        frequency_factor=4.5,
        community_support_factor=8.5,
        environmental_factor=6.0,
        govt_priority_factor=4.5,
        explanation="Critical gap in emergency diagnostic capability across rural sub-centres affecting 14,200 beneficiaries."
    ))

    db.commit()

    # 7. TEAMS & SOLUTIONS
    team1 = Team(
        name="Team JalSuraksha (IIT Bombay)",
        leader_id=student.id,
        university_name="IIT Bombay",
        members_detail=[
            {"name": "Aarav Sharma", "role": "Team Lead & IoT Firmware", "skills": ["ESP32", "C++", "LoRaWAN", "FastAPI"]},
            {"name": "Ananya Joshi", "role": "Chemical & Filtration Engineer", "skills": ["Activated Alumina", "Adsorption Kinetics", "Water Quality Chemistry"]},
            {"name": "Rohan Deshmukh", "role": "Hardware & Solar Integration", "skills": ["Solar PV Sizing", "Charge Controllers", "CAD Design"]},
            {"name": "Kavya Iyer", "role": "Full-Stack & Cloud Telemetry", "skills": ["React", "Tailwind CSS", "PostgreSQL", "GIS Mapping"]}
        ],
        skills_matrix={"IoT": True, "Filtration": True, "Solar": True, "Web": True, "Chemistry": True}
    )
    db.add(team1)
    db.commit()

    solution1 = Solution(
        solution_code="SOL-IND-2026-0042",
        problem_id=flagship_problem.id,
        team_id=team1.id,
        title="Solar-Powered IoT Activated-Alumina Fluoride Remediation Kiosk with Real-time Telemetry",
        executive_summary="An autonomous, off-grid 2kW solar-powered multi-stage filtration unit that reduces fluoride from 4.8 mg/L to under 0.4 mg/L using activated alumina and nano-porous ceramic membranes. Features continuous IoT telemetry (pH, TDS, Fluoride ISE) and an automated backwash cycle.",
        architecture_description="Raw water pumped via 24V DC submersible pump through dual-stage 50-micron pre-filtration, into pressurized columns containing activated alumina and iron oxide media. IoT sensor array samples water every 5 minutes and streams data via LoRaWAN / Cellular to the Central Jal Shakti Portal.",
        tech_stack=["ESP32 Microcontroller", "LoRaWAN Gateway", "Ion-Selective Fluoride Electrode", "Activated Alumina Media", "2kW Bifacial Solar Array", "LiFePO4 Battery Pack (48V 100Ah)", "FastAPI", "React"],
        implementation_plan="Phase 1: Lab calibration at IIT Bombay (Weeks 1-2). Phase 2: Pilot prototype fabrication & testing (Weeks 3-4). Phase 3: Field deployment and community handover (Weeks 5-6).",
        estimated_cost_inr=145000.0,
        estimated_timeline_days=42,
        status=SolutionStatus.ACCEPTED,
        is_selected=True
    )
    db.add(solution1)
    db.commit()

    sol_dna = SolutionDNA(
        solution_id=solution1.id,
        covered_technologies=["Solar PV", "Activated Alumina", "LoRaWAN", "ESP32", "Ion Selective Electrodes", "React", "FastAPI"],
        required_skills=["Chemical Adsorption", "Solar DC Sizing", "Embedded Firmware", "Cloud Analytics"],
        required_resources=["NABL Certified Testing Rig", "Activated Alumina Media", "Solar Charge Controllers"],
        scalability_rating=9.4,
        deployment_readiness="Ready for National Replication (TRL-8)",
        estimated_budget=145000.0,
        timeline_weeks=6,
        risk_factors=["Spent media sludge disposal protocol", "Monsoon cloud cover reducing solar yield"],
        dependencies=["Panchayat water kiosk space", "NABL lab validation sign-off"],
        expected_outcomes=["91.6% fluoride reduction", "4,500 Liters safe drinking water daily", "Zero recurring grid power cost"]
    )

    gap_analysis = SolutionGapAnalysis(
        solution_id=solution1.id,
        problem_id=flagship_problem.id,
        coverage_percentage=94.5,
        covered_requirements=[
            "High-capacity fluoride reduction (0.4 mg/L achieved vs 4.8 mg/L baseline)",
            "Solar DC off-grid micro-power system (24/7 continuous operation)",
            "Local sensor telemetry node (pH, Turbidity, Fluoride ISE)",
            "Central cloud telemetry feed for Public Health Engineers"
        ],
        missing_requirements=[
            "Automated backwash flushing valve automation (Currently semi-automated)",
            "NABL calibration certificate documentation before community commissioning"
        ],
        technical_gaps=["LoRaWAN long-range antenna range testing under heavy forest canopy"],
        domain_gaps=["Field toxicologist sign-off on disposal of spent media filter sludge"],
        resource_gaps=["Secondary 48V Lithium Battery Pack for prolonged monsoon backup"],
        funding_gaps=["INR 25,000 estimated shortfall for pilot housing enclosure and weatherproofing"],
        deployment_gaps=["Panchayat community water committee maintenance training curriculum"],
        recommended_experts=[{"name": "Dr. Arvind Kumar (CSIR-NEERI)", "gap_addressed": "Sludge disposal protocol & NABL validation", "role": "Lead Scientific Advisor"}],
        recommended_universities=[{"name": "IIT Bombay Environmental Engineering Lab", "gap_addressed": "Membrane longevity testing & accelerated wear trials"}],
        recommended_industries=[{"name": "Tata Trusts CSR Innovation Cell", "gap_addressed": "INR 25,000 gap-funding grant & enclosure fabrication"}]
    )
    db.add_all([sol_dna, gap_analysis])
    db.commit()

    # 8. PROJECT & 7 MILESTONES
    project1 = Project(
        project_code="PRJ-IND-2026-0042",
        problem_id=flagship_problem.id,
        solution_id=solution1.id,
        title="Field Deployment: Solar IoT Fluoride Remediation Unit (Ward 4)",
        description="Full lifecycle installation of off-grid solar water kiosk with telemetry node.",
        status=ProjectStatus.PILOT_DEPLOYED,
        health_score=98.5,
        overall_progress_pct=100.0,
        target_completion_date=now + timedelta(days=10)
    )
    db.add(project1)
    db.commit()

    # 7 Standard Milestones
    milestones_data = [
        (MilestoneStage.RESEARCH, 1, "Milestone 1: Problem Deep Dive & Baseline Validation", "On-site water sampling, baseline spectrophotometer analysis (4.8 mg/L F-), stakeholder alignment.", MilestoneStatus.VERIFIED),
        (MilestoneStage.DESIGN, 2, "Milestone 2: Architecture Design & Simulation", "CAD enclosure schematics, solar MPPT load modeling, CFD fluid flow analysis.", MilestoneStatus.VERIFIED),
        (MilestoneStage.PROTOTYPE, 3, "Milestone 3: Lab Prototype Fabrication & Bench Testing", "Dual-column activated alumina assembly, ESP32 telemetry firmware, 100-hour continuous bench trial.", MilestoneStatus.VERIFIED),
        (MilestoneStage.TESTING, 4, "Milestone 4: NABL Lab Certification & Quality Audit", "Independent NABL lab report confirming fluoride reduction to 0.4 mg/L with zero heavy metals.", MilestoneStatus.VERIFIED),
        (MilestoneStage.PILOT, 5, "Milestone 5: Field Pilot Installation & Solar Commissioning", "Civil foundation, 2kW bifacial solar panel array mounting, pipeline connection to village handpump.", MilestoneStatus.VERIFIED),
        (MilestoneStage.DEPLOYMENT, 6, "Milestone 6: Government SLA Verification & Inspection", "Official inspection by Executive Engineer Er. Rajesh Kumar, Jal Jeevan Mission seal.", MilestoneStatus.VERIFIED),
        (MilestoneStage.IMPACT, 7, "Milestone 7: Community Handover & Live Telemetry", "Handover to Gram Panchayat Water Committee, live sensor data publishing to India Samadhan Setu.", MilestoneStatus.VERIFIED)
    ]

    for stage_enum, order_idx, m_title, m_desc, m_status in milestones_data:
        m = ProjectMilestone(
            project_id=project1.id,
            stage=stage_enum,
            order_index=order_idx,
            title=m_title,
            description=m_desc,
            owner_name="Team JalSuraksha",
            status=m_status,
            progress_pct=100.0,
            due_date=now - timedelta(days=(7-order_idx)*4),
            completed_at=now - timedelta(days=(7-order_idx)*3),
            evidence_url="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
            evidence_description="Verified installation inspection report & NABL validation.",
            verification_badge_hash=f"0x{order_idx}f8a92b4c1e7d3a059b8c2d4e6f1a3b5c7e9f{order_idx}",
            verified_by_officer_name="Er. Rajesh Kumar, Executive Engineer, Ministry of Jal Shakti",
            verified_at=now - timedelta(days=(7-order_idx)*3)
        )
        db.add(m)
    db.commit()

    # 9. DEPLOYMENT RECORD & IMPACT
    dep = DeploymentRecord(
        project_id=project1.id,
        deployment_code="DEP-IND-2026-0042",
        site_name="Bero Central Clean Water Kiosk (Ward 4)",
        state="Maharashtra",
        district="Chandrapur",
        block="Bero",
        panchayat="Bero Central",
        latitude=19.9615,
        longitude=79.2961,
        implementing_org_name="IIT Bombay / Team JalSuraksha in partnership with Tata Trusts",
        beneficiaries_count=12500,
        deployment_date=now - timedelta(days=5),
        status=DeploymentStatus.OPERATIONAL,
        is_verified=True,
        verified_by_officer_name="Er. Rajesh Kumar, Executive Engineer, Ministry of Jal Shakti",
        verification_badge_hash="0x8f2a4e9b7c1d3f5e0a6b8c9d2e4f7a1b3c5d8e9f"
    )
    db.add(dep)
    db.commit()

    # Evidence
    db.add(DeploymentEvidence(
        deployment_id=dep.id,
        evidence_type="NABL_LAB_TEST",
        title="NABL Accredited Chemical Analysis Report #NABL-W-2026-9812",
        file_url="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
        verification_notes="Certified 0.40 mg/L Fluoride residual (Safe potable threshold <= 1.00 mg/L). Heavy metals Pb, As, Cd below detectable limits."
    ))

    # Metrics
    metrics_list = [
        ("Fluoride Concentration (mg/L)", 4.8, 0.4, "mg/L", 91.6, "Water Quality & Safety"),
        ("Daily Potable Water Output", 200.0, 4500.0, "L/day", 2150.0, "Community Water Availability"),
        ("Active Waterborne Illnesses", 42.0, 2.0, "Cases/mo", 95.2, "Public Health & Well-being"),
        ("Monthly Household Water Spend", 650.0, 45.0, "INR/mo", 93.1, "Economic Savings")
    ]

    for m_name, base_v, ach_v, u, imp, cat in metrics_list:
        db.add(ImpactMetric(
            deployment_id=dep.id,
            metric_name=m_name,
            baseline_value=base_v,
            achieved_value=ach_v,
            unit=u,
            improvement_percentage=imp,
            category=cat
        ))

    # Impact Score
    db.add(ImpactScore(
        deployment_id=dep.id,
        total_score=94.5,
        reach_score=24.5,
        outcome_improvement_score=24.0,
        adoption_score=19.0,
        sustainability_score=14.5,
        problem_severity_score=12.5,
        explanation="Outstanding verified impact: 91.6% fluoride reduction serving 12,500 residents with 100% solar off-grid uptime."
    ))

    db.commit()
    print("Pan-India database seeded successfully in 100% English with flagship problem P-JH-2026-001042 / P-IND-2026-001042!")

if __name__ == "__main__":
    seed_database()
