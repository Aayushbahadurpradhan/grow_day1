console.log('✅ MOCK AUTH.MIDDLEWARE ACTIVE');

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = { id: 'mockId', role: 'admin' };
  next();
};
