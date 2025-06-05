const Device = require('../models/Device');
const parser = require('ua-parser-js');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required for device logging' });

  const ua = parser(req.headers['user-agent']);
  const deviceInfo = {
    browser: ua.browser.name || 'Unknown Browser',
    os: ua.os.name || 'Unknown OS',
    loggedInAt: new Date().toISOString()
  };
  req.deviceInfo = deviceInfo;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'User not found' });

  const existingDevice = await Device.findOne({
    userId: user._id,
    'details.browser': deviceInfo.browser,
    'details.os': deviceInfo.os
  });

  if (!existingDevice) {
    await Device.create({
      userId: user._id,
      details: deviceInfo
    });
    req.isNewDevice = true;
  } else {
    req.isNewDevice = false;
  }

  next();
};
