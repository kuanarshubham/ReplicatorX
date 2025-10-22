#!/bin/bash

# Ask for commit message
read -p "Enter your commit message: " COMMIT_MESSAGE

# Set your remote URL
REMOTE_URL="https://github.com/kuanarshubham/ReplicatorX.git"

# Initialize git
git init

# Add all files (you can change to README.md if you want)
git add .

# Commit with the message
git commit -m "$COMMIT_MESSAGE"

# Set branch to main
git branch -M main

# Add remote
git remote add origin "$REMOTE_URL"

# Push to GitHub
git push -u origin main

echo "✅ Done! Repository initialized and pushed to GitHub."
