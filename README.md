
# TerraQuest — Exploring New Worlds with AI

TerraQuest is a compact research/demo web application for exploring exoplanet properties, predicting habitability, classifying planet types, and visualizing transit events. It was built as a hackathon project and includes:

- Frontend: React + TypeScript single-page app (in `frontend/`).
- Backend: Flask API providing analysis endpoints (in `backend/`).
- Models: small, self-contained model code under `backend/models` for habitability prediction, planet classification, and transit light-curve visualization.

This README documents how to run the project locally (PowerShell examples for Windows), outlines the API, and provides developer notes and next steps.

## Repository quick links

- Frontend entry: `frontend/src/index.tsx`
- Frontend API client: `frontend/src/services/api.ts`
- Backend entry: `backend/app.py`
- Backend routes: `backend/api/routes.py`
- Backend models: `backend/models/*.py`

## Project structure

Below is a high-level view of the repository layout and the purpose of important files and folders:

```
LICENSE                          # repository license
package.json                     # project-level launcher (start_app.js)
start_app.ps1 / start_app.bat    # convenience scripts to start backend + frontend
start_app.js                     # Node script to spawn backend/frontend

backend/                         # Flask API and models
  app.py                         # Flask application factory and entrypoint
  config.py                      # configuration helpers for Flask
  requirements.txt               # Python dependencies (pip)
  api/
    routes.py                    # Blueprint registering /api endpoints
  models/
    habitability_predictor.py    # habitability model (RF, synthetic data)
    planet_classifier.py         # planet classification model (RF)
    transit_visualizer.py        # transit light-curve generation & plotting

frontend/                        # React + TypeScript single-page app
  package.json                   # frontend dependencies & scripts
  public/
    index.html                   # HTML shell for the SPA
    logo.png                     # app logo used by the frontend
  src/
    index.tsx                    # frontend entry
    App.tsx                      # top-level app & routing
    services/
      api.ts                     # client wrapper for backend API
    components/                   # React components and pages (Dashboard, Home, About...)
  build/                          # production build output (if generated)

README.md                        # this file
```

This tree focuses on the files you'll most likely edit during development. If you'd like a more detailed map (tests, CI, build artifacts), I can expand it.

## System requirements

- Node.js 16+ and npm
- Python 3.10+ and pip
- PowerShell (examples below use PowerShell)

Recommended: use a Python virtual environment for the backend (venv or conda) and a Node version manager (nvm) for frontend work.

## What this project provides (high level)

- Habitability prediction: `HabitabilityPredictor` (random-forest, synthetic training data, lazy-trains on first request).
- Planet classification: `PlanetClassifier` (random-forest, synthetic training data, returns type + probabilities).
- Transit visualization: `TransitLightCurve` builds a simple light curve, adds noise, detects transits, and returns a base64 PNG + metrics.
- REST endpoints: `/api/habitability`, `/api/classify`, `/api/transit/generate`, `/api/analyze`, `/api/health`.

## Quick start — run locally (PowerShell)

There are three easy ways to run the app locally: manual backend + frontend, or use the provided project-level starter scripts.

1) Manual — backend then frontend

Backend (Flask):

```powershell
cd "d:\projects clone\TerraQuest\backend"

# create & activate a virtual environment (recommended)
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# install Python dependencies
pip install -r requirements.txt

# run the API (development; debug True)
python app.py
```

The backend will listen on http://localhost:5000. The root route (`/`) returns a small JSON blob listing endpoints.

Frontend (React):

```powershell
cd "d:\projects clone\TerraQuest\frontend"

# install npm deps
npm install   # or `npm install --legacy-peer-deps` if you encounter peer dependency issues

# start development server
npm start
```

The React dev server usually opens at http://localhost:3000 (or an alternate port if 3000 is busy).

2) Start scripts (convenience)

- `start_app.ps1` — starts backend and frontend in separate PowerShell windows.
- `start_app.bat` — starts both using cmd windows on Windows.
- `start_app.js` — Node-based starter that spawns the backend then frontend processes.

Run the PowerShell starter from repo root:

```powershell
cd "d:\projects clone\TerraQuest"
.\start_app.ps1
```

3) Production build (frontend)

```powershell
cd "d:\projects clone\TerraQuest\frontend"
npm run build
```

The production `build/` output is placed in `frontend/build/` (ready for static hosting).

## Backend dependencies

See `backend/requirements.txt`. Key packages used:

- Flask (web API)
- flask-cors (CORS for local dev)
- numpy, scipy (math/arrays)
- scikit-learn (models)
- matplotlib (plots for transit visualizer; Agg backend used)

Install them with:

```powershell
pip install -r backend\requirements.txt
```

## API — endpoints & examples

Available endpoints (registered under blueprint at `/api`):

- GET /api/health — basic health check
- POST /api/habitability — predict habitability
- POST /api/classify — classify planet type
- POST /api/transit/generate — generate a sample transit image (base64 PNG + metrics)
- POST /api/analyze — run habitability + classification together

Example: habitability (PowerShell / Invoke-RestMethod)

```powershell
Invoke-RestMethod -Method POST -Uri http://localhost:5000/api/habitability -ContentType 'application/json' -Body (
  @{
    radius = 1.0
    orbit = 1.0
    starType = 'G'
    starMass = 1.0
    starTemp = 5778
  } | ConvertTo-Json
)
```

Example: classify (using curl)

```powershell
curl -X POST http://localhost:5000/api/classify -H "Content-Type: application/json" -d '{"radius":1.0,"mass":1.0,"orbit":1.0}'
```

Transit generation returns a JSON with `image` (base64 PNG), `depth` and `transits_detected`.

Note: the frontend client is configured in `frontend/src/services/api.ts` to talk to `http://localhost:5000/api` by default.

## Developer notes — model behaviour & performance

- The models (`HabitabilityPredictor`, `PlanetClassifier`) create synthetic training data and train in-memory. They lazy-train on first call to `predict()`/`classify()` if not already trained. Expect the first request to take longer while training.
- The transit visualizer (`TransitLightCurve`) uses a simple hand-rolled transit model (matplotlib + SciPy). It returns base64 PNGs from the server; the frontend decodes and displays them.
- These models are intended for prototyping and demo purposes, not production-grade scientific accuracy. Use them as a starting point and replace with trained models or saved model artifacts if desired.

## Testing & linting (suggested)

- Add pytest tests for functions in `backend/models/` (happy path + edge cases).
- Frontend: add ESLint + Prettier configuration.
- CI: add a GitHub Actions workflow to run Python tests and build the frontend on push.

## Docker / containerization (optional next step)

I can add a minimal `Dockerfile` for the backend and a `docker-compose.yml` to bring up frontend (as static build) + backend together. Tell me if you want a dev-oriented compose (with volumes) or a production-oriented compose.

## Troubleshooting & tips

- If `npm install` errors with peer deps: run `npm install --legacy-peer-deps`.
- If backend imports fail: confirm the virtual environment is active and `pip install -r requirements.txt` completed.
- If the frontend cannot reach the backend: ensure backend is running on `localhost:5000` and that CORS is enabled.
- If transit images don't render or matplotlib errors occur: ensure the Python environment has `matplotlib` and that the server can use the Agg backend (the code sets Agg explicitly).

## Contributing

- Open a PR with a focused change. Add tests for model logic when updating model code.
- Consider adding saved model artifacts and a training script if you want deterministic model behaviour across runs.

## License & credits

This project was built as a hackathon/demo. The repository currently includes a top-level `LICENSE` file. Update license and credits as appropriate for your usage.

---

Want me to add one of the following now?

- Sample `.env` files and a small loader for backend & frontend (with examples)
- Dockerfile + `docker-compose.yml` for local dev or production
- GitHub Actions workflow for linting/tests and frontend build
- Basic pytest tests for `backend/models`

Tell me which item you'd like next and I'll implement it.

