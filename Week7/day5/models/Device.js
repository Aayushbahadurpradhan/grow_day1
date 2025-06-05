const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  details: {
    browser: String,
    os: String,
    loggedInAt: Date
  }
});

module.exports = mongoose.model('Device', deviceSchema);
