import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="skeleton-container" aria-busy="true" aria-label="Loading weather data">
      <div className="skeleton-card skeleton-hero">
        <div className="skeleton-header-row">
          <div className="skeleton-pill w-48 h-8" />
          <div className="skeleton-pill w-28 h-7" />
        </div>
        <div className="skeleton-body-row">
          <div className="skeleton-pill w-36 h-20" />
          <div className="skeleton-circle w-24 h-24" />
        </div>
        <div className="skeleton-footer-row">
          <div className="skeleton-pill w-24 h-5" />
          <div className="skeleton-pill w-24 h-5" />
          <div className="skeleton-pill w-24 h-5" />
        </div>
      </div>

      <div className="skeleton-metrics-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="skeleton-card skeleton-metric-item">
            <div className="skeleton-pill w-20 h-4" />
            <div className="skeleton-pill w-28 h-8" />
            <div className="skeleton-pill w-full h-2" />
          </div>
        ))}
      </div>

      <div className="skeleton-card skeleton-hourly">
        <div className="skeleton-pill w-32 h-6" />
        <div className="skeleton-hourly-row">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="skeleton-hourly-item">
              <div className="skeleton-pill w-10 h-3" />
              <div className="skeleton-circle w-8 h-8" />
              <div className="skeleton-pill w-8 h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
