const { readJsonFile, writeJsonFile } = require('../utils/fileHandler');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const logFile = path.join(__dirname, '../data/logs.json');

exports.saveLog = async ({ type, message, userId }) => {
  const logs = await readJsonFile(logFile);
  const newLog = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    type,
    message,
    userId,
  };
  logs.push(newLog);
  await writeJsonFile(logFile, logs);
  return newLog;
};
