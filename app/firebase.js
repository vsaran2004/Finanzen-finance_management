// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuXyZ5f9SKZto9WZHrKAU9TpnDg8YLJBc",
  authDomain: "finanzen-dbdd9.firebaseapp.com",
  projectId: "finanzen-dbdd9",
  storageBucket: "finanzen-dbdd9.firebasestorage.app",
  messagingSenderId: "29850561912",
  appId: "1:29850561912:web:3dcbab0b46665ebe712c8d",
  measurementId: "G-T2XVZ26Q5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; // Export Firestore instance for use in other files
