"""
Image preprocessing utilities for waste classification.
"""

from PIL import Image
import io
from pathlib import Path

def process_image(file_bytes: bytes, max_size: int = 224) -> Image.Image:
    """
    Process uploaded image for model inference.

    Args:
        file_bytes: Raw image bytes from upload
        max_size: Target size for model (ResNet50 typically uses 224x224)

    Returns:
        PIL Image ready for model inference
    """
    # Open image from bytes
    img = Image.open(io.BytesIO(file_bytes))

    # Convert RGBA to RGB if needed
    if img.mode in ('RGBA', 'LA', 'P'):
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
        img = background

    # Resize maintaining aspect ratio
    img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)

    # Pad to exact size if needed
    if img.size != (max_size, max_size):
        padded = Image.new('RGB', (max_size, max_size), (255, 255, 255))
        offset = ((max_size - img.size[0]) // 2, (max_size - img.size[1]) // 2)
        padded.paste(img, offset)
        img = padded

    return img

def validate_image_file(file_bytes: bytes, max_file_size_mb: int = 10) -> tuple[bool, str]:
    """
    Validate image file for processing.

    Args:
        file_bytes: Image file bytes
        max_file_size_mb: Maximum file size in MB

    Returns:
        Tuple of (is_valid, error_message)
    """
    # Check file size
    file_size_mb = len(file_bytes) / (1024 * 1024)
    if file_size_mb > max_file_size_mb:
        return False, f"File too large. Max {max_file_size_mb}MB allowed."

    # Try to open and validate image format
    try:
        img = Image.open(io.BytesIO(file_bytes))
        img.verify()

        # Re-open after verify (which closes the file)
        img = Image.open(io.BytesIO(file_bytes))

        # Check if format is supported
        if img.format not in ['JPEG', 'PNG', 'WEBP']:
            return False, f"Unsupported format: {img.format}. Use JPG, PNG, or WEBP."

        return True, ""

    except Exception as e:
        return False, f"Invalid image: {str(e)}"
