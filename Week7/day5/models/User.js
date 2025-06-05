const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  isLocked: { type: Boolean, default: false },
  failedLoginAttempts: [{ timestamp: Date }],
  tokenVersion: { type: Number, default: 0 },
  refreshToken: { type: String },
  resetToken: { type: String },
  resetTokenExpires: { type: Date },
  loginCount: { type: Number, default: 0 }

});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);