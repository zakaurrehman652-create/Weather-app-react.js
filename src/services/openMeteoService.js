const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export async function searchCities(query) {
  if (!query || query.trim().length < 2) return [];
  
  const url = `${GEOCODING_BASE_URL}?name=${encodeURIComponent(query.trim())}&count=6&language=en&format=json`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.status === 403) {
      throw new Error('403 Forbidden: The meteorological API rejected the request. If using Postman, try setting Header: "User-Agent: Mozilla/5.0".');
    }
    
    if (!response.ok) {
      throw new Error(`Geocoding failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      return [];
    }
    
    return data.results.map(city => ({
      id: city.id,
      name: city.name,
      admin1: city.admin1 || '',
      country: city.country || '',
      countryCode: city.country_code || '',
      latitude: city.latitude,
      longitude: city.longitude,
      timezone: city.timezone || 'auto'
    }));
  } catch (error) {
    console.error('Error fetching city search results:', error);
    throw error;
  }
}

export async function fetchWeatherData(latitude, longitude, timezone = 'auto') {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
      'surface_pressure',
      'uv_index'
    ].join(','),
    hourly: [
      'temperature_2m',
      'weather_code',
      'is_day'
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'wind_speed_10m_max'
    ].join(','),
    timezone: timezone || 'auto',
    forecast_days: '7'
  });

  const url = `${FORECAST_BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.status === 403) {
      throw new Error('403 Forbidden: Request blocked. If testing in Postman, add header "User-Agent: Mozilla/5.0" or disable SSL verification in Postman settings.');
    }

    if (!response.ok) {
      throw new Error(`Weather service responded with status ${response.status}`);
    }
    const data = await response.json();

    const currentIso = data.current?.time;
    let hourlyStartIndex = 0;
    if (data.hourly?.time && currentIso) {
      const idx = data.hourly.time.findIndex(t => t >= currentIso);
      if (idx !== -1) hourlyStartIndex = idx;
    }

    const hourly = [];
    const maxHourlyCount = Math.min(24, (data.hourly?.time?.length || 0) - hourlyStartIndex);
    for (let i = 0; i < maxHourlyCount; i++) {
      const index = hourlyStartIndex + i;
      hourly.push({
        time: data.hourly.time[index],
        temperature: data.hourly.temperature_2m[index],
        weatherCode: data.hourly.weather_code[index],
        isDay: data.hourly.is_day ? data.hourly.is_day[index] : 1,
        isCurrent: i === 0
      });
    }

    const daily = [];
    const dailyCount = data.daily?.time?.length || 0;
    for (let i = 0; i < dailyCount; i++) {
      daily.push({
        date: data.daily.time[i],
        weatherCode: data.daily.weather_code[i],
        maxTemp: data.daily.temperature_2m_max[i],
        minTemp: data.daily.temperature_2m_min[i],
        sunrise: data.daily.sunrise ? data.daily.sunrise[i] : null,
        sunset: data.daily.sunset ? data.daily.sunset[i] : null,
        uvMax: data.daily.uv_index_max ? data.daily.uv_index_max[i] : null,
        precipitation: data.daily.precipitation_sum ? data.daily.precipitation_sum[i] : 0,
        maxWindSpeed: data.daily.wind_speed_10m_max ? data.daily.wind_speed_10m_max[i] : null
      });
    }

    return {
      current: {
        time: data.current.time,
        temperature: data.current.temperature_2m,
        apparentTemperature: data.current.apparent_temperature,
        relativeHumidity: data.current.relative_humidity_2m,
        isDay: data.current.is_day,
        precipitation: data.current.precipitation,
        weatherCode: data.current.weather_code,
        windSpeed: data.current.wind_speed_10m,
        windDirection: data.current.wind_direction_10m,
        surfacePressure: data.current.surface_pressure,
        uvIndex: data.current.uv_index,
        todayMaxTemp: daily[0]?.maxTemp,
        todayMinTemp: daily[0]?.minTemp,
        sunrise: daily[0]?.sunrise,
        sunset: daily[0]?.sunset
      },
      hourly,
      daily,
      elevation: data.elevation,
      timezone: data.timezone
    };
  } catch (error) {
    console.error('Error fetching Open-Meteo weather data:', error);
    throw error;
  }
}
