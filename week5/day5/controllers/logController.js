const LogService = require('../services/logService');

exports.logMessage = async (req, res) => {
  const { type, message, userId } = req.body;

  if (!type || !message) {
    return res.status(400).json({ error: 'Type and message are required.' });
  }

  const log = await LogService.saveLog({ type, message, userId });
  res.status(201).json(log);
};
