const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const weatherRoutes = require('./routes/weather');
const forecastRoutes = require('./routes/forecast');
const searchRoutes = require('./routes/search');
const historyRoutes = require('./routes/history');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ============= SECURITY MIDDLEWARE =============
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// ============= RATE LIMITING =============
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// ============= BODY PARSING MIDDLEWARE =============
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ============= LOGGING MIDDLEWARE =============
app.use(morgan('combined'));

// ============= ROOT ENDPOINT =============
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Weather Forecasting Web App Backend',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      weather: 'GET /api/weather/:city',
      forecast: 'GET /api/forecast/:city?days=7',
      search: 'GET /api/search?q=query',
      history: {
        list: 'GET /api/history',
        add: 'POST /api/history',
        delete: 'DELETE /api/history/:id'
      }
    },
    documentation: {
      frontend: 'http://localhost:3000',
      apiDocs: '/api/docs (coming soon)'
    }
  });
});

// ============= HEALTH CHECK ENDPOINT =============
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ============= API ROUTES =============
app.use('/api/weather', weatherRoutes);
app.use('/api/forecast', forecastRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/history', historyRoutes);

// ============= 404 HANDLER =============
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path
  });
});

// ============= ERROR HANDLER MIDDLEWARE =============
app.use(errorHandler);

// ============= SERVER START =============
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║   Weather Forecasting Web App Backend                  ║
║   Server running on http://localhost:${PORT}                    ║
║   Environment: ${process.env.NODE_ENV || 'development'}                       ║
║   API Documentation: /api/docs                         ║
╚════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
