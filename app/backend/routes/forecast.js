const express = require('express');
const router = express.Router();
const weatherApi = require('../config/weatherApi');

/**
 * GET /api/forecast/:city
 * Get weather forecast for a specific city
 * Query params: days (1-10, default 7)
 */
router.get('/:city', async (req, res, next) => {
  try {
    const { city } = req.params;
    const { days } = req.query;

    // Input validation
    if (!city || city.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'City name is required'
      });
    }

    // Sanitize and validate inputs
    const sanitizedCity = city.trim().substring(0, 50);
    let forecastDays = parseInt(days) || 7;
    
    if (forecastDays < 1 || forecastDays > 10) {
      forecastDays = 7;
    }

    const result = await weatherApi.getForecast(sanitizedCity, forecastDays);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
