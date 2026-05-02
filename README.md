# Smart Waste Image Classifier

🗑️ **AI-powered waste classification using deep learning**

Upload a waste image and instantly get recycling/disposal guidance with 82.84% accuracy using ResNet50.

**Live**: https://mushfiq-azam.github.io/smart-waste-image-classifier/

---

## 📁 Project Structure

```
smart-waste-image-classifier/
│
├── 📁 frontend/                ← Web UI (HTML, CSS, JS)
│   ├── index.html              Main landing page
│   ├── style.css               Global styles & theme
│   └── assets/
│       ├── app.js              Frontend logic
│       ├── config.js           Environment config
│       └── demo.png            Demo screenshot
│
├── 📁 backend/                 ← FastAPI server
│   ├── app/
│   │   ├── main.py             FastAPI app & endpoints
│   │   ├── categories.py       Waste categories & guidance
│   │   ├── utils.py            Image validation/processing
│   │   ├── startup.py          Model initialization
│   │   └── __init__.py         Package init
│   ├── requirements.txt        Python dependencies
│   ├── Procfile                Render deployment config
│   ├── runtime.txt             Python version
│   └── render.yaml             Render service config
│
├── 📁 docs/                    ← Documentation
│   ├── README.md               Full project documentation
│   ├── QUICKSTART.md           Local development guide
│   ├── DEPLOYMENT.md           Render backend setup
│   ├── GITHUB_PAGES.md         GitHub Pages deployment
│   ├── TESTING.md              QA testing checklist
│   └── API.md                  Backend API reference
│
├── 📁 config/                  ← Configuration templates
│   └── .env.example            Environment variables
│
├── 📁 notebooks/               ← ML training notebooks
│   ├── 01_data_collection.ipynb
│   ├── 02_data_cleaning.ipynb
│   └── 03_model_training.ipynb
│
├── .gitignore                  Git ignore rules
├── model_fixed.pkl             Trained ResNet50 model
└── LICENSE                     MIT License

```

---

## 🚀 Quick Start

### **Option 1: Local Development**

```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate  # or: source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

# Frontend (new terminal)
cd frontend
python -m http.server 8080
# Open: http://localhost:8080
```

### **Option 2: Deploy to Production**

**Backend to Render**: See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

**Frontend to GitHub Pages**: See [docs/GITHUB_PAGES.md](docs/GITHUB_PAGES.md)

---

## 📊 Features

✅ **Classification**
- ResNet50 deep learning model
- 82.84% accuracy
- 10+ waste categories
- Instant predictions

✅ **User Interface**
- Modern, responsive design
- Dark/Light mode toggle
- Drag-and-drop upload
- Real-time results
- Classification history
- Share functionality

✅ **Mobile Ready**
- Camera capture support
- Touch-friendly design
- Works on all devices

✅ **Production**
- CORS configured
- Error handling
- Health check endpoints
- Environment-based config

---

## 🧠 Waste Categories

| Category | Status | Guidance |
|----------|--------|----------|
| Plastic | ♻️ Recyclable | Blue bin, remove caps |
| Glass | ♻️ Recyclable | Glass bin, rinse |
| Metal | ♻️ Recyclable | Can recycling, crush |
| Paper | ♻️ Recyclable | Keep dry, flatten |
| Cardboard | ♻️ Recyclable | Flatten, remove contents |
| Food Waste | 🌱 Compostable | Composting bin |
| Battery | ⚠️ Hazardous | Special recycling center |
| E-Waste | ⚠️ Hazardous | Certified e-waste recycler |
| Textile | 🔄 Reusable | Donate or textile recycling |
| Medical Waste | ⚠️ Hazardous | Medical facility disposal |

---

## 🛠️ Tech Stack

**Frontend**
- HTML5, CSS3, Vanilla JavaScript
- Responsive design
- LocalStorage for persistence
- Fetch API for backend calls

**Backend**
- Python 3.11+
- FastAPI web framework
- PyTorch + FastAI
- ResNet50 transfer learning
- Uvicorn ASGI server

**Deployment**
- GitHub Pages (frontend)
- Render (backend)
- GitHub Actions (CI/CD ready)

**Model**
- Architecture: ResNet50
- Training: Transfer Learning
- Accuracy: 82.84%
- Framework: FastAI + PyTorch

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [docs/README.md](docs/README.md) | Full project documentation |
| [docs/QUICKSTART.md](docs/QUICKSTART.md) | Local setup & testing |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Backend deployment guide |
| [docs/GITHUB_PAGES.md](docs/GITHUB_PAGES.md) | Frontend deployment guide |
| [docs/TESTING.md](docs/TESTING.md) | QA testing checklist |
| [docs/API.md](docs/API.md) | Backend API reference |

---

## 🔑 Key Endpoints

```
GET /health              ← Health check
POST /predict            ← Classify image
GET /docs                ← Interactive API docs (Swagger UI)
```

---

## 📋 API Response Example

```json
{
  "category": "plastic",
  "confidence": 0.94,
  "guidance": "Place in blue recycling bin...",
  "is_recyclable": true,
  "color": "#3498DB"
}
```

---

## 🧪 Testing

Run the comprehensive test suite:

```bash
# See docs/TESTING.md for full checklist
```

Tests cover:
- UI/UX interactions
- Image upload & validation
- API integration
- Mobile responsiveness
- Performance benchmarks
- Accessibility
- Edge cases

---

## 🔐 Environment Variables

```bash
# Backend config
API_URL=http://localhost:8000
MODEL_PATH=model_fixed.pkl
ALLOWED_ORIGINS=http://localhost:3000,https://mushfiq-azam.github.io

# See config/.env.example for full list
```

---

## 📊 Model Performance

| Metric | Value |
|--------|-------|
| Accuracy | 82.84% |
| Architecture | ResNet50 |
| Training | Transfer Learning |
| Dataset | 1,500+ images |
| Classes | 10 waste types |

---

## 👨‍💻 Development

### Setup Development Environment

```bash
# Clone repo
git clone https://github.com/Mushfiq-Azam/smart-waste-image-classifier
cd smart-waste-image-classifier

# Backend dev setup
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

# Frontend dev setup
cd ../frontend
# Just open index.html or use python -m http.server
```

### File Structure for Development

- **frontend/** - All UI code here
- **backend/** - All server code here
- **docs/** - All documentation here
- **notebooks/** - Training & analysis here

---

## 🚀 Deployment

### Backend → Render

1. Connect GitHub repo to Render
2. Set build command: `pip install -r backend/requirements.txt`
3. Set start command: `uvicorn backend.app.main:app --host 0.0.0.0`
4. Deploy!

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed steps.

### Frontend → GitHub Pages

1. Update API URL in `frontend/assets/config.js`
2. Push to `main` branch
3. GitHub Pages auto-deploys

See [docs/GITHUB_PAGES.md](docs/GITHUB_PAGES.md) for detailed steps.

---

## 📈 Performance

| Metric | Target | Current |
|--------|--------|---------|
| Page Load | <3s | ✅ <2s |
| Classification | <5s | ✅ <2s (local) |
| Lighthouse | 85+ | ✅ 90+ |
| Mobile Score | 85+ | ✅ 90+ |

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m "Add amazing feature"`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 👨‍💼 Author

**Mushfiq Azam**

- GitHub: [@Mushfiq-Azam](https://github.com/Mushfiq-Azam)
- Project: Capstone 2026

---

## 🙏 Acknowledgments

- ResNet50 architecture & pretrained weights
- FastAI framework
- PyTorch deep learning library
- Hugging Face for model hosting
- GitHub & Render for deployment

---

## 📞 Support

- 📖 Read [docs/](docs/) for detailed guides
- 🐛 Report issues on [GitHub Issues](https://github.com/Mushfiq-Azam/smart-waste-image-classifier/issues)
- 💬 Start a [GitHub Discussion](https://github.com/Mushfiq-Azam/smart-waste-image-classifier/discussions)

---

**Last Updated**: May 2026  
**Status**: ✅ Production Ready
