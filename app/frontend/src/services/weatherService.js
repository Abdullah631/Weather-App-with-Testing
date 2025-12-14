import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Get current weather for a city
 */
export const getCurrentWeather = async (city) => {
  try {
    const response = await client.get(`/weather/${encodeURIComponent(city)}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch weather' };
  }
};

/**
 * Get weather forecast for a city
 */
export const getForecast = async (city, days = 7) => {
  try {
    const response = await client.get(`/forecast/${encodeURIComponent(city)}`, {
      params: { days }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch forecast' };
  }
};

/**
 * Search cities
 */
export const searchCities = async (query) => {
  try {
    const response = await client.get('/search', {
      params: { q: query }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to search cities' };
  }
};

/**
 * Get search history
 */
export const getHistory = async (limit = 20, offset = 0) => {
  try {
    const response = await client.get('/history', {
      params: { limit, offset }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch history' };
  }
};

/**
 * Add to search history
 */
export const addToHistory = async (city, temperature, condition) => {
  try {
    const response = await client.post('/history', {
      city,
      temperature,
      condition
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to save history' };
  }
};

/**
 * Delete history entry
 */
export const deleteHistory = async (id) => {
  try {
    const response = await client.delete(`/history/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete history' };
  }
};

/**
 * Clear all history
 */
export const clearHistory = async () => {
  try {
    const response = await client.delete('/history');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to clear history' };
  }
};

/**
 * Health check
 */
export const healthCheck = async () => {
  try {
    const response = await client.get('/health');
    return response.data;
  } catch (error) {
    return { status: 'ERROR' };
  }
};

export default client;
