const cron = require('node-cron');
const reportService = require('../service/report.service');
const { reportLogger } = require('../utils/logger');

cron.schedule('0 8 * * *', async () => {
  try {
    reportLogger.info('CRON: Notify HR (unverified users) started.');
    const users = await reportService.notifyHRUnverifiedUsers();
    reportLogger.info({
      cron: 'Notify HR - Unverified Users',
      runAt: new Date().toISOString(),
      count: users.length
    });
  } catch (err) {
    reportLogger.error({
      cron: 'Notify HR Failed',
      runAt: new Date().toISOString(),
      error: err.message,
      stack: err.stack
    });
  }
});

cron.schedule('15 8 * * *', async () => {
  try {
    reportLogger.info('CRON: Log stale users started.');
    const staleUsers = await reportService.logStaleUsers();
    reportLogger.info({
      cron: 'Log Stale Users',
      runAt: new Date().toISOString(),
      count: staleUsers.length
    });
  } catch (err) {
    reportLogger.error({
      cron: 'Stale Users Failed',
      runAt: new Date().toISOString(),
      error: err.message,
      stack: err.stack
    });
  }
});

cron.schedule('0 9 1 * *', async () => {
  try {
    reportLogger.info('CRON: Monthly payroll report started.');
    const payrolls = await reportService.generateMonthlyPayroll();
    reportLogger.info({
      cron: 'Monthly Payroll Report',
      runAt: new Date().toISOString(),
      count: payrolls.length
    });
  } catch (err) {
    reportLogger.error({
      cron: 'Payroll Report Failed',
      runAt: new Date().toISOString(),
      error: err.message,
      stack: err.stack
    });
  }
});

cron.schedule('* * * * *', async () => {
  try {
    console.log('TEST CRON running...');
    await reportService.notifyHRUnverifiedUsers();
    await reportService.logStaleUsers();
    await reportService.generateMonthlyPayroll();
  } catch (err) {
    console.error('Test CRON error:', err.message);
  }
});
