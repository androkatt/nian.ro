require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();

// Port setup
const port = process.env.PORT || 3000;

// Middleware to parse JSON and Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files
app.use(express.static(path.join(__dirname, '../client/dist')));

// --- EMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,          // Use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        // This is the Magic Fix: it allows self-signed certificates on shared hosting
        rejectUnauthorized: false 
    }
});

// --- ROUTES ---

// 1. Home Route (Handled by Static & Catch-all)
// app.get('/', ...);

// 2. Email Sending Route (POST)
app.post('/api/send-email', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    // Email Content Structure
    const mailOptions = {
        from: `"Website Contact" <${process.env.EMAIL_USER}>`, // Sender address
        to: process.env.EMAIL_USER, // Receiver address (You)
        replyTo: email, // When you hit reply, it goes to the client
        subject: `New Message: ${subject || 'No Subject'}`,
        html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <br>
            <p><strong>Message:</strong></p>
            <p style="background:#f4f4f4; padding:15px; border-radius:5px;">${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email Error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
});

// 3. SPA Catch-all Route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});