const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  last_name: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: v => /^\d{10}$/.test(v),
      message: 'Phone number must be exactly 10 digits'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['employee', 'manager', 'admin'],
    default: 'employee'
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: function () {
      return this.role === 'manager';
    }
  },
  baseSalary: {
    type: Number,
    required: [true, 'Base salary is required'],
    min: [1000, 'Base salary must be at least 1000']
  },
  hire_date: {
    type: Date,
    default: Date.now,
    get: val => val?.toISOString().split('T')[0]
  }
}, {
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true }
});

employeeSchema.virtual('payroll', {
  ref: 'Payroll',
  localField: '_id',
  foreignField: 'employeeId',
  justOne: true
});

employeeSchema.virtual('isHighEarner').get(function () {
  return this.baseSalary > 5000;
});

employeeSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
