# QUICK START GUIDE

**Weather Forecasting Web App - SQE Semester Project**

Get the application running in 5 minutes!

---

## 🚀 Quick Setup

### 1. Prerequisites Check

```bash
node --version    # Should be 16+
npm --version     # Should be 8+
```

### 2. Get Weather API Key

1. Visit [weatherapi.com](https://www.weatherapi.com/)
2. Sign up (free tier available)
3. Copy your API key

### 3. Backend Setup (1 min)

```bash
cd app/backend

# Copy environment file
cp .env.example .env.local

# Edit .env.local and add your API key
# WEATHER_API_KEY=your_key_here

# Install & start
npm install && npm start
```

✅ Backend running on `http://localhost:5000`

### 4. Frontend Setup (2 min)

Open **new terminal**:

```bash
cd app/frontend
npm install && npm start
```

✅ App opens on `http://localhost:3000`

---

## ✨ Test the App

### Manual Testing

1. **Home Page**: Should display London weather
2. **Search**: Click search and try "Paris"
3. **Forecast**: Go to Forecast page
4. **History**: View your search history
5. **Settings**: Change temperature unit

### API Testing

```bash
# Health check
curl http://localhost:5000/api/health

# Get weather
curl http://localhost:5000/api/weather/London

# Get forecast
curl http://localhost:5000/api/forecast/New%20York

# Search cities
curl "http://localhost:5000/api/search?q=Tok"
```

---

## 📊 Performance Testing

### With JMeter

```bash
# Download JMeter first
# From: https://jmeter.apache.org/download_jmeter.html

# Run load test
jmeter -n -t tests/jmeter/load_test.jmx -l results.jtl

# View report
jmeter -g results.jtl -o report
```

### With Gatling

```bash
cd tests/gatling
mvn clean test -Dgatling.simulationClass=simulations.WeatherLoadTest
# Report: target/gatling/report/index.html
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `README.md` | Project overview & architecture |
| `docs/TEST_PLAN.md` | Complete test strategy |
| `docs/TEST_CASES.md` | All test cases |
| `docs/PERFORMANCE_REPORT.md` | Performance analysis |
| `docs/DEPLOYMENT_GUIDE.md` | Deployment instructions |
| `docs/SECURITY_CHECKLIST.md` | Security validation |

---

## 🎯 Project Structure

```
projj1/
├── app/
│   ├── backend/          # Express API server
│   └── frontend/         # React web application
├── tests/
│   ├── jmeter/          # JMeter test plans
│   └── gatling/         # Gatling simulations
├── docs/                # Complete documentation
└── README.md            # This file
```

---

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### API Key Invalid

Get free key from [weatherapi.com](https://www.weatherapi.com/)

### CORS Errors

Ensure backend is running on port 5000 and frontend on 3000

---

## 📋 Checklist

- [ ] Node.js 16+ installed
- [ ] API key obtained
- [ ] Backend running (`npm start`)
- [ ] Frontend running (`npm start`)
- [ ] Can access app at `http://localhost:3000`
- [ ] Weather data displays correctly

---

## 🎓 For Academic Submission

### Complete Package Includes:

✅ Working MERN stack application with 5+ pages
✅ Comprehensive backend with weather API integration
✅ Beautiful React frontend with responsive design
✅ JMeter test plans (Load, Stress, Spike, Endurance)
✅ Gatling performance simulations
✅ Complete documentation suite
✅ Security validation checklist
✅ Deployment guide
✅ GitHub Actions CI/CD workflow
✅ Professional README

**Status**: Ready for evaluation ✅

---

## 📞 Support

For detailed instructions, see:
- **Setup**: `docs/DEPLOYMENT_GUIDE.md`
- **Testing**: `docs/TEST_PLAN.md`
- **API Details**: `README.md` (API Endpoints section)

---

**Last Updated**: December 14, 2025
