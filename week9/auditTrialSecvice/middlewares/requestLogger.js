const logger = require("../utils/logger");
const useragent = require("useragent");

const requestLogger = (req, res, next) => {
  const user = req.user || {}; 
  const agent = useragent.parse(req.headers["user-agent"]);

  logger.info({
    message: "API Request",
    method: req.method,
    url: req.originalUrl,
    ip: req.ip || req.connection.remoteAddress,
    userId: user._id,
    role: user.role || "unidentified",
    device: agent.toString(),
    timestamp: new Date().toISOString(),
  });

  next();
};

module.exports = requestLogger;
