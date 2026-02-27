// backend/routes/protected.js
import express from "express";
import { verifyFirebaseToken } from "./auth.js";
import { pool } from "../db.js";
import { findOrCreateUser } from "../models/userModel.js";

const router = express.Router();

// 🔹 Get user profile
router.get("/user-profile", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid, phone_number, name } = req.user;
    const user = await findOrCreateUser(uid, phone_number, name);
    res.json({ user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Perform a banking transaction (example)
router.post("/transaction", verifyFirebaseToken, async (req, res) => {
  try {
    const { amount, to_account } = req.body;
    const { uid } = req.user;

    await pool.query(
      "INSERT INTO transactions (firebase_uid, amount, to_account, created_at) VALUES ($1, $2, $3, NOW())",
      [uid, amount, to_account]
    );

    res.json({ message: "Transaction successful", uid, amount, to_account });
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({ error: "Transaction failed" });
  }
});

export default router;
