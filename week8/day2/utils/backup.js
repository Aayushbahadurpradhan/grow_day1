const fs = require('fs');
const path = require('path');
const config = require('config');
const logger = require('./logger');

function backupData(data, name) {
  const filePath = path.join(config.get('backupDir'), `${name}_${Date.now()}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  logger.info(`Backup created: ${filePath}`);
}

module.exports = backupData;
