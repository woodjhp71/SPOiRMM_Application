import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  setDoc,
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  writeBatch,
  limit,
  startAfter,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
  User as FirebaseUser,
  deleteUser as deleteFirebaseUser,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { db, auth, functions } from '../config/firebase';
import { 
  UserProfile, 
  CreateUserRequest, 
  UpdateUserRequest, 
  UserListFilters,
  UserRole,
  Permission,
  hasPermission
} from '../types/user';

export class UserService {
  private static readonly COLLECTION_NAME = 'users';
  private static readonly BATCH_SIZE = 20;

  /**
   * Create a new user in both Firebase Auth and Firestore
   * Note: This function should be called from an admin context and will not sign in the new user
   */
  static async createUser(userData: CreateUserRequest, createdBy: string): Promise<UserProfile> {
    try {
      // Store the current user before creating the new user
      const currentUser = auth.currentUser;
      const currentUserEmail = currentUser?.email;
      
      if (!currentUser) {
        throw new Error('No authenticated user found. Admin must be logged in to create users.');
      }
      
      // Generate a temporary password
      const tempPassword = this.generateTemporaryPassword();
      
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        tempPassword
      );

      const firebaseUser = userCredential.user;

      // Create user profile in Firestore
      const userProfile: Omit<UserProfile, 'uid'> = {
        email: userData.email,
        displayName: userData.displayName,
        organizationId: userData.organizationId,
        roles: userData.roles,
        activeProjects: userData.activeProjects || [],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: createdBy
      };

      // Use the Firebase Auth UID as the Firestore document ID
      await setDoc(doc(db, this.COLLECTION_NAME, firebaseUser.uid), {
        ...userProfile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Update Firebase Auth display name
      await updateFirebaseProfile(firebaseUser, {
        displayName: userData.displayName
      });

      // Send password reset email to allow user to set their own password
      await sendPasswordResetEmail(auth, userData.email);

      // Log the user creation for audit purposes
      try {
        await addDoc(collection(db, 'auditLogs'), {
          action: 'user_created',
          targetUserId: firebaseUser.uid,
          targetUserEmail: userData.email,
          performedBy: currentUser.uid,
          performedByEmail: currentUserEmail || 'unknown',
          timestamp: serverTimestamp(),
          details: {
            userRoles: userData.roles,
            userDisplayName: userData.displayName,
            note: 'User created by admin, password reset email sent'
          }
        });
      } catch (auditError) {
        // Audit logging is optional, don't fail the creation if it fails
        console.warn('Failed to log user creation to audit trail:', auditError);
      }

      return {
        uid: firebaseUser.uid,
        ...userProfile
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error(`Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get a single user by UID
   */
  static async getUser(uid: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(db, this.COLLECTION_NAME, uid));
      
      if (!userDoc.exists()) {
        return null;
      }

      const data = userDoc.data();
      
      // Map the Firestore document structure to UserProfile interface
      const userProfile: UserProfile = {
        uid: userDoc.id,
        email: data.email || '',
        displayName: data.profile?.displayName || data.displayName || '',
        organizationId: data.organizationId || '',
        roles: this.mapRolesFromFirestore(data),
        activeProjects: data.activeProjects || [],
        isActive: data.status === 'active' || data.isActive !== false,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        lastLoginAt: data.lastLoginAt?.toDate(),
        createdBy: data.createdBy
      };



      return userProfile;
    } catch (error) {
      console.error('Error getting user:', error);
      throw new Error(`Failed to get user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Map Firestore document roles to UserRole array
   */
  private static mapRolesFromFirestore(data: any): UserRole[] {
    const roles: UserRole[] = [];
    
    // Check for profile.role (string) - most common case
    if (data.profile?.role) {
      const role = data.profile.role.toLowerCase();
      if (role === 'admin') {
        roles.push('Admin');
      } else if (role === 'risk plan sponsor') {
        roles.push('Risk Plan Sponsor');
      } else if (role === 'risk plan coordinator') {
        roles.push('Risk Plan Coordinator');
      } else if (role === 'working group member') {
        roles.push('Working Group Member');
      } else if (role === 'risk owner') {
        roles.push('Risk Owner');
      } else if (role === 'viewer') {
        roles.push('Viewer');
      }
    }
    
    // Check for top-level role field
    if (data.role && !data.profile?.role) {
      const role = data.role.toLowerCase();
      if (role === 'admin') {
        roles.push('Admin');
      } else if (role === 'risk plan sponsor') {
        roles.push('Risk Plan Sponsor');
      } else if (role === 'risk plan coordinator') {
        roles.push('Risk Plan Coordinator');
      } else if (role === 'working group member') {
        roles.push('Working Group Member');
      } else if (role === 'risk owner') {
        roles.push('Risk Owner');
      } else if (role === 'viewer') {
        roles.push('Viewer');
      }
    }
    
    // Check for permissions structure
    if (data.permissions) {
      // If user has canManageUsers permission, they should have Admin role
      if (data.permissions.canManageUsers && !roles.includes('Admin')) {
        roles.push('Admin');
      }
      // Add other role mappings based on permissions if needed
    }
    
    // Fallback to roles array if it exists
    if (data.roles && Array.isArray(data.roles)) {
      data.roles.forEach((role: string) => {
        if (!roles.includes(role as UserRole)) {
          roles.push(role as UserRole);
        }
      });
    }
    
    // If no roles found, check if this is a superuser/admin by email
    if (roles.length === 0 && data.email === 'spoirmmitc2@gmail.com') {
      roles.push('Admin');
    }
    
    return roles;
  }

  /**
   * Get users with filtering and pagination
   */
  static async getUsers(
    filters: UserListFilters = {}, 
    lastDoc?: QueryDocumentSnapshot,
    pageSize: number = this.BATCH_SIZE
  ): Promise<{ users: UserProfile[], lastDoc: QueryDocumentSnapshot | null }> {
    try {
      let q = query(collection(db, this.COLLECTION_NAME));

      // Apply filters
      if (filters.organizationId) {
        q = query(q, where('organizationId', '==', filters.organizationId));
      }

      if (filters.isActive !== undefined) {
        q = query(q, where('isActive', '==', filters.isActive));
      }

      // Note: Role filtering will be done client-side due to the nested structure
      // The Firestore query doesn't support complex nested queries for roles

      // Add pagination
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      q = query(q, orderBy('displayName'), limit(pageSize));

      const querySnapshot = await getDocs(q);
      let users: UserProfile[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Map the Firestore document structure to UserProfile interface
        const userProfile: UserProfile = {
          uid: doc.id,
          email: data.email || '',
          displayName: data.profile?.displayName || data.displayName || '',
          organizationId: data.organizationId || '',
          roles: this.mapRolesFromFirestore(data),
          activeProjects: data.activeProjects || [],
          isActive: data.status === 'active' || data.isActive !== false,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate(),
          createdBy: data.createdBy
        };
        
        users.push(userProfile);
      });

      // Apply client-side role filtering
      if (filters.roles && filters.roles.length > 0) {
        users = users.filter(user => 
          user.roles.some(role => filters.roles!.includes(role))
        );
      }

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

      return { users, lastDoc: lastVisible };
    } catch (error) {
      console.error('Error getting users:', error);
      throw new Error(`Failed to get users: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Update user profile
   */
  static async updateUser(uid: string, updateData: UpdateUserRequest): Promise<void> {
    try {
      const userRef = doc(db, this.COLLECTION_NAME, uid);
      
      await updateDoc(userRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });

      // If display name is being updated, also update Firebase Auth
      if (updateData.displayName) {
        const currentUser = auth.currentUser;
        if (currentUser && currentUser.uid === uid) {
          await updateFirebaseProfile(currentUser, {
            displayName: updateData.displayName
          });
        }
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error(`Failed to update user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Deactivate user (soft delete)
   */
  static async deactivateUser(uid: string): Promise<void> {
    try {
      await this.updateUser(uid, { isActive: false });
    } catch (error) {
      console.error('Error deactivating user:', error);
      throw new Error(`Failed to deactivate user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Reactivate user
   */
  static async reactivateUser(uid: string): Promise<void> {
    try {
      await this.updateUser(uid, { isActive: true });
    } catch (error) {
      console.error('Error reactivating user:', error);
      throw new Error(`Failed to reactivate user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

    /**
   * Delete user permanently (hard delete)
   */
  static async deleteUser(uid: string): Promise<void> {
    try {
      // Get user data before deletion for audit logging
      const userDoc = await getDoc(doc(db, this.COLLECTION_NAME, uid));
      const userData = userDoc.exists() ? userDoc.data() : null;
      
      // Delete from Firestore
      await deleteDoc(doc(db, this.COLLECTION_NAME, uid));
      console.log('User deleted from Firestore');
      
      // Log the deletion for audit purposes (if auditLogs collection exists)
      try {
        await addDoc(collection(db, 'auditLogs'), {
          action: 'user_deleted',
          targetUserId: uid,
          targetUserEmail: userData?.email || 'unknown',
          timestamp: serverTimestamp(),
          details: {
            userRoles: userData?.roles || [],
            userDisplayName: userData?.displayName || 'unknown',
            note: 'Firebase Auth deletion requires manual cleanup in Firebase Console'
          }
        });
      } catch (auditError) {
        // Audit logging is optional, don't fail the deletion if it fails
        console.warn('Failed to log deletion to audit trail:', auditError);
      }
      
      // Show user-friendly message about manual cleanup
      console.warn('User deleted from Firestore. Firebase Auth deletion requires manual cleanup in Firebase Console.');
      
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error(`Failed to delete user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Update user roles
   */
  static async updateUserRoles(uid: string, roles: UserRole[]): Promise<void> {
    try {
      await this.updateUser(uid, { roles });
    } catch (error) {
      console.error('Error updating user roles:', error);
      throw new Error(`Failed to update user roles: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Add user to project
   */
  static async addUserToProject(uid: string, projectId: string): Promise<void> {
    try {
      const user = await this.getUser(uid);
      if (!user) {
        throw new Error('User not found');
      }

      const updatedProjects = [...new Set([...user.activeProjects, projectId])];
      await this.updateUser(uid, { activeProjects: updatedProjects });
    } catch (error) {
      console.error('Error adding user to project:', error);
      throw new Error(`Failed to add user to project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Remove user from project
   */
  static async removeUserFromProject(uid: string, projectId: string): Promise<void> {
    try {
      const user = await this.getUser(uid);
      if (!user) {
        throw new Error('User not found');
      }

      const updatedProjects = user.activeProjects.filter(id => id !== projectId);
      await this.updateUser(uid, { activeProjects: updatedProjects });
    } catch (error) {
      console.error('Error removing user from project:', error);
      throw new Error(`Failed to remove user from project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Update user's last login timestamp
   */
  static async updateLastLogin(uid: string): Promise<void> {
    try {
      await updateDoc(doc(db, this.COLLECTION_NAME, uid), {
        lastLoginAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating last login:', error);
      // Don't throw error for last login updates as it's not critical
    }
  }

  /**
   * Check if user has specific permission
   */
  static async checkUserPermission(uid: string, permission: Permission): Promise<boolean> {
    try {
      const user = await this.getUser(uid);
      if (!user || !user.isActive) {
        return false;
      }

      return hasPermission(user.roles, permission);
    } catch (error) {
      console.error('Error checking user permission:', error);
      return false;
    }
  }

  /**
   * Get users by organization
   */
  static async getUsersByOrganization(organizationId: string): Promise<UserProfile[]> {
    try {
      const { users } = await this.getUsers({ organizationId });
      return users;
    } catch (error) {
      console.error('Error getting users by organization:', error);
      throw new Error(`Failed to get users by organization: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get users by role
   */
  static async getUsersByRole(role: UserRole): Promise<UserProfile[]> {
    try {
      const { users } = await this.getUsers({ roles: [role] });
      return users;
    } catch (error) {
      console.error('Error getting users by role:', error);
      throw new Error(`Failed to get users by role: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search users by name or email
   */
  static async searchUsers(searchTerm: string, organizationId?: string): Promise<UserProfile[]> {
    try {
      // Note: Firestore doesn't support full-text search natively
      // This is a simple implementation that gets all users and filters client-side
      // For production, consider using Algolia or similar search service
      const { users } = await this.getUsers({ organizationId });
      
      const searchLower = searchTerm.toLowerCase();
      return users.filter(user => 
        user.displayName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    } catch (error) {
      console.error('Error searching users:', error);
      throw new Error(`Failed to search users: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate temporary password for new users
   */
  private static generateTemporaryPassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  /**
   * Resend password reset email
   */
  static async resendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error(`Failed to send password reset email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 