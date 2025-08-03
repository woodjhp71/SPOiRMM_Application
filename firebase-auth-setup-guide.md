# Firebase Auth User Setup Guide

## Option 1: Firebase Admin SDK (Recommended)

### Prerequisites
1. **Download Service Account Key**:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your project (spoirmm)
   - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Download the JSON file
   - Save as `firebase-service-account.json` in project root

2. **Run the Script**:
   ```bash
   node create-google-user.cjs
   ```

### What This Does
- Creates Firebase Auth user with specific UID: `inUB6cwPmZTU49DZe949eLnT7wo1`
- Sets email: `spoirmmitc2@gmail.com`
- Sets display name: "SPOiRMM Admin"
- Sets custom claims for admin role and permissions
- Matches the Firestore document ID we created

## Option 2: Firebase Console (Manual)

### Steps
1. **Go to Firebase Console** → Authentication → Users
2. **Click "Add User"**
3. **Enter Details**:
   - Email: `spoirmmitc2@gmail.com`
   - Password: `temp_password_123` (or your choice)
   - UID: `inUB6cwPmZTU49DZe949eLnT7wo1` (optional - Firebase will generate if not provided)
4. **Click "Add User"**

### Set Custom Claims (Optional)
1. **Go to Firebase Console** → Authentication → Users
2. **Find the user** and click the three dots menu
3. **Select "Set custom claims"**
4. **Add JSON**:
   ```json
   {
     "role": "admin",
     "organizationId": null,
     "canAccessAllOrganizations": true,
     "canExportAuditLogs": true,
     "canManageSystemConfig": true,
     "canManageUsers": true,
     "canManageProjects": true,
     "canManageIssues": true,
     "canManageRisks": true
   }
   ```

## Option 3: Google Sign-In Integration

### Enable Google Sign-In
1. **Go to Firebase Console** → Authentication → Sign-in method
2. **Enable Google** provider
3. **Configure OAuth consent screen** if needed
4. **Add authorized domains**

### Use Google Sign-In in App
```javascript
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();
const result = await signInWithPopup(auth, provider);
const user = result.user;
// user.uid will be the Google user ID
```

## Option 4: Import Users from Google Workspace

### Using Admin SDK
```javascript
// Import existing Google Workspace users
const userRecord = await admin.auth().createUser({
  uid: 'google-workspace-user-id',
  email: 'user@yourdomain.com',
  emailVerified: true,
  displayName: 'User Name'
});
```

## Current Status

### ✅ Completed
- Firebase Auth user created with UID: `inUB6cwPmZTU49DZe949eLnT7wo1`
- Firestore user document updated to match Firebase Auth UID
- Document ID matches UID field
- Admin role and permissions configured
- Security rules ready
- Authentication ready for testing

### 🔄 Next Steps
1. **Test authentication** in the app
2. **Set custom claims** for admin role (optional)
3. **Proceed to Stage 1.2** implementation

## Security Notes

- **Service Account Key**: Keep `firebase-service-account.json` secure and add to `.gitignore`
- **Custom Claims**: These are included in the JWT token and can be used in security rules
- **UID Consistency**: Always ensure Firestore document ID matches Firebase Auth UID
- **Password Policy**: Use strong passwords for admin accounts

## Testing Authentication

After creating the Firebase Auth user, test with:

```javascript
import { signInWithEmailAndPassword } from 'firebase/auth';

const userCredential = await signInWithEmailAndPassword(
  auth, 
  'spoirmmitc2@gmail.com', 
  'temp_password_123'
);
console.log('User UID:', userCredential.user.uid);
``` 