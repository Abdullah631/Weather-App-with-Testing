// Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Validation Error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: err.message,
      details: err.details || []
    });
  }

  // JSON Parse Error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON',
      message: 'Request body contains invalid JSON'
    });
  }

  // API Error
  if (err.isApiError) {
    return res.status(err.statusCode || 500).json({
      success: false,
      error: err.name || 'API Error',
      message: err.message
    });
  }

  // Default Server Error
  res.status(err.statusCode || 500).json({
    success: false,
    error: 'Server Error',
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'An internal server error occurred'
  });
};

module.exports = errorHandler;
