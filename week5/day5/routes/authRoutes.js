const router = require('express').Router();
const { register, login } = require('../controllers/authController');
const validateInput = require('../middlewares/validateInput');
const sanitizeInput = require('../middlewares/inputSanitizer');

router.post('/register', sanitizeInput, validateInput, register);
router.post('/login', sanitizeInput, validateInput, login);

module.exports = router;
