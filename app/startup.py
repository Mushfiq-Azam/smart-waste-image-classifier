"""
Startup script for model download and initialization.
This script runs on Render deployment to download the model from cloud storage if needed.
"""

import os
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

MODEL_PATH = Path("model_fixed.pkl")

def ensure_model_exists():
    """Ensure model file exists, download if necessary."""
    if MODEL_PATH.exists():
        logger.info(f"Model found at {MODEL_PATH}")
        return True

    logger.info("Model not found locally. Attempting to download...")

    # Option 1: If model is in repo (under 100MB)
    # The model_fixed.pkl should be in the repo root

    # Option 2: Download from Hugging Face Hub (if uploaded there)
    # download_from_huggingface()

    # Option 3: Download from Google Drive or other cloud
    # download_from_drive()

    if not MODEL_PATH.exists():
        logger.warning("Model file not found and could not be downloaded.")
        logger.info("Make sure model_fixed.pkl is in the root directory.")
        return False

    return True

def download_from_huggingface():
    """Download model from Hugging Face Hub."""
    try:
        from huggingface_hub import hf_hub_download
        logger.info("Downloading model from Hugging Face Hub...")
        hf_hub_download(
            repo_id="mushfiqazam/smart-waste-classifier",
            filename="model_fixed.pkl",
            local_dir=".",
        )
        logger.info("Model downloaded successfully")
    except Exception as e:
        logger.error(f"Failed to download from Hugging Face: {str(e)}")

def download_from_drive():
    """Download model from Google Drive (if stored there)."""
    try:
        import gdown
        logger.info("Downloading model from Google Drive...")
        # Replace with actual Google Drive file ID
        FILE_ID = "YOUR_GOOGLE_DRIVE_FILE_ID"
        gdown.download(f"https://drive.google.com/uc?id={FILE_ID}", "model_fixed.pkl", quiet=False)
        logger.info("Model downloaded successfully")
    except Exception as e:
        logger.error(f"Failed to download from Google Drive: {str(e)}")

if __name__ == "__main__":
    ensure_model_exists()
