/**
 * Configuration for different environments
 * This file helps manage API URLs for local vs production
 */

const CONFIG = {
  development: {
    API_URL: "https://mushfiqazam-smart-waste-image-classifier-02.hf.space/predict",
    LOG_LEVEL: "debug",
    ENVIRONMENT: "Development"
  },
  production: {
    API_URL: "https://mushfiqazam-smart-waste-image-classifier-02.hf.space/predict",
    LOG_LEVEL: "info",
    ENVIRONMENT: "Production"
  },
  // GitHub Pages specific config
  githubPages: {
    API_URL: "https://mushfiqazam-smart-waste-image-classifier-02.hf.space/predict",
    LOG_LEVEL: "info",
    ENVIRONMENT: "GitHub Pages"
  }
};

// Detect environment
function getEnvironment() {
  const hostname = window.location.hostname;

  // Local file opened directly in the browser
  if (window.location.protocol === "file:") {
    return CONFIG.development;
  }

  // GitHub Pages
  if (hostname.includes("github.io")) {
    return CONFIG.githubPages;
  }

  // Local development
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return CONFIG.development;
  }

  // Default to production
  return CONFIG.production;
}

// Get active config
const ACTIVE_CONFIG = getEnvironment();
const API_URL = ACTIVE_CONFIG.API_URL;

// Logging helper
function log(message, level = "info") {
  if (ACTIVE_CONFIG.LOG_LEVEL === "debug" || level !== "debug") {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
  }
}

// Export for use in app.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = { API_URL, CONFIG, ACTIVE_CONFIG, log };
}
