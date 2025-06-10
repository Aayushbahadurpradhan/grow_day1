const express = require('express');
const router = express.Router();
const auditController = require('./audit.controller');
const rbac = require('../middlewares/rbac.middleware');

router.get('/', rbac(['admin']), auditController.getAllAuditLogs);

module.exports = router;
