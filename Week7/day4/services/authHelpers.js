const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Device = require('../models/Device');

exports.checkUserLockStatus = (user) => {
  if (user.isLocked && user.lockUntil > Date.now()) {
    return { locked: true, message: 'Account is locked. Try again later.' };
  }
  return { locked: false };
};

exports.handleFailedLogin = async (user) => {
  user.failedLoginAttempts += 1;
  if (user.failedLoginAttempts >= 5) {
    user.isLocked = true;
    user.lockUntil = Date.now() + 15 * 60 * 1000;
  }
  await user.save();
};

exports.resetLoginAttempts = async (user) => {
  user.failedLoginAttempts = 0;
  user.isLocked = false;
  user.lockUntil = null;
  await user.save();
};

exports.comparePassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

exports.issueTokens = async (user, req, res) => {
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user._id, version: user.tokenVersion }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  user.refreshToken = refreshToken;
  await user.save();

  await Device.create({ user: user._id, userAgent: req.headers['user-agent'] });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  });

  return accessToken;
};
