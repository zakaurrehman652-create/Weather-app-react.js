import React, { useRef } from 'react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { formatTemp, formatHourlyTime } from '../utils/formatters';

export default function HourlyForecast({
  hourly = [],
  unit = 'C'
}) {
  const scrollRef = useRef(null);

  if (!hourly || hourly.length === 0) return null;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="forecast-section hourly-forecast-section" id="hourly-forecast-section">
      <div className="section-header-row">
        <div className="section-title-group">
          <Clock size={18} className="section-title-icon text-indigo-400" />
          <h3 className="section-heading">24-Hour Forecast</h3>
        </div>

        <div className="scroll-controls">
          <button
            type="button"
            className="scroll-arrow-btn"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="scroll-arrow-btn"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="hourly-scroll-container" ref={scrollRef}>
        {hourly.map((item, idx) => {
          const timeLabel = formatHourlyTime(item.time, item.isCurrent || idx === 0);
          const tempLabel = formatTemp(item.temperature, unit);

          return (
            <div
              key={`${item.time}-${idx}`}
              className={`hourly-card ${idx === 0 ? 'current-hour' : ''}`}
            >
              <span className="hourly-time">{timeLabel}</span>
              <div className="hourly-icon-wrap">
                <WeatherIcon
                  code={item.weatherCode}
                  isDay={item.isDay}
                  size={32}
                />
              </div>
              <span className="hourly-temp">{tempLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
