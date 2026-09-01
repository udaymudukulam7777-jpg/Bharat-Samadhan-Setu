import os
import sys
import pytest

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../")))

from app.ai.mock_service import mock_ai_service

def test_problem_analysis():
    res = mock_ai_service.analyze_problem(
        title="Drinking water contaminated with high fluoride",
        description="Villagers in Bero suffering from dental fluorosis and yellow water from handpump",
        category="Water & Sanitation",
        district="Ranchi"
    )
    assert res["category"] == "Water & Sanitation"
    assert res["severity"] >= 9.0
    assert "IoT Water Sensors" in res["requiredSkills"]
    assert "Environmental Engineering" in res["requiredDomains"]

def test_problem_dna_synthesis():
    dna = mock_ai_service.generate_problem_dna({
        "title": "Fluoride contamination in Bero",
        "description": "Handpump water is turbid and toxic",
        "category": "Water & Sanitation",
        "district": "Ranchi"
    })
    assert dna["domain"] is not None
    assert dna["severity_rating"] >= 8.0
    assert len(dna["required_skills"]) > 0
    assert len(dna["required_resources"]) > 0

def test_priority_engine():
    priority = mock_ai_service.calculate_priority_score(
        {"affected_population": 12500, "district": "Ranchi"},
        {"severity_rating": 9.5, "urgency_rating": 9.2}
    )
    assert priority["total_score"] >= 85.0
    assert priority["priority_level"] == "CRITICAL"
    assert priority["explanation"] is not None

def test_capability_matching():
    matches = mock_ai_service.match_capabilities(
        {"domain": "Water & Sanitation", "required_skills": ["IoT", "Filtration"]},
        {}
    )
    assert len(matches["universities"]) >= 3
    assert len(matches["student_teams"]) >= 2
    assert len(matches["experts"]) >= 2
    assert len(matches["industry_partners"]) >= 2
    assert matches["universities"][0]["match_percentage"] > 90

def test_gap_analysis():
    gap = mock_ai_service.perform_gap_analysis({}, {})
    assert gap["coverage_percentage"] > 80.0
    assert len(gap["covered_requirements"]) > 0
    assert len(gap["missing_requirements"]) > 0
    assert len(gap["recommended_experts"]) > 0

def test_blocker_detection():
    blockers = mock_ai_service.detect_project_blockers({}, [])
    assert len(blockers) >= 1
    assert blockers[0]["blocker_type"] == "TESTING_LAB_CALIBRATION"
    assert len(blockers[0]["recommended_partners"]) > 0
