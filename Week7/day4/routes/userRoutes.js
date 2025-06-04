const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.get('/profile', authenticate, userController.getProfile);
router.put('/profile_number', authenticate, userController.updateOwnProfile);

router.get('/', authenticate, requireRole('admin'), userController.getAllUsers);
router.put('/:id/role', authenticate, requireRole('admin'), userController.updateUserRole);
router.delete('/:id', authenticate, requireRole('admin'), userController.deleteUser);

module.exports = router;
