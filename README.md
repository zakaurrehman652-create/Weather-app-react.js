# Weather App - Real-Time Weather React Application

A responsive, modern weather application built with React.js by **zk web developer** that allows users to search for any city worldwide, view real-time atmospheric conditions, explore 24-hour hourly projections, and track 7-day extended forecasts.

---

## Features

- City Search with Autocomplete: Real-time debounced location search with instant suggestions and keyboard navigation (ArrowUp, ArrowDown, Enter, Escape).
- Geolocation Detection: One-click "My Location" button using the HTML5 Geolocation API.
- Metric & Imperial Toggle: Seamlessly switch between Celsius (°C) and Fahrenheit (°F) with immediate updates across all views.
- Current Weather Hero Display:
  - City name, region, and country
  - Live temperature & "Feels Like" index
  - High & Low temperature indicators
  - Weather condition description and dynamic weather icons
  - Relative Humidity (%)
  - Wind speed (km/h or mph) and compass direction (N, NE, SW, etc.)
  - Atmospheric Pressure (hPa)
  - UV Index with color-coded safety level (Low, Moderate, High, Extreme)
  - Sunrise & Sunset times
  - Precipitation measurement (mm)
- 24-Hour Hourly Forecast: Horizontally scrollable timeline featuring hourly temperature, weather state, and day/night transitions.
- 7-Day Extended Forecast: Future daily forecasts with visual temperature range gradient bars and precipitation indicators.
- Pakistani Cities Presets: Fast access chips for Lahore, Karachi, Faisalabad, Islamabad, Multan, and Peshawar.
- Error Handling: Graceful error banners for invalid city names, network failures, or location permission issues with actionable retry solutions.
- Loading State: Animated shimmer skeleton loaders while fetching meteorological data.
- Responsive Glassmorphism UI: Dynamic ambient background lighting that adapts to active weather conditions and day/night cycles.

---

## Technology Stack

- Frontend Framework: React.js 18 (Hooks: useState, useEffect, useCallback, useRef)
- Build Tool: Vite
- Icons: Lucide React
- Styling: Vanilla CSS Design System with CSS Custom Properties, Glassmorphism, and Flexbox/Grid
- Typography: Google Fonts (Plus Jakarta Sans)
- APIs: Open-Meteo Weather API (Zero API key needed) & OpenWeatherMap API support

---

## Getting Started & Setup Instructions

### Prerequisites
Make sure you have Node.js installed (v16.0 or higher recommended).

### 1. Installation
Clone or navigate to the project directory and install the dependencies:
```bash
npm install
```

### 2. Run Development Server
Start the local development server:
```bash
npm run dev
```

The application will be running on:
`http://localhost:4040`

### 3. Build for Production
To generate an optimized production build:
```bash
npm run build
```

---

## API Integration & Postman Testing Guide

This application is powered by the Open-Meteo Meteorological API. It requires no registration or API key, making it 100% reliable and immediately testable in Postman.

### Localhost Application Link
- Application UI: `http://localhost:4040`

### Direct Postman Test Endpoints

#### 1. Geocoding Search (Test in Postman)
- Method: `GET`
- Lahore URL:
  `https://geocoding-api.open-meteo.com/v1/search?name=Lahore&count=5&language=en&format=json`
- Karachi URL:
  `https://geocoding-api.open-meteo.com/v1/search?name=Karachi&count=5&language=en&format=json`
- Islamabad URL:
  `https://geocoding-api.open-meteo.com/v1/search?name=Islamabad&count=5&language=en&format=json`

#### 2. Live Weather Forecast (Test in Postman)
- Method: `GET`

- Lahore (Lat: 31.5497, Lon: 74.3436):
```
https://api.open-meteo.com/v1/forecast?latitude=31.5497&longitude=74.3436&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FKarachi
```

- Karachi (Lat: 24.8607, Lon: 67.0011):
```
https://api.open-meteo.com/v1/forecast?latitude=24.8607&longitude=67.0011&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FKarachi
```

- Faisalabad (Lat: 31.4504, Lon: 73.1350):
```
https://api.open-meteo.com/v1/forecast?latitude=31.4504&longitude=73.1350&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FKarachi
```

- Islamabad (Lat: 33.6844, Lon: 73.0479):
```
https://api.open-meteo.com/v1/forecast?latitude=33.6844&longitude=73.0479&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FKarachi
```

- Multan (Lat: 30.1575, Lon: 71.5249):
```
https://api.open-meteo.com/v1/forecast?latitude=30.1575&longitude=71.5249&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FKarachi
```

- Peshawar (Lat: 34.0151, Lon: 71.5249):
```
https://api.open-meteo.com/v1/forecast?latitude=34.0151&longitude=71.5249&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,uv_index&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FKarachi
```

---

## Project Architecture

```
Weather app react.js/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Header.jsx
    │   ├── SearchBar.jsx
    │   ├── QuickCities.jsx
    │   ├── CurrentWeatherCard.jsx
    │   ├── WeatherMetrics.jsx
    │   ├── HourlyForecast.jsx
    │   ├── DailyForecast.jsx
    │   ├── WeatherIcon.jsx
    │   ├── LoadingSkeleton.jsx
    │   ├── ErrorMessage.jsx
    │   └── ApiKeyModal.jsx
    ├── hooks/
    │   ├── useWeather.js
    │   └── useLocalStorage.js
    ├── services/
    │   ├── openMeteoService.js
    │   └── openWeatherService.js
    └── utils/
        ├── weatherCodes.js
        └── formatters.js
```
