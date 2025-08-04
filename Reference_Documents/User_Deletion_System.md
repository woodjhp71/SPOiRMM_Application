# User Deletion System

## Overview

The SPOiRMM application now includes a comprehensive user deletion system that properly removes users from both **Firestore** and **Firebase Authentication** using Cloud Functions.

## Problem Solved

Previously, when an administrator deleted a user, the system only removed them from the Firestore `users` collection, leaving orphaned accounts in Firebase Authentication. This created security issues where deleted users could still log in.

## Solution

### Cloud Functions Implementation

The system now uses Firebase Cloud Functions to handle user deletion properly:

1. **`deleteUserCompletely`** - Main function called from client-side
2. **`onUserDocumentDeleted`** - Backup trigger function for automatic cleanup

### Security Features

- ✅ **Admin-only deletion** - Only users with 'Admin' role can delete users
- ✅ **Self-deletion prevention** - Administrators cannot delete their own accounts
- ✅ **Audit logging** - All deletions are logged for compliance
- ✅ **Error handling** - Graceful fallback if Cloud Function fails
- ✅ **Backup cleanup** - Automatic Auth cleanup if Firestore deletion occurs

## How It Works

### 1. Client-Side Deletion Request

When an administrator clicks "Delete" on a user:

```typescript
// UserService.deleteUser() calls the Cloud Function
const deleteUserFunction = httpsCallable(auth, 'deleteUserCompletely');
const result = await deleteUserFunction({ uid });
```

### 2. Cloud Function Processing

The `deleteUserCompletely` function:

1. **Validates permissions** - Checks if requester has Admin role
2. **Prevents self-deletion** - Blocks administrators from deleting themselves
3. **Deletes from Firestore** - Removes user document
4. **Deletes from Firebase Auth** - Removes authentication account
5. **Logs the action** - Creates audit trail
6. **Returns result** - Confirms successful deletion

### 3. Backup Cleanup

The `onUserDocumentDeleted` trigger function:

- Automatically runs when a user document is deleted from Firestore
- Attempts to clean up the corresponding Firebase Auth account
- Logs success/failure for manual review if needed

## Deployment

### Prerequisites

- Firebase Admin SDK installed
- Firebase CLI configured
- Proper Firebase project permissions

### Deployment Steps

1. **Install dependencies:**
   ```bash
   cd functions
   npm install
   ```

2. **Build functions:**
   ```bash
   npm run build
   ```

3. **Deploy to Firebase:**
   ```bash
   firebase deploy --only functions
   ```

### Windows Deployment

Use the provided batch script:
```bash
deploy-functions.bat
```

## Audit Logging

All user deletions are logged in the `auditLogs` collection with:

- **Action type** - `user_deleted`, `user_auto_deleted_from_auth`, etc.
- **Target user details** - UID, email, roles, display name
- **Performing user** - Who initiated the deletion
- **Timestamp** - When the action occurred
- **Details** - Additional context and error information

## Error Handling

### Cloud Function Failures

If the Cloud Function fails:

1. **Fallback deletion** - User is still deleted from Firestore
2. **Warning logged** - Console warning about Auth cleanup needed
3. **Manual cleanup** - Administrator can manually delete from Firebase Console

### Firebase Auth Deletion Failures

If Auth deletion fails:

1. **Operation continues** - Firestore deletion succeeds
2. **Error logged** - Detailed error information in audit logs
3. **Retry mechanism** - Backup trigger attempts cleanup

## Security Considerations

### Permission Checks

- Only authenticated users can call the function
- Only users with 'Admin' role can delete users
- Self-deletion is prevented to avoid lockout

### Data Protection

- User data is logged before deletion for audit purposes
- Sensitive information is handled securely
- Audit trails are maintained for compliance

## Monitoring

### Cloud Function Logs

Monitor function execution in Firebase Console:
- **Function logs** - Success/failure rates
- **Error details** - Specific failure reasons
- **Performance metrics** - Execution time and resource usage

### Audit Trail Review

Regular review of `auditLogs` collection:
- **Deletion patterns** - Who is deleting users and when
- **Failed operations** - Auth deletion failures requiring manual cleanup
- **Compliance verification** - Ensuring proper deletion procedures

## Troubleshooting

### Common Issues

1. **Function deployment fails**
   - Check Firebase CLI version
   - Verify project permissions
   - Ensure dependencies are installed

2. **Auth deletion fails**
   - Check if user exists in Auth
   - Verify Admin SDK permissions
   - Review function logs for specific errors

3. **Permission denied errors**
   - Verify user has 'Admin' role
   - Check Firestore security rules
   - Ensure proper authentication

### Manual Cleanup

If automatic Auth deletion fails:

1. **Firebase Console** - Navigate to Authentication > Users
2. **Find user** - Search by email or UID
3. **Delete manually** - Remove the authentication account
4. **Log the action** - Update audit logs if needed

## Future Enhancements

### Planned Improvements

- **Bulk deletion** - Delete multiple users at once
- **Soft deletion** - Option to deactivate instead of delete
- **Recovery mechanism** - Restore accidentally deleted users
- **Advanced audit** - More detailed logging and reporting
- **Email notifications** - Alert administrators of deletion events

### Integration Opportunities

- **SIEM integration** - Security information and event management
- **Compliance reporting** - Automated compliance documentation
- **User lifecycle management** - End-to-end user management workflow 