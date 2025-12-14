const express = require('express');
const router = express.Router();
const weatherApi = require('../config/weatherApi');

/**
 * GET /api/search
 * Search for cities based on query
 * Query params: q (required) - search query
 */
router.get('/', async (req, res, next) => {
  try {
    const { q } = req.query;

    // Input validation
    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Search query is required'
      });
    }

    // Sanitize query
    const sanitizedQuery = q.trim().substring(0, 100);

    const result = await weatherApi.searchCities(sanitizedQuery);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
