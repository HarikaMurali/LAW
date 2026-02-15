# LexiCraft — Lawyers' Draft Maker

A lightweight, AI-assisted legal draft generator built for lawyers and legal professionals. LexiCraft combines a React frontend and an Express/MongoDB backend to provide template-based drafting, research integration, versioned draft history, and analytics.

Table of contents
- Project overview
- Features
- Architecture & tech stack
- Setup & development
- Environment variables
- Running locally
- Building for production
- Notable implementation details
- Contributing
- License

Project overview
----------------
LexiCraft helps generate and manage legal drafts using curated templates and research tools. The UI has been standardized to reliable inline styles (rather than depending on Tailwind utilities in this environment) and includes a Settings option to persist user preferences such as date format.

Features
--------
- Template-based draft generation (contract, civil, criminal templates)
- Draft editor with save / history / export (PDF/DOCX)
- Research tools and inline references
- Analytics dashboard with visual summaries (Recharts)
- Settings with persistent preferences (date format stored in `localStorage`)

Architecture & tech stack
-------------------------
- Frontend: React (frontend/)
	- Uses Recharts, jsPDF, html2canvas, docx, file-saver, and an OGL-based Galaxy component
- Backend: Node.js + Express (backend/)
	- MongoDB via Mongoose, JWT-based auth
- Styling: Inline style objects + `App.css` utilities (chosen for stability in this environment)
- Shared utilities: `frontend/src/utils/dateFormat.js` centralizes date formatting based on settings

Setup & development
-------------------
Prerequisites
- Node.js (16+) and npm
- MongoDB (remote or local)

Install dependencies
```powershell
cd backend
npm install
cd ../frontend
npm install
```

Environment variables (backend)
Create a `.env` file inside `backend/` with these keys:
```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key   # optional - only if using OpenAI/Gemini integrations
PORT=5000
```

Running locally (development)
```powershell
# Terminal 1 - backend
cd backend
npm run dev

# Terminal 2 - frontend
cd frontend
npm start
```

Building for production
```powershell
cd frontend
npm run build

# Serve the built frontend with a static server or integrate into your production backend setup
```

Notable implementation details
-----------------------------
- Date formatting: User-selected date format is saved to `localStorage` as `appSettings` and read by `frontend/src/utils/dateFormat.js`. Pages that show dates (`History`, `Drafts`, `DraftList`, etc.) use this utility.
- Styling: Several pages were migrated away from unreliable Tailwind utilities to inline style objects combined with `App.css` utility classes for consistent rendering across environments.
- Tailwind: `frontend/package.json`, `tailwind.config.js`, and `postcss.config.js` are present. They were left in place because the project still depends on Tailwind-related packages; removal is optional and can be done on request.

Contributing
------------
- Fork the repository and create a feature branch.
- Open a pull request with a clear summary and motivation for changes.

Commit & push (example)
```powershell
git add .
git commit -m "UI: refine README and document setup + date-format utility"
git remote add origin https://github.com/HarikaMurali/LAW.git
git push -u origin main
```

License & credits
-----------------
This project is provided as-is. Add or replace a license file as appropriate for your project.

Questions or changes?
- If you'd like the prior README restored verbatim, paste the previous content here or point me to the version you prefer and I will restore it.
- I can also commit and push these changes to your `origin` remote when you confirm.

Files of interest
- `frontend/src/utils/dateFormat.js` — centralized date formatting
- `frontend/` — React app (UI)
- `backend/` — Express API and models

Thank you — tell me if you'd like a different README structure or to restore your exact previous README.