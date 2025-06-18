const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userAgent: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Device', deviceSchema);
