import React, { useState } from 'react';
import { getCurrentWeather, addToHistory } from '../services/weatherService';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/App.css';

const SearchWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C');
  const [searchedCity, setSearchedCity] = useState('');

  const fetchWeather = async (city) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);
    setSearchedCity(city);

    try {
      const result = await getCurrentWeather(city);
      if (result.success) {
        setWeather(result.data);
        await addToHistory(result.data.city, result.data.temperature, result.data.condition);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weather');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1 style={{ color: 'white', marginBottom: '30px' }}>🔍 Search Weather</h1>
        
        <SearchBar onSearch={fetchWeather} placeholder="Enter a city name..." />

        {error && (
          <div className="alert alert-danger">
            ⚠️ {error}
          </div>
        )}

        <LoadingSpinner loading={loading} />

        {weather && !loading && (
          <>
            <WeatherCard weather={weather} unit={unit} />
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button
                className="btn btn-primary"
                onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
              >
                Switch to °{unit === 'C' ? 'F' : 'C'}
              </button>
            </div>
          </>
        )}

        {!weather && !loading && !error && searchedCity && (
          <div className="card text-center">
            <p>No results found for "{searchedCity}"</p>
          </div>
        )}

        {!weather && !loading && !error && !searchedCity && (
          <div className="card text-center">
            <p>Enter a city name to search for weather information</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchWeather;
