const mongoose = require("mongoose");

const auditTrailSchema = new mongoose.Schema({
  action: { type: String, enum: ["UPDATE", "DELETE"], required: true },
  collectionName: String,
  documentId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  before: Object,
  after: Object,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AuditTrail", auditTrailSchema);
