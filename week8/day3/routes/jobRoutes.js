const express = require('express');
const router = express.Router();
const { createJob, getJobs } = require('../controllers/jobController');

router.post('/jobs', createJob);
router.get('/jobs', getJobs);

module.exports = router;
