const AuditTrail = require("./auditTrial.model");

const getAllLogs = async () => {
  return AuditTrail.find().sort({ timestamp: -1 });
};

const getLogsByUserId = async (userId) => {
  return AuditTrail.find({ userId }).sort({ timestamp: -1 });
};

module.exports = { getAllLogs, getLogsByUserId };
