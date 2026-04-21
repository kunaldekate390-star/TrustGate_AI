# ⚠️ IMPORTANT: READ BEFORE PROCEEDING

## 🚨 Node.js is NOT Installed

Your system does not have Node.js installed yet. This is **required** for the project to work.

---

## 📥 Installation Steps (MUST DO FIRST)

### Step 1: Download Node.js
1. Open browser and go to: **https://nodejs.org/**
2. Click the **LTS (Long-Term Support)** button
3. Download the installer for Windows

### Step 2: Install Node.js
1. Run the downloaded `.msi` installer
2. Accept the license agreement
3. **IMPORTANT**: Make sure "Add to PATH" is checked
4. Click "Install"
5. Wait for installation to complete

### Step 3: Restart Computer
1. **MUST restart your computer** for PATH changes to take effect
2. After restart, open PowerShell or Command Prompt

### Step 4: Verify Installation
```powershell
node --version
npm --version
```

You should see version numbers like:
- `v18.x.x` or `v20.x.x` (Node.js)
- `8.x.x` or `10.x.x` (npm)

---

## ✅ After Node.js is Installed

Run the installation script:

### Windows Users
```powershell
# PowerShell
.\INSTALL.ps1

# OR Command Prompt
INSTALL.bat
```

### Mac/Linux Users
```bash
chmod +x INSTALL.sh
./INSTALL.sh
```

---

## 📋 What Gets Installed

- ✅ React 18
- ✅ Next.js 14
- ✅ Tailwind CSS 3.3
- ✅ Framer Motion
- ✅ Lucide React Icons
- ✅ All dependencies

---

## 🎯 Next Commands (After npm install succeeds)

```powershell
# Start development server
npm run dev

# Visit in browser
http://localhost:3000

# Test webhook
http://localhost:3000/pages/demo
```

---

## 🐛 If You Get "npm not recognized"

After installing Node.js:
1. Close PowerShell/Command Prompt completely
2. Reopen it
3. Try again

If still not working:
1. Restart your computer
2. Try again

---

## ⏱️ Installation Time

- Node.js: 5 minutes
- npm install: 2-5 minutes
- **Total: ~10 minutes**

---

**Status**: 🔴 BLOCKED - Waiting for Node.js Installation

Please install Node.js first, then run INSTALL.bat or INSTALL.ps1
