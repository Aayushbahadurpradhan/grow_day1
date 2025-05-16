exports.validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
exports.validateRequiredFields = (fields) => {
  return Object.values(fields).every(value => value !== undefined && value !== '');
};
