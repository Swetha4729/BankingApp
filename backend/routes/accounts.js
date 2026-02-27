const express = require('express');
const router = express.Router();

router.get('/:userId', async (req, res) => {
  console.log('Accounts request for user:', req.params.userId);
  try {
    const result = await req.pool.query('SELECT * FROM accounts WHERE user_id = $1', [req.params.userId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Accounts error:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;