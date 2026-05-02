# Testing Guide & QA Checklist

Comprehensive testing guide for the Smart Waste Classifier application.

## Pre-Test Setup

1. **Backend Running**
   ```bash
   python -m uvicorn app.main:app --reload
   ```

2. **Frontend Accessible**
   - Local: `http://localhost:8080` (if using Python server)
   - Or open `index.html` directly in browser

3. **Browser DevTools Open** (F12)
   - Console tab for errors
   - Network tab for API calls

---

## Test Categories

### 1. FRONTEND UI/UX

#### Navigation & Layout
- [ ] Page loads without errors
- [ ] Navigation bar is visible and sticky
- [ ] All sections visible (Hero, How It Works, Classifier, History, Footer)
- [ ] Responsive design works on mobile (test at 375px, 768px)
- [ ] All text is readable with good contrast

#### Dark/Light Mode
- [ ] Dark mode is default on load
- [ ] Theme toggle button visible in navbar
- [ ] Click theme button - toggles between dark/light
- [ ] Theme preference persists on page reload
- [ ] Colors are readable in both modes
- [ ] No visual glitches during toggle

#### Hero Section
- [ ] Title displays correctly
- [ ] Subtitle and description visible
- [ ] "Start Classifying" button clickable
- [ ] Button scrolls to classifier section smoothly
- [ ] Stats display (82.84%, 10+ categories)
- [ ] Stats boxes hover effect works

#### How It Works Section
- [ ] All 3 steps visible
- [ ] Step numbers display with gradient background
- [ ] Cards have hover effect
- [ ] Text is clear and helpful

#### Buttons & Interactions
- [ ] All buttons have hover effects
- [ ] Buttons respond to clicks
- [ ] No button text truncation

### 2. IMAGE UPLOAD

#### Drag & Drop
- [ ] Upload area visible with dashed border
- [ ] Upload icon animates (floats up/down)
- [ ] Drag image over area → area highlights
- [ ] Drop image → preview shows
- [ ] Wrong file type → error message displays
- [ ] File too large (>10MB) → error message displays

#### File Browse
- [ ] "Click to browse" button opens file picker
- [ ] File picker filters for image types
- [ ] After selecting image → preview shows
- [ ] Upload area hidden, preview visible

#### Camera (Mobile)
- [ ] Camera button visible on mobile
- [ ] Click camera button → camera picker opens
- [ ] Take photo → preview shows
- [ ] Photo classified successfully

#### Image Preview
- [ ] Preview image displays correctly
- [ ] Remove button (✕) visible in top-right
- [ ] Remove button removes image and resets UI
- [ ] Image is properly scaled/centered

### 3. IMAGE CLASSIFICATION

#### API Communication
- [ ] Console shows no CORS errors
- [ ] Loading spinner appears while processing
- [ ] Loading spinner disappears after response
- [ ] API called correctly (Network tab shows POST to /predict)
- [ ] Response includes all required fields

#### Results Display
- [ ] Category name displays with proper formatting
- [ ] Category badge shows with correct color
- [ ] Confidence % displays and is accurate
- [ ] Confidence bar animates to correct width
- [ ] Recyclable status shows (♻️ or ⚠️)
- [ ] Disposal guidance text is helpful
- [ ] Tips display as bullet list
- [ ] All animations are smooth

#### Confidence Threshold
- [ ] Low confidence (<60%) → warning appears
- [ ] Medium confidence (60-80%) → no warning
- [ ] High confidence (>80%) → no warning
- [ ] Warning message is clear

### 4. HISTORY TRACKING

#### Initial State
- [ ] History section visible below classifier
- [ ] "No classifications yet" message displays
- [ ] Clear History button is hidden

#### After Classification
- [ ] Classification appears in history
- [ ] Shows category with correct color
- [ ] Shows confidence percentage
- [ ] History is ordered with newest first
- [ ] Maximum 10 items in history

#### History Persistence
- [ ] Close and reopen page → history persists
- [ ] History survives browser restart
- [ ] localStorage stores classification history

#### History Interaction
- [ ] Click history item → alert shows category & confidence
- [ ] Clear History button visible when history not empty
- [ ] Click Clear History → confirmation dialog
- [ ] Confirm clear → all history deleted

### 5. ERROR HANDLING

#### Network Errors
- [ ] Backend down → "Failed to classify" error
- [ ] Wrong API URL → "Failed to classify" error
- [ ] CORS error → error message displays
- [ ] Error message dismissible
- [ ] Can try again after error

#### File Errors
- [ ] Non-image file → "Invalid file type" error
- [ ] Corrupted image → appropriate error message
- [ ] File upload fails → error message displays

### 6. MOBILE RESPONSIVENESS

#### Small Screens (375px)
- [ ] All elements fit without horizontal scroll
- [ ] Navigation collapses or stacks nicely
- [ ] Buttons are touch-friendly (min 44px)
- [ ] Text is readable without zooming
- [ ] Image preview fits in viewport
- [ ] Results card displays properly

#### Tablets (768px)
- [ ] Layout adapts to 2-column where appropriate
- [ ] All interactive elements work
- [ ] Touch events work correctly

#### Desktop (1920px)
- [ ] Content centered with appropriate margins
- [ ] Hero section displays in 2-column layout
- [ ] All interactions smooth

### 7. PERFORMANCE

#### Page Load
- [ ] Page loads in under 3 seconds (first time)
- [ ] 2nd load is faster (caching)
- [ ] No console errors on load
- [ ] No memory leaks (DevTools Memory tab)

#### File Upload
- [ ] 1MB image uploads quickly (<2 seconds)
- [ ] 5MB image uploads in <5 seconds
- [ ] 10MB image uploads with loading indicator

#### API Response
- [ ] Prediction returns in <2 seconds (local)
- [ ] Render backend: <5 seconds acceptable
- [ ] Cold start: <30 seconds acceptable

#### Memory Usage
- [ ] History stores max 10 items efficiently
- [ ] No memory growth with repeated uploads
- [ ] Theme toggle doesn't cause memory leaks

### 8. CROSS-BROWSER

- [ ] Chrome - all tests pass
- [ ] Firefox - all tests pass
- [ ] Safari - all tests pass
- [ ] Edge - all tests pass
- [ ] Mobile Safari - all tests pass
- [ ] Chrome Mobile - all tests pass

### 9. ACCESSIBILITY

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Tab order is logical
- [ ] Enter key activates buttons
- [ ] Space key activates buttons

#### Screen Reader (NVDA/JAWS/VoiceOver)
- [ ] Page title reads correctly
- [ ] Headings are marked up as headings
- [ ] Image alt text is descriptive
- [ ] Form labels are associated
- [ ] Error messages are announced

#### Color Contrast
- [ ] Text contrast ratio ≥ 4.5:1
- [ ] Use contrast checker tool
- [ ] Both light and dark modes compliant

### 10. EDGE CASES

#### Empty/Null States
- [ ] No classifications → empty history message
- [ ] Failed prediction → error message, retry possible
- [ ] Low confidence → warning message shows

#### Rapid Interactions
- [ ] Double-click upload → no duplicate processing
- [ ] Rapid file selection → latest file selected
- [ ] Spam history clicks → no crashes

#### Unusual Data
- [ ] Category name with underscores → formatted correctly
- [ ] Confidence 0.9999 → rounded to 100%
- [ ] Very long guidance text → wraps properly

### 11. INTEGRATION TESTS

#### Full Workflow
1. [ ] Load page
2. [ ] Upload image (drag or click)
3. [ ] See prediction
4. [ ] Result appears in history
5. [ ] Try another image
6. [ ] View multiple history items
7. [ ] Share result
8. [ ] Clear history
9. [ ] Toggle theme

#### Backend Integration
1. [ ] Frontend API_URL correct
2. [ ] Request format correct
3. [ ] Response format correct
4. [ ] CORS headers present
5. [ ] Error responses handled

---

## Test Data

### Sample Images to Test

1. **Plastic Bottle** - Should classify as "plastic" with high confidence
2. **Glass Bottle** - Should classify as "glass"
3. **Metal Can** - Should classify as "metal"
4. **Paper** - Should classify as "paper"
5. **Cardboard** - Should classify as "cardboard"
6. **Food Waste** - Should classify as "food_waste"
7. **Battery** - Should classify as "battery" if available
8. **Random Object** - Test low-confidence scenario
9. **Blurry Image** - Test with poor image quality
10. **Multiple Items** - Test with complex image

### Edge Case Files

- **Small file** (50KB) - Should work
- **Large file** (9.9MB) - Should work
- **Oversized file** (11MB) - Should show error
- **Corrupted JPEG** - Should show error
- **Text file** (renamed to .jpg) - Should show error
- **Animated GIF** - Should show error (not supported)

---

## Bug Report Template

If you find an issue, document:

```
Title: [Short description]

Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Expected Result:
[What should happen]

Actual Result:
[What actually happened]

Environment:
- Browser: [Chrome, Firefox, Safari, etc.]
- Device: [Desktop, iPhone, Android, etc.]
- OS: [Windows, macOS, Linux, iOS, Android]

Screenshots:
[Attach if possible]

Console Errors:
[Paste any console errors]
```

---

## Performance Benchmarks

Target metrics:

| Metric | Target | Acceptable |
|--------|--------|-----------|
| Page Load | <2s | <3s |
| API Response | <2s | <5s |
| Lighthouse Score | 90+ | 85+ |
| Mobile Score | 90+ | 85+ |

## Sign-Off

When all tests pass:

- [ ] All UI tests pass
- [ ] All interaction tests pass
- [ ] Mobile responsive verified
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Cross-browser tested
- [ ] Accessibility checked

**Tester Name**: ___________________  
**Date**: ___________________  
**Status**: ✅ PASSED / ❌ FAILED  

---

## Continuous Testing

After deployment:

1. **Weekly**: Run full test suite
2. **Before release**: Full QA
3. **User feedback**: Monitor GitHub issues
4. **Analytics**: Check error rates
5. **Performance**: Monitor response times

Happy testing! 🧪
