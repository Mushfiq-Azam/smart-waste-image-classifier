"""
FastAPI backend for Smart Waste Image Classifier.
Serves predictions from ResNet50 model trained with FastAI.
"""

import logging
from pathlib import Path
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

from app.categories import get_category_info
from app.utils import process_image, validate_image_file

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Smart Waste Image Classifier API",
    description="AI-powered waste classification using ResNet50",
    version="1.0.0"
)

# CORS middleware to allow requests from GitHub Pages and other origins
origins = [
    "http://localhost:3000",
    "http://localhost:5500",
    "http://localhost:8000",
    "http://localhost:8080",
    "http://localhost",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:8080",
    "null",
    "https://mushfiq-azam.github.io",
    "https://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model instance
model = None

class PredictionResponse(BaseModel):
    """Response model for prediction endpoint."""
    category: str
    confidence: float
    guidance: str
    is_recyclable: bool
    color: str

class HealthResponse(BaseModel):
    """Response model for health check."""
    status: str
    model_loaded: bool

def load_model():
    """Load the trained FastAI model."""
    global model
    try:
        from fastai.vision.all import load_learner

        model_path = Path(os.getenv("MODEL_PATH", "model_fixed.pkl"))
        if not model_path.exists():
            project_model_path = Path(__file__).resolve().parents[1] / "model_fixed.pkl"
            if project_model_path.exists():
                model_path = project_model_path

        if not model_path.exists():
            logger.error(f"Model file not found at {model_path}")
            return False

        logger.info(f"Loading model from {model_path}...")
        model = load_learner(model_path)
        logger.info("Model loaded successfully!")
        return True
    except Exception as e:
        logger.error(f"Failed to load model: {str(e)}")
        return False

@app.on_event("startup")
async def startup_event():
    """Load model on application startup."""
    success = load_model()
    if success:
        logger.info("API startup successful - model ready")
    else:
        logger.warning("API startup with model loading issues")

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint.
    Returns status of API and whether model is loaded.
    """
    return HealthResponse(
        status="ok",
        model_loaded=model is not None
    )

@app.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    """
    Classify waste image and return prediction.

    Args:
        file: Image file (JPG, PNG, WEBP)

    Returns:
        PredictionResponse with category, confidence, and guidance
    """
    # Validate model is loaded
    if model is None:
        logger.error("Model not loaded when prediction requested")
        raise HTTPException(status_code=503, detail="Model not ready. Please try again.")

    # Read file
    try:
        file_bytes = await file.read()
    except Exception as e:
        logger.error(f"Failed to read uploaded file: {str(e)}")
        raise HTTPException(status_code=400, detail="Failed to read file.")

    # Validate image
    is_valid, error_msg = validate_image_file(file_bytes)
    if not is_valid:
        logger.warning(f"Image validation failed: {error_msg}")
        raise HTTPException(status_code=400, detail=error_msg)

    try:
        # Process image
        processed_img = process_image(file_bytes)

        # Run inference
        logger.info("Running inference...")
        pred_label, pred_idx, probs = model.predict(processed_img)

        # Get confidence score
        confidence = float(probs[pred_idx])

        # Get category information
        category_info = get_category_info(str(pred_label))

        logger.info(f"Prediction: {pred_label} (confidence: {confidence:.2%})")

        return PredictionResponse(
            category=str(pred_label),
            confidence=confidence,
            guidance=category_info["guidance"],
            is_recyclable=category_info["is_recyclable"],
            color=category_info["color"]
        )

    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Prediction failed. Please try again.")

@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Smart Waste Image Classifier API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "predict": "/predict",
            "docs": "/docs"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
