const User = require('../models/User');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password -refreshToken');
  res.json(user);
};

exports.updateOwnProfile = async (req, res) => {
  const { phone } = req.body;
  const updated = await User.findByIdAndUpdate(
    req.user.id,
    { phone },
    { new: true, runValidators: true }
  ).select('-password -refreshToken');
  res.json(updated);
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password -refreshToken');
  res.json(users);
};

exports.updateUserRole = async (req, res) => {
  const { role } = req.body;
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true, runValidators: true }
  ).select('-password -refreshToken');
  res.json(updated);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};
