import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

const serverEnvPath = fileURLToPath(new URL("../.env", import.meta.url));

dotenv.config();

dotenv.config({ path: serverEnvPath });

/**
 * =========================
 * DATABASE SCHEMA
 * =========================
 */
const schemaSql = `
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL DEFAULT 'editor',
  permissions TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  salutation VARCHAR(10) DEFAULT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(30) DEFAULT NULL,
  reason VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Unread',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS audit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  activity_type VARCHAR(50) NOT NULL,
  ip_address VARCHAR(45) NOT NULL,
  details TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_activity_type (activity_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

/**
 * =========================
 * MIGRATION FUNCTION
 * =========================
 */
export async function runMigrations() {
  console.log("🚀 Running database migrations...");

  try {
    /**
     * IMPORTANT:
     * - Aiven already provides DB (defaultdb)
     * - DO NOT try CREATE DATABASE
     * - DO NOT use localhost
     */

    const queries = schemaSql
      .split(";")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    for (const query of queries) {
      await pool.query(query);
    }

    console.log("✅ Tables created/verified successfully.");

    /**
     * =========================
     * SEED DEFAULT ADMIN
     * =========================
     */
    const [admins] = await pool.query(
      "SELECT COUNT(*) as count FROM admin_users"
    );

    if (admins[0].count === 0) {
      const defaultUser = process.env.ADMIN_USER || "admin";
      const defaultPass = process.env.ADMIN_PASS || "AdminSecret123!";
      const defaultEmail =
        process.env.ADMIN_EMAIL || "admin@likrolihtov.com";

      const hashedPass = await bcrypt.hash(defaultPass, 12);

      const permissions = JSON.stringify([
        "read:messages",
        "write:messages",
        "manage:subscribers",
        "manage:admins",
        "edit:settings",
      ]);

      await pool.query(
        `INSERT INTO admin_users 
        (username, password_hash, email, role, permissions)
        VALUES (?, ?, ?, ?, ?)`,
        [defaultUser, hashedPass, defaultEmail, "admin", permissions]
      );

      console.log("👤 Default admin created successfully.");
    } else {
      console.log("👤 Admin already exists. Skipping seed.");
      const defaultUser = process.env.ADMIN_USER || "admin";
      const defaultPass = process.env.ADMIN_PASS || "AdminSecret123!";
      const hashedPass = await bcrypt.hash(defaultPass, 12);
      await pool.query(
        "UPDATE admin_users SET password_hash = ? WHERE username = ?",
        [hashedPass, defaultUser]
      );
      console.log("👤 Default admin password verified/updated.");
    }
  } catch (error) {
    console.error("❌ Migration error:", error.message);
    throw error;
  }
}

/**
 * =========================
 * CLI SUPPORT
 * =========================
 */
if (process.argv[1]?.includes("migrate.js")) {
  runMigrations()
    .then(() => {
      console.log("🎉 Migrations complete.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("❌ Migrations failed:", err);
      process.exit(1);
    });
}