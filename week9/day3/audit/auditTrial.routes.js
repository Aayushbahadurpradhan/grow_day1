const express = require("express");
const router = express.Router();
const controller = require("./auditTrail.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const rbac = require("../middlewares/rbac.middleware");

router.use(authenticate, rbac(['admin'])); 
router.get("/",authenticate, controller.getAuditLogs);
router.get("/:userId", controller.getAuditLogsByUser);

module.exports = router;
