export type UserRole =
  | 'CITIZEN'
  | 'STUDENT'
  | 'UNIVERSITY'
  | 'FACULTY_MENTOR'
  | 'EXPERT'
  | 'INDUSTRY'
  | 'GOVT_OFFICER'
  | 'ADMIN';

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  state?: string;
  district?: string;
  organization_id?: number;
  organization?: Organization;
  designation?: string;
  avatar_url?: string;
  created_at?: string;
}

export interface Organization {
  id: number;
  name: string;
  org_type: 'UNIVERSITY' | 'INDUSTRY' | 'GOVERNMENT_DEPT' | 'RESEARCH_INSTITUTE' | 'NGO';
  state?: string;
  district?: string;
  website?: string;
  is_verified: boolean;
}

export type ProblemStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'VERIFIED'
  | 'REJECTED'
  | 'OPEN_FOR_SOLUTIONS'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'IMPACT_VERIFIED';

export type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface ProblemDNA {
  domain: string;
  subdomain?: string;
  severity_rating: number;
  urgency_rating: number;
  complexity_level: string;
  required_skills: string[];
  required_domains: string[];
  required_resources: string[];
  potential_solution_types: string[];
  constraints: string[];
  dependencies: string[];
}

export interface PriorityScore {
  total_score: number;
  priority_level: PriorityLevel;
  severity_factor: number;
  urgency_factor: number;
  affected_population_factor: number;
  safety_risk_factor: number;
  geographic_spread_factor: number;
  frequency_factor: number;
  community_support_factor: number;
  environmental_factor: number;
  govt_priority_factor: number;
  explanation?: string;
}

export interface Problem {
  id: number;
  problem_code: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  state?: string;
  district: string;
  block?: string;
  panchayat?: string;
  village_or_landmark?: string;
  latitude?: number;
  longitude?: number;
  affected_population: number;
  media_urls: string[];
  voice_transcript?: string;
  status: ProblemStatus;
  created_by_id?: number;
  department_name?: string;
  assigned_officer_id?: number;
  support_count: number;
  affected_count: number;
  created_at: string;
  dna?: ProblemDNA;
  priority?: PriorityScore;
}

export interface Solution {
  id: number;
  solution_code: string;
  problem_id: number;
  team_id: number;
  title: string;
  executive_summary: string;
  architecture_description?: string;
  tech_stack: string[];
  estimated_cost_inr: number;
  estimated_timeline_days: number;
  status: string;
  is_selected: boolean;
  created_at: string;
  dna?: SolutionDNA;
  gap_analysis?: SolutionGapAnalysis;
}

export interface SolutionDNA {
  covered_technologies: string[];
  required_skills: string[];
  required_resources: string[];
  scalability_rating: number;
  deployment_readiness: string;
  estimated_budget: number;
  timeline_weeks: number;
  risk_factors: string[];
  dependencies: string[];
  expected_outcomes: string[];
}

export interface SolutionGapAnalysis {
  coverage_percentage: number;
  covered_requirements: string[];
  missing_requirements: string[];
  technical_gaps: string[];
  domain_gaps: string[];
  resource_gaps: string[];
  funding_gaps: string[];
  deployment_gaps: string[];
  recommended_experts: Array<{ name: string; gap_addressed: string; role?: string }>;
  recommended_universities: Array<{ name: string; gap_addressed: string }>;
  recommended_industries: Array<{ name: string; gap_addressed: string }>;
}

export interface ProjectMilestone {
  id: number;
  project_id: number;
  stage: string;
  order_index: number;
  title: string;
  description?: string;
  owner_name?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'VERIFIED';
  progress_pct: number;
  due_date?: string;
  completed_at?: string;
  evidence_url?: string;
  evidence_description?: string;
  verification_badge_hash?: string;
  verified_by_officer_name?: string;
  verified_at?: string;
}

export interface ProjectBlocker {
  id: number;
  project_id: number;
  blocker_type: string;
  severity: string;
  title: string;
  diagnostic_reason: string;
  is_resolved: boolean;
  resolution_notes?: string;
  recommended_partners: Array<{ partner_name: string; partner_type: string; contact_person?: string; eta_resolution_days?: number }>;
  detected_at: string;
}

export interface Project {
  id: number;
  project_code: string;
  problem_id: number;
  solution_id: number;
  title: string;
  description?: string;
  status: string;
  health_score: number;
  overall_progress_pct: number;
  target_completion_date?: string;
  created_at: string;
  milestones?: ProjectMilestone[];
  blockers?: ProjectBlocker[];
}

export interface StateMapData {
  name: string;
  state_code: string;
  lat: number;
  lng: number;
  problems: number;
  verified: number;
  active_projects: number;
  deployments: number;
  beneficiaries: number;
  priority: PriorityLevel;
}

export interface MapMarker {
  id: number;
  code: string;
  title: string;
  category: string;
  state?: string;
  district: string;
  lat: number;
  lng: number;
  priority: PriorityLevel;
  status: ProblemStatus;
  beneficiaries: number;
  solution?: string;
}
