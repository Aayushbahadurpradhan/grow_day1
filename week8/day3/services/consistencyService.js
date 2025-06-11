const Job = require('../models/Job');

const simulateEventualUpdate = async (jobId) => {
  console.log(`[INFO] Starting job processing...`);

  setTimeout(async () => {
    await Job.findByIdAndUpdate(jobId, { status: 'completed' });
    console.log(`[INFO] Job ${jobId} marked as completed (delayed)`);
  }, 5000); 
};

module.exports = { simulateEventualUpdate };
