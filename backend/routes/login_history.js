const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get login history
router.get('/', async (req, res) => {
  try {
    const history = await pool.query('SELECT * FROM login_history');
    res.json(history.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add login record
router.post('/', async (req, res) => {
  try {
    const { user_id, login_time } = req.body;
    const record = await pool.query(
      'INSERT INTO login_history (user_id, login_time) VALUES ($1, $2) RETURNING *',
      [user_id, login_time]
    );
    res.json(record.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
