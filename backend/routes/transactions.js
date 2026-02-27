const express = require('express');
const router = express.Router();

// Transfer: POST /api/transactions
router.post('/', async (req, res) => {
  console.log('Transaction request:', req.body);
  
  try {
    const { from_account, to_account, amount, transaction_type, remarks, user_id } = req.body;
    
    // Validate required fields
    if (!from_account || !to_account || !amount || !user_id) {
      return res.status(400).json({ 
        error: 'Missing required fields: from_account, to_account, amount, user_id' 
      });
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Start transaction
    const client = await req.pool.connect();
    
    try {
      await client.query('BEGIN');

      // Check if from_account exists and has sufficient balance
      const fromAccountResult = await client.query(
        'SELECT account_id, balance, account_number FROM accounts WHERE account_number = $1 AND user_id = $2',
        [from_account, user_id]
      );

      if (fromAccountResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: 'Source account not found or does not belong to you' });
      }

      const fromAccountId = fromAccountResult.rows[0].account_id;
      const currentBalance = parseFloat(fromAccountResult.rows[0].balance);
      const fromAccountNumber = fromAccountResult.rows[0].account_number;

      if (currentBalance < amountNum) {
        await client.query('ROLLBACK');
        return res.status(400).json({ 
          error: `Insufficient balance. Available: ₹${currentBalance.toLocaleString()}` 
        });
      }

      // Check if transferring to same account
      if (from_account === to_account) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: 'Cannot transfer to the same account' });
      }

      // Check if to_account exists in our system (optional)
      const toAccountResult = await client.query(
        'SELECT account_id, user_id, account_number FROM accounts WHERE account_number = $1',
        [to_account]
      );

      let toAccountExists = toAccountResult.rows.length > 0;
      let beneficiaryName = 'External Account';

      if (toAccountExists) {
        // Get beneficiary name from beneficiaries table if exists
        const beneficiaryResult = await client.query(
          'SELECT beneficiary_name FROM beneficiaries WHERE beneficiary_account_number = $1 AND user_id = $2',
          [to_account, user_id]
        );
        
        if (beneficiaryResult.rows.length > 0) {
          beneficiaryName = beneficiaryResult.rows[0].beneficiary_name;
        } else {
          beneficiaryName = 'Registered User';
        }
      }

      // Deduct from sender
      await client.query(
        'UPDATE accounts SET balance = balance - $1 WHERE account_id = $2',
        [amountNum, fromAccountId]
      );

      // Add to receiver if account exists in our system
      if (toAccountExists) {
        const toAccountId = toAccountResult.rows[0].account_id;
        await client.query(
          'UPDATE accounts SET balance = balance + $1 WHERE account_id = $2',
          [amountNum, toAccountId]
        );
      }

      // Insert transaction record - MATCHING YOUR ACTUAL TABLE STRUCTURE
      const transactionResult = await client.query(
        `INSERT INTO transactions 
         (from_account_id, to_account_id, amount, status) 
         VALUES ($1, $2, $3, $4) 
         RETURNING transaction_id, created_at`,
        [fromAccountId, to_account, amountNum, 'success']
      );

      await client.query('COMMIT');

      // Get updated balance
      const updatedBalanceResult = await client.query(
        'SELECT balance FROM accounts WHERE account_id = $1',
        [fromAccountId]
      );

      const newBalance = parseFloat(updatedBalanceResult.rows[0].balance);

      res.json({
        message: 'Transfer successful',
        transaction_id: transactionResult.rows[0].transaction_id,
        timestamp: transactionResult.rows[0].created_at,
        new_balance: newBalance,
        beneficiary_name: beneficiaryName,
        from_account: fromAccountNumber,
        to_account: to_account
      });

    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Transaction processing error:', error);
      throw error;
    } finally {
      client.release();
    }

  } catch (err) {
    console.error('Transaction error:', err.stack);
    res.status(500).json({ 
      error: 'Internal server error during transaction processing',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Get transaction history for a user
router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    
    const result = await req.pool.query(
      `SELECT 
         t.transaction_id,
         t.amount,
         t.status,
         t.created_at,
         t.to_account_id as to_account,
         from_acc.account_number as from_account,
         ben.beneficiary_name
       FROM transactions t
       JOIN accounts from_acc ON t.from_account_id = from_acc.account_id
       LEFT JOIN beneficiaries ben ON t.to_account_id = ben.beneficiary_account_number AND ben.user_id = $1
       WHERE from_acc.user_id = $1
       ORDER BY t.created_at DESC 
       LIMIT 50`,
      [user_id]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Get transaction history for a specific account
router.get('/account/:account_number', async (req, res) => {
  try {
    const { account_number } = req.params;
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const result = await req.pool.query(
      `SELECT 
         t.transaction_id,
         t.amount,
         t.status,
         t.created_at,
         t.to_account_id as to_account,
         from_acc.account_number as from_account,
         ben.beneficiary_name,
         CASE 
           WHEN from_acc.account_number = $1 THEN 'Debit'
           ELSE 'Credit'
         END as transaction_type
       FROM transactions t
       JOIN accounts from_acc ON t.from_account_id = from_acc.account_id
       LEFT JOIN beneficiaries ben ON t.to_account_id = ben.beneficiary_account_number AND ben.user_id = $2
       WHERE (from_acc.account_number = $1 OR t.to_account_id = $1)
         AND from_acc.user_id = $2
       ORDER BY t.created_at DESC 
       LIMIT 50`,
      [account_number, user_id]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching account transactions:', err);
    res.status(500).json({ error: 'Failed to fetch account transactions' });
  }
});

module.exports = router;