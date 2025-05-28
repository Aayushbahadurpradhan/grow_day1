const express = require('express');
const router = express.Router();
const {
  createPayroll,
  getPayrollsByEmployee,
  getEmployeesSortedByNetPay,
  getPayrollById,
  deletePayroll
} = require('../controllers/payrollController');

router.post('/', createPayroll);
router.get('/employee/:id', getPayrollsByEmployee); 
router.get('/sorted/netpay', getEmployeesSortedByNetPay); 
router.get('/:id', getPayrollById); 
router.delete('/:id', deletePayroll); 

module.exports = router;
