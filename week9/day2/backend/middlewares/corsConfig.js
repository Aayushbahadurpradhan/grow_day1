const cors = require('cors');

const whitelist = [process.env.FRONTEND_DEV];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin.includes(whitelist)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

module.exports = cors(corsOptions);
