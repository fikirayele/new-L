import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Parse JSON payloads
app.use(express.json());

// Load SMTP configurations from environment
const smtpHost = process.env.SMTP_HOST || 'smtp.mailtrap.io';
const smtpPort = parseInt(process.env.SMTP_PORT || '2525', 10);
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';
const orgEmail = process.env.ORG_EMAIL || 'contact@organization.com';

// Create Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465, // true for port 465, false for other ports
  auth: smtpUser && smtpPass ? {
    user: smtpUser,
    pass: smtpPass
  } : undefined
});

// Verify SMTP connection on startup
transporter.verify((error) => {
  if (error) {
    console.error('SMTP Connection Warning (Normal if credentials are not configured yet):', error.message);
  } else {
    console.log('SMTP Server is ready to deliver messages.');
  }
});

// POST /send-message route
app.post('/send-message', async (req, res) => {
  const { name, email, phone, message, language } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Format email body
  const emailContent = `
New Contact Message:
---------------------------------------------
Name: ${name}
Email: ${email}
Phone number: ${phone || 'Not provided'}
Language: ${language}

Message Content:
${message}
---------------------------------------------
  `;

  const mailOptions = {
    from: smtpUser || email, // Fallback to user email if no auth configured
    to: orgEmail,
    subject: 'New Contact Message',
    text: emailContent,
    replyTo: email
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Email Delivery Error:', error);
    return res.status(500).json({ error: 'Failed to send message. SMTP delivery issue.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
