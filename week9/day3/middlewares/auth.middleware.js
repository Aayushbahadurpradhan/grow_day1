
const jwt = require('jsonwebtoken');
const User = require('../Admin/admin.model');
const { sendError } = require('../utils/errorResponse');

exports.authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 401, 'No token provided');
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return sendError(res, 401, 'User no longer exists');

    if (user.isLocked) return sendError(res, 403, 'Account is locked. Contact admin.');

    if (user.passwordChangedAt) {
      const pwdChangedAt = parseInt(user.passwordChangedAt.getTime() / 1000, 10);
      if (decoded.iat < pwdChangedAt) {
        return sendError(res, 401, 'Token invalid due to recent password change');
      }
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return sendError(res, 403, 'Invalid or expired token');
  }
};
