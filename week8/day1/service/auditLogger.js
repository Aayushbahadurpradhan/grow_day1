const { createAuditLog } = require('../Audit/audit.controller');

const auditLogger = (action = 'UNKNOWN') => {
  return async (req, res, next) => {
    try {
      if (req.user) {
        await createAuditLog({
          actor: req.user.username || req.user.email,
          method: req.method,
          endpoint: req.originalUrl,
          action,
          ip: req.ip
        });
      }
    } catch (err) {
      console.error('Audit logging failed:', err.message);
    }
    next();
  };
};

module.exports = auditLogger;
