# Manual Firebase Auth Cleanup for User Deletion

## Overview

Due to Firebase plan limitations (Spark/Free plan), Cloud Functions cannot be deployed to automatically delete users from Firebase Authentication. When a user is deleted from the SPOiRMM application, they are only removed from Firestore (the application database) but remain in Firebase Authentication.

## Current User Deletion Process

1. **Application Deletion**: User is deleted from Firestore database
2. **Manual Cleanup Required**: User must be manually deleted from Firebase Authentication

## Manual Cleanup Steps

### Step 1: Access Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `spoirmm`
3. Navigate to **Authentication** in the left sidebar

### Step 2: Find the User
1. Click on **Users** tab
2. Search for the user by email address
3. The user will still be listed even after deletion from the application

### Step 3: Delete the User
1. Click on the user's email address to open their details
2. Click the **Delete** button (trash icon)
3. Confirm the deletion in the popup dialog

## Alternative: Bulk Cleanup

For multiple users, you can:
1. Select multiple users using checkboxes
2. Click **Delete selected** button
3. Confirm bulk deletion

## Audit Trail

The application automatically logs all user deletions to the `auditLogs` collection in Firestore, including:
- User ID and email
- Deletion timestamp
- User roles and display name
- Note about manual Firebase Auth cleanup requirement

## Future Enhancement

When the Firebase project is upgraded to the Blaze (pay-as-you-go) plan, Cloud Functions can be deployed to automatically handle Firebase Authentication deletion, eliminating the need for manual cleanup.

## Troubleshooting

### User Still Appears in Application
- Check if the user was actually deleted from Firestore
- Verify the deletion was logged in the audit trail
- Ensure you're looking at the correct Firebase project

### User Not Found in Firebase Auth
- The user may have already been manually deleted
- Check if the email address is correct
- Verify you're in the correct Firebase project

## Security Considerations

- Only administrators should perform manual Firebase Auth cleanup
- Keep audit logs for compliance and tracking purposes
- Consider implementing a regular cleanup schedule for orphaned Firebase Auth users

## Related Documentation

- [Add New User Procedure.md](./Add%20New%20User%20Procedure.md)
- [Understanding the Role-Based Access Model.md](./Understanding%20the%20Role-Based%20Access%20Model.md)
- [Firebase Data Model Design.md](./Firebase%20Data%20Model%20Design.md) 