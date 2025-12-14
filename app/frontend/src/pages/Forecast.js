import React, { useState } from 'react';
import { getForecast } from '../services/weatherService';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatTime, getWeatherIcon, formatTemp } from '../utils/helpers';
import '../styles/App.css';

const Forecast = () => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(7);
  const [unit, setUnit] = useState('C');
  const [selectedDay, setSelectedDay] = useState(null);

  const fetchForecast = async (city) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getForecast(city, days);
      if (result.success) {
        setForecast(result.data);
        setSelectedDay(0);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch forecast');
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1 style={{ color: 'white', marginBottom: '30px' }}>📅 Weather Forecast</h1>
        
        <SearchBar onSearch={fetchForecast} placeholder="Search forecast for a city..." />

        <div style={{ marginBottom: '20px', color: 'white' }}>
          <label>
            Forecast Days: 
            <select 
              value={days} 
              onChange={(e) => setDays(parseInt(e.target.value))}
              style={{ marginLeft: '10px', padding: '5px' }}
            >
              <option value={1}>1 Day</option>
              <option value={3}>3 Days</option>
              <option value={5}>5 Days</option>
              <option value={7}>7 Days</option>
              <option value={10}>10 Days</option>
            </select>
          </label>
        </div>

        {error && (
          <div className="alert alert-danger">⚠️ {error}</div>
        )}

        <LoadingSpinner loading={loading} />

        {forecast && !loading && (
          <>
            <h2 style={{ color: 'white', marginBottom: '20px' }}>
              {forecast.city}, {forecast.country}
            </h2>

            {/* Daily Forecast Cards */}
            <div className="grid">
              {forecast.forecast.map((day, index) => (
                <div
                  key={index}
                  className="card forecast-day-card"
                  onClick={() => setSelectedDay(index)}
                  style={{
                    cursor: 'pointer',
                    border: selectedDay === index ? '3px solid #667eea' : 'none'
                  }}
                >
                  <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                  {day.icon && <img src={getWeatherIcon(day.icon)} alt="Weather" style={{ width: '50px', margin: '0 auto' }} />}
                  <p style={{ color: '#667eea', fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}>
                    {formatTemp(day.maxTemp, unit)}° / {formatTemp(day.minTemp, unit)}°
                  </p>
                  <p style={{ color: '#666', fontSize: '12px' }}>{day.condition}</p>
                  <p style={{ color: '#999', fontSize: '12px', marginTop: '5px' }}>
                    💧 {day.precipitationProb}% | 💨 {Math.round(day.windSpeed)} km/h
                  </p>
                </div>
              ))}
            </div>

            {/* Hourly Forecast for Selected Day */}
            {selectedDay !== null && forecast.forecast[selectedDay] && (
              <div className="card" style={{ marginTop: '30px' }}>
                <h3 style={{ marginBottom: '20px', color: '#667eea' }}>
                  Hourly Forecast - {new Date(forecast.forecast[selectedDay].date).toLocaleDateString()}
                </h3>
                <div style={{ overflowX: 'auto' }}>
                  <div style={{ display: 'flex', gap: '15px', paddingBottom: '10px' }}>
                    {forecast.forecast[selectedDay].hourly.map((hour, idx) => (
                      <div
                        key={idx}
                        style={{
                          minWidth: '100px',
                          padding: '10px',
                          backgroundColor: '#f8f8f8',
                          borderRadius: '8px',
                          textAlign: 'center'
                        }}
                      >
                        <p style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                          {formatTime(hour.time)}
                        </p>
                        {hour.icon && <img src={getWeatherIcon(hour.icon)} alt="Weather" style={{ width: '40px', margin: '5px auto' }} />}
                        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                          {formatTemp(hour.temperature, unit)}°{unit}
                        </p>
                        <p style={{ fontSize: '11px', color: '#999' }}>
                          💧 {hour.precipitationProb}%
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

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

        {!forecast && !loading && !error && (
          <div className="card text-center">
            <p>Enter a city name to see the weather forecast</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forecast;
