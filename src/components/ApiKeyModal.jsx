import React, { useState } from 'react';
import { X, CheckCircle2, Code2, Copy, Check, ExternalLink } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose }) {
  const [copiedUrl, setCopiedUrl] = useState(null);

  if (!isOpen) return null;

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(id);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const sampleEndpoints = [
    {
      id: 'lahore-weather',
      name: 'Lahore Weather (Live Postman URL)',
      url: 'https://api.open-meteo.com/v1/forecast?latitude=31.5497&longitude=74.3436&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FKarachi'
    },
    {
      id: 'karachi-weather',
      name: 'Karachi Weather (Live Postman URL)',
      url: 'https://api.open-meteo.com/v1/forecast?latitude=24.8607&longitude=67.0011&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FKarachi'
    },
    {
      id: 'islamabad-weather',
      name: 'Islamabad Weather (Live Postman URL)',
      url: 'https://api.open-meteo.com/v1/forecast?latitude=33.6844&longitude=73.0479&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FKarachi'
    },
    {
      id: 'city-geocoding',
      name: 'City Search Geocoding (Lahore)',
      url: 'https://geocoding-api.open-meteo.com/v1/search?name=Lahore&count=5&language=en&format=json'
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Code2 className="modal-icon text-sky-400" size={24} />
            <h3 className="modal-title">API Integration & Postman Guide</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-highlight-box">
            <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={20} />
            <p>
              Local App Server: <strong>http://localhost:4040</strong>
            </p>
          </div>

          <h4 className="modal-subtitle">Postman Test Endpoints (Direct GET)</h4>
          <p className="modal-helper-text">
            Copy any endpoint below into Postman to inspect the live JSON response:
          </p>

          <div className="endpoint-list">
            {sampleEndpoints.map((ep) => (
              <div key={ep.id} className="endpoint-card">
                <div className="endpoint-meta">
                  <span className="endpoint-badge">GET</span>
                  <span className="endpoint-name">{ep.name}</span>
                </div>
                <div className="endpoint-code-box">
                  <code className="endpoint-url">{ep.url}</code>
                  <button
                    type="button"
                    className="copy-code-btn"
                    onClick={() => copyToClipboard(ep.url, ep.id)}
                    title="Copy URL for Postman"
                  >
                    {copiedUrl === ep.id ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="modal-footer-note">
            <span>Documentation:</span>
            <a
              href="https://open-meteo.com/en/docs"
              target="_blank"
              rel="noreferrer"
              className="modal-link"
            >
              Open-Meteo Docs <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="modal-done-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
