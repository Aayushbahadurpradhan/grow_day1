const Audit = require('../Audit/auditTrail.model');

module.exports = function auditMiddleware(req, res, next) {
  res.on('finish', async () => {
    try {
      await Audit.create({
        actor: req.user?.id || 'anonymous',
        method: req.method,
        endpoint: req.originalUrl,
        action: `${req.method} ${req.originalUrl}`,
        ip: req.ip
      });
    } catch (err) {
      console.error('Audit logging failed:', err.message);
    }
  });

  next();
};
