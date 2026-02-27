const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

// Login route
router.post('/', async (req, res) => {
  try {
    const { email, password, ip_address } = req.body;
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    let success = false;
    let user = null;

    if (userResult.rows.length > 0) {
      user = userResult.rows[0];
      const match = await bcrypt.compare(password, user.password_hash);
      if (match) success = true;
    }

    // Record login history
    await pool.query(
      'INSERT INTO login_history (user_id, status, ip_address) VALUES ($1,$2,$3)',
      [user ? user.user_id : null, success ? 'Success' : 'Failed', ip_address || 'Unknown']
    );

    res.json({ success, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Login failed");
  }
});

module.exports = router;
