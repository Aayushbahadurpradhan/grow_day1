exports.validateClient = (data) => {
  const { name, email } = data;
  if (!name || typeof name !== 'string' || name.length < 3) {
    return { error: 'Name must be at least 3 characters' };
  }
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || !emailRegex.test(email)) {
    return { error: 'Valid email is required' };
  }
  return { error: null };
};

