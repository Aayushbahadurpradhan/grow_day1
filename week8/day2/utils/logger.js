const { createLogger, format, transports } = require('winston');
const path = require('path');
const logger = createLogger({
    transports: [
        new transports.File({ filename: 'logs/app.log' }),
        new transports.Console()
    ]
});
const commonOptions = {
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [new transports.File({ filename: 'logs/audit.log' })]
};
const auditLogger = createLogger({ ...commonOptions });
const loginLogger = createLogger({
    ...commonOptions,
    transports: [new transports.File({ filename: 'logs/login.log' })]
});
const reportLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: path.join('logs', 'reports.log') })
  ]
});

module.exports = { auditLogger, loginLogger, logger,reportLogger };
