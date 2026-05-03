# Deploy Backend to Render

This guide walks through deploying the FastAPI backend to Render.com (free tier).

## Prerequisites

- GitHub account with repo pushed
- Render.com account (free)
- Model file `model_fixed.pkl` in repo root (under 100MB)

## Step 1: Prepare Repository

Ensure these files exist in your repo:
```
requirements.txt      ← Dependency list
Procfile             ← Start command
runtime.txt          ← Python version
render.yaml          ← Render config
app/main.py          ← FastAPI app
model_fixed.pkl      ← Model file
```

All are already created! ✓

## Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "Deploy" → "Connect Repository"
4. Select your `smart-waste-image-classifier` repo

## Step 3: Create New Web Service

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Select your GitHub repository
3. Fill in the configuration:

| Setting | Value |
|---------|-------|
| **Name** | `smart-waste-classifier` |
| **Environment** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |
| **Plan** | `Free` |
| **Region** | Closest to you |

4. Click **"Create Web Service"**

## Step 4: Monitor Deployment

1. Render will automatically build and deploy
2. You'll see logs in real-time
3. Wait for "Your service is live" message
4. Your URL will be something like: `https://smart-waste-classifier.onrender.com`

## Step 5: Test the Deployment

Once deployed, test these endpoints:

### Health Check
```bash
curl https://smart-waste-classifier.onrender.com/health
```

Expected response:
```json
{
  "status": "ok",
  "model_loaded": true
}
```

### Test Prediction
```bash
curl -X POST -F "file=@test_image.jpg" \
  https://smart-waste-classifier.onrender.com/predict
```

Expected response:
```json
{
  "category": "plastic",
  "confidence": 0.94,
  "guidance": "Place in blue recycling bin...",
  "is_recyclable": true,
  "color": "#3498DB"
}
```

## Step 6: Update Frontend

Update `assets/app.js` to point to your live backend:

```javascript
// Change from:
const API_URL = "http://localhost:8000";

// To:
const API_URL = "https://smart-waste-classifier.onrender.com";
```

## Step 7: Configure CORS

The backend already has CORS configured. If you get CORS errors, update the allowed origins in `app/main.py`:

```python
origins = [
    "https://mushfiq-azam.github.io",  # Your GitHub Pages domain
    "https://smart-waste-classifier.onrender.com",  # Backend domain
]
```

Then push changes and Render will auto-redeploy.

## Troubleshooting

### "Model not found" Error

If you get "Model file not found at model_fixed.pkl":

**Option A: Upload model to GitHub**
- Ensure `model_fixed.pkl` is committed to your repo
- File must be under 100MB
- Push to GitHub
- Render will pick it up on next deploy

**Option B: Download model on startup** (for large files)
- Edit `app/startup.py` to download from Hugging Face Hub or Google Drive
- Upload model to one of these services
- On Render, the model downloads at startup

**Option C: Use Render Disk**
- Render Disk can store up to 1GB
- Useful for large model files
- [See Render Disk documentation](https://render.com/docs/disks)

### "Module not found" Error

If you get module import errors:
1. Check `requirements.txt` has all packages
2. Some heavy packages (torch, fastai) take time to install
3. Render has 60-minute build timeout
4. Check build logs for detailed error

### Timeout Errors

Cold starts might timeout first request. This is normal. Subsequent requests are fast.

## Environment Variables (Optional)

To add environment variables on Render:

1. In Render dashboard, go to your service
2. Click **"Environment"**
3. Add variables:
   - `LOG_LEVEL=INFO`
   - `CORS_ORIGINS=https://mushfiq-azam.github.io`

## View Logs

To check deployment logs:

1. Render Dashboard → Your Service
2. Click **"Logs"** tab
3. See real-time output from your app

## Free Tier Limitations

- Services spin down after 15 minutes of inactivity
- First request after sleep takes 30 seconds (cold start)
- 100GB/month bandwidth
- Memory: 512MB RAM

For production, upgrade to paid tier.

## Next Steps

✅ Backend deployed to Render
✅ Test endpoints working
→ Now deploy frontend to GitHub Pages (Phase 6)
→ Connect frontend to backend
→ Test end-to-end

## Useful Links

- [Render Python Guide](https://render.com/docs/deploy-python)
- [FastAPI Documentation](https://fastapi.tiangolo.com/deployment/)
- [GitHub Pages Setup](https://pages.github.com/)
