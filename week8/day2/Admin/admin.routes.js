const express = require('express');
const router = express.Router();
const authController = require('./admin.controller');
const dashboardController = require('./dashboard.controller');
const loginLimiter = require('../middlewares/loginLimiter');
const { authenticate, requireRole } = require('../middlewares/auth.middleware');

router.post('/register', authController.register);
router.post('/login', loginLimiter, authController.login);
router.post('/logout', authenticate, authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.post('/change-password', authenticate, authController.changePassword);
router.post('/impersonate', authenticate, requireRole(['admin']), authController.impersonate);
router.get('/verify-email/:token', authController.verifyEmail);

router.get('/high-earners', authenticate, dashboardController.getHighEarners);
router.get('/role-distribution', authenticate, dashboardController.getRoleDistribution);
router.get('/last-login', authenticate, dashboardController.getLastLoginInfo);
module.exports = router;
