const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: String,
  entity: String,
  entityId: mongoose.Schema.Types.ObjectId,
  timestamp: { type: Date, default: Date.now },
  user: String, 
  changes: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
