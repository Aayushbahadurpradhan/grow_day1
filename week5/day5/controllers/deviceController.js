const DeviceService = require('../services/deviceService');

exports.addDevice = async (req, res) => {
  const { userId, userAgent, ip } = req.body;
  const result = await DeviceService.addDevice(userId, userAgent, ip);
  res.status(201).json(result);
};

exports.getUserDevices = async (req, res) => {
  const devices = await DeviceService.getDevicesByUserId(req.params.userId);
  res.json(devices);
};
