export const WEATHER_CODES = {
  0: { description: 'Clear sky', icon: 'Sun', nightIcon: 'Moon', theme: 'clear' },
  1: { description: 'Mainly clear', icon: 'Sun', nightIcon: 'Moon', theme: 'clear' },
  2: { description: 'Partly cloudy', icon: 'CloudSun', nightIcon: 'CloudMoon', theme: 'clouds' },
  3: { description: 'Overcast', icon: 'Cloud', nightIcon: 'Cloud', theme: 'clouds' },
  45: { description: 'Foggy', icon: 'CloudFog', nightIcon: 'CloudFog', theme: 'mist' },
  48: { description: 'Depositing rime fog', icon: 'CloudFog', nightIcon: 'CloudFog', theme: 'mist' },
  51: { description: 'Light drizzle', icon: 'CloudDrizzle', nightIcon: 'CloudDrizzle', theme: 'rain' },
  53: { description: 'Moderate drizzle', icon: 'CloudDrizzle', nightIcon: 'CloudDrizzle', theme: 'rain' },
  55: { description: 'Dense drizzle', icon: 'CloudDrizzle', nightIcon: 'CloudDrizzle', theme: 'rain' },
  56: { description: 'Light freezing drizzle', icon: 'CloudSnow', nightIcon: 'CloudSnow', theme: 'snow' },
  57: { description: 'Dense freezing drizzle', icon: 'CloudSnow', nightIcon: 'CloudSnow', theme: 'snow' },
  61: { description: 'Slight rain', icon: 'CloudRain', nightIcon: 'CloudRain', theme: 'rain' },
  63: { description: 'Moderate rain', icon: 'CloudRain', nightIcon: 'CloudRain', theme: 'rain' },
  65: { description: 'Heavy rain', icon: 'CloudRain', nightIcon: 'CloudRain', theme: 'rain' },
  66: { description: 'Light freezing rain', icon: 'CloudSnow', nightIcon: 'CloudSnow', theme: 'snow' },
  67: { description: 'Heavy freezing rain', icon: 'CloudSnow', nightIcon: 'CloudSnow', theme: 'snow' },
  71: { description: 'Slight snow fall', icon: 'Snowflake', nightIcon: 'Snowflake', theme: 'snow' },
  73: { description: 'Moderate snow fall', icon: 'Snowflake', nightIcon: 'Snowflake', theme: 'snow' },
  75: { description: 'Heavy snow fall', icon: 'Snowflake', nightIcon: 'Snowflake', theme: 'snow' },
  77: { description: 'Snow grains', icon: 'Snowflake', nightIcon: 'Snowflake', theme: 'snow' },
  80: { description: 'Slight rain showers', icon: 'CloudRain', nightIcon: 'CloudRain', theme: 'rain' },
  81: { description: 'Moderate rain showers', icon: 'CloudRain', nightIcon: 'CloudRain', theme: 'rain' },
  82: { description: 'Violent rain showers', icon: 'CloudRain', nightIcon: 'CloudRain', theme: 'rain' },
  85: { description: 'Slight snow showers', icon: 'Snowflake', nightIcon: 'Snowflake', theme: 'snow' },
  86: { description: 'Heavy snow showers', icon: 'Snowflake', nightIcon: 'Snowflake', theme: 'snow' },
  95: { description: 'Thunderstorm', icon: 'CloudLightning', nightIcon: 'CloudLightning', theme: 'thunder' },
  96: { description: 'Thunderstorm with slight hail', icon: 'CloudLightning', nightIcon: 'CloudLightning', theme: 'thunder' },
  99: { description: 'Thunderstorm with heavy hail', icon: 'CloudLightning', nightIcon: 'CloudLightning', theme: 'thunder' }
};

export const getWeatherDetails = (code, isDay = 1) => {
  const info = WEATHER_CODES[code] || {
    description: 'Variable Weather',
    icon: 'CloudSun',
    nightIcon: 'CloudMoon',
    theme: 'clouds'
  };

  const iconName = isDay === 0 ? info.nightIcon : info.icon;
  return {
    ...info,
    iconName,
    isNight: isDay === 0
  };
};
