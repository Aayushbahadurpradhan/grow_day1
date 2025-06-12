const express = require('express');
const path = require('path');
require('dotenv').config();
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
    <ul>
      <li><a href="/login-success">Login Success Page</a></li>
      <li><a href="/password-confirm">Password Confirmation Page</a></li>
      <li><a href="/preview-email/reset">Preview: Reset Email</a></li>
      <li><a href="/preview-email/alert">Preview: Device Alert Email</a></li>
    </ul>
  `);
});

app.get('/login-success', (req, res) => {
    const user = {
        name: 'Jane shres',
        email: 'jane@example.com',
        lastLogin: new Date().toLocaleString(),
        ip: '0.0.0.0'
    };
    res.render('pages/login-success', {
        title: 'Login Success',
        user
    });
});

app.get('/password-confirm', (req, res) => {
    res.render('pages/password-confirm', {
        title: 'Password Reset Confirmed',
        message: 'Your password has been successfully reset!'
    });
});

app.get('/preview-email/:type', (req, res) => {
    const { type } = req.params;
    // console.log(type)

    const user = {
        name: 'Jane shyam',
        email: 'jane@example.com',
        ip: '192.168.1.22',
        resetLink: 'https://example.com/reset?token=abcd1234'
    };

    let contentPath;
    // console.log(type === 'reset')

    if (type === 'reset') {
        // console.log('here')
        contentPath = '../emails/resetpassword';
    } else if (type === 'alert') {
        contentPath = '../emails/devicealert';
    } else {
        return res.status(404).send('Email preview type not found');
    }

    res.render('pages/preview', {
        title: `Preview: ${type === 'reset' ? 'Reset Password Email' : 'Device Login Alert'}`,
        content: contentPath,
        user
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
