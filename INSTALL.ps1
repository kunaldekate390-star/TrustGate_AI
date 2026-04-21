# TrustGate AI - Automated Installation Script
# This script installs Node.js and all project dependencies

Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     TrustGate AI - Automated Installation Script      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "🔍 Checking for Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
$npmVersion = npm --version 2>$null

if ($nodeVersion -and $npmVersion) {
    Write-Host "✅ Node.js is already installed!" -ForegroundColor Green
    Write-Host "   Node: $nodeVersion" -ForegroundColor Green
    Write-Host "   npm: $npmVersion" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "❌ Node.js is NOT installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "📌 Please install Node.js before running this script:" -ForegroundColor Yellow
    Write-Host "   1. Visit: https://nodejs.org (Download LTS version)" -ForegroundColor Cyan
    Write-Host "   2. Run the installer" -ForegroundColor Cyan
    Write-Host "   3. Restart your computer" -ForegroundColor Cyan
    Write-Host "   4. Run this script again" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}

# Navigate to project directory
$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Write-Host "📁 Project path: $projectPath" -ForegroundColor Cyan
Set-Location $projectPath
Write-Host ""

# Clear npm cache
Write-Host "🧹 Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force 2>&1 | Out-Null
Write-Host "✅ Cache cleared" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
Write-Host "   This may take 2-5 minutes..." -ForegroundColor Gray
Write-Host ""

npm install
$installStatus = $LASTEXITCODE

if ($installStatus -eq 0) {
    Write-Host ""
    Write-Host "✅ Installation successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║              ✨ Ready to go! ✨                       ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Next steps:" -ForegroundColor Cyan
    Write-Host "   1. Start development server:" -ForegroundColor White
    Write-Host "      npm run dev" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   2. Open browser:" -ForegroundColor White
    Write-Host "      http://localhost:3000" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   3. Test the webhook:" -ForegroundColor White
    Write-Host "      Visit /pages/demo" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Installation failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "   1. Run: npm cache clean --force" -ForegroundColor Cyan
    Write-Host "   2. Delete node_modules folder" -ForegroundColor Cyan
    Write-Host "   3. Run this script again" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}
