import React, { useContext, useEffect } from 'react';
import WeatherContextProvider, { WeatherContext } from './context/WeatherContext';
import SearchBar from './components/SearchBar/SearchBar.js';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay.js';
import Forecast from './components/Forecast/Forecast.js';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.js';
import './App.css';

function App() {
  const { fetchWeather, error, hasSearched } = useContext(WeatherContext);

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [fetchWeather]);

  return (
    <div className="container">
      <h1 className="header">Weather Dashboard</h1>
      <SearchBar />
      {hasSearched && error && <ErrorMessage message={error} />}
      <WeatherDisplay />
      <Forecast />
    </div>
  );
}

export default function WrappedApp() {
  return (
    <WeatherContextProvider>
      <App />
    </WeatherContextProvider>
  );
}