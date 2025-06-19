const express = require('express');
const router = express.Router();
const {
  createPayroll,
  getPayrollsByEmployee,
  getEmployeesSortedByNetPay,
  getPayrollById,
  deletePayroll,
  updatePayroll,
  getAllPayrolls
} = require('./payroll.controller');

const Payroll = require('./payroll.model');
const { authenticate } = require('../middlewares/auth.middleware');
const rbac = require('../middlewares/rbac.middleware');
const auditMiddleware = require('../middlewares/audit.middleware');

router.use(authenticate, rbac(['admin', 'manager']));

router.use((req, res, next) => {
  req.Model = Payroll;
  next();
});

router.post('/', createPayroll);
router.get('/employee/:id', getPayrollsByEmployee);
router.get('/sorted/netpay', getEmployeesSortedByNetPay);
router.get('/:id', getPayrollById);
router.delete('/:id', auditMiddleware, deletePayroll);
router.put('/:id',auditMiddleware,updatePayroll);
router.get('/',getAllPayrolls);

module.exports = router;
