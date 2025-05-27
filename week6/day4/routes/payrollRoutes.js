const express = require('express');
const router = express.Router();
const payrollController  = require('../controllers/payrollController');

router.post('/', payrollController.createPayroll);
router.get('/:id', payrollController.getPayrollsByEmployee);

module.exports = router;
