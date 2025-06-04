const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { authenticate } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.get('/', authenticate, requireRole('manager','admin'), employeeController.getAllEmployees);
router.post('/', authenticate, requireRole('admin'), employeeController.createEmployee);
router.put('/:id', authenticate, requireRole('admin'), employeeController.updateEmployee);
router.delete('/:id', authenticate, requireRole('admin'), employeeController.deleteEmployee);
router.get('/:id', authenticate, requireRole('manager','admin'), employeeController.getEmployeeById);
module.exports = router;
