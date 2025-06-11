const User = require('./admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateAccessToken,generateRefreshToken} = require('../utils/tokenUtils');
const {checkUserLockStatus,handleFailedLogin,resetLoginAttempts,comparePassword} = require('../service/authHelpers');
const { sendError, sendValidationError } = require('../utils/errorResponse');
const config = require('config');
const { auditLogger, loginLogger } = require('../utils/logger');
const { sendOTP } = require('../email/email');
const {generateEmailToken}= require('../email/emailVerificationUtils');

const setRefreshTokenCookie = (res, token) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

// exports.register = async (req, res) => {
//   try {
//     const { email, phone, password, role } = req.body;
//     if (!email || !password) {
//       return sendValidationError(res, [{
//         value: '',
//         msg: 'Email and password are required',
//         path: ['email', 'password'],
//         location: 'body'
//       }], 400);
//     }

//     const existingUser = await User.findOne({
//       $or: [{ email: email.toLowerCase().trim() }, { phone }]
//     });

//     if (existingUser) {
//       if (existingUser.email === email.toLowerCase().trim()) {
//         return sendError(res, 400, 'Duplicate email');
//       }
//       if (existingUser.phone === phone) {
//         return sendError(res, 400, 'Duplicate phone number');
//       }
//     }

//     const user = new User({ email, phone, password, role });
//     await user.save();

//     return res.status(201).json({ message: 'Registered successfully' });
//   } catch (err) {
//     console.error('Registration error:', err);
//     return sendError(res);
//   }
// };
exports.register = async (req, res) => {
  try {
    const { email, phone, password, role } = req.body;
    if (!email || !password) {
      return sendValidationError(res, [{
        value: '',
        msg: 'Email and password are required',
        path: ['email', 'password'],
        location: 'body'
      }], 400);
    }
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { phone }]
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase().trim()) {
        return sendError(res, 400, 'Duplicate email');
      }
      if (existingUser.phone === phone) {
        return sendError(res, 400, 'Duplicate phone number');
      }
    }
    const user = new User({ email, phone, password, role });
    const { token, hashedToken, expires } = generateEmailToken();
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpires = expires;
    await user.save();
    const verificationURL = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${token}`;
    await sendOTP(user.email, `Verify your email using this link: ${verificationURL}`);
    console.log(`Verification email sent to ${user.email} with URL: ${verificationURL}`);

    return res.status(201).json({ message: 'Registered successfully. Please check your email to verify.' });

  } catch (err) {
    console.error('Registration error:', err);
    return sendError(res);
  }
};
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return sendValidationError(res, [{
//         value: '',
//         msg: 'Email and password are required',
//         path: ['email', 'password'],
//         location: 'body'
//       }], 400);
//     }

//     const user = await User.findOne({ email: email.toLowerCase().trim() });
//     if (!user) {
//       loginLogger.warn(`Failed login for ${email}`);
//       return sendError(res, 401, 'Invalid credentials');
//     }
//     const lockStatus = checkUserLockStatus(user);
//     if (lockStatus.locked) {
//       return sendError(res, 403, lockStatus.message);
//     }

//     const isMatch = await comparePassword(password, user.password);
//     if (!isMatch) {
//       await handleFailedLogin(user);
//       loginLogger.warn(`Invalid password for user ${user.email}`);
//       return sendError(res, 401, 'Invalid password');
//     }

//     await resetLoginAttempts(user);
//     user.lastLogin = new Date();
//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);

//     user.refreshToken = refreshToken;
//     await user.save();

//     setRefreshTokenCookie(res, refreshToken);
//     auditLogger.info(`User ${user.email} logged in`, { userId: user._id, action: 'login' });
//     return res.json({ accessToken });

//   } catch (err) {
//     console.error('Login error:', err);
//     return sendError(res);
//   }
// };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendValidationError(res, [{
        value: '',
        msg: 'Email and password are required',
        path: ['email', 'password'],
        location: 'body'
      }], 400);
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      loginLogger.warn(`Failed login for ${email}`);
      return sendError(res, 401, 'Invalid credentials');
    }

    if (!user.isVerified) {
      return sendError(res, 403, 'Email not verified. Please verify your email before logging in.');
    }

    const lockStatus = checkUserLockStatus(user);
    if (lockStatus.locked) {
      return sendError(res, 403, lockStatus.message);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      await handleFailedLogin(user);
      loginLogger.warn(`Invalid password for user ${user.email}`);
      return sendError(res, 401, 'Invalid password');
    }

    await resetLoginAttempts(user);
    user.lastLogin = new Date();
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    setRefreshTokenCookie(res, refreshToken);
    auditLogger.info(`User ${user.email} logged in`, { userId: user._id, action: 'login' });
    return res.json({ accessToken });

  } catch (err) {
    console.error('Login error:', err);
    return sendError(res);
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.sendStatus(204);

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch {
      res.clearCookie('refreshToken');
      return res.sendStatus(204);
    }

    const user = await User.findById(payload.id);
    if (user) {
      user.refreshToken = '';
      await user.save();
      auditLogger.info(`User ${user.email} logged out`, { userId: user._id, action: 'logout' });

    }

    res.clearCookie('refreshToken');
    return res.json({ message: 'Logged out successfully' });

  } catch (err) {
    console.error('Logout error:', err);
    return sendError(res, 403, 'Invalid token');
  }
};

exports.refreshToken = async (req, res) => {
  try {
    if (!req.cookies || !req.cookies.refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }
    const oldToken = req.cookies.refreshToken;
    let payload;
    try {
      payload = jwt.verify(oldToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }

    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== oldToken || user.tokenVersion !== payload.version) {
      return res.status(403).json({ message: 'Token mismatch or user not valid' });
    }

    const newRefreshToken = generateRefreshToken(user);
    const newAccessToken = generateAccessToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error('Refresh error:', err);
    return res.status(403).json({ message: 'Could not refresh token' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return sendValidationError(res, [{
        value: '',
        msg: 'Current and new password required',
        path: ['currentPassword', 'newPassword'],
        location: 'body'
      }], 400);
    }

    const user = await User.findById(req.user.id);
    if (!user) return sendError(res, 404, 'User not found');

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return sendError(res, 400, 'Current password incorrect');

    user.password = newPassword;
    user.refreshToken = '';
    await user.save();

    res.clearCookie('refreshToken');
    return res.json({ message: 'Password changed. Please login again.' });

  } catch (err) {
    console.error('Password change error:', err);
    return sendError(res);
  }
};

exports.impersonate = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    const admin = req.user;
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) return sendError(res, 404, 'Target user not found');
    const accessToken = generateAccessToken(targetUser);
    auditLogger.info(`Admin ${admin.email} impersonated ${targetUser.email}`, {
      adminId: admin._id,
      impersonatedUserId: targetUser._id,
      action: 'impersonation'
    });
    return res.json({ accessToken });
  } catch (err) {
    console.error('Impersonation error:', err);
    return sendError(res);
  }
};

exports.verifyEmail = async (req, res) => {
  const token = req.params.token;
  const hashed = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashed,
    emailVerificationExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired verification token' });
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  res.json({ message: 'Email verified successfully. You may now log in.' });
};