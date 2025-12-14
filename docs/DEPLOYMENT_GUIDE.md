# Deployment Guide

**Project**: Weather Forecasting Web App  
**Version**: 1.0.0  
**Date**: December 14, 2025

---

## Table of Contents

1. [Local Development Setup](#1-local-development-setup)
2. [Docker Deployment](#2-docker-deployment)
3. [Cloud Deployment (Heroku)](#3-cloud-deployment-heroku)
4. [GitHub Actions CI/CD](#4-github-actions-cicd)
5. [Environment Configuration](#5-environment-configuration)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Local Development Setup

### Prerequisites

- Node.js 16+ ([Download](https://nodejs.org/))
- npm 8+ or yarn 1.22+
- Git
- WeatherAPI.com API Key (free at [weatherapi.com](https://www.weatherapi.com/))
- JMeter 5.4+ (for performance testing)
- Gatling 3.9+ (for load testing)

### Step-by-Step Setup

#### Step 1: Clone Repository

```bash
git clone <repository-url>
cd projj1
```

#### Step 2: Backend Setup

```bash
cd app/backend

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your API key
# WEATHER_API_KEY=your_key_here

# Install dependencies
npm install

# Start backend server
npm start
# Server runs on http://localhost:5000
```

**Expected Output:**
```
╔════════════════════════════════════════════════════════╗
║   Weather Forecasting Web App Backend                  ║
║   Server running on http://localhost:5000              ║
║   Environment: development                             ║
║   API Documentation: /api/docs                         ║
╚════════════════════════════════════════════════════════╝
```

#### Step 3: Frontend Setup

Open new terminal:

```bash
cd app/frontend

# Copy environment file (already configured)
cp .env.local (already exists)

# Install dependencies
npm install

# Start frontend development server
npm start
# App runs on http://localhost:3000
```

**Expected Output:**
```
Compiled successfully!

You can now view weather-app-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.x.x.x:3000
```

#### Step 4: Verify Setup

Test the application:

```bash
# Health check
curl http://localhost:5000/api/health

# Expected response:
# {"status":"OK","timestamp":"2025-12-14T10:30:00.000Z","uptime":15.234}

# Get weather
curl http://localhost:5000/api/weather/London

# Search cities
curl "http://localhost:5000/api/search?q=London"
```

---

## 2. Docker Deployment

### Prerequisites

- Docker 20.10+ ([Install Docker](https://docs.docker.com/get-docker/))
- Docker Compose 2.0+ ([Install Compose](https://docs.docker.com/compose/install/))

### Docker Setup

#### Step 1: Create Docker Compose Configuration

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  weather-api:
    build:
      context: ./app/backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
      - WEATHER_API_KEY=${WEATHER_API_KEY}
      - FRONTEND_URL=http://localhost:3000
    depends_on:
      - mongo
    networks:
      - weather-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  weather-web:
    build:
      context: ./app/frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:5000/api
    depends_on:
      - weather-api
    networks:
      - weather-network

  mongo:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    networks:
      - weather-network

volumes:
  mongo-data:

networks:
  weather-network:
    driver: bridge
```

#### Step 2: Create Dockerfiles

**Backend Dockerfile** (`app/backend/Dockerfile`):

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

**Frontend Dockerfile** (`app/frontend/Dockerfile`):

```dockerfile
FROM node:16-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Step 3: Run with Docker Compose

```bash
# Set environment variables
export WEATHER_API_KEY=your_api_key_here

# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Step 4: Verify Docker Deployment

```bash
# Check running containers
docker-compose ps

# Test API
curl http://localhost:5000/api/health

# Access web app
open http://localhost:3000
```

---

## 3. Cloud Deployment (Heroku)

### Prerequisites

- Heroku Account ([Sign Up](https://www.heroku.com/))
- Heroku CLI ([Install](https://devcenter.heroku.com/articles/heroku-cli))

### Heroku Deployment Steps

#### Step 1: Create Heroku Apps

```bash
# Login to Heroku
heroku login

# Create backend app
heroku create weather-app-api
# Output: https://weather-app-api.herokuapp.com/

# Create frontend app
heroku create weather-app-web
# Output: https://weather-app-web.herokuapp.com/
```

#### Step 2: Configure Environment Variables

```bash
# Backend environment
heroku config:set NODE_ENV=production --app weather-app-api
heroku config:set WEATHER_API_KEY=your_api_key_here --app weather-app-api
heroku config:set FRONTEND_URL=https://weather-app-web.herokuapp.com --app weather-app-api

# Frontend environment
heroku config:set REACT_APP_API_URL=https://weather-app-api.herokuapp.com/api --app weather-app-web
```

#### Step 3: Deploy Backend

```bash
cd app/backend

# Create Procfile
echo "web: node server.js" > Procfile

# Deploy
heroku create weather-app-api (if not done)
git push heroku main  # or master

# View logs
heroku logs --tail --app weather-app-api
```

#### Step 4: Deploy Frontend

```bash
cd app/frontend

# Create Procfile for Node/Express server
echo "web: npm start" > Procfile

# Deploy
heroku create weather-app-web (if not done)
git push heroku main

# View logs
heroku logs --tail --app weather-app-web
```

#### Step 5: Verify Heroku Deployment

```bash
# Test API
curl https://weather-app-api.herokuapp.com/api/health

# Open web app
open https://weather-app-web.herokuapp.com
```

---

## 4. GitHub Actions CI/CD

### GitHub Actions Setup

#### Step 1: Create Workflow File

Create `.github/workflows/performance-tests.yml`:

```yaml
name: Performance Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'

    - name: Install Backend Dependencies
      run: |
        cd app/backend
        npm ci

    - name: Install Frontend Dependencies
      run: |
        cd app/frontend
        npm ci

    - name: Start Backend Server
      run: |
        cd app/backend
        npm start &
        sleep 5

    - name: Run API Tests
      run: |
        cd app/backend
        npm test

    - name: Setup JMeter
      run: |
        wget https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-5.4.1.zip
        unzip apache-jmeter-5.4.1.zip
        export PATH=$PATH:$(pwd)/apache-jmeter-5.4.1/bin

    - name: Run JMeter Load Test
      run: |
        jmeter -n -t tests/jmeter/load_test.jmx \
          -l results.jtl -j jmeter.log

    - name: Archive JMeter Results
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: jmeter-results
        path: |
          results.jtl
          jmeter.log

    - name: Publish Test Results
      if: always()
      uses: EnricoMi/publish-unit-test-result-action@v2
      with:
        files: results.xml
        check_name: Performance Test Results
```

#### Step 2: Push to GitHub

```bash
git add .github/workflows/performance-tests.yml
git commit -m "Add GitHub Actions CI/CD workflow"
git push origin main
```

#### Step 3: Monitor Workflow

- Go to GitHub repository
- Click "Actions" tab
- View workflow runs and logs

---

## 5. Environment Configuration

### Backend Environment Variables

Create `app/backend/.env`:

```env
# Server
PORT=5000
NODE_ENV=production

# Frontend
FRONTEND_URL=http://localhost:3000

# Weather API
WEATHER_API_KEY=your_api_key_here

# Database (optional)
MONGODB_URI=mongodb://localhost:27017/weather-app
MONGODB_ATLAS_URI=your_atlas_connection_string

# JWT (optional)
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
```

### Frontend Environment Variables

Create `app/frontend/.env.local`:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_API_TIMEOUT=10000

# App Configuration
REACT_APP_VERSION=1.0.0
REACT_APP_ENV=development
```

---

## 6. Troubleshooting

### Common Issues & Solutions

#### Issue: Port Already in Use

```bash
# Backend (5000)
lsof -i :5000
kill -9 <PID>

# Frontend (3000)
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=5001 npm start
```

#### Issue: CORS Errors

**Solution**: Update backend CORS configuration

```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

#### Issue: API Key Invalid

```bash
# Verify API key
curl "https://api.weatherapi.com/v1/current.json?key=YOUR_KEY&q=London"

# Get free key at weatherapi.com
```

#### Issue: Database Connection Failed

```bash
# Start MongoDB locally
mongod

# Or use MongoDB Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/weather-app
```

#### Issue: Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force
```

---

## Production Checklist

Before deploying to production:

- [ ] Update environment variables (API keys, URLs)
- [ ] Enable HTTPS
- [ ] Set up monitoring and alerting
- [ ] Configure backup strategy
- [ ] Enable rate limiting and security headers
- [ ] Set up logging and error tracking
- [ ] Configure CDN for static assets
- [ ] Test database failover
- [ ] Document deployment process
- [ ] Set up status page

---

## Performance Optimization for Deployment

### Enable Compression

```javascript
const compression = require('compression');
app.use(compression());
```

### Enable Caching

```javascript
const cache = require('express-api-cache');
app.use(cache.route(''));
```

### Database Optimization

```javascript
// Use connection pooling
const pool = mysql.createPool({
  connectionLimit: 10,
  // ... other options
});
```

### CDN Configuration

```javascript
// Serve assets from CDN
app.use(express.static('public', {
  maxAge: '1d'
}));
```

---

## Monitoring & Logging

### Application Insights (Azure)

```bash
npm install applicationinsights
```

### New Relic

```bash
npm install newrelic
```

### ELK Stack

- Elasticsearch
- Logstash
- Kibana

---

**Document Owner**: DevOps Engineer  
**Last Updated**: December 14, 2025  
**Status**: READY FOR DEPLOYMENT

