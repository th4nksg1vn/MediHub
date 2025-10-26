# ConnectedCare AI Backend

This is the FastAPI backend for the Health Data for Good (ConnectedCare Edition) project.

## Features
- AI symptom triage endpoint (placeholder)
- CORS enabled for local frontend development

## Development

### Run locally
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Run with Docker
```bash
docker build -t connectedcare-backend .
docker run -p 8000:8000 connectedcare-backend
```
