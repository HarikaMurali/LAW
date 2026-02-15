# LexiCraft — Lawyers' Draft Maker

Lightweight, AI-assisted legal draft generator with research tools, templates, history and analytics.

This repository contains a React frontend and an Express/MongoDB backend. Recent UI updates converted many pages to a stable inline-style design (Dashboard, Drafts, Research, History, Analytics, Settings) and added a functional date-format preference in Settings.

Quick highlights
- Redesigned pages: `DraftsPage`, `ResearchPage`, `HistoryPage`, `AnalyticsPage`, `Dashboard`, `Settings`
- New `Settings` date-format preference stored to `localStorage` (affects all displayed dates)
- Shared date formatting utility: `frontend/src/utils/dateFormat.js`

Quick start
1. Install dependencies
```powershell
cd backend
npm install
cd ../frontend
npm install
```

2. Configure backend environment (`backend/.env`)
```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

3. Run locally (two terminals)
```powershell
# Terminal 1 - backend
cd backend
npm run dev

# Terminal 2 - frontend
cd frontend
npm start
```