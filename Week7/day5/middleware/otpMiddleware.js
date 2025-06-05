// const { hashOTP } = require('../utils/otpUtils');

// module.exports = (req, res, next) => {
//   const { otp, hashedOTP } = req.body;
//   if (!otp || !hashedOTP) return res.status(400).json({ message: 'OTP required' });

//   const hashedInput = hashOTP(otp);
//   if (hashedInput !== hashedOTP) return res.status(401).json({ message: 'Invalid OTP' });

//   next();
// };