const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');
const { runDailySummary, getLastCronStatus } = require('../cron/dailySummary');

const getLogPath = (filename) => path.join(__dirname, '../logs', filename);

router.get('/status', (req, res) => {
  const status = getLastCronStatus();
  res.json({
    success: true,
    status,
    message: 'Last CRON job status fetched successfully'
  });
});

router.post('/run', async (req, res) => {
  try {
    await runDailySummary();
    res.json({
      success: true,
      message: 'Manual CRON run completed successfully',
      status: getLastCronStatus()
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Manual CRON run failed',
      error: err.message
    });
  }
});

router.get('/logs/:filename', async (req, res) => {
  const { filename } = req.params;
  const allowedFiles = ['daily_summary.json', 'stale_employees.log', 'cron_errors.log'];

  if (!allowedFiles.includes(filename)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid log file requested'
    });
  }

  try {
    const logPath = getLogPath(filename);
    const exists = await fs.pathExists(logPath);

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: 'Log file not found'
      });
    }

    const data = await fs.readFile(logPath, 'utf-8');
    if (filename.endsWith('.json')) {
      return res.json({
        success: true,
        data: JSON.parse(data),
        message: `${filename} loaded successfully`
      });
    }
    res.type('text/plain').send(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to load log file',
      error: err.message
    });
  }
});

module.exports = router;
