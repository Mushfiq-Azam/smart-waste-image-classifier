# Backend API Reference

Complete API documentation for the Smart Waste Image Classifier backend.

## Base URL

- **Local**: `http://localhost:8000`
- **Production**: `https://smart-waste-classifier.onrender.com`

## Authentication

No authentication required. Public API.

---

## Endpoints

### 1. Health Check

Check if the API and model are running.

```http
GET /health
```

**Response** (200 OK):
```json
{
  "status": "ok",
  "model_loaded": true
}
```

**Use Case**: Monitor API health, verify deployment

---

### 2. Predict Waste Category

Classify an uploaded image and return waste category.

```http
POST /predict
Content-Type: multipart/form-data

file: <image_file>
```

**Request**:
- **Content-Type**: `multipart/form-data`
- **Field**: `file` (required, image file)
- **Formats**: JPG, PNG, WEBP
- **Max Size**: 10MB

**Response** (200 OK):
```json
{
  "category": "plastic",
  "confidence": 0.94,
  "guidance": "Place in blue recycling bin. Remove caps and rinse bottles before recycling. Avoid plastic bags in bins.",
  "is_recyclable": true,
  "color": "#3498DB"
}
```

**Response Fields**:
- `category` (string): Predicted waste category
- `confidence` (float): 0.0 to 1.0 confidence score
- `guidance` (string): Disposal/recycling instructions
- `is_recyclable` (boolean): Whether item is recyclable
- `color` (string): Category color (hex code)

**Error Responses**:

```json
// 400 Bad Request - Invalid file
{
  "detail": "Invalid file type. Use JPG, PNG, or WEBP."
}

// 400 Bad Request - File too large
{
  "detail": "File too large. Max 10MB allowed."
}

// 503 Service Unavailable - Model not loaded
{
  "detail": "Model not ready. Please try again."
}

// 500 Internal Server Error - Processing failed
{
  "detail": "Prediction failed. Please try again."
}
```

**Example cURL**:
```bash
curl -X POST -F "file=@plastic-bottle.jpg" \
  http://localhost:8000/predict
```

**Example Python**:
```python
import requests

with open('plastic-bottle.jpg', 'rb') as f:
    files = {'file': f}
    response = requests.post(
        'http://localhost:8000/predict',
        files=files
    )
    print(response.json())
```

**Example JavaScript**:
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('http://localhost:8000/predict', {
  method: 'POST',
  body: formData
})
.then(r => r.json())
.then(data => console.log(data));
```

---

### 3. Interactive API Docs

Swagger UI for testing endpoints interactively.

```
GET /docs
```

Access in browser: `http://localhost:8000/docs`

---

## Waste Categories

The model classifies waste into these categories:

| Category | Code | Recyclable | Color |
|----------|------|-----------|-------|
| Plastic | `plastic` | ✅ Yes | #3498DB |
| Glass | `glass` | ✅ Yes | #95A5A6 |
| Metal | `metal` | ✅ Yes | #C0C0C0 |
| Paper | `paper` | ✅ Yes | #E8E8E8 |
| Cardboard | `cardboard` | ✅ Yes | #D2B48C |
| Food Waste | `food_waste` | ❌ No* | #8B4513 |
| Battery | `battery` | ✅ Yes* | #FF0000 |
| E-Waste | `e_waste` | ✅ Yes* | #FF6B6B |
| Textile | `textile` | ✅ Yes | #9B59B6 |
| Medical Waste | `medical_waste` | ❌ No | #FF1744 |

\* Requires special handling

---

## Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad request (invalid file) |
| 422 | Validation error |
| 500 | Server error |
| 503 | Service unavailable (model not loaded) |

---

## Rate Limiting

No rate limiting currently. Public usage encouraged!

---

## CORS Configuration

API accepts requests from:
- `http://localhost:3000` (local dev)
- `http://localhost:8080` (local dev)
- `https://mushfiq-azam.github.io` (GitHub Pages)
- `https://localhost` (secure local)

To add more origins, edit `backend/app/main.py`:
```python
origins = [
    "https://your-domain.com",
]
```

---

## Model Information

- **Architecture**: ResNet50
- **Training**: Transfer Learning
- **Framework**: PyTorch + FastAI
- **Accuracy**: 82.84%
- **Input Size**: 224x224 pixels
- **Classes**: 10 waste types
- **File**: `model_fixed.pkl`

---

## Request/Response Examples

### Example 1: Classify Plastic

**Request**:
```bash
curl -X POST -F "file=@bottle.jpg" \
  http://localhost:8000/predict
```

**Response**:
```json
{
  "category": "plastic",
  "confidence": 0.97,
  "guidance": "Place in blue recycling bin. Remove caps and rinse bottles before recycling.",
  "is_recyclable": true,
  "color": "#3498DB"
}
```

### Example 2: Low Confidence

**Request**:
```bash
curl -X POST -F "file=@blurry-image.jpg" \
  http://localhost:8000/predict
```

**Response**:
```json
{
  "category": "paper",
  "confidence": 0.45,
  "guidance": "Recyclable if clean and dry. Place in paper recycling bin.",
  "is_recyclable": true,
  "color": "#E8E8E8"
}
```

Note: Frontend shows warning if confidence < 60%

### Example 3: Invalid File

**Request**:
```bash
curl -X POST -F "file=@document.pdf" \
  http://localhost:8000/predict
```

**Response** (400):
```json
{
  "detail": "Invalid image: could not identify image file"
}
```

---

## Testing

### Health Check
```bash
curl http://localhost:8000/health
```

### Classify Image
```bash
# Replace with actual image path
curl -X POST -F "file=@test.jpg" \
  http://localhost:8000/predict
```

### View Interactive Docs
```
Open browser to: http://localhost:8000/docs
```

---

## Deployment

### Local Development
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

### Production (Render)
```bash
# Render automatically runs:
# - Build: pip install -r requirements.txt
# - Start: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

---

## Troubleshooting

### "Model not found"
- Ensure `model_fixed.pkl` exists in project root
- Check file path in `backend/app/main.py`

### "Module not found"
- Run: `pip install -r backend/requirements.txt`
- Check Python version (3.11+)

### CORS errors
- Verify origin is in `app/main.py` origins list
- Check `frontend/assets/config.js` has correct API_URL

### Timeout on first request
- Cold start is normal on free tier
- Subsequent requests are faster

### Model load fails
- Check if PyTorch installed correctly
- Try: `pip install --upgrade torch torchvision`

---

## Performance

| Metric | Value |
|--------|-------|
| Cold start | ~30s (first request) |
| Warm start | <2s (local) |
| Render | <5s (typical) |
| Model load | ~5s |
| Prediction | <1s |

---

## Environment Variables

Optional configuration in `.env` file:

```bash
MODEL_PATH=model_fixed.pkl
LOG_LEVEL=INFO
CORS_ORIGINS=https://example.com
```

---

## Security Notes

- No authentication required (public API)
- Files validated before processing
- No file persistence (uploaded files not stored)
- Images processed in-memory
- CORS properly configured

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-05-03 | Initial release |

---

## Support

- 📖 See [README.md](../README.md) for project overview
- 🚀 See [DEPLOYMENT.md](DEPLOYMENT.md) for setup
- 🧪 See [TESTING.md](TESTING.md) for testing
- 💬 GitHub Issues for bug reports

---

**Last Updated**: May 2026  
**Status**: ✅ Production Ready
