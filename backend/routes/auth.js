// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const admin = require('../firebase-admin');
const User = require('../models/UserModel'); // Your user model

// Firebase OTP Login
router.post('/firebase-login', async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'ID token is required' });
    }

    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, phone_number, email } = decodedToken;

    // Find or create user in your database
    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        firebaseUid: uid,
        phone: phone_number,
        email: email || `${phone_number}@yono-business.com`,
        name: `User ${phone_number}`,
        isVerified: true,
        loginMethod: 'firebase-otp',
        lastLogin: new Date()
      });
      await user.save();
    } else {
      // Update last login for existing user
      user.lastLogin = new Date();
      await user.save();
    }

    // Generate your own JWT token or session
    const yourAppToken = generateYourAppToken(user); // Your existing token generation

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        firebaseUid: user.firebaseUid,
        phone: user.phone,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified
      },
      token: yourAppToken
    });

  } catch (error) {
    console.error('Firebase login error:', error);
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: 'Token expired' });
    }
    
    if (error.code === 'auth/id-token-revoked') {
      return res.status(401).json({ error: 'Token revoked' });
    }
    
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Middleware to verify Firebase token
const verifyFirebaseToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { router, verifyFirebaseToken };