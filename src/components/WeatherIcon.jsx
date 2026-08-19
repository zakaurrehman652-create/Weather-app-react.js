import React from 'react';
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  Snowflake,
  CloudLightning,
  Wind
} from 'lucide-react';
import { getWeatherDetails } from '../utils/weatherCodes';

export default function WeatherIcon({
  code = 0,
  isDay = 1,
  size = 32,
  className = '',
  customColor = null
}) {
  const weather = getWeatherDetails(code, isDay);
  const iconName = weather.iconName;

  const iconProps = {
    size,
    className: `weather-icon-svg ${className}`,
    strokeWidth: 1.8,
    style: customColor ? { color: customColor } : undefined
  };

  switch (iconName) {
    case 'Sun':
      return <Sun {...iconProps} className={`${iconProps.className} text-amber-400`} />;
    case 'Moon':
      return <Moon {...iconProps} className={`${iconProps.className} text-indigo-200`} />;
    case 'CloudSun':
      return <CloudSun {...iconProps} className={`${iconProps.className} text-amber-300`} />;
    case 'CloudMoon':
      return <CloudMoon {...iconProps} className={`${iconProps.className} text-indigo-300`} />;
    case 'Cloud':
      return <Cloud {...iconProps} className={`${iconProps.className} text-slate-300`} />;
    case 'CloudFog':
      return <CloudFog {...iconProps} className={`${iconProps.className} text-slate-400`} />;
    case 'CloudDrizzle':
      return <CloudDrizzle {...iconProps} className={`${iconProps.className} text-sky-400`} />;
    case 'CloudRain':
      return <CloudRain {...iconProps} className={`${iconProps.className} text-blue-400`} />;
    case 'CloudSnow':
      return <CloudSnow {...iconProps} className={`${iconProps.className} text-cyan-200`} />;
    case 'Snowflake':
      return <Snowflake {...iconProps} className={`${iconProps.className} text-cyan-300`} />;
    case 'CloudLightning':
      return <CloudLightning {...iconProps} className={`${iconProps.className} text-yellow-400`} />;
    default:
      return <Wind {...iconProps} className={`${iconProps.className} text-slate-400`} />;
  }
}
