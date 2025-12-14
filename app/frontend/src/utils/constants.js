export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const TEMPERATURE_UNIT = 'C'; // C or F
export const FORECAST_DAYS = 7;

export const WEATHER_CONDITIONS = {
  sunny: '☀️',
  cloudy: '☁️',
  rainy: '🌧️',
  snowy: '❄️',
  windy: '💨',
  stormy: '⛈️'
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  API_ERROR: 'API Error. Please try again.',
  CITY_NOT_FOUND: 'City not found. Please try another search.',
  INVALID_INPUT: 'Please enter a valid city name.',
  SERVER_ERROR: 'Server error. Please try again later.'
};
