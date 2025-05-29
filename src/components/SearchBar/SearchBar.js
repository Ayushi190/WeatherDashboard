import React, { useContext, useState } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import './SearchBar.css';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const { setCity } = useContext(WeatherContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setCity(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city name"
      />
      <button className="button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
