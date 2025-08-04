import { UserService } from '../services/userService';
import { CreateUserRequest, hasPermission } from '../types/user';

/**
 * Utility function to create a test admin user
 * This should only be used in development/testing environments
 */
export const createTestAdminUser = async (email: string, displayName: string, organizationId: string = 'test-org') => {
  try {
    const userData: CreateUserRequest = {
      email,
      displayName,
      organizationId,
      roles: ['Admin']
    };

    const user = await UserService.createUser(userData, 'system');
    console.log('Test admin user created:', user);
    return user;
  } catch (error) {
    console.error('Failed to create test admin user:', error);
    throw error;
  }
};

/**
 * Utility function to check current user permissions
 */
export const debugUserPermissions = (userProfile: any) => {
  if (!userProfile) {
    console.log('No user profile available');
    return;
  }

  console.log('User Profile:', userProfile);
  console.log('User Roles:', userProfile.roles);
  
  // Test various permissions
  const testPermissions = [
    'user_management_full',
    'user_management_create',
    'user_management_edit',
    'user_management_view',
    'admin_settings_full'
  ];

  testPermissions.forEach(permission => {
    const hasPerm = hasPermission(userProfile.roles, permission);
    console.log(`Has ${permission}:`, hasPerm);
  });
};

/**
 * Test function to verify the admin user setup
 */
export const testAdminUserSetup = async (uid: string) => {
  try {
    console.log('Testing admin user setup for UID:', uid);
    
    const user = await UserService.getUser(uid);
    if (!user) {
      console.error('❌ User not found');
      return false;
    }
    
    console.log('✅ User found:', user);
    console.log('User roles:', user.roles);
    console.log('User is active:', user.isActive);
    
    // Test permissions
    const permissions = [
      'user_management_full',
      'user_management_create',
      'user_management_edit',
      'admin_settings_full'
    ];
    
    permissions.forEach(permission => {
      const hasPerm = hasPermission(user.roles, permission);
      console.log(`Permission ${permission}: ${hasPerm ? '✅' : '❌'}`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ Error testing admin user setup:', error);
    return false;
  }
}; 