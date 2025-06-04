const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  salary: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Employee', employeeSchema);
