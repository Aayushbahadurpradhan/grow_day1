const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');

exports.register = async (req, res) => {
    const { email, password, phone, role } = req.body;
    const user = await User.create({ email, password, phone, role });
    res.status(201).json({ message: 'Registered Successfully' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ message: 'Invalid credentials' });
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
    });
    res.json({ accessToken });
};

exports.refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);
    try {
        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(payload.id);
        if (!user || user.tokenVersion !== payload.version) return res.sendStatus(403);
        const accessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        user.refreshToken = newRefreshToken;
        await user.save();
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        res.json({ accessToken });
    } catch {
        return res.sendStatus(403);
    }
};

exports.logout = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(204);
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.id);
    if (user) {
        user.refreshToken = '';
        await user.save();
    }
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch)
    return res.status(400).json({ message: 'Current password is incorrect' });
  user.password = newPassword; 
  user.refreshToken = '';      
  await user.save();
  res.clearCookie('refreshToken');
  res.json({ message: 'Password changed successfully. Please log in again.' });
};