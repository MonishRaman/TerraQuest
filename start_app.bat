@echo off
echo Starting NASA Exoplanet Hackathon Application...
echo.

REM Start Backend in a new window
start "Backend Server" cmd /k "cd /d %~dp0backend && python app.py"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start Frontend in a new window
start "Frontend Server" cmd /k "cd /d %~dp0frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window (servers will continue running)
pause >nul
