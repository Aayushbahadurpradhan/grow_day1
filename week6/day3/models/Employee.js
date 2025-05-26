const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name:  { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  phone:      { type: String, match: /^[0-9]{10}$/ },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  role:       { type: String, required:true },
  password:   { type: String, required: true },
  salary:     { type: Number, required: true },
  hire_date:  { type: Date, default: Date.now }
});


module.exports = mongoose.model('Employee', employeeSchema);
