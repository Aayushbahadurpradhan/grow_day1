const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
const { sendOTP,sendDeviceLoginNotification, sendPasswordResetEmail  } = require('../utils/email');
const { generateEmailToken } = require('../utils/emailVerificationUtils');

exports.register = async (req, res) => {
  const { email, phone, password } = req.body;
  try {
    const user = await User.create({ email, phone, password });

    const { token, hashedToken, expires } = generateEmailToken();
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpires = expires;
    await user.save();

    const verificationURL = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${token}`;
    await sendOTP(user.email, `Verify your email using this link: ${verificationURL}`);

    res.status(201).json({ message: 'User registered. Please check your email to verify.'});
    console.log(`Verification email sent to ${user.email} with URL: ${verificationURL}`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  const token = req.params.token;
  const hashed = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashed,
    emailVerificationExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired verification token' });
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  res.json({ message: 'Email verified successfully. You may now log in.' });
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  if (!user.isVerified) {
    return res.status(403).json({ message: 'Email not verified. Please verify before logging in.' });
  }
  if (user.isLocked) {
    return res.status(403).json({ message: 'Account locked due to multiple failed login attempts.' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    user.failedLoginAttempts.push({ timestamp: new Date() });
    if (user.failedLoginAttempts.length >= 5) {
      user.isLocked = true;
    }
    await user.save();
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  user.failedLoginAttempts = [];
  if (user.loginCount === 0) {
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    user.resetToken = hashedToken;
    user.resetTokenExpires = Date.now() + 30 * 60 * 1000; 
    const resetURL = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${token}`;
    await require('../utils/email').sendOTP(user.email, `Reset your password using this link: ${resetURL}`);
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = refreshToken;
  user.loginCount += 1;
  await user.save();
  if (req.isNewDevice) {
    await sendDeviceLoginNotification(user.email, `New device login:\n${JSON.stringify(req.deviceInfo, null, 2)}`);
  }
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
  res.json({ accessToken });
};
exports.logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(204);

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.id);
    if (user) {
      user.refreshToken = '';
      await user.save();
    }
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.clearCookie('refreshToken');
    res.sendStatus(204);
  }
};
exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);
  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.id)
    if (!user || user.tokenVersion !== payload.tokenVersion) {
      return res.status(403).json({ message: 'Token is invalid or version mismatch' });
    }
    if (user.refreshToken !== token) {
      return res.status(403).json({ message: 'Refresh token does not match stored token' });
    }

    const newRefreshToken = generateRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true });
    res.json({ accessToken: generateAccessToken(user) });
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
};
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = crypto.randomBytes(32).toString('hex');
  const hashed = crypto.createHash('sha256').update(token).digest('hex');
  user.resetToken = hashed;
  user.resetTokenExpires = Date.now() + 1000 * 60 * 30; // 30 minutes
  await user.save();

  const resetURL = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${token}`;
  await sendPasswordResetEmail(user.email, resetURL);

  res.json({ message: 'Reset password link sent to email' });
};
exports.resetPassword = async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: 'Token is invalid or expired' });

  user.password = await bcrypt.hash(req.body.newPassword, 10);
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  user.tokenVersion++;
  await user.save();

  res.json({ message: 'Password has been reset successfully' });
};
