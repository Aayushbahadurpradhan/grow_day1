const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
const Device = require('../models/Device');
const {
  checkUserLockStatus,
  handleFailedLogin,
  resetLoginAttempts,
  comparePassword,
  issueTokens
} = require('../services/authHelpers');

exports.register = async (req, res) => {
    try {
        const { email, phone, password, role } = req.body;
        const existingUser = await User.findOne({
            $or: [{ email: email.toLowerCase().trim() }, { phone }]
        });
        if (existingUser) {
            if (existingUser.email === email.toLowerCase().trim()) {
                return res.status(400).json({ message: 'Duplicate email' });
            }
            if (existingUser.phone === phone) {
                return res.status(400).json({ message: 'Duplicate phone number' });
            }
        }
        const user = new User({ email, phone, password, role });
        await user.save();
        res.status(201).json({ message: 'Registered successfully' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const lockStatus = checkUserLockStatus(user);
    if (lockStatus.locked) {
      return res.status(403).json({ message: lockStatus.message });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      await handleFailedLogin(user);
      return res.status(401).json({ message: 'Invalid Password' });
    }

    await resetLoginAttempts(user);
    const accessToken = await issueTokens(user, req, res);
    return res.json({ accessToken });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.sendStatus(204);

        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(payload.id);
        if (user) {
            user.refreshToken = '';
            await user.save();
        }

        res.clearCookie('refreshToken');
        res.json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error('Logout error:', err);
        res.status(403).json({ message: 'Invalid token' });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.sendStatus(401);
        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(payload.id);
        if (!user || user.tokenVersion !== payload.version || user.refreshToken !== token) {
            return res.sendStatus(403);
        }
        const newRefreshToken = generateRefreshToken(user);
        user.refreshToken = newRefreshToken;
        await user.save();
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        });
        res.json({ accessToken: generateAccessToken(user) });
    } catch (err) {
        console.error('Refresh error:', err);
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current and new password required' });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Current password incorrect' });

        user.password = newPassword;
        user.refreshToken = '';
        await user.save();

        res.clearCookie('refreshToken');
        res.json({ message: 'Password changed. Please login again.' });
    } catch (err) {
        console.error('Password change error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
