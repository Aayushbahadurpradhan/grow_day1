const authService = require('../services/authService');
const { validateEmail, validateRequiredFields } = require('../utils/validators');

exports.register = (req, res) => {
    const { name, email, password } = req.body;
    if (!validateRequiredFields({ name, email, password })) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }
    try {
        const user = authService.register({ name, email, password });
        res.status(201).json({ message: 'User registered', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!validateRequiredFields({ email, password })) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    try {
        const token = authService.login({ email, password });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};
