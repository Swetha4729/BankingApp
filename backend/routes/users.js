const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Signup
router.post('/', async (req, res) => {
  console.log('Signup request received:', req.body.email);
  try {
    const { full_name, email, phone, address, dob, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const result = await req.pool.query(
      'INSERT INTO users (full_name, email, phone, address, dob, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id, full_name, email, phone, address, dob',
      [full_name, email, phone, address, dob, hashed]
    );
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('Signup error:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log('Login request received:', req.body.email);
  try {
    const { email, password } = req.body;
    const result = await req.pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const { password: _, ...safeUser } = user;
    res.json({ user: safeUser });
  } catch (err) {
    console.error('Login error:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;