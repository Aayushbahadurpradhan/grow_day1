const axios = require('axios');
const retry = require('../utils/retry');

const API_KEY = process.env.WEATHER_API_KEY;

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data;
}

const getWeather = async (city) => {
  return await retry(() => fetchWeather(city), 3, 1000);
};

module.exports = { getWeather };
