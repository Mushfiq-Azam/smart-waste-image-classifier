# Deploy Frontend to GitHub Pages

This guide deploys the web interface to GitHub Pages for public access.

## Prerequisites

- Repository on GitHub
- Backend deployed to Render (or other hosting)
- All frontend files committed to `main` branch

## Step 1: Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: select "Deploy from a branch"
   - **Branch**: select `main` branch
   - **Folder**: select `/ (root)`
4. Click **Save**

GitHub Pages is now enabled! ✓

## Step 2: Update Backend URL

Update `assets/app.js` to point to your deployed backend:

```javascript
// Change from:
const API_URL = "http://localhost:8000";

// To your Render URL:
const API_URL = "https://smart-waste-classifier.onrender.com";
```

## Step 3: Verify CORS Configuration

Backend needs CORS for GitHub Pages domain. In `app/main.py`, ensure:

```python
origins = [
    "https://mushfiq-azam.github.io",  # Your GitHub Pages URL
]
```

If using custom domain, update accordingly.

## Step 4: Commit and Push

```bash
# Stage all changes
git add assets/app.js

# Commit
git commit -m "Configure frontend for production (Render backend)"

# Push to main
git push origin main
```

## Step 5: Wait for Deployment

GitHub Pages automatically deploys when you push to `main`:

1. Go to your repo
2. Click **Actions** tab
3. Watch deployment progress
4. Once complete, your site is live at:
   ```
   https://mushfiq-azam.github.io/smart-waste-image-classifier/
   ```

## Step 6: Test Live Site

1. Open your GitHub Pages URL
2. Test the classifier:
   - Upload an image
   - See prediction load from backend
   - Check console for errors (F12 → Console)

## Troubleshooting

### CORS Error

If you see `Access to XMLHttpRequest blocked by CORS policy`:

1. **Verify backend URL** in `assets/app.js` is correct
2. **Check backend CORS config** includes your GitHub Pages URL:
   ```python
   "https://mushfiq-azam.github.io"
   ```
3. **Redeploy backend** after CORS changes
4. **Clear browser cache** (Ctrl+Shift+Delete)

### "API not available" Error

Possible causes:

1. **Backend not deployed** - check Render dashboard
2. **Backend URL wrong** - verify in app.js matches Render URL
3. **Backend down** - test directly: `curl https://your-backend.onrender.com/health`
4. **Mixed content** - if using http backend from https frontend, browser blocks it

### Images/Styles Not Loading

1. Check **Console** (F12) for 404 errors
2. Verify file paths in `index.html` are correct
3. Clear browser cache and reload

## Performance Optimization

### Minify CSS/JavaScript (Optional)

```bash
# Minify CSS (on Windows, use alternative tools)
# Using online tool or build tool

# For production, you can use:
npm install -g csso-cli terser

# Minify CSS
csso style.css -o style.min.css

# Minify JS
terser assets/app.js -o assets/app.min.js
```

Then update `index.html` to use minified versions.

### Enable Browser Caching

Add `.gitattributes` for caching headers:
```
*.js diff=javascript
*.css diff=css
*.png binary
*.jpg binary
```

## Custom Domain (Optional)

To use a custom domain:

1. Go to **Settings** → **Pages**
2. Under "Custom domain", enter your domain
3. Follow DNS configuration instructions
4. Update backend CORS to include your domain

## SSL Certificate

GitHub Pages automatically provides HTTPS. Your site is secure by default! ✓

## Monitor Performance

### Lighthouse Score

1. Open DevTools (F12)
2. Go to **Lighthouse** tab
3. Click **Analyze page load**
4. Get performance report

Target scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 100

## Deployment Checklist

- [ ] Backend deployed to Render
- [ ] Backend URL verified working
- [ ] `assets/app.js` updated with backend URL
- [ ] Backend CORS includes GitHub Pages domain
- [ ] All changes committed to `main` branch
- [ ] GitHub Pages enabled in repo settings
- [ ] Site is accessible at GitHub Pages URL
- [ ] Image upload works end-to-end
- [ ] Results display correctly
- [ ] No console errors
- [ ] Mobile responsive verified
- [ ] Lighthouse score acceptable

## Next Steps

✅ Frontend deployed to GitHub Pages
✅ Connected to backend API
→ Phase 7: Polish and extra features
→ Optional: Add custom domain
→ Optional: Set up analytics

## Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domains Guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

Your smart waste classifier is now live! 🎉
