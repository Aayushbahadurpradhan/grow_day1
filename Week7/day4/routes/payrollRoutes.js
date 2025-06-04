const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');
const { authenticate } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.post('/',authenticate, requireRole('manager','admin'), payrollController.createPayroll);
router.get('/employee/:id',authenticate,payrollController.getPayrollsByEmployee); 
router.get('/sorted/netpay',authenticate, requireRole('manager','admin'), payrollController.getEmployeesSortedByNetPay); 
router.get('/:id',authenticate, requireRole('manager','admin'), payrollController.getPayrollById); 
router.delete('/:id',authenticate, requireRole('manager','admin'), payrollController.deletePayroll); 

module.exports = router;
