import React, { useContext } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import './Forecast.css';

const Forecast = () => {
  const { forecastData } = useContext(WeatherContext);

  if (!forecastData.length) return null;

  return (
    <div className="forecast-container">
      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
        {forecastData.map((item) => (
          <div className="forecast-card" key={item.dt}>
            <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="weather"
            />
            <p>{item.main.temp}°</p>
            <p>{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
