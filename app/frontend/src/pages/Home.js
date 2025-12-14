import React, { useState, useEffect } from 'react';
import { getCurrentWeather, addToHistory } from '../services/weatherService';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/App.css';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C');

  useEffect(() => {
    // Fetch default city on load
    fetchWeather('London');
  }, []);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getCurrentWeather(city);
      if (result.success) {
        setWeather(result.data);
        // Add to history
        await addToHistory(result.data.city, result.data.temperature, result.data.condition);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weather');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ color: 'white', marginBottom: '20px' }}>🌤️ Weather Dashboard</h1>
          <SearchBar onSearch={handleSearch} />
        </div>

        {error && (
          <div className="alert alert-danger">
            ⚠️ {error}
          </div>
        )}

        <LoadingSpinner loading={loading} />

        {weather && !loading && (
          <>
            <WeatherCard weather={weather} unit={unit} />
            <div style={{ textAlign: 'center' }}>
              <button
                className="btn btn-primary"
                onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
              >
                Switch to °{unit === 'C' ? 'F' : 'C'}
              </button>
            </div>
          </>
        )}

        {!weather && !loading && !error && (
          <div className="card text-center">
            <p>Search for a city to see the weather</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
