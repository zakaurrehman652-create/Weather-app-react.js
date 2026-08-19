import React from 'react';
import { MapPin, ArrowUp, ArrowDown, Droplets, Wind, Sparkles } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { getWeatherDetails } from '../utils/weatherCodes';
import { formatTemp, formatWindSpeed } from '../utils/formatters';

export default function CurrentWeatherCard({
  city,
  currentWeather,
  unit = 'C'
}) {
  if (!currentWeather) return null;

  const weatherDetails = getWeatherDetails(currentWeather.weatherCode, currentWeather.isDay);

  const formattedTemp = formatTemp(currentWeather.temperature, unit);
  const feelsLike = formatTemp(currentWeather.apparentTemperature, unit);
  const highTemp = formatTemp(currentWeather.todayMaxTemp, unit);
  const lowTemp = formatTemp(currentWeather.todayMinTemp, unit);
  const windFormatted = formatWindSpeed(currentWeather.windSpeed, unit);

  return (
    <div className={`hero-weather-card theme-${weatherDetails.theme}`} id="current-weather-card">
      <div className="hero-card-glow" />
      
      <div className="hero-header">
        <div className="location-info">
          <div className="location-title-row">
            <MapPin className="pin-icon" size={22} />
            <h2 className="location-name">{city?.name || 'Selected City'}</h2>
          </div>
          <p className="location-sub">
            {[city?.admin1, city?.country].filter(Boolean).join(', ') || 'Global Coordinates'}
          </p>
        </div>

        <div className="condition-badge" title="Current Atmospheric Status">
          <Sparkles size={14} className="badge-sparkle" />
          <span>{weatherDetails.description}</span>
        </div>
      </div>

      <div className="hero-body">
        <div className="temperature-section">
          <div className="main-temp-display">
            <span className="temp-number">{formattedTemp.replace('°C', '').replace('°F', '')}</span>
            <span className="temp-unit">°{unit}</span>
          </div>

          <div className="temp-secondary-row">
            <span className="feels-like">Feels like <strong>{feelsLike}</strong></span>
            
            {(currentWeather.todayMaxTemp !== undefined && currentWeather.todayMinTemp !== undefined) && (
              <div className="high-low-pill">
                <span className="high-temp">
                  <ArrowUp size={14} /> {highTemp}
                </span>
                <span className="low-temp">
                  <ArrowDown size={14} /> {lowTemp}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="hero-visual-icon" aria-hidden="true">
          <WeatherIcon
            code={currentWeather.weatherCode}
            isDay={currentWeather.isDay}
            size={110}
            className="hero-animated-icon"
          />
        </div>
      </div>

      <div className="hero-footer-ribbon">
        <div className="ribbon-item">
          <Droplets size={16} className="ribbon-icon text-sky-300" />
          <span className="ribbon-label">Humidity</span>
          <span className="ribbon-value">{currentWeather.relativeHumidity}%</span>
        </div>

        <div className="ribbon-divider" />

        <div className="ribbon-item">
          <Wind size={16} className="ribbon-icon text-teal-300" />
          <span className="ribbon-label">Wind Speed</span>
          <span className="ribbon-value">{windFormatted}</span>
        </div>

        <div className="ribbon-divider" />

        <div className="ribbon-item">
          <span className="ribbon-label">Condition</span>
          <span className="ribbon-value condition-text">{weatherDetails.description}</span>
        </div>
      </div>
    </div>
  );
}
