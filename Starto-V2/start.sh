#!/usr/bin/env bash
set -euo pipefail

# application-start-script
# ensures strict LF line endings for Railway detection

# default PORT if not provided by environment
PORT="${PORT:-3000}"

# If package.json exists, install deps (ci if possible)
if [ -f package.json ]; then
  echo "Installing dependencies..."
  if command -v npm >/dev/null 2>&1; then
    npm ci || npm install
  fi
fi

# Build if build script exists
if [ -f package.json ] && jq -e '.scripts.build' package.json >/dev/null 2>&1; then
  echo "Running npm run build..."
  npm run build
else
  echo "No build script found or jq missing — attempting 'npm start' fallback"
  npm start || true
fi

# Start static server using npx serve if build produced a 'build' or 'dist' folder
if [ -d build ]; then
  echo "Starting static server (serve) on port $PORT..."
  npx serve -s build -l "$PORT"
elif [ -d dist ]; then
  echo "Starting static server (serve) on port $PORT using dist..."
  npx serve -s dist -l "$PORT"
else
  echo "No build output found. Attempting npm start..."
  npm start
fi
