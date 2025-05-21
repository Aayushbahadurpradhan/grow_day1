const AuthService = require('../services/authService');
const DeviceService = require('../services/deviceService');
const SessionService = require('../services/sessionService');
const LogService = require('../services/logService');
exports.register = async (req, res) => {
  const result = await AuthService.registerUser(req.body);
  if (result.error) return res.status(400).json({ error: result.error });

await LogService.saveLog({
  type: 'REGISTER',
  message: `User registered: ${result.username}`,
  userId: result.id,
});
  res.status(201).json({ message: 'Registered successfully', user: result });
};
exports.login = async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  if (result.error) return res.status(401).json({ error: result.error });
  const ip = req.ip;
  const agent = req.get('User-Agent');
  await DeviceService.addDevice(result.id, agent, ip);
  await SessionService.saveSession(result.id, agent, ip);

await LogService.saveLog({
  type: 'LOGIN',
  message: `User logged in: ${result.username}`,
  userId: result.id,
});
  res.status(200).json({ message: 'Login successful', user: result });
};
