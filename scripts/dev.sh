#!/bin/bash
echo "========================================================"
echo "Starting Jharkhand Samadhan Setu Development Servers"
echo "========================================================"

# Launch Backend in background
cd "$(dirname "$0")/../backend"
uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!

# Launch Frontend
cd "$(dirname "$0")/../frontend"
npm run dev &
FRONTEND_PID=$!

echo "Frontend running at: http://localhost:3000"
echo "Backend running at: http://localhost:8000"
echo "API Documentation: http://localhost:8000/docs"

trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait
