const cron = require('node-cron');
const User = require('../models/admin.model');
const { auditLogger } = require('../utils/logger');

cron.schedule('0 9 * * *', async () => {
  const unverified = await User.find({ isVerified: false });
  auditLogger.info('Unverified user list sent to HR', { count: unverified.length });
});
