const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    phone: {
      type: String,
      match: [/^\d{7,15}$/, 'Phone number must be valid'], 
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false, 
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'employee', 'hr'],
      default: 'employee',
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    lockUntil: {
      type: Date,
    },
    passwordChangedAt: {
      type: Date,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, 
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordChangedAt = new Date();
    this.tokenVersion += 1;
  }
  next();
});

// userSchema.index({ email: 1 }, { unique: true });           
module.exports = mongoose.model('User', userSchema);
