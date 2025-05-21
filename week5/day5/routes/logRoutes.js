const express = require('express');
const router = express.Router();
const { logMessage } = require('../controllers/logController');

router.post('/', logMessage);

module.exports = router;
