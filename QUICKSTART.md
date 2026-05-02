# Quick Start Guide

Get the Smart Waste Classifier running locally in 5 minutes.

## Local Backend Setup

### 1. Install Dependencies

```bash
# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install packages
pip install -r requirements.txt
```

### 2. Run Backend Server

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

### 3. Test the API

In another terminal:

```bash
# Health check
curl http://localhost:8000/health

# View API docs
# Open browser to: http://localhost:8000/docs

# Test with image (replace path with actual image)
curl -X POST -F "file=@test_image.jpg" http://localhost:8000/predict
```

## Local Frontend Setup

### 1. Update API URL

Edit `assets/app.js`:
```javascript
const API_URL = "http://localhost:8000";
```

### 2. Serve Frontend

Option A: Simple Python server
```bash
python -m http.server 8080
# Then open http://localhost:8080
```

Option B: Using Node.js (if installed)
```bash
npx serve
```

Option C: Just open the file
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

## Full End-to-End Test

1. **Terminal 1** - Start backend:
   ```bash
   python -m uvicorn app.main:app --reload
   ```

2. **Terminal 2** - Start frontend:
   ```bash
   python -m http.server 8080
   ```

3. **Browser** - Open `http://localhost:8080`

4. **Test** - Upload a waste image, see prediction!

## Common Issues

### ModuleNotFoundError: No module named 'torch'

PyTorch is large, installation might take 5+ minutes. Be patient!

```bash
# Force reinstall
pip install --upgrade --force-reinstall torch torchvision
```

### CORS Error

Check that API_URL in `assets/app.js` matches your backend URL.

### Image Upload Not Working

1. Browser console should show what's wrong (F12 → Console)
2. Make sure backend is running (check `http://localhost:8000/health`)
3. File size must be under 10MB
4. Format must be JPG, PNG, or WEBP

### Model Not Found Error

`model_fixed.pkl` must be in the project root directory:
```
smart-waste-image-classifier/
├── model_fixed.pkl          ← HERE
├── app/
├── index.html
└── ...
```

## Production Deployment

When ready to deploy:

1. **Backend** → Render (see [DEPLOYMENT.md](DEPLOYMENT.md))
2. **Frontend** → GitHub Pages (update `API_URL` to Render URL)
3. **Test** → Both services together

## File Structure Reference

```
smart-waste-image-classifier/
├── index.html              ← Open in browser
├── style.css               ← Styling
├── assets/
│   └── app.js              ← Frontend logic
├── app/
│   ├── main.py             ← FastAPI server
│   ├── categories.py       ← Waste types data
│   ├── utils.py            ← Image processing
│   └── __init__.py
├── model_fixed.pkl         ← ML model
├── requirements.txt        ← Python dependencies
├── README.md               ← Project info
└── DEPLOYMENT.md           ← Deploy guide
```

## Next Steps

- Read [README.md](README.md) for full documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- See [app/categories.py](app/categories.py) for waste types
- Explore `assets/app.js` to customize behavior

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | API info |
| `/health` | GET | Health check |
| `/predict` | POST | Classify image |
| `/docs` | GET | Interactive docs |

## Debug Mode

Enable detailed logging:

```bash
# In app/main.py, change:
logging.basicConfig(level=logging.DEBUG)

# Then run:
python -m uvicorn app.main:app --reload --log-level debug
```

---

Happy classifying! 🗑️ 🎉
