import React, { useState, useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';
import { searchCities } from '../services/weatherService';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = 'Search for a city...' }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback(async (value) => {
    setQuery(value);
    
    if (value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      const result = await searchCities(value);
      if (result.success) {
        setSuggestions(result.data || []);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelect = (city) => {
    setQuery(city.name);
    setSuggestions([]);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(city.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      }
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
          autoComplete="off"
        />
        <button type="submit" className="search-btn">
          <FiSearch size={20} />
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((city, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSelect(city)}
            >
              <span className="suggestion-name">{city.name}</span>
              <span className="suggestion-country">{city.region}, {city.country}</span>
            </div>
          ))}
        </div>
      )}

      {showSuggestions && loading && (
        <div className="suggestions">
          <div className="suggestion-item loading">Searching...</div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
