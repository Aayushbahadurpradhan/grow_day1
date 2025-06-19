const { createLogger, format, transports } = require("winston");
require("winston-mongodb");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.MongoDB({
      level: "info",
      db: process.env.MONGO_URI ,
      options: { useUnifiedTopology: true },
      collection: "apiLogs",
      tryReconnect: true,
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    }),
  ],
});

module.exports = logger;
