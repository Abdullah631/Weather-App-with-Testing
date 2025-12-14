const express = require('express');
const router = express.Router();
const weatherApi = require('../config/weatherApi');

/**
 * GET /api/weather/:city
 * Get current weather for a specific city
 */
router.get('/:city', async (req, res, next) => {
  try {
    const { city } = req.params;

    // Input validation
    if (!city || city.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'City name is required'
      });
    }

    // Sanitize city name
    const sanitizedCity = city.trim().substring(0, 50);

    const result = await weatherApi.getCurrentWeather(sanitizedCity);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
