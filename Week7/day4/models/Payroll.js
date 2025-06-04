const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  Salary: {
    type: Number,
    required: [true, 'Salary is required']
  },
  bonus: {
    type: Number,
    default: 0
  },
  deductions: {
    type: Number,
    default: 0
  },
  grossPay: Number,
  netPay: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

payrollSchema.pre('save', function (next) {
  const gross = this.Salary + this.bonus;
  const net = gross - this.deductions;

  if (net < this.Salary) {
    return next(new Error('Net pay cannot be less than base salary.'));
  }

  this.grossPay = gross;
  this.netPay = net;
  next();
});

module.exports = mongoose.model('Payroll', payrollSchema);
