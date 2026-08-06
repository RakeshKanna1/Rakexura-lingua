# Deployment & Topology Guide

## Environment Variables

### Frontend (.env.local / Vercel)
- `NEXT_PUBLIC_TRANSLATOR_PROVIDER`: `fastapi` | `next-api` | `mock`
- `NEXT_PUBLIC_TRANSLATION_API_URL`: Backend URL (e.g. `https://api.rakexura-lingua.com`)

### Backend (.env / Docker)
- `PROJECT_NAME`: `"Rakexura Lingua Translation Engine"`
- `API_V1_STR`: `"/v1"`
- `BACKEND_CORS_ORIGINS`: `["https://rakexura-lingua.com"]`
- `TRANSCRIPTION_PROVIDER`: `whisper` | `gemini` | `openai` | `mock`
- `TRANSLATION_PROVIDER`: `gemini` | `openai` | `deepl` | `mock`

## Health Checks
- Process check: `GET /health`
- Kubernetes Readiness Probe: `GET /ready` (returns 503 if not ready)
