# AI Services Architecture (`ai-services/`)

This directory contains standalone, modular microservice engines for the Jharkhand Problem-to-Impact Platform:

```
ai-services/
├── problem-analyzer/       # Extracts skills, domain vectors, and constraints into Problem DNA
├── duplicate-detector/     # Semantic cosine similarity engine to detect duplicates & clusters
├── clustering/             # Geospatial and category clustering across Jharkhand's 24 districts
├── priority-engine/        # 9-factor transparent explainable priority score calculator (0-100)
├── matching-engine/        # Multi-tier matchmaker for Universities, Student Teams, Experts, Industry
├── solution-analyzer/      # Synthesizes Solution DNA from technical proposals
└── gap-analysis/           # Matrix difference comparison between Problem DNA and Solution DNA
```

## AI Modes
1. `AI_MODE=mock`: Fast, deterministic, high-fidelity offline mode suitable for local presentation and zero-API-key setups.
2. `AI_MODE=api`: Pluggable adapter for live LLMs (Gemini, OpenAI, Claude, or local Ollama).
