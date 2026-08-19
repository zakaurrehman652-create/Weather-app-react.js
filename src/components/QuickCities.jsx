import React from 'react';
import { History, Sparkles } from 'lucide-react';

const POPULAR_CITIES = [
  { name: 'Lahore', country: 'Pakistan', latitude: 31.5497, longitude: 74.3436, timezone: 'Asia/Karachi' },
  { name: 'Karachi', country: 'Pakistan', latitude: 24.8607, longitude: 67.0011, timezone: 'Asia/Karachi' },
  { name: 'Faisalabad', country: 'Pakistan', latitude: 31.4504, longitude: 73.1350, timezone: 'Asia/Karachi' },
  { name: 'Islamabad', country: 'Pakistan', latitude: 33.6844, longitude: 73.0479, timezone: 'Asia/Karachi' },
  { name: 'Multan', country: 'Pakistan', latitude: 30.1575, longitude: 71.5249, timezone: 'Asia/Karachi' },
  { name: 'Peshawar', country: 'Pakistan', latitude: 34.0151, longitude: 71.5249, timezone: 'Asia/Karachi' }
];

export default function QuickCities({
  currentCity,
  recentSearches = [],
  onSelectCity
}) {
  const isSelected = (city) => {
    if (!currentCity) return false;
    return (
      currentCity.name?.toLowerCase() === city.name?.toLowerCase() &&
      Math.abs((currentCity.latitude || 0) - city.latitude) < 0.1
    );
  };

  const displayList = recentSearches.length > 0 ? recentSearches : POPULAR_CITIES;

  return (
    <div className="quick-cities-container" id="quick-cities-container">
      <div className="quick-cities-header">
        {recentSearches.length > 0 ? (
          <>
            <History size={14} className="quick-icon" />
            <span className="quick-title">Recent Locations</span>
          </>
        ) : (
          <>
            <Sparkles size={14} className="quick-icon" />
            <span className="quick-title">Popular Cities</span>
          </>
        )}
      </div>

      <div className="quick-cities-scroll" role="list">
        {displayList.map((city, idx) => {
          const active = isSelected(city);
          return (
            <button
              key={`${city.name}-${city.latitude}-${idx}`}
              type="button"
              className={`city-pill ${active ? 'active' : ''}`}
              onClick={() => onSelectCity(city)}
              aria-label={`View weather for ${city.name}`}
            >
              <span className="pill-name">{city.name}</span>
              {city.country && <span className="pill-country">{city.country}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
