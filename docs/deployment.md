# Jharkhand Samadhan Setu - Deployment Guide

## 1. Prerequisites
- **Local Dev**: Python 3.10+ and Node.js 18+
- **Docker / Production**: Docker Engine and Docker Compose

## 2. Quick Local Launch

### A. Seed Database
```bash
python database/seed/seed_data.py
```

### B. Launch Backend Server
```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

### C. Launch Frontend Server
```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:3000` and proxy `/api` calls to `http://localhost:8000`.

## 3. One-Command Docker Deployment

### Development / Demo:
```bash
docker compose up --build
```

### Production Linux VM:
```bash
docker compose -f deployment/docker-compose.yml up -d --build
```

## 4. Environment Variables
Copy `.env.example` to `.env`:
```env
DATABASE_URL=sqlite:///./jharkhand_samadhan.db
AI_MODE=mock
JWT_SECRET=your_secure_secret_key_here
```
To enable live AI models, set `AI_MODE=api`, `AI_PROVIDER=gemini`, and provide your `AI_API_KEY`.
