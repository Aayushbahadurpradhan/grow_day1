const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });

exports.generateRefreshToken = (user) =>
  jwt.sign({ id: user._id, version: user.tokenVersion }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
