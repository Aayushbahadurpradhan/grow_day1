const crypto = require('crypto');

exports.hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

exports.comparePassword = (input, hashed) => {
  const inputHash = crypto.createHash('sha256').update(input).digest('hex');
  return inputHash === hashed;
};
