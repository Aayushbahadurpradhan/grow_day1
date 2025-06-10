const logger = require('../config/winston');
const userService = require('./userService');
const payrollService = require('./payrollService');
const nodemailer = require('nodemailer');

const HR_EMAIL = process.env.HR_EMAIL;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       
    pass: process.env.EMAIL_PASS      
  }
});

async function sendEmail(subject, text) {
  await transporter.sendMail({
    from: `"System Notification" <${process.env.EMAIL_USER}>`,
    to: HR_EMAIL,
    subject,
    text
  });
}

exports.notifyHR = async () => {
  try {
    const unverified = await userService.getUnverifiedUsers();
    const msg = `There are ${unverified.length} unverified users:\n` +
                unverified.map(u => `${u.name} (${u.email})`).join('\n');
    logger.info(msg);
    await sendEmail("Unverified Users Alert", msg);
  } catch (err) {
    logger.error(`Notify HR Error: ${err.message}`);
  }
};

exports.logInactiveUsers = async () => {
  try {
    const inactive = await userService.getInactiveUsers();
    const msg = `Inactive users (60+ days):\n` +
                inactive.map(u => `${u.name} (${u.email})`).join('\n');
    logger.info(msg);
  } catch (err) {
    logger.error(`Log Inactive Users Error: ${err.message}`);
  }
};

exports.generatePayrollReport = async () => {
  try {
    const count = await payrollService.generateMonthlyPayroll();
    const msg = `Payroll report generated. Total entries: ${count}`;
    logger.info(msg);
    await sendEmail("Monthly Payroll Report Generated", msg);
  } catch (err) {
    logger.error(`Payroll Generation Error: ${err.message}`);
  }
};
