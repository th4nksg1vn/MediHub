from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from openai import OpenAI
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Initialize OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai_client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

# Choose which AI to use (default to OpenAI if available, otherwise Gemini)
USE_OPENAI = bool(OPENAI_API_KEY)

app = FastAPI(title="MediHub AI Health Assistant")

# Allow CORS for local frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response Models
class TriageRequest(BaseModel):
    symptoms: List[str] = Field(..., description="List of symptoms")
    duration: str = Field(..., description="Duration of symptoms")
    age: int = Field(..., description="Age of the patient")
    additional_notes: Optional[str] = Field(None, description="Additional information")


class TriageResponse(BaseModel):
    urgency: str = Field(..., description="Urgency level: low, moderate, or high")
    advice: str = Field(..., description="AI advice on what to do next")


class ReliefResponse(BaseModel):
    relief_tips: str = Field(..., description="Home remedies and monitoring tips")


class RiskRequest(BaseModel):
    heart_rate: int = Field(..., description="Current heart rate")
    sleep_hours: float = Field(..., description="Hours of sleep")
    mood: str = Field(..., description="Current mood/mental state")
    recent_symptoms: List[str] = Field([], description="Recent symptoms if any")


class RiskResponse(BaseModel):
    risk_level: str = Field(..., description="Risk level: low, moderate, or high")
    prediction: str = Field(..., description="Predicted health risk and recommendations")


# Cache the working Gemini model
_cached_gemini_model = None
_cached_model_name = None

def get_gemini_model():
    """Get or configure Gemini model"""
    global _cached_gemini_model, _cached_model_name
    
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API key not configured")
    
    if _cached_gemini_model:
        return _cached_gemini_model
    
    # Get list of available models first
    try:
        models = genai.list_models()
        available_models = []
        for model in models:
            if 'generateContent' in model.supported_generation_methods:
                # Remove 'models/' prefix if present
                name = model.name.replace('models/', '')
                available_models.append(name)
        
        if not available_models:
            raise HTTPException(status_code=500, detail="No available Gemini models found. Check your API key.")
        
        # Try the first available model
        model_name = available_models[0]
        model = genai.GenerativeModel(model_name)
        _cached_gemini_model = model
        _cached_model_name = model_name
        return model
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error initializing Gemini model: {str(e)}")


def call_ai(prompt: str, system_prompt: str = None):
    """Call either OpenAI or Gemini API"""
    if USE_OPENAI and openai_client:
        # Use OpenAI
        try:
            messages = []
            if system_prompt:
                messages.append({"role": "system", "content": system_prompt})
            messages.append({"role": "user", "content": prompt})
            
            response = openai_client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                temperature=0.7,
                max_tokens=1000
            )
            
            return response.choices[0].message.content
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")
    
    elif GEMINI_API_KEY:
        # Use Gemini
        try:
            model = get_gemini_model()
            full_prompt = prompt
            if system_prompt:
                full_prompt = f"{system_prompt}\n\n{prompt}"
            
            response = model.generate_content(full_prompt)
            return response.text
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Gemini API error: {str(e)}")
    
    else:
        raise HTTPException(status_code=500, detail="No AI service configured. Please add OPENAI_API_KEY or GEMINI_API_KEY")


@app.get("/")
def root():
    return {"message": "MediHub AI Health Assistant is running."}


@app.post("/ai/triage", response_model=TriageResponse)
def ai_triage(request: TriageRequest):
    """
    AI symptom triage endpoint.
    Returns urgency level and advice based on symptoms.
    """
    system_prompt = "You are a medical AI assistant providing symptom triage. Always recommend consulting a healthcare professional when appropriate."
    
    prompt = f"""Patient Information:
- Age: {request.age}
- Symptoms: {', '.join(request.symptoms)}
- Duration: {request.duration}
- Additional notes: {request.additional_notes or 'None'}

Analyze the symptoms and provide:
1. Urgency level (choose ONE: low, moderate, high)
2. Advice on what the patient should do next

Format your response EXACTLY as:
URGENCY: <urgency_level>
ADVICE: <your_advice>"""

    try:
        response_text = call_ai(prompt, system_prompt)
        
        # Parse response
        urgency = "moderate"  # default
        advice = "Monitor symptoms and consult a healthcare provider if conditions worsen."
        
        lines = response_text.split("\n")
        for line in lines:
            if line.startswith("URGENCY:"):
                urgency_text = line.split(":", 1)[1].strip().lower()
                if "high" in urgency_text:
                    urgency = "high"
                elif "low" in urgency_text:
                    urgency = "low"
                else:
                    urgency = "moderate"
            elif line.startswith("ADVICE:"):
                advice = line.split(":", 1)[1].strip()
        
        return TriageResponse(urgency=urgency, advice=advice)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")


@app.post("/ai/suggest-relief", response_model=ReliefResponse)
def ai_suggest_relief(request: TriageRequest):
    """
    AI relief suggestions endpoint.
    Provides home remedies and monitoring tips for low/moderate urgency cases.
    """
    system_prompt = "You are a medical AI assistant providing home relief suggestions. Provide general wellness advice only. Not a substitute for professional medical care."
    
    prompt = f"""Patient Information:
- Age: {request.age}
- Symptoms: {', '.join(request.symptoms)}
- Duration: {request.duration}
- Additional notes: {request.additional_notes or 'None'}

Provide safe home remedies and monitoring tips for these symptoms.
Include:
1. Home treatment suggestions
2. Things to monitor
3. When to seek medical attention

Format your response as:
RELIEF: <your suggestions>"""

    try:
        response_text = call_ai(prompt, system_prompt)
        
        # Extract relief tips
        relief_tips = response_text
        if "RELIEF:" in response_text:
            relief_tips = response_text.split("RELIEF:", 1)[1].strip()
        
        return ReliefResponse(relief_tips=relief_tips)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")


@app.post("/ai/predict-risk", response_model=RiskResponse)
def ai_predict_risk(request: RiskRequest):
    """
    AI risk prediction endpoint (Phase 2).
    Analyzes daily vitals and symptoms to detect early warning signs.
    """
    system_prompt = "You are a medical AI assistant analyzing daily health data to predict health risks. This is for early detection and is not a medical diagnosis."
    
    prompt = f"""Health Data:
- Heart Rate: {request.heart_rate} bpm
- Sleep Hours: {request.sleep_hours} hours
- Mood: {request.mood}
- Recent Symptoms: {', '.join(request.recent_symptoms) if request.recent_symptoms else 'None'}

Analyze this data and provide:
1. Risk level (low, moderate, high)
2. Prediction of potential health issues and recommendations

Format your response EXACTLY as:
RISK: <risk_level>
PREDICTION: <your_prediction>"""

    try:
        response_text = call_ai(prompt, system_prompt)
        
        # Parse response
        risk_level = "moderate"  # default
        prediction = "Continue monitoring your health data. Consider consulting a healthcare provider."
        
        lines = response_text.split("\n")
        for line in lines:
            if line.startswith("RISK:"):
                risk_text = line.split(":", 1)[1].strip().lower()
                if "high" in risk_text:
                    risk_level = "high"
                elif "low" in risk_text:
                    risk_level = "low"
                else:
                    risk_level = "moderate"
            elif line.startswith("PREDICTION:"):
                prediction = line.split(":", 1)[1].strip()
        
        return RiskResponse(risk_level=risk_level, prediction=prediction)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")
