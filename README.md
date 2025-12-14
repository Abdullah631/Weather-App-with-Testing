# Weather Forecasting Web App – Performance Testing & Analysis

**Semester Project: Software Quality Engineering (SQE)**

---

## 📋 Project Overview

This is a comprehensive semester project demonstrating **Software Quality Engineering (SQE)** best practices through a full-stack Weather Forecasting Web Application integrated with performance testing and analysis.

### 🎯 Key Objectives

1. **Build** a production-ready MERN stack weather forecasting application
2. **Performance Test** using Apache JMeter and Gatling
3. **Analyze** test results with detailed metrics and bottleneck identification
4. **Document** all processes following academic and professional standards
5. **Demonstrate** SQE expertise in testing, automation, and quality assurance

---

## 📦 Project Structure

```
projj1/
├── README.md                          # Project documentation
├── .env.example                       # Environment variables template
├── docker-compose.yml                 # Optional containerization
│
├── app/                               # Application code
│   ├── backend/                       # Express.js backend
│   │   ├── package.json
│   │   ├── server.js
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── weather-api.js
│   │   ├── routes/
│   │   │   ├── weather.js
│   │   │   ├── forecast.js
│   │   │   ├── search.js
│   │   │   └── history.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── SearchHistory.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   └── controllers/
│   │       ├── weatherController.js
│   │       └── userController.js
│   │
│   └── frontend/                      # React frontend
│       ├── package.json
│       ├── public/
│       ├── src/
│       │   ├── index.js
│       │   ├── App.js
│       │   ├── pages/
│       │   │   ├── Home.js
│       │   │   ├── SearchWeather.js
│       │   │   ├── Forecast.js
│       │   │   ├── History.js
│       │   │   └── Settings.js
│       │   ├── components/
│       │   │   ├── WeatherCard.js
│       │   │   ├── SearchBar.js
│       │   │   ├── Navbar.js
│       │   │   └── LoadingSpinner.js
│       │   ├── services/
│       │   │   └── weatherService.js
│       │   ├── styles/
│       │   │   ├── App.css
│       │   │   └── components.css
│       │   └── utils/
│       │       ├── constants.js
│       │       └── helpers.js
│       └── .env.local
│
├── tests/                             # Performance testing
│   ├── jmeter/
│   │   ├── load_test.jmx
│   │   ├── stress_test.jmx
│   │   ├── spike_test.jmx
│   │   ├── endurance_test.jmx
│   │   ├── data/
│   │   │   ├── cities.csv
│   │   │   └── test_users.csv
│   │   └── reports/
│   │
│   └── gatling/
│       ├── src/test/scala/
│       │   ├── simulations/
│       │   │   ├── WeatherLoadTest.scala
│       │   │   ├── WeatherStressTest.scala
│       │   │   └── WeatherSpikeTest.scala
│       │   └── helpers/
│       │       └── Common.scala
│       ├── build.sbt
│       └── reports/
│
├── docs/                              # Documentation
│   ├── TEST_PLAN.md
│   ├── TEST_CASES.md
│   ├── PERFORMANCE_REPORT.md
│   ├── JMETER_ANALYSIS.md
│   ├── GATLING_ANALYSIS.md
│   ├── SECURITY_CHECKLIST.md
│   └── DEPLOYMENT_GUIDE.md
│
├── .github/
│   └── workflows/
│       └── performance-tests.yml      # GitHub Actions CI/CD
│
└── .gitignore
```

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18.x
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3, Responsive Design
- **Build Tool**: Create React App / Vite

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (local or Atlas)
- **External API**: OpenWeatherMap / WeatherAPI
- **Authentication**: JWT (optional)
- **Validation**: Express-validator

### Testing
- **Load Testing**: Apache JMeter (Java-based)
- **Performance Testing**: Gatling (Scala-based)
- **Reporting**: HTML dashboards, JSON exports

### DevOps (Optional)
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Deployment**: Heroku / AWS Lambda / Vercel

---

## 📱 Application Features

### 5+ Web Pages

1. **Home Page**
   - Dashboard with current weather
   - Quick city search
   - Recently viewed locations
   - Weather alerts/notifications

2. **Search Weather Page**
   - City search with autocomplete
   - Current conditions display
   - Detailed metrics (humidity, wind, pressure, etc.)
   - Unit conversion (°C/°F)

3. **Forecast Page**
   - 7-day weather forecast
   - Hourly forecast view
   - Weather charts and graphs
   - Precipitation probability

4. **History Page**
   - Search history with timestamps
   - Saved locations
   - Previous weather data
   - Export history (CSV/JSON)

5. **Settings Page**
   - Temperature unit preferences
   - Theme selection (light/dark mode)
   - Notification preferences
   - Language selection
   - Account management (if using auth)

### API Endpoints

```
GET  /api/weather/:city              - Get current weather
GET  /api/forecast/:city?days=7      - Get weather forecast
GET  /api/search?query=...           - Search cities
GET  /api/history                    - Get search history
POST /api/history                    - Save to history
DELETE /api/history/:id              - Delete history entry
GET  /api/settings                   - Get user settings
PUT  /api/settings                   - Update settings
GET  /api/health                     - Health check
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16+)
- **npm** or **yarn**
- **MongoDB** (local or Atlas connection string)
- **OpenWeatherMap API Key** (free tier available)
- **JMeter** (v5.4+) for load testing
- **Gatling** (v3.9+) for stress testing

### Installation Steps

#### 1. Clone & Setup Environment

```bash
cd projj1
cp .env.example .env.local
# Edit .env.local with your API keys and database connection
```

#### 2. Backend Setup

```bash
cd app/backend
npm install
npm start
# Server runs on http://localhost:5000
```

#### 3. Frontend Setup

```bash
cd app/frontend
npm install
npm start
# App runs on http://localhost:3000
```

#### 4. Verify Application

Open http://localhost:3000 in browser and test all pages.

---

## 📊 Performance Testing

### JMeter Test Plans

#### Load Test
- **Purpose**: Validate system performance under normal loads
- **Threads**: 100 users
- **Ramp-up**: 60 seconds
- **Duration**: 300 seconds
- **Expected Response Time**: < 500ms (95th percentile)

#### Stress Test
- **Purpose**: Find breaking point of the system
- **Threads**: 500 → 2000 users
- **Ramp-up**: 300 seconds
- **Duration**: 600 seconds
- **Goal**: Identify error threshold

#### Spike Test
- **Purpose**: Test sudden traffic bursts
- **Normal Load**: 100 users
- **Spike**: 1000 users (sudden)
- **Duration**: 30 seconds spike
- **Monitor**: Response time degradation

#### Endurance Test
- **Purpose**: Verify stability over extended periods
- **Threads**: 200 users
- **Duration**: 3600 seconds (1 hour)
- **Monitor**: Memory leaks, gradual degradation

### Gatling Simulations

Scala-based simulations with realistic user scenarios:
- User ramp-up patterns
- Think time between requests
- Realistic data variations
- Failure rate monitoring

### Test Execution

```bash
# JMeter
jmeter -n -t tests/jmeter/load_test.jmx -l test_results.jtl -j jmeter.log

# Gatling
cd tests/gatling
mvn gatling:test -Dgatling.simulationClass=simulations.WeatherLoadTest
```

---

## 📈 Performance Metrics & Analysis

### Key Performance Indicators (KPIs)

| Metric | Target | Threshold |
|--------|--------|-----------|
| Average Response Time | < 300ms | < 500ms |
| 95th Percentile | < 500ms | < 1000ms |
| 99th Percentile | < 1000ms | < 2000ms |
| Throughput (TPS) | > 100 req/s | > 50 req/s |
| Error Rate | 0% | < 1% |
| Concurrent Users | 1000+ | 500+ |

### Analysis Included

1. **Response Time Analysis**
   - Min, Max, Average, Median
   - 90th, 95th, 99th percentiles
   - Trend analysis over time

2. **Throughput Analysis**
   - Requests per second (RPS/TPS)
   - Bytes transferred
   - Network utilization

3. **Error Analysis**
   - Error counts and rates
   - Error types (timeout, connection, validation)
   - Error rate during stress

4. **Resource Utilization**
   - CPU usage
   - Memory consumption
   - Database connection pool

---

## 🔒 Security & Reliability Checks

### Security Testing
- ✅ Input validation (XSS prevention)
- ✅ SQL injection prevention (MongoDB injection)
- ✅ Rate limiting validation
- ✅ CORS configuration review
- ✅ API authentication/authorization
- ✅ Environment variable protection

### Reliability Testing
- ✅ Failure handling under load
- ✅ Timeout management
- ✅ Connection pool saturation
- ✅ Graceful degradation
- ✅ Recovery time measurement

---

## 📑 Documentation Files

All documentation is located in `/docs/` folder:

1. **TEST_PLAN.md** - Complete test strategy and approach
2. **TEST_CASES.md** - Detailed test cases with expected results
3. **PERFORMANCE_REPORT.md** - JMeter and Gatling results with analysis
4. **JMETER_ANALYSIS.md** - Deep dive into JMeter metrics
5. **GATLING_ANALYSIS.md** - Gatling simulation analysis
6. **SECURITY_CHECKLIST.md** - Security validation results
7. **DEPLOYMENT_GUIDE.md** - Deployment instructions (local, Docker, cloud)

---

## ⚙️ CI/CD Automation

GitHub Actions workflow automatically:
- Runs JMeter tests on push
- Executes Gatling simulations
- Generates HTML reports
- Archives test artifacts
- Posts summary comments on PRs

See `.github/workflows/performance-tests.yml`

---

## 📋 SQE Best Practices Implemented

✅ **Test Planning** - Comprehensive test strategy
✅ **Test Design** - Multiple test types (load, stress, spike, endurance)
✅ **Test Execution** - Automated test runs with consistent environment
✅ **Metrics Collection** - Detailed performance metrics
✅ **Analysis & Reporting** - Professional, actionable reports
✅ **Documentation** - Complete documentation suite
✅ **Automation** - CI/CD integration
✅ **Scalability** - Tests simulate realistic loads
✅ **Reproducibility** - Identical results across runs
✅ **Security** - OWASP-focused API security checks

---

## 📝 How to Run Everything

### Step 1: Setup Application
```bash
cd app/backend && npm install && npm start
# In new terminal:
cd app/frontend && npm install && npm start
```

### Step 2: Run JMeter Tests
```bash
# Download JMeter if not installed
jmeter -n -t tests/jmeter/load_test.jmx -l results.jtl
jmeter -g results.jtl -o report_folder
```

### Step 3: Run Gatling Tests
```bash
cd tests/gatling
mvn clean test
# Reports in target/gatling/
```

### Step 4: Generate Reports
Reports are automatically generated in:
- `tests/jmeter/reports/` (JMeter HTML dashboard)
- `tests/gatling/target/gatling/` (Gatling HTML reports)

### Step 5: Review Documentation
Open documentation files in `/docs/` for complete analysis.

---

## ✨ Expected Deliverables Summary

- ✅ Working Weather Web App (MERN stack)
- ✅ 5+ Pages with full functionality
- ✅ Complete API backend with error handling
- ✅ JMeter test suite (4 test types)
- ✅ Gatling performance simulations
- ✅ Performance analysis reports
- ✅ Security checklist
- ✅ Test documentation
- ✅ Deployment guide
- ✅ CI/CD automation
- ✅ README (this file)

---

## 📞 Support & References

### External APIs
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Weather API](https://www.weatherapi.com/)

### Performance Testing Tools
- [Apache JMeter Documentation](https://jmeter.apache.org/)
- [Gatling Official Docs](https://gatling.io/documentation/)

### SQE Resources
- ISTQB Guidelines
- IEEE Standard 829 (Test Documentation)
- OWASP Testing Guide

---

## 📅 Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Setup & Planning | Week 1 | Project structure, README |
| App Development | Weeks 2-3 | Frontend + Backend |
| Test Plan Creation | Week 3 | JMeter & Gatling configs |
| Test Execution | Week 4 | Test runs and reports |
| Analysis & Documentation | Week 4 | Final report and conclusion |

---

## 👤 Author

**Student Name**: [Your Name]  
**Course**: Software Quality Engineering  
**Semester**: [Current Semester]  
**Date**: December 2025

---

## 📄 License

This project is for academic purposes.

---

**Last Updated**: December 14, 2025  
**Status**: In Progress
