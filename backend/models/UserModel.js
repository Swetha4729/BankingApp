// backend/models/userModel.js
import { pool } from "../db.js";

// Create table if it doesn’t exist (run once)
export const createUserTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      firebase_uid VARCHAR(100) UNIQUE NOT NULL,
      name VARCHAR(100),
      phone VARCHAR(20),
      email VARCHAR(100)
    )
  `);
};

// Find or create user
export const findOrCreateUser = async (firebaseUid, phone, name = null, email = null) => {
  const existingUser = await pool.query("SELECT * FROM users WHERE firebase_uid = $1", [firebaseUid]);
  if (existingUser.rows.length > 0) return existingUser.rows[0];

  const newUser = await pool.query(
    "INSERT INTO users (firebase_uid, name, phone, email) VALUES ($1, $2, $3, $4) RETURNING *",
    [firebaseUid, name, phone, email]
  );
  return newUser.rows[0];
};
