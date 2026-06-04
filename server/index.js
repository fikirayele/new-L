import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MailtrapClient } from "mailtrap";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Debug check (VERY IMPORTANT)
console.log("MAILTRAP TOKEN:", process.env.MAILTRAP_TOKEN ? "Loaded ✅" : "Missing ❌");
console.log("ORG EMAIL:", process.env.ORG_EMAIL);

// Mailtrap client
const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Contact API
app.post("/send-message", async (req, res) => {
  const { name, email, phone, message, language } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Name, email, and message are required.",
    });
  }

  const sender = {
    email: "hello@demomailtrap.co",
    name: "Contact System",
  };

  // ⚠️ IMPORTANT FIX:
  // If you're using Mailtrap DEMO, you MUST send to your Mailtrap inbox email
  // NOT random Gmail or org email
  const recipients = [
    {
      email: process.env.ORG_EMAIL, // must be allowed in your Mailtrap account
    },
  ];

  const emailContent = `
New Contact Message:
---------------------------------------------
Salutation: ${salutation || 'Not provided'}
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Language: ${language || "Not provided"}

Message:
${message}
---------------------------------
  `;

  try {
    const result = await client.send({
      from: sender,
      to: recipients,
      subject: `New Contact Message from ${name}`,
      text: emailContent,
      category: "Contact Form",
    });

    console.log("Email sent successfully:", result);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Email Error:", error);

    return res.status(500).json({
      error: error?.message || "Failed to send message",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});