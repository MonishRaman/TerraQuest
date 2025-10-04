# TerraQuest - Exploring New Worlds with AI-Powered Exoplanet Discovery

This repository contains TerraQuest, a small research-focused toolkit and demo web application for exploring exoplanet properties, predicting habitability, classifying planet types, and visualizing transit events.

The project includes:
- frontend: React (TypeScript) single-page application with routes, a Dashboard for advanced analysis, and informational pages.
- backend: Flask API that provides endpoints for habitability prediction, planet classification, transit visualization, and combined analysis.

This README explains how to run the project locally, where things live, and quick troubleshooting tips.

## Quick links
- Frontend entry: `frontend/src/index.tsx`
- Backend entry: `backend/app.py`

## Prerequisites
- Node.js (16+ recommended) and npm
- Python 3.10+ and pip

Optional (recommended): create virtual environments for the backend with `venv` or `conda`.

## Local setup (backend)

1. Open a terminal and navigate to the backend folder:

```powershell
cd backend
```

2. (Recommended) Create and activate a virtual environment:

Windows (PowerShell):
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

3. Install dependencies:

```powershell
pip install -r requirements.txt
```

4. Run the API server:

```powershell
python app.py
```

The API will start on http://localhost:5000 by default. The root route returns a small JSON describing available endpoints.

Useful backend files:
- `backend/api/routes.py` — Flask Blueprint exposing `/api/*` endpoints used by the frontend.
- `backend/models/*` — core model code for habitability prediction, classification, and transit visualization.

--------------------------------

## Local setup (frontend)

1. Open a separate terminal and navigate to the frontend folder:

```powershell
cd frontend
```

2. Install node dependencies (if you changed package.json recently):

```powershell
# If you run into peer dependency conflicts with older CRA, use the legacy flag
npm install --legacy-peer-deps
```

3. Start the development server:

```powershell
npm start
```

This launches the app (usually on http://localhost:3000). If port 3000 is busy the dev server will offer an alternate port.

Build for production:

```powershell
npm run build
```

Notes:
- The frontend uses `react-router-dom` for client-side routing. The top nav and left sidebar provide navigation to the Dashboard and informational pages.
- To display the app logo, place the provided logo image at `frontend/public/logo.png`.

--------------------------------

## Running the full stack
1. Start the backend first (port 5000).
2. Start the frontend dev server (port 3000 or 3001 if the default is busy).
3. The frontend will call the backend API routes (prefixed with `/api`) — ensure CORS is enabled (backend uses `flask-cors`).

## Project structure (high-level)
# TerraQuest — Exoplanet research toolkit & demo

TerraQuest is a compact research-focused toolkit and demo web application for exploring exoplanet properties, predicting habitability, classifying planet types, and visualizing transit events. It was created as a hackathon/demo project and includes a React + TypeScript frontend and a Flask backend with model code in `backend/models`.

This README gives step-by-step setup and run instructions (Windows PowerShell examples), where to find key files, and quick troubleshooting tips.

## Quick links

- Frontend entry: `frontend/src/index.tsx`
- Frontend API client: `frontend/src/services/api.ts`
- Backend entry: `backend/app.py`
- Backend routes: `backend/api/routes.py`

## Requirements

- Node.js 16+ and npm (or pnpm/yarn)
- Python 3.10+ and pip
- PowerShell (examples below use PowerShell commands)

Optional but recommended: use a Python virtual environment for the backend (venv/conda) and a Node version manager (nvm/w) for Node.

## Quick start (recommended)

Follow these steps to run the full stack locally (backend + frontend). Examples use PowerShell on Windows.

### 1) Backend (Flask)

Open a PowerShell terminal and run:

```powershell
cd "d:\projects clone\TerraQuest\backend"

# create & activate a venv (recommended)
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# install Python deps
pip install -r requirements.txt

# run the API
python app.py
```

By default the backend listens on http://localhost:5000. The root route returns a small JSON describing available endpoints.

Notes:
- If you see import errors, ensure the virtual environment is activated and you installed `requirements.txt` from `backend/`.
- The backend uses `flask-cors` to allow requests from the frontend dev server.

### 2) Frontend (React + TypeScript)

Open a second PowerShell terminal and run:

```powershell
cd "d:\projects clone\TerraQuest\frontend"

# install dependencies
npm install # or `npm install --legacy-peer-deps` if you hit peer dependency errors

# start dev server
npm start
```

The dev server usually opens at http://localhost:3000. If port 3000 is busy it will offer an alternate port.

Build production bundle:

```powershell
npm run build
```

Configuring the frontend API URL:
- The frontend API client lives at `frontend/src/services/api.ts`. If you need to point the frontend to a non-default backend host/port (for example a remote API or Docker network), update the base URL there or provide an environment variable in your build workflow.

### Start scripts (shortcut)

This repo includes convenience start scripts at the project root:

- `start_app.bat` — Windows batch wrapper to start services
- `start_app.ps1` — PowerShell script to start backend + frontend
- `start_app.js` — Node-based starter (project-specific)

You can run the PowerShell script from the repo root:

```powershell
cd "d:\projects clone\TerraQuest"
.\start_app.ps1
```

Adjust the script if you need to change ports or virtual environment paths.

## Project layout (high-level)

```
backend/
  app.py                 # Flask app entry
  config.py              # configuration helpers
  requirements.txt       # Python dependencies
  api/
    routes.py            # Flask Blueprint for /api/* endpoints
  models/
    habitability_predictor.py
    planet_classifier.py
    transit_visualizer.py

frontend/
  package.json
  public/
    logo.png
  src/
    index.tsx
    App.tsx
    services/
      api.ts              # API client used by components
    components/           # React components & pages
```

## Features

- Dashboard for analyzing exoplanet parameters (radius, mass, orbital distance, star type)
- Habitability prediction and planet classification models in `backend/models`
- Transit visualization endpoint that returns an image (base64) rendered by the backend
- React SPA with routing, Dashboard, About, Contact pages

## Environment variables & configuration

- Backend: `backend/config.py` contains configuration helpers. You can set typical Flask env vars like `FLASK_ENV` or supply a `.env` loader if you prefer.
- Frontend: edit `frontend/src/services/api.ts` or use your frontend build system to inject the API base URL for production builds.

If you'd like, I can add a sample `.env` and small loader for both backend and frontend.

## Troubleshooting

- npm install fails with peer dependency errors: run `npm install --legacy-peer-deps`.
- Backend import errors: ensure the virtual environment is activated and `pip install -r requirements.txt` completed without errors.
- Frontend can't reach backend: confirm backend is running on port 5000 and that `frontend/src/services/api.ts` points to the right host; CORS must be enabled on the backend (already included).
- If the frontend dev server starts on a different port, follow the URL printed in the terminal.

## Tests & linting

There are no automated tests included in the repository by default. Recommended next steps (low-effort improvements):

- Add basic unit tests for model functions in `backend/models` (pytest)
- Add linting for frontend (ESLint + Prettier) and backend (flake8/ruff)

If you want, I can scaffold a CI GitHub Actions workflow to run lint & build on push.

## Contributing

- Small, focused PRs are welcome. Prioritize readability and tests for model logic.
- Follow conventional commits or a simple changelog for releases.

## License & credits

This repository was created for a hackathon/demo. Update the license and credits as needed for your project.

---

If you'd like, I can also:

- Add a sample `.env` and small loader for backend & frontend
- Add a minimal Dockerfile + docker-compose to run frontend + backend together
- Add CI (GitHub Actions) to run linting and build steps

Tell me which of those you'd like next and I will add it.
