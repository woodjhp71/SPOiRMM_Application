// Script to set up the Firestore profile for the existing admin user
// Run this script to ensure the admin user has the proper profile in Firestore

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Firebase configuration - you'll need to add your own config here
const firebaseConfig = {
  // Add your Firebase config here
  // apiKey: "your-api-key",
  // authDomain: "your-project.firebaseapp.com",
  // projectId: "your-project-id",
  // storageBucket: "your-project.appspot.com",
  // messagingSenderId: "123456789",
  // appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Admin user details
const ADMIN_UID = 'inUB6cwPmZTU49DZe949eLnT7wo1';
const ADMIN_EMAIL = 'spoirmmitc2@gmail.com';
const ADMIN_DISPLAY_NAME = 'SPOiRMM Admin';

async function setupAdminProfile() {
  try {
    const adminProfile = {
      uid: ADMIN_UID,
      email: ADMIN_EMAIL,
      displayName: ADMIN_DISPLAY_NAME,
      organizationId: 'admin-org', // You can change this as needed
      roles: ['Admin'],
      activeProjects: [],
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: 'system'
    };

    // Create/update the admin profile in Firestore
    await setDoc(doc(db, 'users', ADMIN_UID), adminProfile);
    
    console.log('✅ Admin profile created/updated successfully!');
    console.log('User UID:', ADMIN_UID);
    console.log('Email:', ADMIN_EMAIL);
    console.log('Roles:', adminProfile.roles);
    
  } catch (error) {
    console.error('❌ Error setting up admin profile:', error);
  }
}

// Run the setup
setupAdminProfile(); 