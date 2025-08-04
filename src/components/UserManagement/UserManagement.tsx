import React, { useState } from 'react';
import { useUserManagement } from '../../hooks/useUserManagement';
import { UserProfile, UserRole, CreateUserRequest } from '../../types/user';
import { useAuth } from '../../contexts/AuthContext';
import UserList from './UserList';
import UserForm from './UserForm';
import UserDetails from './UserDetails';
import { hasPermission } from '../../types/user';


const UserManagement: React.FC = () => {
  const { user: currentUser, userProfile } = useAuth();
  const {
    users,
    loading,
    error,
    selectedUser,
    filters,
    hasMore,
    loadMoreUsers,
    refreshUsers,
    createUser,
    updateUser,
    deactivateUser,
    reactivateUser,
    deleteUser,
    updateUserRoles,
    searchUsers,
    updateFilters,
    clearError,
    setSelectedUser
  } = useUserManagement();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Check if current user has admin permissions using their actual roles
  const userRoles = userProfile?.roles || [];
  const canManageUsers = currentUser && hasPermission(userRoles, 'user_management_full');
  const canCreateUsers = currentUser && hasPermission(userRoles, 'user_management_create');
  const canEditUsers = currentUser && hasPermission(userRoles, 'user_management_edit');

  const handleCreateUser = async (userData: CreateUserRequest) => {
    try {
      // Create the user (this will temporarily sign us in as the new user)
      await createUser(userData);
      setShowCreateForm(false);
      
      // Show success message and redirect to login
      alert(`User "${userData.displayName}" (${userData.email}) has been created successfully!\n\nA password reset email has been sent to the new user.\n\nYou have been signed out and need to sign back in as an administrator.`);
      
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Failed to create user:', error);
      alert(`Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleUserSelect = (user: UserProfile) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleUserUpdate = async (uid: string, updateData: any) => {
    try {
      await updateUser(uid, updateData);
      setShowUserDetails(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleUserDeactivate = async (uid: string) => {
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      try {
        await deactivateUser(uid);
      } catch (error) {
        console.error('Failed to deactivate user:', error);
      }
    }
  };

  const handleUserReactivate = async (uid: string) => {
    try {
      await reactivateUser(uid);
    } catch (error) {
      console.error('Failed to reactivate user:', error);
    }
  };

  const handleUserDelete = async (uid: string) => {
    if (window.confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) {
      try {
        await deleteUser(uid);
        setShowUserDetails(false);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleRoleUpdate = async (uid: string, roles: UserRole[]) => {
    try {
      await updateUserRoles(uid, roles);
    } catch (error) {
      console.error('Failed to update user roles:', error);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      await searchUsers(searchTerm.trim());
    } else {
      refreshUsers();
    }
  };

  const handleFilterChange = (newFilters: any) => {
    updateFilters(newFilters);
  };

  if (!canManageUsers) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to access user management.</p>
      </div>
    );
  }

  return (
    <div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={clearError}
                    className="bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}



        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage user accounts, roles, and permissions
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
              {canCreateUsers && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add User
                </button>
              )}
              <button
                onClick={refreshUsers}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Users
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search by name or email..."
                  className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                />
                <button
                  onClick={handleSearch}
                  className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  Search
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status-filter"
                value={filters.isActive === undefined ? '' : filters.isActive.toString()}
                onChange={(e) => handleFilterChange({ 
                  isActive: e.target.value === '' ? undefined : e.target.value === 'true' 
                })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
              >
                <option value="">All Users</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <div>
              <label htmlFor="role-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                id="role-filter"
                value={filters.roles?.[0] || ''}
                onChange={(e) => handleFilterChange({ 
                  roles: e.target.value ? [e.target.value as UserRole] : undefined 
                })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
              >
                <option value="">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Risk Plan Sponsor">Risk Plan Sponsor</option>
                <option value="Risk Plan Coordinator">Risk Plan Coordinator</option>
                <option value="Working Group Member">Working Group Member</option>
                <option value="Risk Owner">Risk Owner</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
          </div>
        </div>

        {/* User List */}
        <div className="bg-white rounded-lg shadow">
          <UserList
            users={users}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMoreUsers}
            onEditUser={handleUserSelect}
            onDeleteUser={handleUserDelete}
            onViewUser={handleUserSelect}
          />
        </div>

        {/* Create User Modal */}
        {showCreateForm && (
          <UserForm
            onSubmit={handleCreateUser}
            onCancel={() => setShowCreateForm(false)}
            loading={loading}
          />
        )}

        {/* User Details Modal */}
        {showUserDetails && selectedUser && (
          <UserDetails
            user={selectedUser}
            onUpdate={handleUserUpdate}
            onDeactivate={handleUserDeactivate}
            onReactivate={handleUserReactivate}
            onDelete={handleUserDelete}
            onRoleUpdate={handleRoleUpdate}
            onClose={() => setShowUserDetails(false)}
            loading={loading}
            canEditUsers={canEditUsers}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagement; 