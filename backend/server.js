// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

// Import routes
const userRoutes = require('./routes/users');
const accountRoutes = require('./routes/accounts');
const beneficiaryRoutes = require('./routes/beneficiaries');
const transactionRoutes = require('./routes/transactions');
const reportRoutes = require('./routes/reports');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------- DATABASE CONNECTION ----------------
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'banking_app',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '',
});

// Test DB connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Database connected successfully');
  release();
});

// ---------------- MIDDLEWARE ----------------
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Attach pool to every request
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// ---------------- ROUTES ----------------
app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/beneficiaries', beneficiaryRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/reports', reportRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Banking backend is running');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});