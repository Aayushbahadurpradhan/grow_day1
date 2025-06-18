const auditService = require("./auditTrail.service");

exports.getAuditLogs = async (req, res) => {
  const logs = await auditService.getAllLogs();
  res.json(logs);
};

exports.getAuditLogsByUser = async (req, res) => {
  const logs = await auditService.getLogsByUserId(req.params.userId);
  res.json(logs);
};
