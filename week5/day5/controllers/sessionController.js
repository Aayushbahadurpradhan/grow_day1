const SessionService = require('../services/sessionService');

exports.getUserSessions = async (req, res) => {
  const userId = req.params.userId;
  const sessions = await SessionService.getSessionsByUserId(userId);
  res.json(sessions);
};
