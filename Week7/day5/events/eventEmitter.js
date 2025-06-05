// const EventEmitter = require('events');
// const { sendOTP } = require('../utils/email');
// const eventEmitter = new EventEmitter();

// eventEmitter.on('deviceLogin', async ({ user, device }) => {
//   try {
//     await deviceLogin(
//       user.email,
//       `New Device Login Detected`,
//       `Logged in from ${device.browser} on ${device.os} at ${device.loggedInAt}`
//     );
//   } catch (err) {
//     console.error('Failed to send device login email:', err.message);
//   }
// });

// eventEmitter.on('sendOTP', async ({ email, otp }) => {
//   if (email) {
//     try {
//       await sendOTP(email, 'Your OTP Code', `Your OTP is ${otp}`);
//     } catch (err) {
//       console.error('Failed to send OTP:', err.message);
//     }
//   }
// });

// module.exports = eventEmitter;
