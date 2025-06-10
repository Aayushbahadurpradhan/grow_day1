const mongoose = require('mongoose');

const auditTrailSchema = new mongoose.Schema({
  actor: String,
  method: String,
  endpoint: String,
  action: String,
  ip: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditTrail', auditTrailSchema);
