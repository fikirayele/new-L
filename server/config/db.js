import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

const serverEnvPath = fileURLToPath(new URL("../.env", import.meta.url));

dotenv.config();

dotenv.config({ path: serverEnvPath });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // Allow cloud DB connections in local/dev environments when the CA chain is not fully trusted.
  ssl:
    process.env.DB_SSL === "false"
      ? false
      : {
          rejectUnauthorized: false,
        },

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;