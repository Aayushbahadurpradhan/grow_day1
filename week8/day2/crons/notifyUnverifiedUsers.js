

const cronService = require('../services/cronService');

module.exports = async () => {
  await cronService.notifyHR();
};
