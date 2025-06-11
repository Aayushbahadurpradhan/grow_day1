const Job = require('../models/Job');
const { simulateEventualUpdate } = require('../services/consistencyService');

const createJob = async (req, res) => {
  const job = new Job({ title: req.body.title });
  await job.save();
  simulateEventualUpdate(job._id);
  res.status(201).send({ job });
};

const getJobs = async (req, res) => {
  const jobs = await Job.find();
  res.send(jobs);
};

module.exports = { createJob, getJobs };
