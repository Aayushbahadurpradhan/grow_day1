const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'employee', 'hr'], default: 'employee' },
  failedLoginAttempts: { type: Number, default: 0 },
  isLocked: { type: Boolean, default: false },
  lockUntil: { type: Date },
  passwordChangedAt: Date,
  refreshToken: String,
  tokenVersion: { type: Number, default: 0 },
  lastLogin: { type: Date },
  lastUpdated: { type: Date, default: Date.now },
  isVerified: {type: Boolean,default: false},
  emailVerificationToken: String,
  emailVerificationExpires: Date

});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordChangedAt = new Date();
    this.tokenVersion += 1;
  }

  if (this.isModified()) {
    this.lastUpdated = new Date();
  }

  next();
});

module.exports = mongoose.model('User', userSchema);
