const { hashPassword, comparePassword } = require('../utils/hash');
const users = require('../models/userModel');

exports.register = ({ name, email, password }) => {
  const existing = users.find(u => u.email === email);
  if (existing) throw new Error('User already exists');

  const hashed = hashPassword(password);
  const newUser = { id: Date.now(), name, email, password: hashed };
  users.push(newUser);
  return { id: newUser.id, name: newUser.name, email: newUser.email };
};

exports.login = ({ email, password }) => {
  const user = users.find(u => u.email === email);
  if (!user || !comparePassword(password, user.password)) {
    throw new Error('Invalid email or password');
  }
  return `dummy-token-${user.id}`;
};
