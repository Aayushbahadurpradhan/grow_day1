const loginAttempts = {};
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000;

module.exports = function (req, res, next) {
  const { email } = req.body;
  const now = Date.now();

  if (!loginAttempts[email]) {
    loginAttempts[email] = { count: 0, lockUntil: 0 };
  }

  const attempt = loginAttempts[email];
  if (attempt.lockUntil > now) {
    return res.status(403).json({ message: 'Account temporarily locked' });
  }

  req.loginAttempt = attempt;
  next();
};
