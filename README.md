# AI Farming System (Zimbabwe) 🌾🇿🇼

A full-stack agricultural decision-support and extension intelligence system designed for smallholder farmers and AGRITEX extension officers in Zimbabwe.

---

## 🌟 System Overview & Features

1. **Farmer Dashboard**
   - Live Farmer Profile (Location: Marondera, Mashonaland East, Agro-ecological Region IIb).
   - Real-time weather highlights and pesticide spraying suitability advisory.
   - Dynamic crop registration, upcoming spraying tasks, Mbare Musika maize grain prices, and assigned district AGRITEX officer contact.
   - Recent AI crop diagnoses log with match accuracy percentages.

2. **AI Crop Disease & Pest Diagnosis**
   - Image upload and photo preview with crop classification (Maize, Tomatoes, Tobacco, Sorghum, etc.).
   - Instant diagnostic analysis for Fall Armyworm (*Spodoptera frugiperda*), Early Blight (*Alternaria solani*), Northern Corn Leaf Blight, Aphids, and Shoot Fly.
   - Confidence scoring, symptoms breakdown, localized chemical treatments (Belt Expert, Emamectin Benzoate, Mancozeb, Copper Oxychloride), cultural/organic remedies (wood ash, push-pull, mulching), and safety PPE guidelines.
   - One-click **"Schedule Spraying"** bridge that directly populates and saves the treatment into the Spraying Calendar.

3. **Multilingual AI Agricultural Assistant (Chatbot)**
   - Conversational assistant fluent in **English**, **ChiShona**, and **isiNdebele**.
   - Context-aware responses covering Pfumvudza/Intwasa basins, Compound D basal fertilizer, Ammonium Nitrate (AN) top dressing, certified Seed Co / Pannar hybrids, cattle dipping, and pest control.
   - Optional integration with **Google Gemini API** via `.env` with automatic fallback to the built-in offline agronomy knowledge engine.

4. **Weather Intelligence & Spraying Advisory**
   - Current temperature, humidity, wind velocity, and rain probability for Marondera.
   - Algorithmic chemical spray decision matrix:
     - **Optimal**: Low wind (< 15 km/h) & low rain probability (< 40%).
     - **Avoid Spraying**: Rain probability > 50% (prevents chemical wash-off).
     - **Caution (Drift Risk)**: High wind speeds (> 15 km/h).
     - **Caution (High Heat)**: Temperature > 30°C (evaporation risk).
   - 5-day agricultural forecast table with daily spray suitability badges.

5. **Spraying & Activity Calendar**
   - Full schedule management with task creation via modal.
   - Real-time status toggle (Pending ↔ Completed) and deletion.
   - Persistent storage in `data/farming_data.json`.
   - Automatically synchronizes with the dashboard's "Next Spraying Activity" card.

6. **Market Intelligence & Live Commodity Prices**
   - Tracks commodity prices across major markets:
     - **Mbare Musika** (Harare)
     - **Sakubva Market** (Mutare)
     - **Renkini Market** (Bulawayo)
     - **GMB Depots** (Official gazetted floor rates)
   - Live dropdown filtering by market location.
   - Commodities: White Maize, Tomatoes, Sugar Beans, Soybeans, Potatoes, Cabbages.

7. **AGRITEX Advisor Hub**
   - Direct directory of district extension officers and research specialists.
   - One-touch phone dialing (`tel:+263...`).
   - Interactive modal to submit **Farm Visit Requests**, **Urgent Disease Escalations**, or **Agronomic Consultations** with automated dispatch tracking tickets (e.g. `REQ-353175`).

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18 or higher recommended; verified on Node v24).

### 2. Start the Server
Open PowerShell or your terminal in the project root folder:
```powershell
node server.js
```
*Or using npm:*
```powershell
npm start
```

### 3. Open the Application
Open your web browser and navigate to:
```
http://localhost:5000
```
> **Tip:** You can also open `index.html` directly in any web browser — the frontend includes automatic URL detection that links directly to `http://localhost:5000/api`.

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System health check and server uptime |
| `GET` | `/api/farmers/current` | Active farmer profile (crops, district, advisor) |
| `PUT` | `/api/farmers/current` | Update farmer profile |
| `GET` | `/api/weather` | Current Marondera weather & spraying recommendation |
| `GET` | `/api/weather/forecast` | 5-day agricultural weather forecast |
| `GET` | `/api/diagnosis/recent` | Recent AI crop diagnoses history |
| `POST` | `/api/diagnosis` | Run AI disease analysis on uploaded crop/photo |
| `GET` | `/api/calendar` | List all scheduled spraying and farm activities |
| `POST` | `/api/calendar` | Schedule a new activity |
| `PATCH`| `/api/calendar/:id/toggle` | Toggle activity between Pending and Completed |
| `DELETE`| `/api/calendar/:id` | Remove an activity from calendar |
| `GET` | `/api/market` | Live commodity prices (supports `?market=...`) |
| `GET` | `/api/market/summary` | Maize market summary and price trends |
| `GET` | `/api/advisors` | List AGRITEX extension officers and specialists |
| `POST` | `/api/advisors/request` | Submit farm visit or disease escalation request |
| `POST` | `/api/assistant/chat` | AI Agronomy Chatbot (English, ChiShona, isiNdebele) |

---

## 🔑 Environment Configuration (`.env`)

```env
PORT=5000
NODE_ENV=development

# Optional: Enter your Google Gemini API key to enable live Gemini generative AI responses
GEMINI_API_KEY=
```

---

## 📂 Project Architecture

```
NewAI-Farming-System/
├── server.js                 # Main Express server mounting all routes & serving index.html
├── package.json              # Dependencies and startup scripts
├── .env                      # Server configuration & API keys
├── index.html                # Responsive web app UI (Dashboard, Diagnosis, Weather, Chat)
├── data/
│   ├── store.js              # Central persistence layer (load & save)
│   └── farming_data.json     # Persistent agricultural database
├── farmerController.js       # Farmer profile logic
├── farmerRoutes.js           # /api/farmers routes
├── weatherController.js      # Weather data & spray advisory logic
├── weatherRoutes.js          # /api/weather routes
├── diagnosisController.js    # AI Crop disease analysis engine
├── diagnosisRoutes.js        # /api/diagnosis routes
├── calendarController.js     # Farm activities CRUD operations
├── calendarRoutes.js         # /api/calendar routes
├── marketController.js       # Mbare, Renkini, Sakubva market prices
├── marketRoutes.js           # /api/market routes
├── advisorController.js      # AGRITEX extension hub & request dispatching
├── advisorRoutes.js          # /api/advisors routes
├── assistantController.js    # Multilingual AI farming assistant
└── assistantRoutes.js        # /api/assistant routes
```
