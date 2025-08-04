const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();

/**
 * Cloud Function to delete a user from both Firestore and Firebase Authentication
 * This function should be called from the client-side deleteUser method
 */
exports.deleteUserCompletely = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated to delete users'
    );
  }

  const { uid } = data;

  // Validate input
  if (!uid || typeof uid !== 'string') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'User UID is required and must be a string'
    );
  }

  try {
    // Check if the requesting user has admin privileges
    const requestingUserDoc = await db.collection('users').doc(context.auth.uid).get();
    
    if (!requestingUserDoc.exists) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Requesting user not found in database'
      );
    }

    const requestingUserData = requestingUserDoc.data();
    const requestingUserRoles = requestingUserData?.roles || [];
    
    // Check if user has admin role
    const hasAdminRole = requestingUserRoles.includes('Admin');
    
    if (!hasAdminRole) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Only administrators can delete users'
      );
    }

    // Prevent self-deletion
    if (uid === context.auth.uid) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Cannot delete your own account'
      );
    }

    // Get user data before deletion for logging
    const userDoc = await db.collection('users').doc(uid).get();
    const userData = userDoc.exists ? userDoc.data() : null;

    // Delete from Firestore first
    await db.collection('users').doc(uid).delete();

    // Then delete from Firebase Authentication
    try {
      await auth.deleteUser(uid);
    } catch (authError) {
      // If Auth deletion fails, log the error but don't fail the entire operation
      // The user is already deleted from Firestore
      console.error('Failed to delete user from Firebase Auth:', authError);
      
      // You might want to implement a retry mechanism or queue for failed Auth deletions
      // For now, we'll log it and continue
    }

    // Log the deletion for audit purposes
    await db.collection('auditLogs').add({
      action: 'user_deleted',
      targetUserId: uid,
      targetUserEmail: userData?.email || 'unknown',
      performedBy: context.auth.uid,
      performedByEmail: requestingUserData?.email || 'unknown',
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      details: {
        userRoles: userData?.roles || [],
        userDisplayName: userData?.displayName || 'unknown'
      }
    });

    return {
      success: true,
      message: 'User deleted successfully from both Firestore and Firebase Authentication',
      deletedUserId: uid
    };

  } catch (error) {
    console.error('Error deleting user:', error);
    
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    throw new functions.https.HttpsError(
      'internal',
      'Failed to delete user: ' + (error instanceof Error ? error.message : 'Unknown error')
    );
  }
});

/**
 * Cloud Function to handle user deletion when a Firestore user document is deleted
 * This is a backup mechanism in case the client-side deletion fails
 */
exports.onUserDocumentDeleted = functions.firestore
  .document('users/{userId}')
  .onDelete(async (snap, context) => {
    const userId = context.params.userId;
    const deletedUserData = snap.data();

    try {
      // Try to delete from Firebase Authentication
      await auth.deleteUser(userId);
      
      console.log(`User ${userId} automatically deleted from Firebase Auth after Firestore deletion`);
      
      // Log the automatic deletion
      await db.collection('auditLogs').add({
        action: 'user_auto_deleted_from_auth',
        targetUserId: userId,
        targetUserEmail: deletedUserData?.email || 'unknown',
        performedBy: 'system',
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        details: {
          reason: 'Automatic cleanup after Firestore deletion',
          userRoles: deletedUserData?.roles || [],
          userDisplayName: deletedUserData?.displayName || 'unknown'
        }
      });

    } catch (error) {
      console.error(`Failed to automatically delete user ${userId} from Firebase Auth:`, error);
      
      // Log the failure for manual cleanup
      await db.collection('auditLogs').add({
        action: 'user_auth_deletion_failed',
        targetUserId: userId,
        targetUserEmail: deletedUserData?.email || 'unknown',
        performedBy: 'system',
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        details: {
          reason: 'Automatic cleanup failed',
          error: error instanceof Error ? error.message : 'Unknown error',
          userRoles: deletedUserData?.roles || [],
          userDisplayName: deletedUserData?.displayName || 'unknown'
        }
      });
    }
  }); 