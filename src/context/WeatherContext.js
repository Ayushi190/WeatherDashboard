import React, { createContext, useState, useEffect, useCallback } from 'react';

export const WeatherContext = createContext();

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

export default function WeatherContextProvider({ children }) {
  const [city, setCity] = useState(localStorage.getItem('lastCity') || 'Delhi');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [unit, setUnit] = useState('metric');

  const fetchWeather = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeatherData(data);
      setError(null);
      localStorage.setItem('lastCity', city);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      if (!forecastRes.ok) throw new Error('Forecast fetch failed');
      const forecastJson = await forecastRes.json();
      const dailyForecasts = forecastJson.list.filter(item => item.dt_txt.includes('12:00:00'));
      setForecastData(dailyForecasts);

      setHasSearched(true);
    } catch (err) {
      setError(err.message);
      setHasSearched(true);
    }
  }, [city, unit]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return (
    <WeatherContext.Provider
      value={{ city, setCity, weatherData, forecastData, error, fetchWeather, unit, setUnit, hasSearched }}>
      {children}
    </WeatherContext.Provider>
  );
}
