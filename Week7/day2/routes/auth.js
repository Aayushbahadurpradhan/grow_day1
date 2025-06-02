const express = require('express');
const { register, login, logout } = require('../controllers/authcontroller');
const validateInput = require('../middlewares/validateInput');
const router = express.Router();

router.post('/register', validateInput, register);
router.post('/login', validateInput, login);
router.get('/logout', logout); 

module.exports = router;
