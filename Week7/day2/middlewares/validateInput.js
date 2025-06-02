module.exports = function validateInput(req, res, next) {
  const { name, email, phone, password, role } = req.body;

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid or missing email address' });
  }

  if (phone && !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ message: 'Phone number must be exactly 10 digits' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  if (req.path === '/register' && role && !['admin', 'employee', 'manager'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  if (req.path === '/register' && (!name || name.length < 2)) {
    return res.status(400).json({ message: 'Name is required and must be at least 2 characters' });
  }

  next();
};
