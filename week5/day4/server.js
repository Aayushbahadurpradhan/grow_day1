const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const clientRoutes = require("./routes/clientRoutes");
const { errorHandler } = require("./middlewares/errorHandler");
const { requestLogger } = require("./middlewares/logger");
const { errorLogPath, logAccess } = require("./services/loggerService");
const app = express();
const PORT = process.env.PORT || 3000;
app.set('trust proxy', true);
app.use(express.json());
app.use(requestLogger);
app.use("/clients", clientRoutes);
app.get("/logs/errors", (req, res, next) => {
  fs.readFile(errorLogPath, "utf8", (err, data) => {
    if (err) {
      return next(err); 
    }
    const lines = data.trim() ? data.trim().split("\n") : [];
    const last20 = lines.slice(-20);
    logAccess(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path} - Accessed error logs`);
    res.status(200).json({ logs: last20 });
  });
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
