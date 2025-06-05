const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
// const deviceLogger = require('../middleware/deviceLogger');
const logDevice = require('../middleware/logDevice');

router.post('/register', authController.register);
router.get('/verify-email/:token', authController.verifyEmail);
// router.post('/login',logDevice, deviceLogger, authController.login);
router.post('/login',logDevice, authController.login);
router.post('/logout', authenticate, authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;