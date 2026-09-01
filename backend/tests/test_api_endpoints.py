import os
import sys
import pytest
from fastapi.testclient import TestClient

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../")))

from app.main import app

client = TestClient(app)

def test_root_endpoint():
    res = client.get("/")
    assert res.status_code == 200
    assert res.json()["status"] == "ONLINE"

def test_health_check():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "HEALTHY"

def test_demo_login_citizen():
    res = client.post("/api/auth/demo-login/citizen")
    assert res.status_code == 200
    assert "access_token" in res.json()
    assert res.json()["user"]["role"] == "CITIZEN"

def test_demo_login_government():
    res = client.post("/api/auth/demo-login/government")
    assert res.status_code == 200
    assert "access_token" in res.json()
    assert res.json()["user"]["role"] == "GOVT_OFFICER"

def test_list_problems():
    res = client.get("/api/problems")
    assert res.status_code == 200
    assert isinstance(res.json(), list)
    assert len(res.json()) > 0

def test_flagship_problem_detail():
    res = client.get("/api/problems/P-JH-2026-001042")
    assert res.status_code == 200
    data = res.json()
    assert data["problem"]["problem_code"] == "P-JH-2026-001042"
    assert data["dna"] is not None
    assert data["priority"] is not None

def test_matching_endpoint():
    res = client.get("/api/matching/P-JH-2026-001042")
    assert res.status_code == 200
    matches = res.json()["matches"]
    assert "universities" in matches
    assert "student_teams" in matches
    assert "industry_partners" in matches

def test_government_dashboard():
    res = client.get("/api/government/dashboard")
    assert res.status_code == 200
    data = res.json()
    assert "summary" in data
    assert "district_stats" in data

def test_impact_map_data():
    res = client.get("/api/impact/map-data")
    assert res.status_code == 200
    data = res.json()
    assert len(data["districts"]) >= 24
    assert len(data["markers"]) > 0
