// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Hardcoded Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4pCgKk8JkHbth4ppWdwJrmQ3jU-TrOeQ",
  authDomain: "yolo-banking-app.firebaseapp.com",
  projectId: "yolo-banking-app",
  storageBucket: "yolo-banking-app.firebasestorage.app",
  messagingSenderId: "119843901117",
  appId: "1:119843901117:web:dc36839d21dd0d0b4271d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;