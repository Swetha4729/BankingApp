// App.js - UPDATED WITH PROPER ROUTING
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import BillPayment from './components/BillPayment';
import Transfer from './components/Transfer';
import Reports from './components/Reports';
import TradeFinance from './components/TradeFinance';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#f8fafc' }}>

        <Navbar user={user} logout={logout} />

        <Routes>

          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" replace />} />
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" replace />} />

          {/* Dashboard with nested routes */}
          <Route
            path="/dashboard/*"
            element={user ? <Dashboard user={user} logout={logout} /> : <Navigate to="/login" replace />}
          />

          {/* DIRECT ROUTES to components - This is the key fix */}
          <Route
            path="/bills"
            element={user ? <BillPayment user={user} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/trade"
            element={user ? <TradeFinance user={user} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/transfer"
            element={user ? <Transfer user={user} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/reports"
            element={user ? <Reports user={user} /> : <Navigate to="/login" replace />}
          />

          {/* Keep other redirects for consistency */}
          <Route
            path="/accounts"
            element={<Navigate to="/dashboard/accounts" replace />}
          />
          <Route
            path="/beneficiaries"
            element={<Navigate to="/dashboard/beneficiaries" replace />}
          />

          {/* Invalid path handler */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;