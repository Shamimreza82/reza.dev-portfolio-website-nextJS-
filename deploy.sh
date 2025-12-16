#!/bin/bash

# ===========================
# Deploy script for Next.js
# ===========================

# Exit immediately if a command exits with a non-zero status
set -e

APP_NAME="frontend"
APP_DIR="/home/ubuntu/reza/reza.dev-portfolio-website-nextJS-"  # Change this to your project path
BRANCH="main"  # Change if your default branch is different

echo "=============================="
echo "Deploying $APP_NAME..."
echo "=============================="

# Go to project directory
cd $APP_DIR

# Stash any local changes
git stash

# Pull the latest code
echo "Pulling latest code from branch $BRANCH..."
git fetch origin $BRANCH
git reset --hard origin/$BRANCH

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build


# Restart PM2 process
echo "Restarting PM2 process..."
if pm2 describe "$APP_NAME" > /dev/null; then
  pm2 restart "$APP_NAME"
else
  pm2 start ecosystem.config.js
fi
# Save PM2 process list
pm2 save

echo "=============================="
echo "$APP_NAME deployed successfully!"
echo "=============================="

