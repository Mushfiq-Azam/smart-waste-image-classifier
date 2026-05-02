# 🗑️ Smart Waste Image Classifier

An AI-powered web application that classifies waste images into categories such as plastic, glass, battery, food waste, and more, providing recycling and disposal guidance.

---

## 🔗 Live Links

- 🌐 **Project Website (GitHub Pages)**  
  https://mushfiq-azam.github.io/smart-waste-image-classifier/

- 🚀 **Live AI App (Hugging Face Spaces)**  
  https://huggingface.co/spaces/mushfiqazam/Smart-Waste-Image-Classifier

---

## 📌 Project Overview

Proper waste segregation is critical for environmental sustainability.  
This project uses a **deep learning model (ResNet50)** trained with **FastAI & PyTorch** to classify waste images and suggest appropriate recycling or disposal methods.

Users can simply upload an image and instantly get:
- Waste category
- Confidence score
- Recycling / disposal guidance

---

## 🧠 Technologies Used

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Python FastAPI, Uvicorn
- **ML Framework**: PyTorch, FastAI
- **Model**: ResNet50 (Transfer Learning)
- **Hosting**: GitHub Pages (Frontend) + Render/Railway (Backend)

---

## 📊 Model Accuracy Comparison

To evaluate the effectiveness of different deep learning architectures, multiple models were tested on the waste image classification task.

| Model Architecture | Training Approach | Accuracy |
|-------------------|------------------|----------|
| Custom CNN (Baseline) | Trained from scratch | 71.2% |
| MobileNetV2 | Transfer Learning | 78.6% |
| **ResNet50 (Final Model)** | **Transfer Learning (FastAI)** | **82.84%** |

---

## 🖼️ Demo Screenshot

![Smart Waste Classifier Demo](assets/demo.png)

---

## ⚙️ How It Works

1. User uploads a waste image
2. Image is sent to FastAPI backend
3. ResNet50 model processes the image
4. Model returns prediction, confidence, and recycling guidance
5. Frontend displays result with color-coded badge and disposal tips

---

## 📂 Project Structure

```
smart-waste-image-classifier/
│
├── index.html                  ← Main landing page
├── style.css                   ← Global styles
├── render.yaml                 ← Render deployment config
├── Procfile                    ← Backend start command
├── runtime.txt                 ← Python version (3.11)
├── requirements.txt            ← Python dependencies
├── .gitignore                  ← Git ignore rules
├── README.md                   ← This file
├── model_fixed.pkl             ← Trained ML model (ResNet50)
│
├── app/
│   ├── main.py                 ← FastAPI application
│   ├── categories.py           ← Waste category data & guidance
│   └── utils.py                ← Image preprocessing helpers
│
├── assets/
│   ├── app.js                  ← Frontend JavaScript
│   ├── demo.png                ← Demo screenshot
│   └── favicon.svg             ← Site icon (emoji)
│
├── website/
│   └── about.html              ← About/info page (optional)
│
└── notebooks/
    ├── 01_data_collection.ipynb
    ├── 02_data_cleaning.ipynb
    └── 03_model_training.ipynb
```

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.11+
- Git
- A modern web browser

### Backend Setup (Local Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mushfiq-Azam/smart-waste-image-classifier.git
   cd smart-waste-image-classifier
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows:
   venv\Scripts\activate
   
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the backend server**
   ```bash
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   
   The API will be available at: `http://localhost:8000`
   
   Health check: `http://localhost:8000/health`

5. **Test the API**
   ```bash
   # Test with a sample image
   curl -X POST -F "file=@test_image.jpg" http://localhost:8000/predict
   ```

### Frontend Setup (Local Development)

1. **Update API URL** in `assets/app.js`
   ```javascript
   const API_URL = "http://localhost:8000";  // For local testing
   ```

2. **Open in browser**
   - Simply open `index.html` in your browser
   - Or use a local server: `python -m http.server 8080`

---

## 📡 API Endpoints

### Health Check
```
GET /health

Response:
{
  "status": "ok"
}
```

### Image Prediction
```
POST /predict

Request:
- Content-Type: multipart/form-data
- File: image (JPG, PNG, WEBP)

Response:
{
  "category": "plastic",
  "confidence": 0.94,
  "guidance": "Place in blue recycling bin...",
  "is_recyclable": true,
  "color": "#2ECC71"
}
```

---

## 🎯 Features

- ✅ Real-time image classification
- ✅ High-confidence predictions (82.84% accuracy)
- ✅ User-friendly drag-and-drop interface
- ✅ Mobile responsive design
- ✅ Color-coded waste categories
- ✅ Detailed recycling/disposal guidance
- ✅ Smooth animations and transitions
- ✅ Production-ready deployment

---

## 🔐 Environment Variables

Create a `.env` file in the root directory (not included in git for security):

```env
# Backend Configuration
BACKEND_URL=http://localhost:8000
MODEL_PATH=model_fixed.pkl

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://mushfiq-azam.github.io

# Optional: API Keys for external services
# SENTRY_DSN=your_sentry_key
```

---

## 📦 Deployment

### Deploy Backend to Render

1. Push code to GitHub
2. Connect Render to GitHub repo
3. Set environment variables in Render
4. Render will automatically build and deploy

[See Phase 5 docs for detailed instructions]

### Deploy Frontend to GitHub Pages

1. Push all changes to `main` branch
2. GitHub Actions will auto-deploy to GitHub Pages

[See Phase 6 docs for detailed instructions]

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Local backend runs without errors
- [ ] Health check endpoint returns 200
- [ ] Image upload works with drag-and-drop
- [ ] Image preview displays correctly
- [ ] API call succeeds and returns prediction
- [ ] Result displays with correct category and confidence
- [ ] Mobile responsive (test on phone/tablet)
- [ ] No console errors

---

## 🛠️ Development

### Commands
```bash
# Run backend
python -m uvicorn app.main:app --reload

# Format code
black app/

# Type checking
mypy app/

# Run tests
pytest
```

---

## 📝 Waste Categories

The model classifies waste into these categories:

1. **Plastic** - Recyclable in blue bins
2. **Glass** - Recyclable via glass bins
3. **Metal/Aluminum** - Highly recyclable
4. **Paper** - Recyclable if clean
5. **Cardboard** - Recyclable
6. **Food Waste** - Compostable
7. **Battery** - Hazardous, special disposal
8. **E-Waste** - Hazardous, special disposal
9. **Textile** - Reusable or special recycling
10. **Medical Waste** - Hazardous, special disposal

---

## 👨‍💻 Author

**Mushfiq Azam**  
Capstone Project — 2026

---

## 📜 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m "Add amazing feature"`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

Have questions? Open an [Issue](https://github.com/Mushfiq-Azam/smart-waste-image-classifier/issues) on GitHub.

---

## 🔗 Resources

- [FastAI Documentation](https://docs.fast.ai/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [PyTorch Documentation](https://pytorch.org/docs/)
- [Render Deployment Docs](https://render.com/docs)
