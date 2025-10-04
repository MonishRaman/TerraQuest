Write-Host "🚀 Starting NASA Exoplanet Hackathon Application..." -ForegroundColor Green
Write-Host ""

# Get the script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start Backend
Write-Host "📡 Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptDir\backend'; python app.py" -WindowStyle Normal

# Wait for backend to initialize
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "🌐 Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptDir\frontend'; npm start" -WindowStyle Normal

Write-Host ""
Write-Host "✅ Both servers are starting..." -ForegroundColor Green
Write-Host "🔗 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "🔗 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to close this window (servers will continue running)" -ForegroundColor White
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
