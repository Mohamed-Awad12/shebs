#!/bin/bash

# Deployment script for Vercel

echo "🚀 Preparing project for Vercel deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "client" ]; then
    echo "❌ Error: This script must be run from the project root directory"
    exit 1
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

# Build the client
echo "🏗️  Building client application..."
cd client
npm run build
cd ..

echo "✅ Project prepared successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub/GitLab/Bitbucket"
echo "2. Connect your repository to Vercel"
echo "3. Set environment variables in Vercel dashboard:"
echo "   - APP_URI (MongoDB connection string)"
echo "   - SECRET_KEY (JWT secret)"
echo "   - FRONTEND_ORIGIN (your Vercel app URL)"
echo "4. Deploy!"
echo ""
echo "🌐 Your API will be available at: https://your-app.vercel.app/api/"
echo "🎨 Your frontend will be available at: https://your-app.vercel.app/"
