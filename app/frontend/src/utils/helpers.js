/**
 * Format temperature value
 */
export const formatTemp = (temp, unit = 'C') => {
  if (unit === 'F') {
    return Math.round((temp * 9) / 5 + 32);
  }
  return Math.round(temp);
};

/**
 * Format date to readable format
 */
export const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Format time to HH:MM format
 */
export const formatTime = (timeString) => {
  const time = new Date(timeString);
  return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

/**
 * Get weather icon URL
 */
export const getWeatherIcon = (iconUrl) => {
  if (!iconUrl) return null;
  return `https:${iconUrl}`;
};

/**
 * Get wind direction from degrees
 */
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round((degrees % 360) / 22.5) % 16;
  return directions[index];
};

/**
 * Get UV index severity
 */
export const getUVSeverity = (uv) => {
  if (uv < 3) return 'Low';
  if (uv < 6) return 'Moderate';
  if (uv < 8) return 'High';
  if (uv < 11) return 'Very High';
  return 'Extreme';
};
