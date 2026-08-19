import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import QuickCities from './components/QuickCities';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import WeatherMetrics from './components/WeatherMetrics';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorMessage from './components/ErrorMessage';
import ApiKeyModal from './components/ApiKeyModal';
import { useWeather } from './hooks/useWeather';
import { getWeatherDetails } from './utils/weatherCodes';

export default function App() {
  const {
    currentCity,
    weatherData,
    loading,
    error,
    unit,
    recentSearches,
    loadWeatherForCity,
    searchAndSelectCity,
    fetchCurrentLocationWeather,
    toggleUnit,
    retry
  } = useWeather();

  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  const currentCode = weatherData?.current?.weatherCode ?? 0;
  const isDay = weatherData?.current?.isDay ?? 1;
  const weatherDetails = getWeatherDetails(currentCode, isDay);
  const themeClass = `app-theme-${weatherDetails.theme} ${isDay ? 'is-day' : 'is-night'}`;

  return (
    <div className={`app-root ${themeClass}`}>
      <div className="ambient-background" aria-hidden="true">
        <div className="ambient-orb orb-primary" />
        <div className="ambient-orb orb-secondary" />
      </div>

      <div className="app-container">
        <Header
          unit={unit}
          onToggleUnit={toggleUnit}
          onRefresh={retry}
          loading={loading}
          onOpenSettings={() => setIsApiModalOpen(true)}
        />

        <section className="search-section" aria-label="City Search">
          <SearchBar
            onSelectCity={loadWeatherForCity}
            onSearchSubmit={searchAndSelectCity}
            onCurrentLocation={fetchCurrentLocationWeather}
            loading={loading}
          />
          <QuickCities
            currentCity={currentCity}
            recentSearches={recentSearches}
            onSelectCity={loadWeatherForCity}
          />
        </section>

        {error && (
          <ErrorMessage
            message={error}
            onRetry={retry}
            onDefaultCity={() => searchAndSelectCity('Lahore')}
          />
        )}

        {loading && !weatherData && <LoadingSkeleton />}

        {weatherData && (
          <main className={`weather-dashboard ${loading ? 'opacity-70 transition-opacity' : ''}`}>
            <CurrentWeatherCard
              city={currentCity}
              currentWeather={weatherData.current}
              unit={unit}
            />

            <HourlyForecast
              hourly={weatherData.hourly}
              unit={unit}
            />

            <WeatherMetrics
              currentWeather={weatherData.current}
              unit={unit}
            />

            <DailyForecast
              daily={weatherData.daily}
              unit={unit}
            />
          </main>
        )}

        <footer className="app-footer">
          <p>
            Weather App • Built with <strong>React.js</strong> & Open Weather APIs by <strong className="dev-credit">zk web developer</strong>
          </p>
        </footer>
      </div>

      <ApiKeyModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
      />
    </div>
  );
}
