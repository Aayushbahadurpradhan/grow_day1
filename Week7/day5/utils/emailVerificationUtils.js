const crypto = require('crypto');

exports.generateEmailToken = () => {
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const expires = Date.now() + 1000 * 60 * 60; 
  return { token, hashedToken, expires };
};
