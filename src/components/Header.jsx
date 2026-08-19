import React, { useState, useEffect } from 'react';
import { CloudSun, RotateCw, Settings } from 'lucide-react';

export default function Header({
  unit,
  onToggleUnit,
  onRefresh,
  loading,
  onOpenSettings
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <header className="app-header" id="app-header">
      <div className="brand-group">
        <div className="brand-icon-wrapper">
          <CloudSun className="brand-icon" size={28} />
        </div>
        <div className="brand-text">
          <h1 className="brand-title">Weather</h1>
          <span className="brand-subtitle">Live Weather Forecast</span>
        </div>
      </div>

      <div className="header-meta">
        <div className="live-clock" title="Current Local Time">
          <span className="clock-time">{formattedTime}</span>
          <span className="clock-date">{formattedDate}</span>
        </div>

        <div className="header-actions">
          <div className="unit-toggle-wrapper" title="Switch Temperature Unit">
            <button
              id="unit-toggle-c"
              type="button"
              className={`unit-btn ${unit === 'C' ? 'active' : ''}`}
              onClick={() => unit !== 'C' && onToggleUnit()}
              aria-label="Celsius"
            >
              °C
            </button>
            <button
              id="unit-toggle-f"
              type="button"
              className={`unit-btn ${unit === 'F' ? 'active' : ''}`}
              onClick={() => unit !== 'F' && onToggleUnit()}
              aria-label="Fahrenheit"
            >
              °F
            </button>
          </div>

          <button
            id="refresh-weather-btn"
            type="button"
            className={`action-btn ${loading ? 'spinning' : ''}`}
            onClick={onRefresh}
            disabled={loading}
            title="Refresh Weather Data"
            aria-label="Refresh Weather"
          >
            <RotateCw size={18} />
          </button>

          {onOpenSettings && (
            <button
              id="api-settings-btn"
              type="button"
              className="action-btn"
              onClick={onOpenSettings}
              title="API Integration & Docs"
              aria-label="API Settings"
            >
              <Settings size={18} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
