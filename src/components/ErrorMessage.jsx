import React from 'react';
import { AlertTriangle, RefreshCw, Search } from 'lucide-react';

export default function ErrorMessage({
  message,
  onRetry,
  onDefaultCity
}) {
  return (
    <div className="error-card-container" id="weather-error-banner" role="alert">
      <div className="error-icon-wrapper">
        <AlertTriangle className="error-main-icon" size={32} />
      </div>

      <div className="error-content">
        <h3 className="error-title">Location or Data Unavailable</h3>
        <p className="error-description">{message || 'Unable to find or retrieve weather information for this query.'}</p>
        
        <div className="error-suggestions">
          <span className="suggestion-label">Helpful tips:</span>
          <ul>
            <li>Check for spelling errors (e.g. "Lahor" → "Lahore").</li>
            <li>Try searching with country or state name (e.g. "Lahore, Pakistan").</li>
            <li>Ensure active internet connection.</li>
          </ul>
        </div>

        <div className="error-actions">
          {onRetry && (
            <button
              type="button"
              className="error-action-btn primary"
              onClick={onRetry}
            >
              <RefreshCw size={16} />
              <span>Retry</span>
            </button>
          )}

          {onDefaultCity && (
            <button
              type="button"
              className="error-action-btn secondary"
              onClick={onDefaultCity}
            >
              <Search size={16} />
              <span>Reset to Lahore</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
