const fs = require('fs');
const path = require('path');

function logToFile(filePath, message) {
  const fullMessage = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFile(filePath, fullMessage, (err) => {
    if (err) console.error('Failed to write log:', err.message);
  });
}

module.exports = { logToFile };
