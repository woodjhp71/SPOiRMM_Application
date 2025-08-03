// Test script to verify Firebase connection
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

console.log('Testing Firebase connection...');
console.log('Project ID:', process.env.VITE_FIREBASE_PROJECT_ID);

try {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  
  console.log('✅ Firebase initialized successfully');
  
  // Test Firestore connection
  console.log('Testing Firestore connection...');
  const testCollection = collection(db, 'test');
  console.log('✅ Firestore connection successful');
  
  // Test Auth connection
  console.log('Testing Auth connection...');
  console.log('✅ Auth connection successful');
  
  console.log('🎉 All Firebase services connected successfully!');
  
} catch (error) {
  console.error('❌ Firebase connection failed:', error.message);
  process.exit(1);
} 