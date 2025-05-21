const { v4: uuidv4 } = require('uuid');
const { readJsonFile, writeJsonFile } = require('../utils/fileHandler');
const path = require('path');
const file = path.join(__dirname, '../data/sessions.json');

exports.saveSession = async (userId, agent, ip) => {
  const sessions = await readJsonFile(file);
  const newSession = {
    id: uuidv4(),
    userId,
    agent,
    ip,
    timestamp: new Date().toISOString(),
  };
  sessions.push(newSession);
  await writeJsonFile(file, sessions);
  return newSession;
};

exports.getSessionsByUserId = async (userId) => {
  const sessions = await readJsonFile(file);
  return sessions.filter(s => s.userId === userId);
};
