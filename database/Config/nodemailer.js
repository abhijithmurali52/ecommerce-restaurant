const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Email, // Your Gmail account
        pass: process.env.EmailPassword, // App-specific password generated for nodemailer
    },
});

module.exports = transporter;
