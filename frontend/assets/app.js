/**
 * Smart Waste Image Classifier - Frontend JavaScript
 * Handles image upload, API communication, and result display
 */

// Configuration is loaded from config.js
// API_URL is automatically detected based on environment

// State
let currentResult = null;
let classificationHistory = [];

const DOM = {
  uploadArea: document.getElementById("upload-area"),
  fileInput: document.getElementById("file-input"),
  cameraInput: document.getElementById("camera-input"),
  themeToggle: document.getElementById("theme-toggle"),
  uploadSection: document.getElementById("upload-section"),
  previewSection: document.getElementById("preview-section"),
  previewImage: document.getElementById("preview-image"),
  loading: document.getElementById("loading"),
  resultSection: document.getElementById("result-section"),
  errorMessage: document.getElementById("error-message"),
  categoryLabel: document.getElementById("category-label"),
  categoryBadge: document.getElementById("category-badge"),
  confidencePercent: document.getElementById("confidence-percent"),
  confidenceBar: document.getElementById("confidence-bar"),
  recyclableStatus: document.getElementById("recyclable-status"),
  recyclableIcon: document.getElementById("recyclable-icon"),
  recyclableText: document.getElementById("recyclable-text"),
  guidanceText: document.getElementById("guidance-text"),
  tipsList: document.getElementById("tips-list"),
  lowConfidenceWarning: document.getElementById("low-confidence-warning"),
  errorText: document.getElementById("error-text"),
  historyList: document.getElementById("history-list"),
  clearHistoryBtn: document.getElementById("clear-history-btn"),
};

/* =============================
   THEME MANAGEMENT
   ============================= */

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark-mode";
  document.documentElement.classList.add(savedTheme);
  if (savedTheme === "light-mode") {
    DOM.themeToggle.textContent = "☀️";
  }
}

DOM.themeToggle.addEventListener("click", () => {
  const htmlElement = document.documentElement;
  const isDarkMode = htmlElement.classList.contains("dark-mode");

  if (isDarkMode) {
    htmlElement.classList.remove("dark-mode");
    htmlElement.classList.add("light-mode");
    DOM.themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "light-mode");
  } else {
    htmlElement.classList.remove("light-mode");
    htmlElement.classList.add("dark-mode");
    DOM.themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "dark-mode");
  }
});

/* =============================
   DRAG & DROP HANDLERS
   ============================= */

DOM.uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  DOM.uploadArea.classList.add("drag-over");
});

DOM.uploadArea.addEventListener("dragleave", () => {
  DOM.uploadArea.classList.remove("drag-over");
});

DOM.uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  DOM.uploadArea.classList.remove("drag-over");

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFileSelect(files[0]);
  }
});

/* =============================
   FILE INPUT HANDLERS
   ============================= */

DOM.fileInput.addEventListener("change", (e) => {
  const files = e.target.files;
  if (files.length > 0) {
    handleFileSelect(files[0]);
  }
});

DOM.cameraInput.addEventListener("change", (e) => {
  const files = e.target.files;
  if (files.length > 0) {
    handleFileSelect(files[0]);
  }
});

function startCamera() {
  DOM.cameraInput.click();
}

function handleFileSelect(file) {
  const { valid, message } = validateFile(file);
  if (!valid) {
    showError(message);
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    DOM.previewImage.src = e.target.result;
    DOM.uploadArea.classList.add("hidden");
    DOM.previewSection.classList.remove("hidden");
    closeError();
    classifyImage(file);
  };
  reader.readAsDataURL(file);
}

function validateFile(file) {
  const maxSize = 10 * 1024 * 1024;
  const validTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      message: `Invalid file type. Supported: JPG, PNG, WEBP`,
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      message: `File too large. Maximum 10MB allowed.`,
    };
  }

  return { valid: true, message: "" };
}

/* =============================
   IMAGE CLASSIFICATION
   ============================= */

async function classifyImage(file) {
  try {
    DOM.loading.classList.remove("hidden");
    DOM.resultSection.classList.add("hidden");
    closeError();

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      let message = `Request failed with status ${response.status}`;
      try {
        const errorBody = await response.json();
        message = errorBody.detail || message;
      } catch (_) {
        const errorText = await response.text();
        message = errorText || message;
      }
      throw new Error(message);
    }

    const result = await response.json();
    currentResult = result;

    addToHistory(result);
    displayResult(result);
    DOM.loading.classList.add("hidden");
    DOM.resultSection.classList.remove("hidden");
  } catch (error) {
    console.error("Classification error:", error);
    DOM.loading.classList.add("hidden");
    showError(`Failed to classify image: ${error.message}`);
  }
}

function displayResult(result) {
  const category = result.category.toLowerCase();

  DOM.categoryLabel.textContent = formatCategoryName(result.category);
  DOM.categoryBadge.style.backgroundColor = result.color;

  const confidencePercent = Math.round(result.confidence * 100);
  DOM.confidencePercent.textContent = `${confidencePercent}%`;
  DOM.confidenceBar.style.width = `${confidencePercent}%`;

  if (result.is_recyclable) {
    DOM.recyclableStatus.classList.remove("not-recyclable");
    DOM.recyclableIcon.textContent = "♻️";
    DOM.recyclableText.textContent = "Recyclable - Follow disposal guidance";
  } else {
    DOM.recyclableStatus.classList.add("not-recyclable");
    DOM.recyclableIcon.textContent = "⚠️";
    DOM.recyclableText.textContent = "Special Disposal Required";
  }

  DOM.guidanceText.textContent = result.guidance;

  const tips = getCategoryTips(category);
  DOM.tipsList.innerHTML = tips.map((tip) => `<li>${tip}</li>`).join("");

  if (confidencePercent < 60) {
    DOM.lowConfidenceWarning.classList.remove("hidden");
  } else {
    DOM.lowConfidenceWarning.classList.add("hidden");
  }
}

function getCategoryTips(category) {
  const tips = {
    plastic: [
      "Remove lids and caps",
      "Rinse containers",
      "No plastic bags in recycling",
      "Flatten for space efficiency",
    ],
    glass: [
      "Separate from other waste",
      "Rinse containers",
      "Avoid mixing colors",
      "Handle carefully to prevent cuts",
    ],
    metal: [
      "Aluminum cans are highly valuable",
      "Rinse before recycling",
      "Crush to save space",
      "Separate aluminum from steel",
    ],
    paper: [
      "Keep paper dry",
      "Avoid oily or contaminated paper",
      "Remove plastic windows from envelopes",
      "Flatten to save space",
    ],
    cardboard: [
      "Flatten boxes",
      "Remove non-cardboard contents",
      "Keep dry",
      "Bundle with twine if large",
    ],
    food_waste: [
      "Use composting bin if available",
      "Check local composting programs",
      "Includes fruits, vegetables, scraps",
      "Separate from packaging",
    ],
    battery: [
      "NEVER put in regular trash",
      "Find local battery recycling center",
      "Cover terminals with tape",
      "Store in dry place away from children",
    ],
    e_waste: [
      "Never put in regular waste",
      "Find certified e-waste recycler",
      "Data wipe recommended",
      "Check manufacturer take-back",
    ],
    textile: [
      "Donate to charity if in good condition",
      "Check for textile recycling programs",
      "Reuse for rags or crafts",
      "Avoid mixing with other waste",
    ],
    medical_waste: [
      "Do NOT touch with bare hands",
      "Wear gloves when handling",
      "Contact medical facility",
      "Use biohazard containers",
    ],
  };

  return tips[category] || ["Check local waste management guidelines"];
}

function formatCategoryName(category) {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/* =============================
   HISTORY MANAGEMENT
   ============================= */

function addToHistory(result) {
  const entry = {
    category: result.category,
    confidence: Math.round(result.confidence * 100),
    color: result.color,
    timestamp: new Date().getTime(),
  };

  classificationHistory.unshift(entry);
  if (classificationHistory.length > 10) {
    classificationHistory.pop();
  }

  saveHistory();
  updateHistoryDisplay();
}

function saveHistory() {
  localStorage.setItem("classificationHistory", JSON.stringify(classificationHistory));
}

function loadHistory() {
  const saved = localStorage.getItem("classificationHistory");
  if (saved) {
    classificationHistory = JSON.parse(saved);
  }
}

function updateHistoryDisplay() {
  if (classificationHistory.length === 0) {
    DOM.historyList.innerHTML = '<p class="history-empty">No classifications yet. Start by uploading an image!</p>';
    DOM.clearHistoryBtn.style.display = "none";
    return;
  }

  DOM.clearHistoryBtn.style.display = "block";

  DOM.historyList.innerHTML = classificationHistory
    .map(
      (entry, index) => `
    <div class="history-item" onclick="highlightHistoryItem(${index})">
      <div class="history-item-category" style="background-color: ${entry.color}">
        ${formatCategoryName(entry.category)}
      </div>
      <div class="history-item-confidence">
        ${entry.confidence}% confident
      </div>
    </div>
  `
    )
    .join("");
}

function highlightHistoryItem(index) {
  const entry = classificationHistory[index];
  alert(
    `${formatCategoryName(entry.category)}\nConfidence: ${entry.confidence}%`
  );
}

function clearHistory() {
  if (confirm("Clear all classification history?")) {
    classificationHistory = [];
    localStorage.removeItem("classificationHistory");
    updateHistoryDisplay();
  }
}

/* =============================
   UI CONTROLLERS
   ============================= */

function resetClassifier() {
  DOM.fileInput.value = "";
  DOM.uploadArea.classList.remove("hidden");
  DOM.previewSection.classList.add("hidden");
  DOM.resultSection.classList.add("hidden");
  DOM.loading.classList.add("hidden");
  closeError();
  currentResult = null;
}

function showError(message) {
  DOM.errorText.textContent = message;
  DOM.errorMessage.classList.remove("hidden");
}

function closeError() {
  DOM.errorMessage.classList.add("hidden");
}

function scrollToClassifier() {
  const element = document.getElementById("classifier");
  element.scrollIntoView({ behavior: "smooth" });
}

/* =============================
   SHARE FUNCTIONALITY
   ============================= */

function shareResult() {
  if (!currentResult) return;

  const text = `I just classified this waste: ${formatCategoryName(
    currentResult.category
  )} with ${Math.round(currentResult.confidence * 100)}% confidence!

Try it yourself: Smart Waste Classifier 🗑️
https://mushfiq-azam.github.io/smart-waste-image-classifier/`;

  if (navigator.share) {
    navigator.share({
      title: "Smart Waste Classifier",
      text: text,
    });
  } else {
    navigator.clipboard.writeText(text).then(() => {
      alert("Result copied to clipboard!");
    });
  }
}

/* =============================
   PAGE LOAD
   ============================= */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadHistory();
  updateHistoryDisplay();
  checkApiConnection();

  document.addEventListener("dragover", (e) => e.preventDefault());
  document.addEventListener("drop", (e) => e.preventDefault());
});

async function checkApiConnection() {
  try {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) {
      console.warn("API might not be available");
    }
  } catch (error) {
    console.warn("API not available:", error.message);
  }
}
