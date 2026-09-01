# Deployment Architecture (`deployment/`)

```
deployment/
├── development/        # Local Docker configuration for dev with volume live-reload
│   └── docker-compose.yml
├── production/         # Production Linux VM Docker Compose with persistent volumes
│   └── docker-compose.yml
├── docker/             # Production multi-stage Dockerfiles
│   ├── frontend.Dockerfile
│   └── backend.Dockerfile
└── nginx/              # Nginx reverse proxy configuration
    └── nginx.conf
```

## Quick Commands
- Development: `docker compose -f deployment/development/docker-compose.yml up --build`
- Production: `docker compose -f deployment/production/docker-compose.yml up -d --build`
