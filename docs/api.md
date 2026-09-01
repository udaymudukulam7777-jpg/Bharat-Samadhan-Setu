# Jharkhand Samadhan Setu - REST API Reference

The interactive Swagger UI is available at `/docs` when running the backend server.

## Core Endpoints Summary

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register a new user with role-specific profile.
- `POST /api/auth/login` - Authenticate with email & password, returns JWT token.
- `GET /api/auth/me` - Get current authenticated user details.
- `POST /api/auth/demo-login/{role_name}` - Quick 1-click persona authentication for judges.

### Problems (`/api/problems`)
- `POST /api/problems` - Submit problem, trigger AI DNA synthesis, duplicate check, and priority scoring.
- `GET /api/problems` - Filter & search problems by district, category, status, priority.
- `GET /api/problems/{id_or_code}` - Get full interconnected problem tree.
- `POST /api/problems/{id}/support` - Upvote / "I am affected" community signal.
- `POST /api/problems/{id}/verify` - Government verification, department assignment, and SLA setting.
- `GET /api/problems/clusters` - Regional problem cluster overview.

### Solutions & Matching (`/api/solutions`, `/api/matching`)
- `POST /api/solutions` - Submit solution proposal, synthesize Solution DNA, run Gap Analysis.
- `GET /api/solutions/{id}` - View Solution DNA and Gap Matrix.
- `POST /api/solutions/{id}/accept` - Accept solution and initialize Project Workspace.
- `GET /api/matching/{problem_id}` - Fetch AI capability matches for Universities, Teams, Experts, Industry.

### Projects & Milestones (`/api/projects`)
- `GET /api/projects` - List all projects.
- `GET /api/projects/{id_or_code}` - Full collaborative project workspace.
- `PUT /api/projects/milestones/{id}` - Update milestone progress and upload evidence.
- `POST /api/projects/{id}/tasks` - Add Kanban task.
- `POST /api/projects/blockers/{id}/resolve` - Mark blocker as resolved.
- `POST /api/projects/{id}/deploy` - Commission full municipal deployment and calculate Impact Score.

### Government & Intelligence (`/api/government`, `/api/impact`)
- `GET /api/government/dashboard` - Command Center metrics, district stats, SLA analytics.
- `GET /api/impact/dashboard` - High-level impact outcomes and SDG alignment.
- `GET /api/impact/map-data` - 24-district GIS dataset with coordinates and priority pins.
- `GET /api/impact/showcase` - Verified case studies and digital proof badges.

### AI Chatbot (`/api/chatbot`)
- `POST /api/chatbot/query` - Conversational problem reporting in Hindi/English.
