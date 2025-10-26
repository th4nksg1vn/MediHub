from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="ConnectedCare AI Backend")

# Allow CORS for local frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "ConnectedCare AI Backend is running."}

# Placeholder for AI symptom triage endpoint
@app.post("/api/triage")
def triage_symptoms(symptoms: dict):
    # TODO: Integrate ML model
    return {"severity": "moderate", "advice": "Stay hydrated and rest."}
