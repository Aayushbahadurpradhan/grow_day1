const { getLastCronStatus, runDailySummary } = require('../cron/dailySummary');

exports.getStatus = (req, res) => {
  res.json(getLastCronStatus());
};

exports.manualRun = async (req, res) => {
  try {
    await runDailySummary();
    res.json({ message: 'Cron job run manually' });
  } catch (err) {
    res.status(500).json({ message: 'Manual cron failed', error: err.message });
  }
};
