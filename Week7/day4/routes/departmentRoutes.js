const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authenticate } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.get('/', authenticate, requireRole('admin'), departmentController.getAllDepartments);
router.post('/', authenticate, requireRole('admin'), departmentController.createDepartment);
router.put('/:id', authenticate, requireRole('admin'), departmentController.updateDepartment);
router.delete('/:id', authenticate, requireRole('admin'), departmentController.deleteDepartment);
router.get('/:id', authenticate, requireRole('admin'), departmentController.getDepartmentById);
module.exports = router;
