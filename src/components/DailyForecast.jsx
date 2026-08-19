import React from 'react';
import { CalendarDays, Droplets } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { getWeatherDetails } from '../utils/weatherCodes';
import { formatTemp, formatDayName } from '../utils/formatters';

export default function DailyForecast({
  daily = [],
  unit = 'C'
}) {
  if (!daily || daily.length === 0) return null;

  const allMins = daily.map((d) => (d.minTemp !== undefined ? d.minTemp : 0));
  const allMaxs = daily.map((d) => (d.maxTemp !== undefined ? d.maxTemp : 30));
  const overallMin = Math.min(...allMins);
  const overallMax = Math.max(...allMaxs);
  const tempRange = Math.max(1, overallMax - overallMin);

  return (
    <div className="forecast-section daily-forecast-section" id="daily-forecast-section">
      <div className="section-header-row">
        <div className="section-title-group">
          <CalendarDays size={18} className="section-title-icon text-teal-400" />
          <h3 className="section-heading">7-Day Forecast</h3>
        </div>
      </div>

      <div className="daily-list">
        {daily.map((day, idx) => {
          const weather = getWeatherDetails(day.weatherCode, 1);
          const dayLabel = formatDayName(day.date, idx);
          const minFormatted = formatTemp(day.minTemp, unit);
          const maxFormatted = formatTemp(day.maxTemp, unit);

          const leftPercent = Math.max(0, Math.min(100, ((day.minTemp - overallMin) / tempRange) * 100));
          const widthPercent = Math.max(15, Math.min(100 - leftPercent, ((day.maxTemp - day.minTemp) / tempRange) * 100));

          return (
            <div key={`${day.date}-${idx}`} className={`daily-row ${idx === 0 ? 'today-row' : ''}`}>
              <div className="daily-day-column">
                <span className="daily-day-title">{dayLabel}</span>
                <span className="daily-date-sub">
                  {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>

              <div className="daily-icon-column">
                <WeatherIcon code={day.weatherCode} isDay={1} size={28} />
                <span className="daily-desc-text">{weather.description}</span>
              </div>

              {day.precipitation > 0 && (
                <div className="daily-precip" title="Precipitation">
                  <Droplets size={12} className="text-sky-400" />
                  <span>{Math.round(day.precipitation * 10) / 10}mm</span>
                </div>
              )}

              <div className="daily-temp-bar-column">
                <span className="temp-min-text">{minFormatted}</span>
                
                <div className="temp-bar-track">
                  <div
                    className="temp-bar-fill"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`
                    }}
                  />
                </div>

                <span className="temp-max-text">{maxFormatted}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
