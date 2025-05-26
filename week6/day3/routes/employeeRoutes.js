const express = require('express');
const router = express.Router();
const employeeCtrl = require('../controllers/employeeController');

router.post('/', employeeCtrl.createEmployee);
router.get('/', employeeCtrl.getEmployeesWithDepartments);

module.exports = router;
