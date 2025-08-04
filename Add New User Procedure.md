# Add New User Procedure

## Overview
This document outlines the step-by-step procedure for administrators to add new users to the SPOiRMM (Strategic Planning of Integrated Risk Management Model) system.

## Prerequisites
- Administrator access to the SPOiRMM system
- Valid admin credentials (e.g., spoirmmitc2@gmail.com)
- User's email address and basic information
- Understanding of the role-based access control system

## User Roles and Permissions

### Available Roles
1. **Admin** - Full system access and user management capabilities
2. **Risk Plan Sponsor** - Can approve project planning and view issues/risks
3. **Risk Plan Coordinator** - Can edit project planning and manage issues/risks
4. **Working Group Member** - Can view projects and create issues
5. **Risk Owner** - Can view projects and edit assigned risks
6. **Viewer** - Read-only access to projects, issues, and risks

### Permission Hierarchy
- **Admin**: All permissions
- **Risk Plan Sponsor**: Project approval, issue/risk viewing
- **Risk Plan Coordinator**: Project editing, issue/risk management
- **Working Group Member**: Project viewing, issue creation
- **Risk Owner**: Project viewing, assigned risk editing
- **Viewer**: Read-only access to all modules

## Step-by-Step Procedure

### Step 1: Access the Admin Panel
1. Log in to the SPOiRMM system with admin credentials
2. Navigate to the **Admin/Settings** section from the main menu
3. Click on the **"User Management"** tab

### Step 2: Initiate User Creation
1. In the User Management interface, locate the **"Add User"** button
2. Click the **"Add User"** button to open the user creation form

### Step 3: Fill Out User Information
Complete the following fields in the user creation form:

#### Required Information
- **Email Address**: User's valid email address (will be used for login)
- **Display Name**: User's full name as it should appear in the system
- **Organization ID**: The organization the user belongs to
- **Roles**: Select one or more appropriate roles from the dropdown

#### Optional Information
- **Active Projects**: Projects the user should be assigned to (can be added later)

### Step 4: Review and Submit
1. Double-check all entered information for accuracy
2. Ensure the selected roles align with the user's responsibilities
3. Click **"Create User"** to submit the form

### Step 5: User Account Setup
After user creation, the system will automatically:

1. **Create Firebase Auth Account**: Generate a secure user account
2. **Generate Temporary Password**: Create a secure temporary password
3. **Send Password Reset Email**: Email the user with password reset instructions
4. **Create Firestore Profile**: Store user profile with roles and permissions
5. **Set Account Status**: Mark account as active

### Step 6: User Onboarding
The new user will receive an email with:
- Welcome message
- Password reset link
- Instructions to set their own password
- Basic system access information

## Post-Creation Tasks

### For the Administrator
1. **Verify User Creation**: Check that the user appears in the user list
2. **Assign to Projects** (if needed): Add user to specific projects
3. **Communicate Access**: Inform the user about their account creation
4. **Provide Training**: Offer system training if required

### For the New User
1. **Check Email**: Look for the password reset email
2. **Set Password**: Follow the link to create a secure password
3. **First Login**: Log in to the system
4. **Review Permissions**: Understand their role and access levels
5. **Complete Profile**: Update any additional profile information

## User Management Features

### Available Actions for Administrators
- **Edit User**: Modify display name, roles, and project assignments
- **Deactivate User**: Temporarily disable user access
- **Reactivate User**: Re-enable previously deactivated users
- **Delete User**: Permanently remove user (use with caution)
- **View User Details**: See comprehensive user information
- **Search Users**: Find users by name or email
- **Filter Users**: Filter by role, status, or organization

### User Status Management
- **Active**: User can log in and access the system
- **Inactive**: User cannot log in (temporary suspension)
- **Deleted**: User permanently removed from system

## Security Considerations

### Password Policy
- Temporary passwords are automatically generated
- Users must set their own password on first login
- Password reset emails are sent automatically
- Passwords should meet security requirements

### Access Control
- Users can only access features based on their assigned roles
- Permissions are enforced at both client and server levels
- All user actions are logged for audit purposes
- Organization-based access isolation is maintained

### Best Practices
1. **Principle of Least Privilege**: Assign only necessary roles
2. **Regular Review**: Periodically review user roles and access
3. **Secure Communication**: Use secure channels for sharing credentials
4. **Documentation**: Keep records of user creation and role assignments

## Troubleshooting

### Common Issues

#### User Not Receiving Email
- Check spam/junk folder
- Verify email address is correct
- Resend password reset email from admin panel

#### User Cannot Log In
- Verify account is active
- Check if password reset was completed
- Confirm roles are properly assigned

#### Permission Issues
- Review assigned roles
- Check role permissions in the system
- Verify organization access settings

### Support Contacts
- **Technical Support**: For system-related issues
- **Administrator**: For user management questions
- **Security Team**: For access control concerns

## System Requirements

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Network Requirements
- Stable internet connection
- Access to Firebase services
- Email delivery capability

## Compliance and Audit

### Audit Trail
- All user creation events are logged
- Role changes are tracked
- Access attempts are recorded
- Administrative actions are documented

### Data Protection
- User data is stored securely in Firebase
- Personal information is protected
- Access is controlled and monitored
- Regular security reviews are conducted

## Updates and Maintenance

### System Updates
- User management features may be updated
- New roles may be added
- Permission structures may change
- Administrators will be notified of changes

### Documentation Updates
- This procedure will be updated as needed
- Version control is maintained
- Changes are communicated to administrators

---

**Document Version**: 1.0  
**Last Updated**: [Current Date]  
**Next Review**: [Date + 6 months]  
**Author**: SPOiRMM Development Team  
**Approved By**: System Administrator 