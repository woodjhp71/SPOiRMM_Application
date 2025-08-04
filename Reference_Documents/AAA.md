# SPOiRMM Authentication, Authorization, and Access (AAA) Standards

## Overview
This document outlines the standardized approach to Authentication, Authorization, and Access control across the SPOiRMM (Strategic Planning of Integrated Risk Management Model) application.

## 1. Authentication Standards

### 1.1 User Authentication Flow
- **Firebase Authentication**: Primary authentication provider using Firebase Auth
- **Login Page**: Centralized login at `/login` route
- **Protected Routes**: All application routes except `/login` and `/` are protected
- **Session Management**: Automatic session persistence and renewal
- **User Profile Integration**: Firebase Auth UID synchronized with Firestore user document

### 1.2 Authentication Context
- **AuthContext**: Centralized authentication state management
- **User State**: Global user object available throughout application
- **User Profile**: Extended user profile with roles and permissions from Firestore
- **Loading States**: Proper loading indicators during authentication checks
- **Error Handling**: Graceful fallback for authentication failures

### 1.3 Sign-Out Functionality
- **Standardized Sign-Out**: Consistent sign-out button across all screens
- **Session Cleanup**: Proper cleanup of user data and session state
- **Redirect**: Automatic redirect to login page after sign-out

## 2. Authorization Standards

### 2.1 Role-Based Access Control (RBAC)
- **User Roles**: 
  - Admin
  - Risk Plan Sponsor
  - Risk Plan Coordinator
  - Working Group Member
  - Risk Owner
  - Viewer
- **Role Permissions**: Granular permissions based on user role
- **Dynamic Access**: UI elements and functionality adapt to user role
- **Multi-Role Support**: Users can have multiple roles simultaneously

### 2.2 Permission System
- **Permission Types**:
  - `project_planning_full` - Full project planning access
  - `project_planning_approve` - Project approval permissions
  - `project_planning_edit` - Project editing permissions
  - `project_planning_view` - Project viewing permissions
  - `issues_list_full` - Full issues management
  - `issues_list_manage` - Issues management permissions
  - `issues_list_create` - Issue creation permissions
  - `issues_list_view` - Issue viewing permissions
  - `risk_register_full` - Full risk register access
  - `risk_register_manage` - Risk management permissions
  - `risk_register_edit_assigned` - Edit assigned risks
  - `risk_register_view` - Risk viewing permissions
  - `admin_settings_full` - Full admin settings access
  - `user_management_full` - Full user management
  - `user_management_create` - User creation permissions
  - `user_management_edit` - User editing permissions
  - `user_management_view` - User viewing permissions

### 2.3 Component-Level Authorization
- **Conditional Rendering**: Components show/hide based on user permissions
- **Feature Flags**: Role-based feature availability
- **Data Access**: User-specific data filtering and access
- **Permission Checking**: Utility functions for permission validation

## 3. User Management System

### 3.1 User Management Features
- **User Creation**: Admin can create new users with temporary passwords
- **User Editing**: Update user profiles, roles, and permissions
- **User Deactivation**: Soft delete users (mark as inactive)
- **User Reactivation**: Reactivate previously deactivated users
- **User Deletion**: Permanent user deletion (hard delete)
- **Role Management**: Assign and manage user roles
- **Password Reset**: Automatic password reset emails for new users

### 3.2 User Management Interface
- **User List**: Paginated list of all users with filtering and search
- **User Details**: Detailed user information and editing capabilities
- **User Form**: Modal form for creating new users
- **Role Assignment**: Checkbox-based role assignment interface
- **Status Management**: Activate/deactivate user accounts

### 3.3 User Management Permissions
- **Admin Access**: Only users with Admin role can access user management
- **Organization Isolation**: Users can only manage users in their organization
- **Superuser Access**: Primary admin user has access to all users across organizations

## 4. Access Control Standards

### 4.1 Navigation Header Standardization
All major application screens now implement a standardized header with:

#### 4.1.1 Header Component (`src/components/Header/Header.tsx`)
```typescript
interface HeaderProps {
  title?: string;
  showUserInfo?: boolean;
}
```

#### 4.1.2 Standard Header Layout
- **Left**: SPOiRMM logo/brand
- **Center**: Page title (configurable)
- **Right**: User information and sign-out button (when `showUserInfo={true}`)

#### 4.1.3 User Information Display
- **User Name**: Display name or email fallback
- **Welcome Message**: "Welcome, [UserName]"
- **Sign-Out Button**: Consistent styling and functionality

### 4.2 Implemented Screens
The following screens have been updated to use the standardized header:

1. **Welcome Page** (`src/components/Welcome/Welcome.tsx`)
   - Title: "Risk Management Platform Navigation"
   - User Info: Enabled

2. **User Dashboard** (`src/components/UserDashboard/UserDashboard.tsx`)
   - Title: "Risk Management Dashboard and Overview"
   - User Info: Enabled

3. **Projects List** (`src/components/ProjectsList/ProjectsList.tsx`)
   - Title: "All Active Projects"
   - User Info: Enabled

4. **Project Planning** (`src/components/ProjectPlanning/ProjectPlanning.tsx`)
   - Title: "Risk Management Project Planning and Governance"
   - User Info: Enabled

5. **Project Workflow** (`src/components/ProjectWorkflow/ProjectWorkflow.tsx`)
   - Title: "Project Workflow Management"
   - User Info: Enabled

6. **Reports Page** (`src/components/ReportsPage/ReportsPage.tsx`)
   - Title: "Risk Management Reporting and Analytics"
   - User Info: Enabled

7. **Admin Settings** (`src/components/AdminSettingsPage/AdminSettingsPage.tsx`)
   - Title: "System Administration and Configuration"
   - User Info: Enabled
   - **NEW**: Tabbed interface with User Management integration

8. **User Management** (`src/components/UserManagement/UserManagement.tsx`)
   - Title: "User Management"
   - User Info: Enabled
   - **NEW**: Comprehensive user management interface

9. **Organization Setup** (`src/components/OrganizationSetup/OrganizationSetup.tsx`)
   - Title: "Organization Setup and Configuration"
   - User Info: Enabled

10. **Departments Page** (`src/components/OrganizationSetup/DepartmentsPage.tsx`)
    - Title: "Departments Management"
    - User Info: Enabled

11. **Agreements Page** (`src/components/OrganizationSetup/AgreementsPage.tsx`)
    - Title: "Agreements Management"
    - User Info: Enabled

12. **Policies Page** (`src/components/OrganizationSetup/PoliciesPage.tsx`)
    - Title: "Policies Management"
    - User Info: Enabled

13. **Settings Page** (`src/components/OrganizationSetup/SettingsPage.tsx`)
    - Title: "Settings Management"
    - User Info: Enabled

14. **Players Chart** (`src/components/PlayersChart/PlayersChart.tsx`)
    - Title: "Players Chart Management"
    - User Info: Enabled

15. **Players Chart Page** (`src/components/PlayersChartPage/PlayersChartPage.tsx`)
    - Title: "Players Chart Visualizer - Interactive Stakeholder Mapping and Analysis"
    - User Info: Enabled

16. **Issues List** (`src/components/IssuesList/IssuesList.tsx`)
    - Title: "Issues List - Issue Tracking and Risk Promotion"
    - User Info: Enabled

17. **Risk Register** (`src/components/RiskRegister/RiskRegister.tsx`)
    - Title: "Risk Register - Risk Management and Assessment"
    - User Info: Enabled

## 5. Implementation Guidelines

### 5.1 Adding Header to New Components
```typescript
import Header from '../Header/Header';

const NewComponent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Standardized Header */}
      <Header title="Your Page Title" showUserInfo={true} />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Your content here */}
      </main>
    </div>
  );
};
```

### 5.2 Header Configuration Options
- **title**: Page-specific title displayed in header center
- **showUserInfo**: Boolean to show/hide user info and sign-out button
- **Default Values**: 
  - title: "Risk Management Platform Navigation"
  - showUserInfo: true

### 5.3 Styling Consistency
- **Background**: Gradient from sky-500 to sky-600
- **Text Color**: White
- **Typography**: Bold, consistent sizing
- **Spacing**: Standardized padding and margins
- **Responsive**: Mobile-friendly layout

### 5.4 Permission Checking
```typescript
import { hasPermission, hasAnyPermission, hasAllPermissions } from '../types/user';

// Check single permission
const canEditUsers = hasPermission(userRoles, 'user_management_edit');

// Check multiple permissions (any)
const canManageProjects = hasAnyPermission(userRoles, ['project_planning_full', 'project_planning_edit']);

// Check multiple permissions (all)
const canFullAccess = hasAllPermissions(userRoles, ['admin_settings_full', 'user_management_full']);
```

## 6. Security Considerations

### 6.1 Authentication Security
- **Firebase Security**: Leverages Firebase's secure authentication
- **HTTPS Only**: All authentication traffic over secure connections
- **Session Management**: Secure session handling and cleanup
- **Password Reset**: Secure password reset flow with email verification

### 6.2 Authorization Security
- **Client-Side Validation**: UI-level access control
- **Server-Side Validation**: Backend validation for critical operations
- **Role Verification**: Consistent role checking across components
- **Firestore Security Rules**: Comprehensive security rules for data access

### 6.3 Access Control Security
- **Protected Routes**: All sensitive routes require authentication
- **Data Filtering**: User-specific data access
- **Organization Isolation**: Users can only access data within their organization
- **Audit Trail**: Logging of user actions (future implementation)

### 6.4 User Management Security
- **Admin-Only Access**: User management restricted to Admin role
- **Temporary Passwords**: Secure temporary password generation
- **Email Verification**: Password reset emails for new users
- **Soft Delete**: User deactivation instead of immediate deletion
- **Role Validation**: Server-side role assignment validation

## 7. Future Enhancements

### 7.1 Planned Features
- **Multi-Factor Authentication**: Additional security layer
- **Session Timeout**: Automatic session expiration
- **Permission Groups**: Granular permission management
- **Audit Logging**: Comprehensive user action tracking
- **SSO Integration**: Single Sign-On capabilities
- **Bulk User Operations**: Import/export user data
- **User Activity Monitoring**: Track user engagement and activity

### 7.2 Monitoring and Analytics
- **User Activity Tracking**: Monitor user engagement
- **Access Pattern Analysis**: Identify usage patterns
- **Security Monitoring**: Detect suspicious activities
- **Role Usage Analytics**: Track role assignment patterns

## 8. Maintenance and Updates

### 8.1 Header Updates
- **Centralized Changes**: All header updates through Header component
- **Consistent Styling**: Maintain visual consistency across updates
- **Backward Compatibility**: Ensure existing implementations continue working

### 8.2 Authentication Updates
- **Firebase Updates**: Keep Firebase SDK updated
- **Security Patches**: Regular security updates
- **Feature Additions**: Gradual enhancement of authentication features

### 8.3 User Management Updates
- **Role Updates**: Add new roles and permissions as needed
- **Security Rule Updates**: Maintain security rules with new features
- **Interface Enhancements**: Improve user management UI/UX

## 9. Testing Standards

### 9.1 Authentication Testing
- **Login Flow**: Test successful and failed login attempts
- **Session Management**: Test session persistence and cleanup
- **Sign-Out Flow**: Test sign-out functionality
- **Password Reset**: Test password reset flow

### 9.2 Authorization Testing
- **Role-Based Access**: Test different user roles
- **Permission Checks**: Verify correct access levels
- **UI Adaptation**: Test conditional rendering
- **Cross-Role Testing**: Test users with multiple roles

### 9.3 User Management Testing
- **User Creation**: Test user creation flow
- **User Editing**: Test user profile updates
- **Role Assignment**: Test role assignment and removal
- **User Deactivation**: Test user deactivation/reactivation
- **Permission Validation**: Test permission-based access control

### 9.4 Header Testing
- **Consistent Display**: Verify header appears on all screens
- **User Info Display**: Test user information display
- **Sign-Out Functionality**: Test sign-out button functionality

## 10. Documentation and Training

### 10.1 Developer Documentation
- **Component Usage**: Clear examples of Header component usage
- **Best Practices**: Guidelines for implementing AAA features
- **Troubleshooting**: Common issues and solutions
- **User Management API**: Documentation for user management operations

### 10.2 User Documentation
- **Authentication Guide**: User login and account management
- **Role Descriptions**: Clear explanation of user roles
- **Access Control**: Understanding of permission levels
- **User Management Guide**: Admin guide for managing users

### 10.3 API Documentation
- **User Service**: Complete API documentation for user operations
- **Permission Utilities**: Documentation for permission checking functions
- **Security Rules**: Firestore security rules documentation

---

**Last Updated**: December 2024
**Version**: 2.0
**Maintainer**: Development Team
**Review Cycle**: Quarterly 