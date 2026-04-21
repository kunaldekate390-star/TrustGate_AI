#!/bin/bash

# TrustGate AI - Automated Installation Script (for Mac/Linux)

echo "╔════════════════════════════════════════════════════════╗"
echo "║     TrustGate AI - Automated Installation Script      ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
echo "🔍 Checking for Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)
    echo "✅ Node.js is already installed!"
    echo "   Node: $NODE_VERSION"
    echo "   npm: $NPM_VERSION"
    echo ""
else
    echo "❌ Node.js is NOT installed"
    echo ""
    echo "📌 Please install Node.js before running this script:"
    echo "   1. Visit: https://nodejs.org (Download LTS version)"
    echo "   2. Run the installer"
    echo "   3. Restart your terminal"
    echo "   4. Run this script again"
    echo ""
    exit 1
fi

# Navigate to project directory
PROJECT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "📁 Project path: $PROJECT_PATH"
cd "$PROJECT_PATH"
echo ""

# Clear npm cache
echo "🧹 Clearing npm cache..."
npm cache clean --force 2>/dev/null
echo "✅ Cache cleared"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "   This may take 2-5 minutes..."
echo ""

npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation successful!"
    echo ""
    echo "╔════════════════════════════════════════════════════════╗"
    echo "║              ✨ Ready to go! ✨                       ║"
    echo "╚════════════════════════════════════════════════════════╝"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Start development server:"
    echo "      npm run dev"
    echo ""
    echo "   2. Open browser:"
    echo "      http://localhost:3000"
    echo ""
    echo "   3. Test the webhook:"
    echo "      Visit /pages/demo"
    echo ""
else
    echo ""
    echo "❌ Installation failed!"
    echo ""
    echo "Troubleshooting:"
    echo "   1. Run: npm cache clean --force"
    echo "   2. Delete node_modules folder: rm -rf node_modules"
    echo "   3. Run this script again"
    echo ""
    exit 1
fi
