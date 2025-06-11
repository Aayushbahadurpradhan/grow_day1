const nodemailer = require('nodemailer');
const { reportLogger } = require('./logger');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendEmail = async (subject, text) => {
  try {
    await transporter.sendMail({
      from: `"System Notification" <${process.env.EMAIL_USER}>`,
      to: process.env.HR_EMAIL,
      subject,
      text
    });
    reportLogger.info({ action: 'Email Sent', subject });
  } catch (err) {
    reportLogger.error({ action: 'Email Sending Failed', subject, error: err.message });
  }
};
