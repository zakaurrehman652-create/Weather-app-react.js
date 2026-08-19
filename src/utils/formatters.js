export const formatTemp = (celsius, unit = 'C') => {
  if (celsius === undefined || celsius === null || isNaN(celsius)) return '--';
  if (unit === 'F') {
    const fahrenheit = (celsius * 9) / 5 + 32;
    return `${Math.round(fahrenheit)}°F`;
  }
  return `${Math.round(celsius)}°C`;
};

export const formatWindSpeed = (speedKmh, unit = 'C') => {
  if (speedKmh === undefined || speedKmh === null || isNaN(speedKmh)) return '--';
  if (unit === 'F') {
    const mph = speedKmh * 0.621371;
    return `${Math.round(mph * 10) / 10} mph`;
  }
  return `${Math.round(speedKmh * 10) / 10} km/h`;
};

export const getWindDirection = (degree) => {
  if (degree === undefined || degree === null) return '';
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degree / 22.5) % 16;
  return directions[index];
};

export const getUvCategory = (uv) => {
  if (uv === undefined || uv === null) return { level: 'Normal', color: '#10b981' };
  const val = Math.round(uv);
  if (val <= 2) return { level: 'Low', color: '#10b981' };
  if (val <= 5) return { level: 'Moderate', color: '#f59e0b' };
  if (val <= 7) return { level: 'High', color: '#f97316' };
  if (val <= 10) return { level: 'Very High', color: '#ef4444' };
  return { level: 'Extreme', color: '#8b5cf6' };
};

export const formatTime = (isoString) => {
  if (!isoString) return '--:--';
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '--:--';
  }
};

export const formatHourlyTime = (isoString, isCurrentHour = false) => {
  if (isCurrentHour) return 'Now';
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: 'numeric', hour12: true });
  } catch {
    return '--';
  }
};

export const formatDayName = (isoDateString, index = 0) => {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  try {
    const date = new Date(isoDateString);
    return date.toLocaleDateString([], { weekday: 'short' });
  } catch {
    return 'Day';
  }
};
