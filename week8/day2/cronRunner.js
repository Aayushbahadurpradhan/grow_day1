const cron = require('node-cron');
const notifyUnverifiedUsers = require('./crons/notifyUnverifiedUsers');
const logInactiveUsers = require('./crons/logInactiveUsers');
const generatePayrollReport = require('./crons/generatePayrollReport');

cron.schedule('0 9 * * *', () => notifyUnverifiedUsers());      
cron.schedule('0 10 * * *', () => logInactiveUsers());          
cron.schedule('0 0 1 * *', () => generatePayrollReport());      

console.log("CRON jobs scheduled.");
