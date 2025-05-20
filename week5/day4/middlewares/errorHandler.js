
const { logError } = require("../services/loggerService");

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const log = `[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path} - ${status} - ${message}`;
  logError(log);
  res.status(status).json({ error: message });
};

module.exports = {
  errorHandler,
};
