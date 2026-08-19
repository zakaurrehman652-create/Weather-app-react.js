import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Navigation, X, Loader2 } from 'lucide-react';
import { searchCities } from '../services/openMeteoService';

export default function SearchBar({
  onSelectCity,
  onSearchSubmit,
  onCurrentLocation,
  loading
}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchCities(query);
        setSuggestions(results);
        setIsOpen(results.length > 0);
        setSelectedIndex(-1);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (isOpen && suggestions.length > 0) {
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (isOpen && suggestions.length > 0) {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (isOpen && selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelect(suggestions[selectedIndex]);
      } else if (query.trim()) {
        setIsOpen(false);
        onSearchSubmit(query.trim());
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const handleSelect = (city) => {
    setQuery(`${city.name}${city.country ? `, ${city.country}` : ''}`);
    setIsOpen(false);
    setSelectedIndex(-1);
    onSelectCity(city);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      onSearchSubmit(query.trim());
    }
  };

  return (
    <div className="search-container" ref={containerRef} id="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <Search className="search-icon-left" size={20} />
          
          <input
            ref={inputRef}
            id="city-search-input"
            type="text"
            className="search-input"
            placeholder="Search city e.g. Lahore..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls="city-suggestions-list"
            aria-expanded={isOpen}
          />

          {isSearching && (
            <Loader2 className="search-spinner spinning" size={18} />
          )}

          {query && !isSearching && (
            <button
              id="clear-search-btn"
              type="button"
              className="clear-search-btn"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}

          <button
            id="geolocation-btn"
            type="button"
            className="geo-location-btn"
            onClick={onCurrentLocation}
            title="Use My Current Location"
            disabled={loading}
            aria-label="Use Current Location"
          >
            <Navigation size={18} />
            <span className="geo-text">My Location</span>
          </button>
        </div>

        {isOpen && suggestions.length > 0 && (
          <ul className="suggestions-dropdown" id="city-suggestions-list" role="listbox">
            {suggestions.map((city, idx) => (
              <li
                key={`${city.id || city.name}-${city.latitude}-${city.longitude}-${idx}`}
                id={`suggestion-item-${idx}`}
                role="option"
                aria-selected={idx === selectedIndex}
                className={`suggestion-item ${idx === selectedIndex ? 'highlighted' : ''}`}
                onClick={() => handleSelect(city)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="suggestion-content">
                  <MapPin size={16} className="suggestion-pin" />
                  <div className="suggestion-text">
                    <span className="city-name">{city.name}</span>
                    <span className="city-region">
                      {[city.admin1, city.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                </div>
                {city.countryCode && (
                  <span className="country-code-pill">{city.countryCode}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}
