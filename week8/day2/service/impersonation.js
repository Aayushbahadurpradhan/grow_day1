const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('.../Admin/admin.model');

exports.impersonate = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const userToImpersonate = await User.findById(req.body.userId);
  if (!userToImpersonate) return res.status(404).json({ error: 'User not found' });

  const token = jwt.sign(
    { id: userToImpersonate._id, role: userToImpersonate.role, department: userToImpersonate.department },
    config.get('jwtSecret'),
    { expiresIn: '1h' }
  );

  res.json({ token });
};