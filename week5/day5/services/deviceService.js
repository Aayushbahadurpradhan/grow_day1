const fileHandler = require('../utils/fileHandler');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const devicesFile = path.join(__dirname, '../data/devices.json');

exports.addDevice = async (userId, userAgent, ip) => {
  const devices = await fileHandler.readJsonFile(devicesFile); 
  const newDevice = {
    id: uuidv4(),
    userId,
    userAgent,
    ip,
    timestamp: new Date().toISOString(),
  };
  devices.push(newDevice);
  await fileHandler.writeJsonFile(devicesFile, devices); 
  return newDevice;
};

exports.getDevicesByUserId = async (userId) => {
  const devices = await fileHandler.readJsonFile(devicesFile); 
  return devices.filter(d => d.userId === userId);
};
