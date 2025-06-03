const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

router.post('/change-password', authenticate, allowRoles('admin', 'manager', 'employee'), authController.changePassword);

router.get('/employee', authenticate, allowRoles('employee'), (req, res) => {
  res.json({ message: 'Employee dashboard' });
});

router.get('/admin', authenticate, allowRoles('admin'), (req, res) => {
  res.json({ message: 'Admin panel' });
});

router.get('/manager', authenticate, allowRoles('manager'), (req, res) => {
  res.json({ message: 'Manager dashboard' });
});

module.exports = router;
