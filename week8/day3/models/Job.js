const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Job', jobSchema);
