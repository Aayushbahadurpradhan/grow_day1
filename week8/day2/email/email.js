const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`
    });
  } catch (err) {
    console.error(`Failed to send email to ${email}:`, err.message);
    throw err;
  }
};

exports.sendDeviceLoginNotification = async (email, deviceInfo) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'New Device Login Detected',
      text: `A new device has logged into your account:\n\n${JSON.stringify(deviceInfo, null, 2)}`
    });
  } catch (err) {
    console.error(`Failed to send device login notification to ${email}:`, err.message);
    throw err;
  }
};
exports.sendPasswordResetEmail = async (email, resetURL) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset.\nClick the link below to reset your password:\n\n${resetURL}\n\nIf you didn't request this, please ignore this email.`,
    });
  } catch (err) {
    console.error(`Failed to send password reset email to ${email}:`, err.message);
    throw err;
  }
};