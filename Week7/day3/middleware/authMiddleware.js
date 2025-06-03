const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.sendStatus(401);
    if (user.passwordChangedAt) {
      const passwordChangedTime = parseInt(user.passwordChangedAt.getTime() / 1000, 10);
      if (payload.iat < passwordChangedTime) {
        return res.status(401).json({ message: 'Password recently changed. Please login again.' });
      }
    }
    req.user = payload;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};
