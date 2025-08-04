// User Management and RBAC Types

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  organizationId: string;
  roles: UserRole[];
  activeProjects: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  createdBy?: string;
}

export type UserRole = 
  | 'Admin'
  | 'Risk Plan Sponsor'
  | 'Risk Plan Coordinator'
  | 'Working Group Member'
  | 'Risk Owner'
  | 'Viewer';

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
}

export type Permission = 
  | 'project_planning_full'
  | 'project_planning_approve'
  | 'project_planning_edit'
  | 'project_planning_view'
  | 'issues_list_full'
  | 'issues_list_manage'
  | 'issues_list_create'
  | 'issues_list_view'
  | 'risk_register_full'
  | 'risk_register_manage'
  | 'risk_register_edit_assigned'
  | 'risk_register_view'
  | 'admin_settings_full'
  | 'user_management_full'
  | 'user_management_create'
  | 'user_management_edit'
  | 'user_management_view';

export interface CreateUserRequest {
  email: string;
  displayName: string;
  organizationId: string;
  roles: UserRole[];
  activeProjects?: string[];
}

export interface UpdateUserRequest {
  displayName?: string;
  roles?: UserRole[];
  activeProjects?: string[];
  isActive?: boolean;
}

export interface UserListFilters {
  organizationId?: string;
  roles?: UserRole[];
  isActive?: boolean;
  searchTerm?: string;
}

export interface UserManagementState {
  users: UserProfile[];
  loading: boolean;
  error: string | null;
  selectedUser: UserProfile | null;
  filters: UserListFilters;
}

// Permission checking utilities
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  'Admin': [
    'project_planning_full',
    'issues_list_full',
    'risk_register_full',
    'admin_settings_full',
    'user_management_full'
  ],
  'Risk Plan Sponsor': [
    'project_planning_approve',
    'issues_list_view',
    'risk_register_view'
  ],
  'Risk Plan Coordinator': [
    'project_planning_edit',
    'issues_list_manage',
    'risk_register_manage'
  ],
  'Working Group Member': [
    'project_planning_view',
    'issues_list_create',
    'risk_register_view'
  ],
  'Risk Owner': [
    'project_planning_view',
    'issues_list_view',
    'risk_register_edit_assigned'
  ],
  'Viewer': [
    'project_planning_view',
    'issues_list_view',
    'risk_register_view'
  ]
};

export const hasPermission = (userRoles: UserRole[], permission: Permission): boolean => {
  return userRoles.some(role => {
    const rolePermissions = ROLE_PERMISSIONS[role] || [];
    
    // Check for exact permission match
    if (rolePermissions.includes(permission)) {
      return true;
    }
    
    // Check for full access permissions that include the specific permission
    if (permission.startsWith('user_management_') && rolePermissions.includes('user_management_full')) {
      return true;
    }
    if (permission.startsWith('project_planning_') && rolePermissions.includes('project_planning_full')) {
      return true;
    }
    if (permission.startsWith('issues_list_') && rolePermissions.includes('issues_list_full')) {
      return true;
    }
    if (permission.startsWith('risk_register_') && rolePermissions.includes('risk_register_full')) {
      return true;
    }
    if (permission.startsWith('admin_settings_') && rolePermissions.includes('admin_settings_full')) {
      return true;
    }
    
    return false;
  });
};

export const hasAnyPermission = (userRoles: UserRole[], permissions: Permission[]): boolean => {
  return permissions.some(permission => hasPermission(userRoles, permission));
};

export const hasAllPermissions = (userRoles: UserRole[], permissions: Permission[]): boolean => {
  return permissions.every(permission => hasPermission(userRoles, permission));
}; 