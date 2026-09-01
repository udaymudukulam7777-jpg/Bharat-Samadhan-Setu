# Jharkhand Samadhan Setu - Database Schema & Relational Models

## 1. Entity Relationship Overview
All tables are structured relationally to maintain referential integrity with the central Problem entity.

### Primary Entities:
- **`users`**: Platform actors across 8 roles (Citizen, Student, University, Faculty Mentor, Expert, Industry, Govt Officer, Admin).
- **`organizations`**: Academic institutions (BIT Mesra, NIT Jamshedpur), industry partners (Tata Steel, BCCL, SAIL), and government departments (DWSD).
- **`problems`**: Citizen reports with unique `problem_code` (`P-JH-2026-XXXXXX`), geospatial coordinates, status, and department assignments.
- **`problem_dnas`**: 1-to-1 relationship with `problems`. Contains machine-readable skill vectors, domain footprints, constraints, and dependencies.
- **`priority_scores`**: 1-to-1 relationship with `problems`. Contains the 9 explainable component factor scores and 0-100 total score.
- **`problem_clusters`**: Geospatial and domain groupings of related problems across districts.
- **`problem_similarities`**: Pairwise semantic cosine matching records for duplicate detection.
- **`solutions`**: Structured engineering proposals submitted by innovation teams.
- **`solution_dnas`**: Visualized technology and resource footprints.
- **`solution_gap_analyses`**: Difference matrix between Problem DNA and Solution DNA with automated partner recommendations.
- **`projects`**: Collaborative execution workspaces for accepted solutions.
- **`project_milestones`**: 7 standard stages (Research, Design, Prototype, Testing, Pilot, Deployment, Impact).
- **`project_blockers`**: Diagnostic bottleneck records with partner remediation links.
- **`deployment_records`**: Verified municipal deployment records with digital sign-off hashes.
- **`impact_metrics`**: Before vs After indicator metrics.
- **`impact_scores`**: Explainable 0-100 impact score calculations.
- **`audit_logs`**: Government compliance audit trail.
