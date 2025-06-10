const cron = require('node-cron');
const notifyUnverifiedUsers = require('./crons/notifyUnverifiedUsers');
const logInactiveUsers = require('./crons/logInactiveUsers');
const generatePayrollReport = require('./crons/generatePayrollReport');

cron.schedule('0 9 * * *', () => notifyUnverifiedUsers());      // Daily at 9AM
cron.schedule('0 10 * * *', () => logInactiveUsers());          // Daily at 10AM
cron.schedule('0 0 1 * *', () => generatePayrollReport());      // Monthly at midnight on 1st

console.log("CRON jobs scheduled.");
