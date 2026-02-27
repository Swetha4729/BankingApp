const express = require('express');
const router = express.Router();

router.get('/:userId', async (req, res) => {
  console.log('Full reports request for user:', req.params.userId);
  try {
    const result = await req.pool.query(
      `SELECT t.*, a.account_number as from_account, b.beneficiary_name as to_beneficiary 
       FROM transactions t 
       LEFT JOIN accounts a ON t.from_account_id = a.account_id 
       LEFT JOIN beneficiaries b ON t.to_account_id = b.beneficiary_account_number 
       WHERE a.user_id = $1 
       ORDER BY t.created_at DESC`,
      [req.params.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Reports error:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;