const express = require('express');
const router = express.Router();

// Get beneficiaries by user_id: GET /api/beneficiaries/:userId
router.get('/:userId', async (req, res) => {
  console.log('Beneficiaries GET for user:', req.params.userId);
  try {
    const result = await req.pool.query(
      'SELECT * FROM beneficiaries WHERE user_id = $1 ORDER BY beneficiary_name',
      [req.params.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Beneficiaries GET error:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

// Add beneficiary: POST /api/beneficiaries
router.post('/', async (req, res) => {
  console.log('Beneficiaries POST:', req.body);
  try {
    const { user_id, beneficiary_name, beneficiary_account_number, bank_name, ifsc_code } = req.body;
    
    // Validate required fields
    if (!user_id || !beneficiary_name || !beneficiary_account_number || !bank_name || !ifsc_code) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if beneficiary already exists for this user
    const existingResult = await req.pool.query(
      'SELECT * FROM beneficiaries WHERE user_id = $1 AND beneficiary_account_number = $2',
      [user_id, beneficiary_account_number]
    );

    if (existingResult.rows.length > 0) {
      return res.status(400).json({ error: 'Beneficiary with this account number already exists' });
    }

    const result = await req.pool.query(
      'INSERT INTO beneficiaries (user_id, beneficiary_name, beneficiary_account_number, bank_name, ifsc_code) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, beneficiary_name, beneficiary_account_number, bank_name, ifsc_code]
    );
    
    res.json({
      message: 'Beneficiary added successfully',
      beneficiary: result.rows[0]
    });
  } catch (err) {
    console.error('Beneficiaries POST error:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

// Update beneficiary: PUT /api/beneficiaries/:id
router.put('/:id', async (req, res) => {
  console.log('Beneficiaries PUT:', req.params.id, req.body);
  try {
    const { beneficiary_name, beneficiary_account_number, bank_name, ifsc_code } = req.body;
    const beneficiaryId = req.params.id;

    const result = await req.pool.query(
      'UPDATE beneficiaries SET beneficiary_name = $1, beneficiary_account_number = $2, bank_name = $3, ifsc_code = $4, updated_at = CURRENT_TIMESTAMP WHERE beneficiary_id = $5 RETURNING *',
      [beneficiary_name, beneficiary_account_number, bank_name, ifsc_code, beneficiaryId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Beneficiary not found' });
    }

    res.json({
      message: 'Beneficiary updated successfully',
      beneficiary: result.rows[0]
    });
  } catch (err) {
    console.error('Beneficiaries PUT error:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

// Delete beneficiary: DELETE /api/beneficiaries/:id
router.delete('/:id', async (req, res) => {
  console.log('Beneficiaries DELETE:', req.params.id);
  try {
    const result = await req.pool.query(
      'DELETE FROM beneficiaries WHERE beneficiary_id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Beneficiary not found' });
    }

    res.json({
      message: 'Beneficiary deleted successfully',
      beneficiary: result.rows[0]
    });
  } catch (err) {
    console.error('Beneficiaries DELETE error:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;