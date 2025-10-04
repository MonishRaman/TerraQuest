# TerraQuest — NASA Exoplanet Hackathon

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

```
backend/
  app.py
  api/
    routes.py
  models/
    habitability_predictor.py
    planet_classifier.py
    transit_visualizer.py
frontend/
  public/
    logo.png  # add your logo here
  src/
    components/
      Dashboard.tsx
      Home.tsx
      About.tsx
      Contact.tsx
    App.tsx
    index.tsx
```

## Features implemented
- Home page with project description and CTA
- Dashboard with inputs for radius, mass, orbital distance, star type, and Analyze button
- Habitability prediction / classification display
- Transit visualization image rendering (base64 image returned by backend)
- Left sidebar with links including an external Exoclassifier Streamlit app
- Modernized CSS with responsive layout, accessible colors, and subtle animations (prefers-reduced-motion respected)

## Troubleshooting
- If `npm install` fails with peer dependency errors, run `npm install --legacy-peer-deps`.
- If the dev server starts on a different port, use the URL printed in the terminal.
- If the external Exoclassifier link (Streamlit app) doesn't load inside your browser, open it directly in a new tab — the link is configured to open new tabs securely.

## Contributing
- Small, iterative PRs are welcome. Focus on making components reusable and testable.
- If you extend the backend models, add unit tests for the model logic in `backend/tests`.

## License & Credits
This repository was created as part of a hackathon/demo. Adjust licensing and credits as appropriate for your use case.

---

If you'd like, I can also:
- Add a sample `.env` and documentation for environment variables.
- Add a CI workflow (GitHub Actions) to run linting and production builds.
- Create a small Dockerfile and docker-compose to run frontend + backend together.

Tell me which of those you'd like next and I'll add it.
