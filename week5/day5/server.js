const express = require('express');
const app = express();
const rateLimiter = require('./middlewares/rateLimiter');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const dataFiles = ['users.json', 'clients.json', 'logs.json', 'devices.json', 'sessions.json'];
dataFiles.forEach(file => {
  const fullPath = path.join(__dirname, 'data', file);
  if (!fs.existsSync(fullPath)) fs.writeJsonSync(fullPath, []);
});

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/devices', require('./routes/deviceRoutes'));
app.use('/api/sessions', require('./routes/sessionRoutes'));
app.use('/api/logs', require('./routes/logRoutes'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
