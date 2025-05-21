const express = require('express');
const router = express.Router();
const { getUserDevices, addDevice } = require('../controllers/deviceController');

router.post('/', addDevice); 
router.get('/:userId', getUserDevices);

module.exports = router;
