const AuditTrail = require('./auditTrail.model');
const { sendError } = require('../utils/errorResponse');

exports.getAllAuditLogs = async (req, res) => {
  try {
    const logs = await AuditTrail.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    console.error('Audit Fetch Error:', err.message);
    sendError(res, 500, 'Failed to fetch audit logs');
  }
};

exports.createAuditLog = async (logData) => {
  try {
    const audit = new AuditTrail(logData);
    await audit.save();
  } catch (err) {
    console.error('New Audit not created', err.message);
    sendError(res, 500, 'Failed to create audit log');
  }
};
