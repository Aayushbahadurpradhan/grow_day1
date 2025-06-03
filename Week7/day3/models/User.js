const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, match: /.+@.+\..+/ },
  phone: { type: String, match: /^[0-9]{10}$/ },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'employee'], default: 'employee' },
  refreshToken: String,
  tokenVersion: { type: Number, default: 0 },
  passwordChangedAt: Date
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordChangedAt = new Date();
    this.tokenVersion += 1;
  }
});

module.exports = mongoose.model('User', userSchema);
