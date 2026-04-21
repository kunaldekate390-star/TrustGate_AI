@echo off
cd /d "%~dp0"

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║     TrustGate AI - Automated Installation Script      ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is NOT installed
    echo.
    echo 📌 BEFORE running this script, you MUST:
    echo.
    echo    1. Visit: https://nodejs.org/
    echo    2. Download LTS version (Long-Term Support)
    echo    3. Run the installer (.msi file)
    echo    4. Choose "Add to PATH" during installation
    echo    5. Restart your computer completely
    echo    6. Then run this script again
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found!
node --version
npm --version
echo.

echo 🧹 Clearing npm cache...
call npm cache clean --force
echo ✅ Cache cleared
echo.

echo 📦 Installing dependencies...
echo    This may take 2-5 minutes...
echo.

call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Installation successful!
    echo.
    echo ╔════════════════════════════════════════════════════════╗
    echo ║              ✨ Ready to go! ✨                       ║
    echo ╚════════════════════════════════════════════════════════╝
    echo.
    echo 🚀 Next steps:
    echo.
    echo    1. Start development server:
    echo       npm run dev
    echo.
    echo    2. Open browser:
    echo       http://localhost:3000
    echo.
    echo    3. Test the webhook at:
    echo       http://localhost:3000/pages/demo
    echo.
    pause
) else (
    echo.
    echo ❌ Installation failed!
    echo.
    echo Troubleshooting:
    echo    1. Run: npm cache clean --force
    echo    2. Delete node_modules folder
    echo    3. Run this script again
    echo.
    pause
    exit /b 1
)
