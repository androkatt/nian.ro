require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();

// Hide X-Powered-By
app.disable('x-powered-by');

// Security Headers Middleware
app.use((req, res, next) => {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://*.google.com https://*.googlesyndication.com https://*.doubleclick.net https://googleads.g.doubleclick.net; " +
        "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; " +
        "font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com data:; " +
        "img-src 'self' data: blob: https:; " +
        "connect-src 'self' https:; " +
        "frame-src 'self' https://www.googletagmanager.com https://*.google.com https://*.googlesyndication.com https://*.doubleclick.net; " +
        "frame-ancestors 'self';"
    );
    next();
});

// Port setup
const port = process.env.PORT || 3000;

// Middleware to parse JSON and Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- MODIFICAREA ESTE AICI (1) ---
// Pe server, React-ul va fi copiat în folderul 'public' de lângă app.js
app.use(express.static(path.join(__dirname, 'public')));

// --- EMAIL CONFIGURATION (Rămâne neschimbat) ---
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,          // Use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false 
    }
});

// --- ROUTES ---

// Serve ads.txt explicitly
app.get('/ads.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ads.txt'));
});

// Serve robots.txt explicitly
app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

// app.post('/api/send-email'...) -> RĂMÂNE LA FEL (Nu îl mai copiez ca să nu ocup spațiu, e perfect)
app.post('/api/send-email', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    // ... restul codului tău de email ...
    const mailOptions = {
        from: `"Website Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
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

// --- MODIFICAREA ESTE AICI (2) ---
// Block sensitive files and scans from reaching SPA catch-all
app.use((req, res, next) => {
    const sensitivePattern = /^\/(\.env|\.git|\.ht|.*\.sql(\.gz)?$|.*\.bak$|.*\.backup$|.*\.log$|.*\.ini$)/i;
    if (sensitivePattern.test(req.path)) {
        return res.status(404).send('Not Found');
    }
    next();
});

// SPA Catch-all Route
app.get('*', (req, res) => {
    // Căutăm index.html tot în 'public', nu în '../client/dist'
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});