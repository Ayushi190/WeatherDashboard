import React, { useContext } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import './WeatherDisplay.css';

const WeatherDisplay = () => {
  const { weatherData, unit, setUnit } = useContext(WeatherContext);

  if (!weatherData) return null;

  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="card">
      <h2>{weatherData.name}</h2>
      <p><strong>Temperature:</strong> {weatherData.main.temp}{tempUnit}</p>
      <p><strong>Condition:</strong> {weatherData.weather[0].description}</p>
      <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> {weatherData.wind.speed} {windUnit}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <button onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}>
        Switch to {unit === 'metric' ? '°F' : '°C'}
      </button>
    </div>
  );
};

export default WeatherDisplay;