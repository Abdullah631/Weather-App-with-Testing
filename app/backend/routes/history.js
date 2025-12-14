const express = require('express');
const router = express.Router();

// In-memory storage for search history (replace with MongoDB in production)
const searchHistory = [];

/**
 * GET /api/history
 * Get search history
 * Query params: limit (default 20), offset (default 0)
 */
router.get('/', (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const offset = Math.max(parseInt(req.query.offset) || 0, 0);

    const paginated = searchHistory
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(offset, offset + limit);

    res.status(200).json({
      success: true,
      data: {
        total: searchHistory.length,
        count: paginated.length,
        offset: offset,
        limit: limit,
        history: paginated
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to fetch history'
    });
  }
});

/**
 * POST /api/history
 * Add to search history
 * Body: { city: string, temperature: number, condition: string }
 */
router.post('/', (req, res) => {
  try {
    const { city, temperature, condition } = req.body;

    // Input validation
    if (!city || !temperature || !condition) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'City, temperature, and condition are required'
      });
    }

    const historyEntry = {
      id: Date.now().toString(),
      city: city.substring(0, 50),
      temperature: parseFloat(temperature),
      condition: condition.substring(0, 50),
      timestamp: new Date().toISOString()
    };

    // Keep only last 100 entries
    if (searchHistory.length >= 100) {
      searchHistory.shift();
    }

    searchHistory.push(historyEntry);

    res.status(201).json({
      success: true,
      message: 'Added to history',
      data: historyEntry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to save history'
    });
  }
});

/**
 * DELETE /api/history/:id
 * Delete a history entry
 */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const index = searchHistory.findIndex(entry => entry.id === id);
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'History entry not found'
      });
    }

    const deleted = searchHistory.splice(index, 1);

    res.status(200).json({
      success: true,
      message: 'Deleted from history',
      data: deleted[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to delete history'
    });
  }
});

/**
 * DELETE /api/history
 * Clear all history
 */
router.delete('/', (req, res) => {
  try {
    const count = searchHistory.length;
    searchHistory.length = 0;

    res.status(200).json({
      success: true,
      message: 'Cleared all history',
      data: {
        deletedCount: count
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: 'Failed to clear history'
    });
  }
});

module.exports = router;
