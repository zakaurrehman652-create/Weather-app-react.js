const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchOpenWeatherData(cityName, apiKey) {
  if (!apiKey) {
    throw new Error('OpenWeatherMap API key is required');
  }

  const url = `${OPENWEATHER_BASE_URL}/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`City "${cityName}" not found.`);
    }
    if (response.status === 401) {
      throw new Error('Invalid OpenWeatherMap API key. Please check your key.');
    }
    throw new Error(`OpenWeather API error: ${response.statusText}`);
  }

  const data = await response.json();
  
  let forecastData = null;
  try {
    const forecastRes = await fetch(`${OPENWEATHER_BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&units=metric&appid=${apiKey}`);
    if (forecastRes.ok) {
      forecastData = await forecastRes.json();
    }
  } catch (err) {
    console.warn('Could not fetch OpenWeather forecast:', err);
  }

  return {
    cityName: data.name,
    country: data.sys?.country || '',
    latitude: data.coord.lat,
    longitude: data.coord.lon,
    current: {
      temperature: data.main.temp,
      apparentTemperature: data.main.feels_like,
      relativeHumidity: data.main.humidity,
      surfacePressure: data.main.pressure,
      windSpeed: data.wind.speed * 3.6,
      windDirection: data.wind.deg,
      description: data.weather[0]?.description || '',
      weatherCondition: data.weather[0]?.main || '',
      iconCode: data.weather[0]?.icon,
      isDay: data.weather[0]?.icon?.includes('d') ? 1 : 0,
      todayMaxTemp: data.main.temp_max,
      todayMinTemp: data.main.temp_min,
      sunrise: new Date(data.sys.sunrise * 1000).toISOString(),
      sunset: new Date(data.sys.sunset * 1000).toISOString(),
      visibility: data.visibility
    },
    rawForecast: forecastData
  };
}
