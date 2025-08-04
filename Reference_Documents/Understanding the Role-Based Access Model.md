# Understanding the Role-Based Access Model

## Overview

The SPOiRMM application uses a **Role-Based Access Control (RBAC)** system to manage user permissions and access to different features. This document explains how the system works and what each role can do.

## What is Role-Based Access Control?

RBAC is a security model where:
- **Roles** are assigned to users (e.g., Admin, Risk Plan Sponsor)
- **Permissions** are assigned to roles (e.g., can create users, can view reports)
- **Users** inherit permissions through their assigned roles

This approach provides:
- ✅ **Security**: Users only access what they need
- ✅ **Scalability**: Easy to manage large numbers of users
- ✅ **Compliance**: Clear audit trail of who can do what
- ✅ **Flexibility**: Easy to modify permissions without changing code

## Available Roles

### 1. **Admin** (System Administrator)
**Purpose**: Full system access and user management

**Key Responsibilities**:
- Manage all users and their roles
- Configure system settings
- Access all modules and features
- Monitor system activity

**Typical Users**:
- IT Administrators
- System Managers
- Primary Application Owners

### 2. **Risk Plan Sponsor**
**Purpose**: Oversee risk management activities

**Key Responsibilities**:
- Approve risk management plans
- Review and approve risk assessments
- Monitor risk register
- Access project planning features

**Typical Users**:
- Senior Management
- Department Heads
- Project Sponsors

### 3. **Risk Manager**
**Purpose**: Manage day-to-day risk activities

**Key Responsibilities**:
- Create and update risk assessments
- Manage risk register entries
- Generate risk reports
- Coordinate risk mitigation activities

**Typical Users**:
- Risk Management Specialists
- Compliance Officers
- Project Managers

### 4. **Project Manager**
**Purpose**: Manage specific projects and their risks

**Key Responsibilities**:
- Create and manage project plans
- Identify project-specific risks
- Update project status
- Generate project reports

**Typical Users**:
- Project Managers
- Team Leaders
- Project Coordinators

### 5. **Team Member**
**Purpose**: Contribute to risk management activities

**Key Responsibilities**:
- View assigned projects
- Contribute to risk assessments
- Update task status
- Access relevant reports

**Typical Users**:
- Project Team Members
- Subject Matter Experts
- Stakeholders

## Permission System

### Permission Categories

Each permission belongs to a specific category:

#### 🔐 **User Management**
- `user_management_full` - Complete user management access
- `user_management_create` - Create new users
- `user_management_edit` - Edit existing users
- `user_management_delete` - Delete users
- `user_management_view` - View user list and details

#### 📋 **Project Planning**
- `project_planning_full` - Complete project planning access
- `project_planning_create` - Create new projects
- `project_planning_edit` - Edit existing projects
- `project_planning_delete` - Delete projects
- `project_planning_view` - View projects

#### ⚠️ **Issues List**
- `issues_list_full` - Complete issues management access
- `issues_list_create` - Create new issues
- `issues_list_edit` - Edit existing issues
- `issues_list_delete` - Delete issues
- `issues_list_view` - View issues

#### 🎯 **Risk Register**
- `risk_register_full` - Complete risk register access
- `risk_register_create` - Create new risks
- `risk_register_edit` - Edit existing risks
- `risk_register_delete` - Delete risks
- `risk_register_view` - View risks

#### ⚙️ **Admin Settings**
- `admin_settings_full` - Complete admin settings access
- `admin_settings_view` - View admin settings
- `admin_settings_edit` - Edit admin settings

### Permission Hierarchy

**"Full" permissions include all related permissions**:
- `user_management_full` = `user_management_create` + `user_management_edit` + `user_management_delete` + `user_management_view`
- `project_planning_full` = `project_planning_create` + `project_planning_edit` + `project_planning_delete` + `project_planning_view`

## Role-Permission Mapping

### Admin Role
```yaml
Permissions:
  - user_management_full
  - project_planning_full
  - issues_list_full
  - risk_register_full
  - admin_settings_full
```

### Risk Plan Sponsor Role
```yaml
Permissions:
  - project_planning_full
  - issues_list_view
  - risk_register_full
  - admin_settings_view
```

### Risk Manager Role
```yaml
Permissions:
  - project_planning_edit
  - project_planning_view
  - issues_list_full
  - risk_register_full
```

### Project Manager Role
```yaml
Permissions:
  - project_planning_create
  - project_planning_edit
  - project_planning_view
  - issues_list_create
  - issues_list_edit
  - issues_list_view
  - risk_register_create
  - risk_register_edit
  - risk_register_view
```

### Team Member Role
```yaml
Permissions:
  - project_planning_view
  - issues_list_view
  - risk_register_view
```

## How Permissions Work

### 1. **Permission Checking**
When a user tries to access a feature, the system checks:
1. What roles does the user have?
2. What permissions do those roles include?
3. Does the user have the required permission?

### 2. **Example: Creating a New User**
```typescript
// User tries to access "Add User" button
const canCreateUsers = hasPermission(userRoles, 'user_management_create');

// If user has Admin role:
// - Admin role includes 'user_management_full'
// - 'user_management_full' includes 'user_management_create'
// - Result: canCreateUsers = true ✅

// If user has Team Member role:
// - Team Member role has no user management permissions
// - Result: canCreateUsers = false ❌
```

### 3. **Multiple Roles**
Users can have multiple roles, and permissions are combined:
```typescript
// User has both "Project Manager" and "Risk Manager" roles
const userRoles = ['Project Manager', 'Risk Manager'];

// Combined permissions:
// - project_planning_create (from Project Manager)
// - project_planning_edit (from both roles)
// - issues_list_full (from Risk Manager)
// - risk_register_full (from Risk Manager)
```

## Best Practices for Role Assignment

### 1. **Principle of Least Privilege**
- Give users only the permissions they need
- Start with lower-level roles and upgrade as needed
- Don't assign Admin role unless absolutely necessary

### 2. **Role Assignment Guidelines**

#### **For New Users**:
- Start with **Team Member** role
- Upgrade based on demonstrated need
- Document role changes

#### **For Project Teams**:
- **Project Manager**: One per project
- **Team Members**: All project participants
- **Risk Manager**: If project has significant risks

#### **For Organizations**:
- **Admin**: 1-2 people maximum
- **Risk Plan Sponsor**: Senior management
- **Risk Manager**: Dedicated risk management staff

### 3. **Role Review Process**
- Review user roles quarterly
- Remove unused permissions
- Update roles when job responsibilities change
- Document all role changes

## Common Scenarios

### Scenario 1: New Project Team Member
**User**: John Smith, joining Project Alpha
**Recommended Role**: Team Member
**Permissions**: View projects, issues, and risks
**Rationale**: New team members need to see project information but shouldn't modify it initially

### Scenario 2: Project Manager Promotion
**User**: Sarah Johnson, promoted from Team Member to Project Manager
**Current Role**: Team Member
**New Role**: Project Manager
**New Permissions**: Can create/edit projects, issues, and risks
**Rationale**: Project managers need to manage their projects actively

### Scenario 3: Risk Management Specialist
**User**: Mike Chen, hired for risk management
**Recommended Role**: Risk Manager
**Permissions**: Full access to issues and risk register, edit access to projects
**Rationale**: Risk managers need comprehensive access to risk-related features

## Troubleshooting Permission Issues

### Problem: User can't access expected features
**Check**:
1. What roles does the user have?
2. What permissions do those roles include?
3. Is the feature properly protected by permissions?

### Problem: User has too much access
**Solution**:
1. Review user's current roles
2. Remove unnecessary roles
3. Consider creating a custom role with specific permissions

### Problem: Role changes not taking effect
**Check**:
1. User may need to log out and log back in
2. Clear browser cache
3. Verify role changes were saved in database

## Security Considerations

### 1. **Regular Audits**
- Review user roles monthly
- Check for unused accounts
- Verify role assignments are current

### 2. **Access Logging**
- All permission checks are logged
- Failed access attempts are recorded
- Admin actions are tracked

### 3. **Emergency Access**
- Admin role provides emergency access
- Use sparingly and document usage
- Review emergency access regularly

## Next Steps

After understanding the RBAC system:

1. **Review Current Users**: Check existing user roles and permissions
2. **Plan Role Assignments**: Determine appropriate roles for new users
3. **Create Custom Roles**: If needed, create roles with specific permission sets
4. **Document Procedures**: Create role assignment procedures for your organization

## Related Documents

- [Add New User Procedure](./Add%20New%20User%20Procedure.md)
- [Firebase Implementation Plan](../Firebase%20Implementation%20Plan.md)
- [User Profile and Roles Specification](../Latest_Specs/SPOiRMM_User_Profile_and_Roles_v1.md)

---

**Note**: This RBAC system is designed to be flexible and secure. If you need custom roles or permissions, contact your system administrator. 