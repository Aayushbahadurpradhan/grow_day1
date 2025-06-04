const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }
    if (user.isLocked) {
      return res.status(403).json({ message: 'Account is locked. Contact admin.' });
    }
    if (user.passwordChangedAt) {
      const passwordChangedTimestamp = parseInt(user.passwordChangedAt.getTime() / 1000, 10);
      if (decoded.iat < passwordChangedTimestamp) {
        return res.status(401).json({ message: 'Token invalid due to recent password change' });
      }
    }

    req.user = user; 
    next();
  } catch (err) {
    console.error('Authentication error:', err.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
