const express = require('express');
const router = express.Router();
const { getUserSessions } = require('../controllers/sessionController');

router.get('/:userId', getUserSessions); 

module.exports = router;
