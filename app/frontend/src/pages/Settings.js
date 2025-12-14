import React, { useState, useEffect } from 'react';
import '../styles/App.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    unit: 'C',
    theme: 'light',
    notifications: true,
    language: 'en'
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('weatherAppSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to localStorage whenever they change
  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('weatherAppSettings', JSON.stringify(newSettings));
    
    // Apply theme changes
    if (key === 'theme') {
      applyTheme(value);
    }
  };

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = '#333';
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1 style={{ color: 'white', marginBottom: '30px' }}>⚙️ Settings</h1>

        <div style={{ maxWidth: '600px' }}>
          {/* Temperature Unit Setting */}
          <div className="card">
            <h3 style={{ marginBottom: '15px', color: '#667eea' }}>🌡️ Temperature Unit</h3>
            <div style={{ display: 'flex', gap: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="unit"
                  value="C"
                  checked={settings.unit === 'C'}
                  onChange={(e) => handleSettingChange('unit', e.target.value)}
                />
                Celsius (°C)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="unit"
                  value="F"
                  checked={settings.unit === 'F'}
                  onChange={(e) => handleSettingChange('unit', e.target.value)}
                />
                Fahrenheit (°F)
              </label>
            </div>
          </div>

          {/* Theme Setting */}
          <div className="card">
            <h3 style={{ marginBottom: '15px', color: '#667eea' }}>🎨 Theme</h3>
            <div style={{ display: 'flex', gap: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={settings.theme === 'light'}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                />
                Light Mode ☀️
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={settings.theme === 'dark'}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                />
                Dark Mode 🌙
              </label>
            </div>
          </div>

          {/* Notifications Setting */}
          <div className="card">
            <h3 style={{ marginBottom: '15px', color: '#667eea' }}>🔔 Notifications</h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
              Enable notifications
            </label>
            <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
              Get alerts for severe weather conditions
            </p>
          </div>

          {/* Language Setting */}
          <div className="card">
            <h3 style={{ marginBottom: '15px', color: '#667eea' }}>🌍 Language</h3>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="form-control"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
            </select>
          </div>

          {/* Account Info */}
          <div className="card">
            <h3 style={{ marginBottom: '15px', color: '#667eea' }}>👤 Account Information</h3>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <p><strong>App Version:</strong> 1.0.0</p>
              <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Storage Used:</strong> {Math.round(JSON.stringify(localStorage).length / 1024)} KB</p>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card" style={{ borderLeft: '4px solid #ff4757' }}>
            <h3 style={{ marginBottom: '15px', color: '#ff4757' }}>⚠️ Danger Zone</h3>
            <button
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm('Clear all local data? This cannot be undone.')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
            >
              Clear All Local Data
            </button>
            <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
              This will delete all saved settings and history
            </p>
          </div>

          {/* Info Section */}
          <div className="card" style={{ backgroundColor: '#f8f8f8' }}>
            <h3 style={{ marginBottom: '15px', color: '#667eea' }}>ℹ️ About</h3>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
              <strong>Weather Forecasting Web App</strong> is a semester project demonstrating 
              software quality engineering practices, performance testing, and modern web development. 
              Built with MERN stack and thoroughly tested with JMeter and Gatling.
            </p>
            <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
              Data provided by WeatherAPI.com | Made with ❤️ for SQE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
