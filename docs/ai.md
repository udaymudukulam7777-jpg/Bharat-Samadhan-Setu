# Jharkhand Samadhan Setu - AI Services & Algorithms

## 1. AI Architecture & Abstraction
The AI engine is decoupled from specific LLM vendors via `AIServiceInterface`.
- **`AI_MODE=mock` (Default)**: Generates deterministic, high-fidelity, believable Jharkhand-specific responses with 0 external API dependencies.
- **`AI_MODE=api`**: Pluggable adapter for live LLM providers (Gemini 1.5, OpenAI, Anthropic, or open-source models).

## 2. Core AI Submodules

### A. Problem Analyzer & DNA Generator
- Ingests raw text, multilingual voice transcripts (Hindi/Santali), or mobile photo metadata.
- Produces multi-vector representation:
  - Domain / Subdomain classification
  - Severity (0-10) and Urgency (0-10)
  - Required skills and laboratory resources
  - Physical ground constraints and institutional dependencies

### B. Duplicate Detection & Clustering
- Performs semantic cosine similarity against historical reports.
- Computes match percentage, lists shared keywords, and gives citizens the choice to support existing reports or submit new ones.
- Groups localized problems into regional problem clusters (e.g., `CLU-WATER-RANCHI-01`).

### C. Transparent Priority Engine
- Replaces black-box scoring with an explainable 0-100 formula:
  $$\text{Priority} = \text{Severity (20)} + \text{Urgency (15)} + \text{Population (15)} + \text{Safety (10)} + \text{Spread (10)} + \text{Frequency (5)} + \text{Community (10)} + \text{Environment (10)} + \text{Govt (5)}$$

### D. Multi-Tier Capability Matchmaker
- Cosine similarity matching between Problem DNA and:
  - University Capability Profiles (BIT Mesra, NIT Jamshedpur, IIT ISM)
  - Student Team Skill Matrices (identifies covered skills and missing gaps)
  - Domain Expert Profiles
  - Industry Partner CSR Resource Inventories

### E. Solution Gap Analysis
- Matrix diff comparing Problem DNA vs Solution DNA.
- Flags technical gaps, resource gaps, and domain shortages.
- Recommends specific remedial experts, calibration labs, or CSR funding.

### F. Project Blocker Diagnostics
- Evaluates milestone progress and unfulfilled prerequisites.
- Identifies delayed dependencies (e.g. NABL water calibration standard) and prescribes partner resolution.

### G. Impact Score Engine
- Calculates explainable 0-100 impact score from verified before/after deltas, beneficiary reach, adoption rate, and solar energy autonomy.
