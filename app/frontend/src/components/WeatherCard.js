import React from 'react';
import { formatTemp, formatDate, getWeatherIcon } from '../utils/helpers';
import './WeatherCard.css';

const WeatherCard = ({ weather, unit = 'C' }) => {
  if (!weather) {
    return <div className="weather-card placeholder">No data available</div>;
  }

  const temp = formatTemp(weather.temperature, unit);
  const iconUrl = getWeatherIcon(weather.icon);

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div>
          <h2 className="weather-city">{weather.city}, {weather.country}</h2>
          <p className="weather-date">{formatDate(weather.lastUpdated)}</p>
        </div>
        {iconUrl && <img src={iconUrl} alt="Weather" className="weather-icon" />}
      </div>

      <div className="temperature-section">
        <div className="temperature">
          <span className="temp-value">{temp}°</span>
          <span className="temp-unit">{unit}</span>
        </div>
        <div className="condition">
          <p className="condition-text">{weather.condition}</p>
          <p className="feels-like">Feels like {formatTemp(weather.feelsLike, unit)}°{unit}</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail">
          <span className="label">Humidity</span>
          <span className="value">{weather.humidity}%</span>
        </div>
        <div className="detail">
          <span className="label">Wind Speed</span>
          <span className="value">{Math.round(weather.windSpeed)} km/h</span>
        </div>
        <div className="detail">
          <span className="label">Pressure</span>
          <span className="value">{weather.pressure} mb</span>
        </div>
        <div className="detail">
          <span className="label">UV Index</span>
          <span className="value">{weather.uv}</span>
        </div>
        <div className="detail">
          <span className="label">Visibility</span>
          <span className="value">{weather.visibility.toFixed(1)} km</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
