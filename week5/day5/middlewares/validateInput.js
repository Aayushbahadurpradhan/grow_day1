const validator = require('validator');

module.exports = (req, res, next) => {
  const { username, password } = req.body;

  if (username && !validator.isAlphanumeric(username)) {
    return res.status(400).json({ error: 'Username must be alphanumeric' });
  }

  if (password && !validator.isLength(password, { min: 6 })) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  next();
};
