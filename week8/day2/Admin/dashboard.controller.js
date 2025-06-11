const User = require('./admin.model');
const Payroll = require('../Payroll/payroll.model');

exports.getHighEarners = async (req, res) => {
  try {
    const highEarners = await Payroll.find()
      .sort({ salary: -1 })
      .limit(5)
      .populate('user', 'email role');

    res.json(highEarners);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getRoleDistribution = async (req, res) => {
  try {
    const distribution = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);
    res.json(distribution);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLastLoginInfo = async (req, res) => {
  try {
    const users = await User.find({}, 'email role lastLogin')
      .sort({ lastLogin: -1 })
      .limit(10);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
