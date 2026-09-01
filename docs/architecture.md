# Jharkhand Samadhan Setu - Architecture Documentation

## 1. System Vision
Jharkhand Samadhan Setu is an interconnected GovTech and Civic Innovation platform built for Smart India Hackathon (SIH) 2026. The platform transforms citizen-reported grassroots challenges across Jharkhand's 24 districts into verified, AI-analyzed, capability-matched, and collaboratively executed solutions with measurable, evidence-backed impact.

## 2. Core Architectural Principles
1. **Canonical Problem Core**: Every entity in the system links back to a canonical `Problem ID` (e.g. `P-JH-2026-001042`).
2. **AI Provider Abstraction (`AI_MODE=mock | api`)**: Complete zero-API-key support with realistic deterministic mock responses for SIH demos, plus pluggable LLM integrations (Gemini / OpenAI / Anthropic).
3. **Multi-Tier Matching Engine**: Matches Problem DNA with Universities, Student Teams, Domain Experts, and Industry CSR Partners.
4. **Evidence-Based Lifecycle**: Enforces documentary, laboratory, or IoT telemetry evidence before milestones or deployments can be marked completed.

## 3. High-Level Pipeline Flow
```
Citizen Problem -> AI Problem Analyzer -> Problem DNA -> Duplicate Detection -> Priority Scoring -> Government Verification -> AI Capability Matching (Universities, Students, Experts, Industry) -> Solution Proposal -> Solution DNA -> Solution Gap Analysis -> Collaborative Workspace -> AI Blocker Detection -> Prototype & Pilot -> Deployment Verification -> Impact Measurement (0-100 Score) -> Government Command Center
```

## 4. Frontend Architecture
- **Framework**: React 18 with Vite and TypeScript.
- **Styling**: Tailwind CSS with custom GovTech palette (Jharkhand Forest Emerald `#047857`, Slate Navy `#0f172a`, Saffron Gold `#f59e0b`).
- **Mapping**: Leaflet and React-Leaflet with OpenStreetMap tiles.
- **Charts & Visuals**: Recharts for priority and telemetry analytics; custom Radar/Matrix components for Problem DNA and Solution DNA.

## 5. Backend Architecture
- **Framework**: Python FastAPI with asynchronous endpoints.
- **ORM & Database**: SQLAlchemy 2.0 with SQLite for zero-setup local dev and PostgreSQL for production.
- **Security**: JWT tokens, bcrypt/salted SHA-256 password hashing, role-based dependency guards.
- **Validation**: Pydantic v2 schemas for all request/response models.
