# 🚀 TrustGate AI - Installation Guide

## ⚡ Quick Start (Automated)

### Windows Users
```powershell
# Run the PowerShell script
.\INSTALL.ps1
```

### Mac/Linux Users
```bash
# Make script executable
chmod +x INSTALL.sh

# Run the installation script
./INSTALL.sh
```

---

## 📋 Manual Installation Steps

### Step 1: Install Node.js

1. **Visit**: [nodejs.org](https://nodejs.org)
2. **Download**: LTS (Long-Term Support) version
3. **Install**: Run the installer and accept defaults
4. **Restart**: Restart your computer

**Verify Installation**:
```powershell
node --version    # Should show v18+ or v20+
npm --version     # Should show 8.0.0+
```

### Step 2: Navigate to Project
```powershell
cd "C:\Users\DELL\Desktop\TrustGate_AI"
```

### Step 3: Install Dependencies
```powershell
npm install
```

This will install:
- ✅ Next.js 14
- ✅ React 18
- ✅ Tailwind CSS 3.3
- ✅ Framer Motion
- ✅ Lucide React
- ✅ PostCSS & Autoprefixer

**Installation time**: 2-5 minutes

---

## 🎯 Available Commands

Once installed, use these commands:

```powershell
# Start development server
npm run dev
# Visit: http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

## ✅ Verify Everything Works

1. **Run dev server**:
   ```powershell
   npm run dev
   ```

2. **Open browser**: `http://localhost:3000`

3. **Test webhook demo**: Visit `/pages/demo`

4. **Check console**: Should see no errors

---

## 🐛 Troubleshooting

### "npm is not recognized"
- Close PowerShell completely
- Reopen PowerShell
- Or restart your computer

### Installation fails or is slow
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules
Remove-Item node_modules -Recurse -Force

# Try installing again
npm install
```

### Port 3000 already in use
```powershell
# Use different port
$env:PORT=3001; npm run dev
```

### Module not found errors
```powershell
# Reinstall dependencies
rm node_modules package-lock.json -r -Force
npm install
```

---

## 📊 Project Structure

```
TrustGate_AI/
├── components/          # React components
├── pages/               # Next.js pages
├── services/            # API services (webhook)
├── hooks/               # React hooks
├── utils/               # Utilities
├── styles/              # CSS files
├── globals.css          # Global styling
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind config
├── next.config.js       # Next.js config
└── postcss.config.js    # PostCSS config
```

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies & scripts |
| `tailwind.config.js` | Tailwind CSS configuration |
| `next.config.js` | Next.js configuration |
| `postcss.config.js` | PostCSS plugins |
| `.eslintrc.json` | ESLint rules |
| `jsconfig.json` | Path aliases |
| `.gitignore` | Git ignore rules |

---

## 🌐 Environment Variables

Create `.env.local` (optional):
```env
NEXT_PUBLIC_API_URL=https://api.trustgate.ai
NODE_ENV=production
```

---

## 📚 Documentation

- **README.md** - Project overview
- **SETUP_GUIDE.md** - Detailed setup
- **QUICK_REFERENCE.md** - Developer reference
- **FILE_MANIFEST.md** - All files list

---

## ✨ What's Next?

1. **Start Development**:
   ```powershell
   npm run dev
   ```

2. **Open Component Files**:
   - `pages/demo.js` - Demo page
   - `components/Navbar.js` - Navigation
   - `components/Footer.js` - Footer

3. **Test Webhook**:
   - Go to `http://localhost:3000/pages/demo`
   - Test the n8n webhook integration

4. **Deploy to Production**:
   ```powershell
   npm run build
   npm run start
   ```

---

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [npm Documentation](https://docs.npmjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [n8n Documentation](https://docs.n8n.io)

---

## 📞 Support

If you encounter issues:

1. Check **Troubleshooting** section above
2. Run `npm cache clean --force`
3. Delete `node_modules` and `package-lock.json`
4. Run `npm install` again

---

**Status**: ✅ Ready to Install

Generated: April 21, 2026
