import { useState, useEffect, useCallback, useRef } from 'react';
import { searchCities, fetchWeatherData } from '../services/openMeteoService';
import { useLocalStorage } from './useLocalStorage';

const DEFAULT_CITY = {
  id: 1172451,
  name: 'Lahore',
  country: 'Pakistan',
  admin1: 'Punjab',
  countryCode: 'PK',
  latitude: 31.5497,
  longitude: 74.3436,
  timezone: 'Asia/Karachi'
};

export function useWeather() {
  const [currentCity, setCurrentCity] = useLocalStorage('weather_current_city', DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useLocalStorage('weather_unit', 'C');
  const [recentSearches, setRecentSearches] = useLocalStorage('weather_recent_cities', [
    { name: 'Lahore', country: 'Pakistan', latitude: 31.5497, longitude: 74.3436, timezone: 'Asia/Karachi' },
    { name: 'Karachi', country: 'Pakistan', latitude: 24.8607, longitude: 67.0011, timezone: 'Asia/Karachi' },
    { name: 'Faisalabad', country: 'Pakistan', latitude: 31.4504, longitude: 73.1350, timezone: 'Asia/Karachi' },
    { name: 'Islamabad', country: 'Pakistan', latitude: 33.6844, longitude: 73.0479, timezone: 'Asia/Karachi' },
    { name: 'Multan', country: 'Pakistan', latitude: 30.1575, longitude: 71.5249, timezone: 'Asia/Karachi' },
    { name: 'Peshawar', country: 'Pakistan', latitude: 34.0151, longitude: 71.5249, timezone: 'Asia/Karachi' }
  ]);

  // Ref to track whether component is still mounted, prevents stale state
  // updates when React StrictMode unmounts/remounts in development
  const mountedRef = useRef(true);

  const loadWeatherForCity = useCallback(async (city) => {
    if (!city || typeof city.latitude !== 'number' || typeof city.longitude !== 'number') {
      setError('Invalid city location coordinates provided.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(city.latitude, city.longitude, city.timezone);
      if (!mountedRef.current) return;
      setWeatherData(data);
      setCurrentCity(city);

      setRecentSearches((prev) => {
        const filtered = prev.filter(
          (c) => !(c.name.toLowerCase() === city.name.toLowerCase() && c.country === city.country)
        );
        return [
          {
            name: city.name,
            country: city.country,
            admin1: city.admin1 || '',
            latitude: city.latitude,
            longitude: city.longitude,
            timezone: city.timezone || 'auto'
          },
          ...filtered
        ].slice(0, 6);
      });
    } catch (err) {
      if (!mountedRef.current) return;
      console.error('Failed to load weather:', err);
      setError(err.message || 'Unable to fetch weather data. Please check your internet connection.');
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [setCurrentCity, setRecentSearches]);

  const searchAndSelectCity = async (cityName) => {
    if (!cityName || !cityName.trim()) {
      setError('Please enter a city name to search.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await searchCities(cityName.trim());
      if (results.length === 0) {
        setError(`No location found for "${cityName}". Please check the spelling or try another city.`);
        setLoading(false);
        return;
      }

      const selected = results[0];
      await loadWeatherForCity(selected);
    } catch (err) {
      setError(`Could not find "${cityName}". ${err.message || 'Please try again.'}`);
      setLoading(false);
    }
  };

  const fetchCurrentLocationWeather = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const userCity = {
            id: 'current-location',
            name: 'Current Location',
            country: '',
            admin1: '',
            latitude,
            longitude,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'auto'
          };
          await loadWeatherForCity(userCity);
        } catch (err) {
          setError(`Failed to fetch weather for your location: ${err.message}`);
          setLoading(false);
        }
      },
      (geoError) => {
        let message = 'Unable to retrieve your location.';
        if (geoError.code === geoError.PERMISSION_DENIED) {
          message = 'Location access denied. Please allow location permissions in your browser or search manually.';
        } else if (geoError.code === geoError.POSITION_UNAVAILABLE) {
          message = 'Location information is unavailable.';
        } else if (geoError.code === geoError.TIMEOUT) {
          message = 'Location request timed out.';
        }
        setError(message);
        setLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  // Initial weather load with proper cleanup for React StrictMode
  useEffect(() => {
    mountedRef.current = true;
    let cancelled = false;

    const initialLoad = async () => {
      const city = currentCity || DEFAULT_CITY;
      if (!city || typeof city.latitude !== 'number' || typeof city.longitude !== 'number') {
        setError('Invalid city location coordinates provided.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchWeatherData(city.latitude, city.longitude, city.timezone);
        if (cancelled) return;
        setWeatherData(data);
        setCurrentCity(city);
      } catch (err) {
        if (cancelled) return;
        console.error('Failed to load weather:', err);
        setError(err.message || 'Unable to fetch weather data. Please check your internet connection.');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    initialLoad();

    return () => {
      cancelled = true;
      mountedRef.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
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
    retry: () => loadWeatherForCity(currentCity || DEFAULT_CITY)
  };
}
