const express = require('express');
const router = express.Router();
const authController = require('./admin.controller');
const loginLimiter = require('../middlewares/loginLimiter');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/register', authController.register);
router.post('/login', loginLimiter, authController.login);
router.post('/logout', authenticate, authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.post('/change-password', authenticate, authController.changePassword);

module.exports = router;
