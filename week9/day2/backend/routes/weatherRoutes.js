const express = require('express');
const router = express.Router();
const { getWeather } = require('../services/weatherService');

router.get('/:city', async (req, res) => {
  try {
    const weather = await getWeather(req.params.city);
    res.json(weather);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data.' });
  }
});

module.exports = router;
