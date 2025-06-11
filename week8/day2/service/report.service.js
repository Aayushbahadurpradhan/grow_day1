const User = require('../Admin/admin.model');
const Payroll = require('../Payroll/payroll.model');
const { reportLogger } = require('../utils/logger');
const { sendEmail } = require('../utils/emailReporter');

exports.notifyHRUnverifiedUsers = async () => {
  try {
    const unverifiedUsers = await User.find({ isVerified: false, role: { $ne: 'admin' } });

    reportLogger.info({
      action: 'Notify HR',
      count: unverifiedUsers.length,
      unverifiedUsers: unverifiedUsers.map(u => ({ email: u.email, phone: u.phone }))
    });

    const emailBody = unverifiedUsers.length
      ? `There are ${unverifiedUsers.length} unverified users:\n\n` +
        unverifiedUsers.map(u => `• ${u.email} (${u.phone})`).join('\n')
      : 'No unverified users found.';

    await sendEmail('Daily Unverified Users Report', emailBody);

    return unverifiedUsers;
  } catch (err) {
    reportLogger.error({ action: 'Notify HR', error: err.message });
    throw err;
  }
};

exports.logStaleUsers = async () => {
  try {
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    const staleUsers = await User.find({ lastUpdated: { $lt: sixtyDaysAgo } });

    reportLogger.info({
      action: 'Stale Users',
      count: staleUsers.length,
      staleUsers: staleUsers.map(u => ({ email: u.email, lastUpdated: u.lastUpdated }))
    });
    const emailBody = staleUsers.length
      ? `Users not updated in 60+ days:\n\n` +
        staleUsers.map(u => `• ${u.email} (Last Updated: ${u.lastUpdated.toDateString()})`).join('\n')
      : 'No stale users found.';

    await sendEmail('Stale Users Report', emailBody);
    return staleUsers;
  } catch (err) {
    reportLogger.error({ action: 'Stale Users', error: err.message });
    throw err;
  }
};

exports.generateMonthlyPayroll = async () => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const payrolls = await Payroll.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    }).populate('employeeId', 'email');

    reportLogger.info({
      action: 'Monthly Payroll Report',
      generatedAt: now,
      totalRecords: payrolls.length,
      payrolls: payrolls.map(p => ({
        employee: p.employeeId.email,
        baseSalary: p.baseSalary,
        netPay: p.netPay
      }))
    });
    const emailBody = payrolls.length
      ? `Monthly Payroll Report:\n\n` +
        payrolls.map(p => `• ${p.employeeId.email}: ₹${p.netPay} (Base: ₹${p.baseSalary})`).join('\n')
      : 'No payroll entries generated this month.';
    await sendEmail('Monthly Payroll Report', emailBody);
    return payrolls;
  } catch (err) {
    reportLogger.error({ action: 'Payroll Report', error: err.message });
    throw err;
  }
};
