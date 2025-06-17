import { useState } from 'react';
import axios from 'axios';

const WeatherCard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [corsMessage, setCorsMessage] = useState('');

  const fetchWeather = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/weather/${city}`, {
        withCredentials: true,
      });
      setWeather(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setWeather(null);
      setError('Failed to fetch weather');
    }
  };

  const checkCors = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/check-cors`, {
        withCredentials: true,
      });
      setCorsMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setCorsMessage('CORS check failed');
    }
  };

  return (
    <div className="card">
      <h2>Weather Fetcher</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
      />
      <button onClick={fetchWeather}>Get Weather</button>
      <button onClick={checkCors} style={{ marginLeft: '10px' }}>Check CORS</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {corsMessage && <p style={{ color: 'green' }}>{corsMessage}</p>}

      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].main}</p>
          <p>Temperature: {weather.main.temp}°C</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
