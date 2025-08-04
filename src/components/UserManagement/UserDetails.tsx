import React, { useState } from 'react';
import { UserProfile, UserRole, UpdateUserRequest } from '../../types/user';

interface UserDetailsProps {
  user: UserProfile;
  onUpdate: (uid: string, updateData: UpdateUserRequest) => Promise<void>;
  onDeactivate: (uid: string) => void;
  onReactivate: (uid: string) => void;
  onDelete: (uid: string) => void;
  onRoleUpdate: (uid: string, roles: UserRole[]) => void;
  onClose: () => void;
  loading: boolean;
  canEditUsers: boolean;
}

const UserDetails: React.FC<UserDetailsProps> = ({
  user,
  onUpdate,
  onDeactivate,
  onReactivate,
  onDelete,
  onRoleUpdate,
  onClose,
  loading,
  canEditUsers
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    displayName: user.displayName,
    roles: [...user.roles]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableRoles: UserRole[] = [
    'Admin',
    'Risk Plan Sponsor',
    'Risk Plan Coordinator',
    'Working Group Member',
    'Risk Owner',
    'Viewer'
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-800';
      case 'Risk Plan Sponsor':
        return 'bg-purple-100 text-purple-800';
      case 'Risk Plan Coordinator':
        return 'bg-blue-100 text-blue-800';
      case 'Working Group Member':
        return 'bg-green-100 text-green-800';
      case 'Risk Owner':
        return 'bg-yellow-100 text-yellow-800';
      case 'Viewer':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!editData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }

    if (editData.roles.length === 0) {
      newErrors.roles = 'At least one role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await onUpdate(user.uid, {
        displayName: editData.displayName,
        roles: editData.roles
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleCancel = () => {
    setEditData({
      displayName: user.displayName,
      roles: [...user.roles]
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleRoleToggle = (role: UserRole) => {
    setEditData(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
    if (errors.roles) {
      setErrors(prev => ({ ...prev, roles: '' }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">User Details</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* User Avatar and Basic Info */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-sky-500 flex items-center justify-center">
                  <span className="text-xl font-medium text-white">
                    {user.displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={editData.displayName}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 ${
                        errors.displayName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      disabled={loading}
                    />
                    {errors.displayName && (
                      <p className="mt-1 text-sm text-red-600">{errors.displayName}</p>
                    )}
                  </div>
                ) : (
                  <h4 className="text-xl font-medium text-gray-900">{user.displayName}</h4>
                )}
                <p className="text-sm text-gray-500">{user.email}</p>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            {/* User Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">User Information</h5>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">User ID</dt>
                    <dd className="text-sm text-gray-900 font-mono">{user.uid}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Organization</dt>
                    <dd className="text-sm text-gray-900">{user.organizationId}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Created</dt>
                    <dd className="text-sm text-gray-900">{formatDate(user.createdAt)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd className="text-sm text-gray-900">{formatDate(user.updatedAt)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Login</dt>
                    <dd className="text-sm text-gray-900">
                      {user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Never'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">Active Projects</h5>
                {user.activeProjects.length > 0 ? (
                  <ul className="space-y-1">
                    {user.activeProjects.map((projectId) => (
                      <li key={projectId} className="text-sm text-gray-900">
                        {projectId}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No active projects</p>
                )}
              </div>
            </div>

            {/* Roles Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-medium text-gray-900">Roles</h5>
                {canEditUsers && !isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-sky-600 hover:text-sky-900"
                  >
                    Edit
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-2">
                  {availableRoles.map((role) => (
                    <label key={role} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editData.roles.includes(role)}
                        onChange={() => handleRoleToggle(role)}
                        disabled={loading}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{role}</span>
                    </label>
                  ))}
                  {errors.roles && (
                    <p className="mt-1 text-sm text-red-600">{errors.roles}</p>
                  )}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                    <span
                      key={role}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(role)}`}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <div className="flex space-x-3">
                {canEditUsers && (
                  <>
                    {user.isActive ? (
                      <button
                        onClick={() => onDeactivate(user.uid)}
                        disabled={loading}
                        className="px-4 py-2 border border-yellow-300 rounded-md text-sm font-medium text-yellow-700 bg-white hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => onReactivate(user.uid)}
                        disabled={loading}
                        className="px-4 py-2 border border-green-300 rounded-md text-sm font-medium text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                      >
                        Activate
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(user.uid)}
                      disabled={loading}
                      className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
              
              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails; 