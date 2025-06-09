const express = require('express');
const router = express.Router();
const {
  createPayroll,
  getPayrollsByEmployee,
  getEmployeesSortedByNetPay,
  getPayrollById,
  deletePayroll
} = require('./payroll.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const rbac = require('../middlewares/rbac.middleware');

router.use(authenticate, rbac(['admin','manager']));
router.post('/', createPayroll);
router.get('/employee/:id', getPayrollsByEmployee); 
router.get('/sorted/netpay', getEmployeesSortedByNetPay); 
router.get('/:id', getPayrollById); 
router.delete('/:id', deletePayroll); 

module.exports = router;
