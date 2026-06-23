import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import pool from "./config/db.js";
import { runMigrations } from "./database/migrate.js";
import { sanitizeObject } from "./utils/sanitize.js";
import { verifyRecaptcha } from "./utils/recaptcha.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "new_l_jwt_secret_key_123!";

// 1. Initialize Tables
runMigrations()
  .then(() => console.log("Migrations check completed on startup."))
  .catch((err) => console.error("Migrations failed on startup:", err));

// 2. Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Sanitization Middleware
app.use((req, res, next) => {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  next();
});

// Nodemailer SMTP Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: parseInt(process.env.SMTP_PORT || "2525", 10),
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

// Validate SMTP on startup
transporter.verify((err, success) => {
  if (err) {
    console.warn("Nodemailer SMTP Transporter not fully configured (local/dev mode). Email sending may be simulated.");
  } else {
    console.log("Nodemailer SMTP ready to send emails.");
  }
});

// 3. Rate Limiters
// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5,
//   message: { error: "Too many login attempts. Please try again after 15 minutes." },
//   standardHeaders: true,
//   legacyHeaders: false,
// });

const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 15,
  message: { error: "Too many form submissions from this IP. Please try again in an hour." },
  standardHeaders: true,
  legacyHeaders: false,
});

// 4. Authentication Middleware
function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. Unauthorized." });
  }
  
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired session token." });
  }
}

// 5. Audit Logging Helper
async function logSecurityEvent(type, ip, details) {
  try {
    await pool.query(
      "INSERT INTO audit_logs (activity_type, ip_address, details) VALUES (?, ?, ?)",
      [type, ip || "0.0.0.0", typeof details === "string" ? details : JSON.stringify(details)]
    );
  } catch (err) {
    console.error("Audit log insertion failed:", err);
  }
}

// 6. Validation Helpers
const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  if (email.includes(" ")) return false;

  return emailRegex.test(email);
}

// ================= PUBLIC ENDPOINTS =================

// Contact Form submission
app.post("/api/contact", formLimiter, async (req, res) => {
  const { salutation, firstName, lastName, email, phone, reason, message, captchaToken } = req.body;
  const clientIp = req.ip || req.headers["x-forwarded-for"] || "0.0.0.0";

  // Validate reCAPTCHA
  const isCaptchaValid = await verifyRecaptcha(captchaToken, clientIp);
  if (!isCaptchaValid) {
    await logSecurityEvent("suspicious_activity", clientIp, "Failed reCAPTCHA challenge");
    return res.status(400).json({ error: "reCAPTCHA verification failed. Please try again." });
  }

  // Server-side validations
  if (!firstName || !lastName || !email || !reason || !message) {
    return res.status(400).json({ error: "First Name, Last Name, Email, Reason, and Message are required." });
  }

  if (hasNumbers(firstName) || hasNumbers(lastName)) {
    await logSecurityEvent("validation_failure", clientIp, "Contact submission rejected: numbers in names");
    return res.status(400).json({ error: "Names cannot contain numbers." });
  }

  if (!isValidEmail(email)) {
    await logSecurityEvent("validation_failure", clientIp, `Contact submission rejected: invalid email ${email}`);
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  if (message.length < 20 || message.length > 1200) {
    return res.status(400).json({ error: "Message must be between 20 and 1200 characters." });
  }

  function hasNumbers(str) {
    return /\d/.test(str);
  }

  try {
    // Save to Database
    const [result] = await pool.query(
      "INSERT INTO contact_messages (salutation, first_name, last_name, email, phone, reason, message) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [salutation || null, firstName, lastName, email, phone || null, reason, message]
    );

    const messageId = result.insertId;

    // Send Alert to Admin via Nodemailer
    const adminEmail = process.env.ORG_EMAIL || "admin@likrolihtov.com";
    const mailOptions = {
      from: '"NGO Contact System" <contact@likrolihtov.com>',
      to: adminEmail,
      subject: `New Contact Submission from ${firstName} ${lastName}`,
      html: `
        <h3>New Contact Message Received</h3>
        <table border="1" cellpadding="6" style="border-collapse: collapse; width: 100%;">
          <tr><th>ID</th><td>${messageId}</td></tr>
          <tr><th>Salutation</th><td>${salutation || "None"}</td></tr>
          <tr><th>Name</th><td>${firstName} ${lastName}</td></tr>
          <tr><th>Email</th><td>${email}</td></tr>
          <tr><th>Phone</th><td>${phone || "None"}</td></tr>
          <tr><th>Reason</th><td>${reason}</td></tr>
          <tr><th>Message</th><td>${message}</td></tr>
        </table>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error("Email notification failed:", err.message);
      else console.log("Admin notification email sent successfully.");
    });

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully. We will get back to you soon.",
    });

  } catch (error) {
    console.error("Database save failed:", error);
    return res.status(500).json({ error: "Internal server error. Failed to save message." });
  }
});

// Newsletter Subscription
app.post("/api/subscribe", formLimiter, async (req, res) => {
  const { fullName, email } = req.body;
  const clientIp = req.ip || "0.0.0.0";

  if (!fullName || !email) {
    return res.status(400).json({ error: "Full Name and Email are required." });
  }

  // ✅ FIX: ensure nameRegex exists in file (NOT here, just used correctly)
  if (
    fullName.length < 2 ||
    fullName.length > 50 ||
    !nameRegex.test(fullName)
  ) {
    return res.status(400).json({
      error:
        "Please enter a valid name. Numbers and special characters are not allowed.",
    });
  }

  // ✅ FIX: email validation stays clean (no restriction)
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  try {
    // Check duplicate subscription
    const [existing] = await pool.query(
      "SELECT id, status FROM newsletter_subscribers WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      if (existing[0].status === "Blocked") {
        return res.status(400).json({ error: "This email subscription is blocked." });
      }

      return res.status(400).json({ error: "Email is already subscribed to updates." });
    }

    // Save subscriber
    await pool.query(
      "INSERT INTO newsletter_subscribers (full_name, email, status) VALUES (?, ?, 'Active')",
      [fullName, email]
    );

    return res.status(200).json({
      success: true,
      message: "Thank you for subscribing to our community updates.",
    });

  } catch (error) {
    console.error("Newsletter subscription database error:", error);
    return res.status(500).json({ error: "Internal server error. Subscription failed." });
  }
});
// ================= ADMIN ENDPOINTS =================

// Admin Login
app.post("/api/admin/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  const clientIp = req.ip || "0.0.0.0";

  if (!username || !password) {
    return res.status(400).json({ error: "Username and Password are required." });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM admin_users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      await logSecurityEvent("failed_login", clientIp, `Failed login attempt for username: ${username}`);
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      await logSecurityEvent("failed_login", clientIp, `Failed login attempt for username: ${username}`);
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role, permissions: JSON.parse(admin.permissions) },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    await logSecurityEvent("successful_login", clientIp, `Admin ${username} logged in`);

    return res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
        permissions: JSON.parse(admin.permissions),
      },
    });

  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ error: "Internal server error during login." });
  }
});
// ✅ ONLY ONCE HERE (BOTTOM OF FILE)
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Admin Logout
app.post("/api/admin/logout", (req, res) => {
  // Since JWT is stateless, logout is handled on client-side by purging token.
  // We return a simple success acknowledgement.
  return res.status(200).json({ success: true, message: "Logged out successfully." });
});

// Admin Dashboard stats
app.get("/api/admin/dashboard", authenticateAdmin, async (req, res) => {
  try {
    const [totalMsgRows] = await pool.query("SELECT COUNT(*) as count FROM contact_messages");
    const [unreadMsgRows] = await pool.query("SELECT COUNT(*) as count FROM contact_messages WHERE status = 'Unread'");
    const [repliedMsgRows] = await pool.query("SELECT COUNT(*) as count FROM contact_messages WHERE status = 'Replied'");
    const [subscribersRows] = await pool.query("SELECT COUNT(*) as count FROM newsletter_subscribers WHERE status = 'Active'");

    // Simple Monthly Growth (Grouped by Year-Month of subscription)
    const [growthRows] = await pool.query(`
      SELECT DATE_FORMAT(subscribed_at, '%Y-%m') as month, COUNT(*) as count 
      FROM newsletter_subscribers 
      GROUP BY month 
      ORDER BY month DESC 
      LIMIT 6
    `);

    return res.status(200).json({
      success: true,
      stats: {
        totalMessages: totalMsgRows[0].count,
        unreadMessages: unreadMsgRows[0].count,
        repliedMessages: repliedMsgRows[0].count,
        totalSubscribers: subscribersRows[0].count,
        monthlyGrowth: growthRows,
      },
    });
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return res.status(500).json({ error: "Failed to fetch dashboard stats." });
  }
});

// Fetch Contact Messages
app.get("/api/admin/messages", authenticateAdmin, async (req, res) => {
  const { search, status } = req.query;
  let sql = "SELECT * FROM contact_messages WHERE 1=1";
  const params = [];

  if (status) {
    sql += " AND status = ?";
    params.push(status);
  }

  if (search) {
    sql += " AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR message LIKE ?)";
    const wildcard = `%${search}%`;
    params.push(wildcard, wildcard, wildcard, wildcard);
  }

  sql += " ORDER BY created_at DESC";

  try {
    const [messages] = await pool.query(sql, params);
    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return res.status(500).json({ error: "Failed to fetch messages." });
  }
});

// Update Contact Message status
app.patch("/api/admin/messages/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'Unread', 'Read', 'Replied', 'Archived'

  if (!["Unread", "Read", "Replied", "Archived"].includes(status)) {
    return res.status(400).json({ error: "Invalid message status." });
  }

  try {
    const [result] = await pool.query(
      "UPDATE contact_messages SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Message not found." });
    }

    return res.status(200).json({ success: true, message: "Message status updated." });
  } catch (error) {
    console.error("Failed to update message status:", error);
    return res.status(500).json({ error: "Failed to update message." });
  }
});

// Delete Contact Message
app.delete("/api/admin/messages/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM contact_messages WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Message not found." });
    }
    return res.status(200).json({ success: true, message: "Message deleted successfully." });
  } catch (error) {
    console.error("Failed to delete message:", error);
    return res.status(500).json({ error: "Failed to delete message." });
  }
});

// Reply to contact message
app.post("/api/admin/messages/:id/reply", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { replyText } = req.body;

  if (!replyText || !replyText.trim()) {
    return res.status(400).json({ error: "Reply text is required." });
  }

  try {
    // Get original message email
    const [rows] = await pool.query("SELECT email, first_name, last_name, message FROM contact_messages WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Message not found." });
    }

    const originalMsg = rows[0];

    // Send email using Nodemailer
    const mailOptions = {
      from: '"Likro & Lihtov Organization" <support@likrolihtov.com>',
      to: originalMsg.email,
      subject: `Reply to your message: ${originalMsg.first_name} ${originalMsg.last_name}`,
      html: `
        <p>Dear ${originalMsg.first_name},</p>
        <p>Thank you for contacting Likro & Lihtov. Below is our response to your message:</p>
        <blockquote style="border-left: 3px solid #ccc; padding-left: 10px; color: #555;">
          ${replyText}
        </blockquote>
        <br />
        <hr />
        <p style="font-size: 11px; color: #999;">Original Message:<br />"${originalMsg.message}"</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Update status to 'Replied'
    await pool.query("UPDATE contact_messages SET status = 'Replied' WHERE id = ?", [id]);

    return res.status(200).json({ success: true, message: "Reply sent successfully." });
  } catch (error) {
    console.error("Failed to send reply:", error);
    return res.status(500).json({ error: "Failed to send reply. Please try again." });
  }
});

// Fetch Newsletter Subscribers
app.get("/api/admin/subscribers", authenticateAdmin, async (req, res) => {
  const { search, status } = req.query;
  let sql = "SELECT * FROM newsletter_subscribers WHERE 1=1";
  const params = [];

  if (status) {
    sql += " AND status = ?";
    params.push(status);
  }

  if (search) {
    sql += " AND (full_name LIKE ? OR email LIKE ?)";
    const wildcard = `%${search}%`;
    params.push(wildcard, wildcard);
  }

  sql += " ORDER BY subscribed_at DESC";

  try {
    const [subscribers] = await pool.query(sql, params);
    return res.status(200).json({ success: true, subscribers });
  } catch (error) {
    console.error("Failed to fetch subscribers:", error);
    return res.status(500).json({ error: "Failed to fetch subscribers." });
  }
});

// Export Subscribers to CSV
app.get("/api/admin/subscribers/export", authenticateAdmin, async (req, res) => {
  try {
    const [subscribers] = await pool.query(
      "SELECT id, full_name, email, status, subscribed_at FROM newsletter_subscribers ORDER BY subscribed_at DESC"
    );

    // Build CSV payload
    let csv = "ID,Full Name,Email,Status,Subscribed At\n";
    for (const sub of subscribers) {
      csv += `${sub.id},"${sub.full_name.replace(/"/g, '""')}",${sub.email},${sub.status},${sub.subscribed_at.toISOString()}\n`;
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=subscribers.csv");
    return res.status(200).send(csv);

  } catch (error) {
    console.error("Failed to export subscribers:", error);
    return res.status(500).json({ error: "Export failed." });
  }
});

// Update Subscriber Status
app.patch("/api/admin/subscribers/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'Active', 'Unsubscribed', 'Blocked'

  if (!["Active", "Unsubscribed", "Blocked"].includes(status)) {
    return res.status(400).json({ error: "Invalid status." });
  }

  try {
    const [result] = await pool.query(
      "UPDATE newsletter_subscribers SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Subscriber not found." });
    }

    return res.status(200).json({ success: true, message: "Subscriber status updated." });
  } catch (error) {
    console.error("Failed to update subscriber:", error);
    return res.status(500).json({ error: "Failed to update subscriber." });
  }
});

// Delete Subscriber
app.delete("/api/admin/subscribers/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM newsletter_subscribers WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Subscriber not found." });
    }
    return res.status(200).json({ success: true, message: "Subscriber deleted successfully." });
  } catch (error) {
    console.error("Failed to delete subscriber:", error);
    return res.status(500).json({ error: "Failed to delete subscriber." });
  }
});

// Add New Admin Account
app.post("/api/admin/users", authenticateAdmin, async (req, res) => {
  const { username, password, email, role, permissions } = req.body;

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden. Only admins can create admin users." });
  }

  if (!username || !password || !email) {
    return res.status(400).json({ error: "Username, Password, and Email are required." });
  }

  try {
    const hashedPass = await bcrypt.hash(password, 12);
    const perms = Array.isArray(permissions) ? permissions : ["read:messages"];

    await pool.query(
      "INSERT INTO admin_users (username, password_hash, email, role, permissions) VALUES (?, ?, ?, ?, ?)",
      [username, hashedPass, email, role || "editor", JSON.stringify(perms)]
    );

    return res.status(200).json({ success: true, message: "Admin account created successfully." });
  } catch (error) {
    console.error("Failed to create admin:", error);
    return res.status(500).json({ error: "Failed to create admin user. Username or email may already exist." });
  }
});

// Serve static files from React build directory
app.use(express.static(path.join(__dirname, "../dist")));

// Fallback Route to serve index.html for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});