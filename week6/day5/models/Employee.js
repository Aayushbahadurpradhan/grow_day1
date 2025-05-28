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
      validator: (v) => /^\d{10}$/.test(v),
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
    required: [true, 'baseSalary is required'],
    min: [1000, 'baseSalary must be at least 1000']
  },
  hire_date: {
    type: Date,
    default: Date.now,
    get: function (val) {
      return val ? val.toISOString().split('T')[0] : null;
    }
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
  const obj = this.toObject({ virtuals: true, getters: true });
  delete obj.password;
  return obj;
};

employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
