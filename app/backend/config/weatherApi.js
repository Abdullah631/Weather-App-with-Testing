const axios = require('axios');

const API_KEY = process.env.WEATHER_API_KEY || 'demo';
const BASE_URL = 'https://api.weatherapi.com/v1';

/**
 * Fetch current weather for a city
 * @param {string} city - City name
 * @returns {Promise<Object>} Weather data
 */
async function getCurrentWeather(city) {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: city,
        aqi: 'yes'
      },
      timeout: 5000
    });

    return {
      success: true,
      data: {
        city: response.data.location.name,
        country: response.data.location.country,
        temperature: response.data.current.temp_c,
        condition: response.data.current.condition.text,
        humidity: response.data.current.humidity,
        windSpeed: response.data.current.wind_kph,
        pressure: response.data.current.pressure_mb,
        feelsLike: response.data.current.feelslike_c,
        uv: response.data.current.uv,
        visibility: response.data.current.vis_km,
        lastUpdated: response.data.current.last_updated,
        icon: response.data.current.condition.icon
      }
    };
  } catch (error) {
    throw {
      isApiError: true,
      statusCode: error.response?.status || 500,
      message: error.response?.data?.error?.message || 'Failed to fetch weather data'
    };
  }
}

/**
 * Fetch weather forecast for a city
 * @param {string} city - City name
 * @param {number} days - Number of days to forecast (1-10)
 * @returns {Promise<Object>} Forecast data
 */
async function getForecast(city, days = 7) {
  try {
    if (days < 1 || days > 10) days = 7;

    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: days,
        aqi: 'yes'
      },
      timeout: 5000
    });

    const forecastDays = response.data.forecast.forecastday.map(day => ({
      date: day.date,
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c,
      avgTemp: day.day.avgtemp_c,
      condition: day.day.condition.text,
      humidity: day.day.avghumidity,
      windSpeed: day.day.maxwind_kph,
      precipitationProb: day.day.daily_chance_of_rain,
      icon: day.day.condition.icon,
      hourly: day.hour.map(hour => ({
        time: hour.time,
        temperature: hour.temp_c,
        condition: hour.condition.text,
        humidity: hour.humidity,
        windSpeed: hour.wind_kph,
        precipitationProb: hour.chance_of_rain,
        icon: hour.condition.icon
      }))
    }));

    return {
      success: true,
      data: {
        city: response.data.location.name,
        country: response.data.location.country,
        forecast: forecastDays
      }
    };
  } catch (error) {
    throw {
      isApiError: true,
      statusCode: error.response?.status || 500,
      message: error.response?.data?.error?.message || 'Failed to fetch forecast data'
    };
  }
}

/**
 * Search for cities
 * @param {string} query - Search query
 * @returns {Promise<Array>} List of matching cities
 */
async function searchCities(query) {
  try {
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: API_KEY,
        q: query
      },
      timeout: 5000
    });

    return {
      success: true,
      data: response.data.map(location => ({
        name: location.name,
        region: location.region,
        country: location.country,
        lat: location.lat,
        lon: location.lon
      }))
    };
  } catch (error) {
    throw {
      isApiError: true,
      statusCode: error.response?.status || 500,
      message: error.response?.data?.error?.message || 'Failed to search cities'
    };
  }
}

module.exports = {
  getCurrentWeather,
  getForecast,
  searchCities
};
