const { logAccess } = require("../services/loggerService");

const requestLogger = (req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`;
  logAccess(log);
  next();
};

module.exports = {
  requestLogger,
};
