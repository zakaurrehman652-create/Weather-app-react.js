import React from 'react';
import {
  Droplets,
  Wind,
  SunMedium,
  Gauge,
  Sunrise,
  Sunset,
  CloudRain,
  Compass
} from 'lucide-react';
import {
  formatWindSpeed,
  getWindDirection,
  getUvCategory,
  formatTime
} from '../utils/formatters';

export default function WeatherMetrics({
  currentWeather,
  unit = 'C'
}) {
  if (!currentWeather) return null;

  const windFormatted = formatWindSpeed(currentWeather.windSpeed, unit);
  const windDirName = getWindDirection(currentWeather.windDirection);
  const uvCategory = getUvCategory(currentWeather.uvIndex);
  const sunriseTime = formatTime(currentWeather.sunrise);
  const sunsetTime = formatTime(currentWeather.sunset);

  return (
    <div className="metrics-grid-container" id="weather-metrics-grid">
      <h3 className="section-heading">Detailed Metrics</h3>
      
      <div className="metrics-grid">
        <div className="metric-card" id="metric-humidity">
          <div className="metric-card-header">
            <span className="metric-title">Humidity</span>
            <Droplets className="metric-icon text-sky-400" size={20} />
          </div>
          <div className="metric-main-value">
            {currentWeather.relativeHumidity ?? '--'}
            <span className="metric-unit">%</span>
          </div>
          <div className="metric-progress-track">
            <div
              className="metric-progress-fill humidity-fill"
              style={{ width: `${Math.min(100, currentWeather.relativeHumidity || 0)}%` }}
            />
          </div>
          <span className="metric-footnote">
            {currentWeather.relativeHumidity > 60
              ? 'High moisture'
              : currentWeather.relativeHumidity < 30
              ? 'Dry air'
              : 'Comfortable range'}
          </span>
        </div>

        <div className="metric-card" id="metric-wind">
          <div className="metric-card-header">
            <span className="metric-title">Wind</span>
            <Wind className="metric-icon text-teal-400" size={20} />
          </div>
          <div className="metric-main-value">
            {windFormatted}
          </div>
          <div className="metric-direction-row">
            <Compass size={16} className="compass-icon" />
            <span>Direction: <strong>{windDirName || '--'}</strong> ({currentWeather.windDirection ?? 0}°)</span>
          </div>
          <span className="metric-footnote">
            {currentWeather.windSpeed > 30 ? 'Strong breeze' : 'Gentle to moderate wind'}
          </span>
        </div>

        <div className="metric-card" id="metric-uv">
          <div className="metric-card-header">
            <span className="metric-title">UV Index</span>
            <SunMedium className="metric-icon text-amber-400" size={20} />
          </div>
          <div className="metric-main-value">
            {currentWeather.uvIndex !== undefined && currentWeather.uvIndex !== null
              ? Math.round(currentWeather.uvIndex * 10) / 10
              : '--'}
            <span
              className="uv-pill"
              style={{ backgroundColor: `${uvCategory.color}22`, color: uvCategory.color, borderColor: `${uvCategory.color}55` }}
            >
              {uvCategory.level}
            </span>
          </div>
          <div className="metric-progress-track">
            <div
              className="metric-progress-fill uv-fill"
              style={{
                width: `${Math.min(100, ((currentWeather.uvIndex || 0) / 11) * 100)}%`,
                backgroundColor: uvCategory.color
              }}
            />
          </div>
          <span className="metric-footnote">
            {currentWeather.uvIndex >= 6 ? 'Sun protection required' : 'Low danger for average person'}
          </span>
        </div>

        <div className="metric-card" id="metric-pressure">
          <div className="metric-card-header">
            <span className="metric-title">Air Pressure</span>
            <Gauge className="metric-icon text-indigo-400" size={20} />
          </div>
          <div className="metric-main-value">
            {currentWeather.surfacePressure ? Math.round(currentWeather.surfacePressure) : '--'}
            <span className="metric-unit">hPa</span>
          </div>
          <span className="metric-footnote">
            {currentWeather.surfacePressure > 1013 ? 'High pressure system' : 'Standard atmospheric level'}
          </span>
        </div>

        <div className="metric-card span-2-metric" id="metric-sun-cycle">
          <div className="metric-card-header">
            <span className="metric-title">Sun Cycle</span>
            <div className="sun-icons-duo">
              <Sunrise size={18} className="text-amber-400" />
              <Sunset size={18} className="text-orange-400" />
            </div>
          </div>
          
          <div className="sun-cycle-times">
            <div className="sun-point">
              <div className="sun-point-icon sunrise-bg">
                <Sunrise size={20} className="text-amber-300" />
              </div>
              <div>
                <span className="sun-label">Sunrise</span>
                <span className="sun-time">{sunriseTime}</span>
              </div>
            </div>

            <div className="sun-divider-line" />

            <div className="sun-point">
              <div className="sun-point-icon sunset-bg">
                <Sunset size={20} className="text-orange-300" />
              </div>
              <div>
                <span className="sun-label">Sunset</span>
                <span className="sun-time">{sunsetTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="metric-card" id="metric-precipitation">
          <div className="metric-card-header">
            <span className="metric-title">Precipitation</span>
            <CloudRain className="metric-icon text-cyan-400" size={20} />
          </div>
          <div className="metric-main-value">
            {currentWeather.precipitation !== undefined ? currentWeather.precipitation : '0'}
            <span className="metric-unit">mm</span>
          </div>
          <span className="metric-footnote">
            {currentWeather.precipitation > 0 ? 'Rain detected today' : 'No rain recorded'}
          </span>
        </div>
      </div>
    </div>
  );
}
