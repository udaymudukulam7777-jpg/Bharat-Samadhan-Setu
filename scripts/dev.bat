@echo off
echo ========================================================
echo Starting Jharkhand Samadhan Setu Development Servers
echo ========================================================

set PATH=%~dp0..\..\tools\node;%PATH%

start cmd /k "echo Starting Backend on http://localhost:8000... && cd /d %~dp0..\backend && python -m uvicorn app.main:app --reload --port 8000"
start cmd /k "echo Starting Frontend on http://localhost:3000... && cd /d %~dp0..\frontend && npm run dev"

echo Both servers launched!
echo Frontend: http://localhost:3000
echo Backend API Docs: http://localhost:8000/docs
