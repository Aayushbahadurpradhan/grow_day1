const express = require('express');
const router = express.Router();
const reportController = require('./report.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const rbac = require('../middlewares/rbac.middleware');

router.get('/unverified-users', authenticate, rbac(['hr', 'admin']), reportController.getUnverifiedUsers);
router.get('/stale-users', authenticate, rbac(['admin']), reportController.getStaleUsers);
router.get('/monthly-payroll', authenticate, rbac(['admin', 'hr']), reportController.getMonthlyPayrollReport);

module.exports = router;
