const fs = require("fs");
const path = require("path");
const accessLogPath = path.join(__dirname, "..", "logs", "access.log");
const errorLogPath = path.join(__dirname, "..", "logs", "error.log");

const logAccess = (message) => {
  fs.appendFile(accessLogPath, message + "\n", (err) => {
    if (err) console.error("Failed to write to access log:", err);
  });
};
const logError = (message) => {
  fs.appendFile(errorLogPath, message + "\n", (err) => {
    if (err) console.error("Failed to write to error log:", err);
  });
};
module.exports = {
  logAccess,
  logError,
  accessLogPath,
  errorLogPath,
};
