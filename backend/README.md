# MediHub AI Health Assistant Backend

FastAPI backend with Google Gemini AI integration for health triage, relief suggestions, and risk prediction.

## Features
- AI symptom triage (`/ai/triage`)
- AI relief suggestions (`/ai/suggest-relief`)
- AI risk prediction (`/ai/predict-risk`)
- CORS enabled for frontend development

## Tech Stack
- FastAPI (Python)
- OpenAI (GPT-4o-mini) **OR** Google Gemini AI
- Pydantic models for request/response validation

## Setup

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure API Key

Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

**Option A: Use OpenAI (Recommended)**
```
OPENAI_API_KEY=your_openai_key_here
```
Get your API key from: https://platform.openai.com/api-keys

**Option B: Use Google Gemini**
```
GEMINI_API_KEY=your_gemini_key_here
```
Get your API key from: https://ai.google.dev/

**Note:** The backend will use OpenAI if available, otherwise it will fall back to Gemini.

### 3. Run Locally
```bash
uvicorn main:app --reload
```

The API will be available at: http://localhost:8000

## API Endpoints

### POST /ai/triage
Analyze symptoms and get urgency level + advice.

**Request:**
```json
{
  "symptoms": ["fever", "chest pain"],
  "duration": "2 days",
  "age": 22,
  "additional_notes": "feels tired"
}
```

**Response:**
```json
{
  "urgency": "high",
  "advice": "Seek urgent medical attention immediately..."
}
```

### POST /ai/suggest-relief
Get home remedies and monitoring tips.

**Request:** Same as `/ai/triage`

**Response:**
```json
{
  "relief_tips": "Drink warm fluids, rest, monitor temperature..."
}
```

### POST /ai/predict-risk
Analyze daily vitals to detect early warning signs.

**Request:**
```json
{
  "heart_rate": 88,
  "sleep_hours": 5,
  "mood": "stressed",
  "recent_symptoms": ["mild headache"]
}
```

**Response:**
```json
{
  "risk_level": "moderate",
  "prediction": "Possible early signs of exhaustion..."
}
```

## Deployment on Render

1. Connect your GitHub repository
2. Select the backend folder
3. Add environment variable(s):
   - For OpenAI: `OPENAI_API_KEY` = your OpenAI key
   - For Gemini: `GEMINI_API_KEY` = your Gemini key
   - (OpenAI takes priority if both are set)
4. Deploy!

The Procfile will automatically start the server on port 10000.

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
