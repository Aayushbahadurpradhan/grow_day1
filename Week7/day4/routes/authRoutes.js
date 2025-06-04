const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const loginLimiter = require('../middleware/loginLimiter');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', loginLimiter, authController.login);
router.post('/logout', authenticate, authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.post('/change-password', authenticate, authController.changePassword);

module.exports = router;
