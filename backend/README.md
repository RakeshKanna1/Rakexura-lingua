# Rakexura Lingua — FastAPI Backend Engine

Standalone Python translation service powered by FastAPI, Pydantic, and Uvicorn.

## API Endpoints

- `GET /health`: Lightweight process liveness check.
- `GET /ready`: Dependency readiness check (returns 503 if providers unavailable).
- `POST /v1/translate/text`: Translate Hinglish text input.
- `POST /v1/translate/audio`: Transcribe and translate audio voice notes.

## Run Backend
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Run Pytest Suite
```bash
pytest
```
