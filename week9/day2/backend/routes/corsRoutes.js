require('dotenv').config();
const express = require('express');
const router = express.Router();

const allowedOrigin = process.env.FRONTEND_DEV; 

router.options('/', (req, res) => {
  const origin = req.headers.origin;
  if (origin === allowedOrigin) {
    res.set({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
    });
    return res.sendStatus(200);
  } else {
    return res.status(403).send('CORS not allowed');
  }
});

router.get('/', (req, res) => {
  const origin = req.headers.origin;
  if (origin === allowedOrigin) {
    res.set({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true',
    });
    res.json({ message: 'CORS check success!' });
  } else {
    res.status(403).send('CORS not allowed');
  }
});

module.exports = router;
