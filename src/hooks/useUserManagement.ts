import { useState, useEffect, useCallback } from 'react';
import { UserService } from '../services/userService';
import { 
  UserProfile, 
  CreateUserRequest, 
  UpdateUserRequest, 
  UserListFilters,
  UserRole,
  Permission
} from '../types/user';
import { useAuth } from '../contexts/AuthContext';

export const useUserManagement = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [filters, setFilters] = useState<UserListFilters>({});
  const [hasMore, setHasMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<any>(null);

  // Load users with pagination
  const loadUsers = useCallback(async (reset = false) => {
    if (!currentUser?.uid) return;

    try {
      setLoading(true);
      setError(null);

      const startAfterDoc = reset ? null : lastDoc;
      const result = await UserService.getUsers(filters, startAfterDoc);

      if (reset) {
        setUsers(result.users);
      } else {
        setUsers(prev => [...prev, ...result.users]);
      }

      setLastDoc(result.lastDoc);
      setHasMore(result.lastDoc !== null); // Only has more if there's a lastDoc
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid, filters, lastDoc]);

  // Load more users (pagination)
  const loadMoreUsers = useCallback(() => {
    if (!loading && hasMore) {
      loadUsers(false);
    }
  }, [loading, hasMore, loadUsers]);

  // Refresh users list
  const refreshUsers = useCallback(() => {
    setLastDoc(null);
    setHasMore(false); // Start with false, will be updated after loading
    loadUsers(true);
  }, [loadUsers]);

  // Create new user
  const createUser = useCallback(async (userData: CreateUserRequest) => {
    if (!currentUser?.uid) {
      throw new Error('No authenticated user');
    }

    try {
      setLoading(true);
      setError(null);

      const newUser = await UserService.createUser(userData, currentUser.uid);
      
      // Add to the beginning of the list
      setUsers(prev => [newUser, ...prev]);
      
      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid]);

  // Update user
  const updateUser = useCallback(async (uid: string, updateData: UpdateUserRequest) => {
    try {
      setLoading(true);
      setError(null);

      await UserService.updateUser(uid, updateData);
      
      // Update user in the list
      setUsers(prev => prev.map(user => 
        user.uid === uid 
          ? { ...user, ...updateData, updatedAt: new Date() }
          : user
      ));

      // Update selected user if it's the one being updated
      if (selectedUser?.uid === uid) {
        setSelectedUser(prev => prev ? { ...prev, ...updateData, updatedAt: new Date() } : null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [selectedUser?.uid]);

  // Deactivate user
  const deactivateUser = useCallback(async (uid: string) => {
    try {
      setLoading(true);
      setError(null);

      await UserService.deactivateUser(uid);
      
      // Update user in the list
      setUsers(prev => prev.map(user => 
        user.uid === uid 
          ? { ...user, isActive: false, updatedAt: new Date() }
          : user
      ));

      // Update selected user if it's the one being deactivated
      if (selectedUser?.uid === uid) {
        setSelectedUser(prev => prev ? { ...prev, isActive: false, updatedAt: new Date() } : null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to deactivate user';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [selectedUser?.uid]);

  // Reactivate user
  const reactivateUser = useCallback(async (uid: string) => {
    try {
      setLoading(true);
      setError(null);

      await UserService.reactivateUser(uid);
      
      // Update user in the list
      setUsers(prev => prev.map(user => 
        user.uid === uid 
          ? { ...user, isActive: true, updatedAt: new Date() }
          : user
      ));

      // Update selected user if it's the one being reactivated
      if (selectedUser?.uid === uid) {
        setSelectedUser(prev => prev ? { ...prev, isActive: true, updatedAt: new Date() } : null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reactivate user';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [selectedUser?.uid]);

  // Delete user
  const deleteUser = useCallback(async (uid: string) => {
    try {
      setLoading(true);
      setError(null);

      await UserService.deleteUser(uid);
      
      // Remove user from the list
      setUsers(prev => prev.filter(user => user.uid !== uid));

      // Clear selected user if it's the one being deleted
      if (selectedUser?.uid === uid) {
        setSelectedUser(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [selectedUser?.uid]);

  // Update user roles
  const updateUserRoles = useCallback(async (uid: string, roles: UserRole[]) => {
    try {
      setLoading(true);
      setError(null);

      await UserService.updateUserRoles(uid, roles);
      
      // Update user in the list
      setUsers(prev => prev.map(user => 
        user.uid === uid 
          ? { ...user, roles, updatedAt: new Date() }
          : user
      ));

      // Update selected user if it's the one being updated
      if (selectedUser?.uid === uid) {
        setSelectedUser(prev => prev ? { ...prev, roles, updatedAt: new Date() } : null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user roles';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [selectedUser?.uid]);

  // Add user to project
  const addUserToProject = useCallback(async (uid: string, projectId: string) => {
    try {
      setLoading(true);
      setError(null);

      await UserService.addUserToProject(uid, projectId);
      
      // Update user in the list
      setUsers(prev => prev.map(user => {
        if (user.uid === uid) {
          const updatedProjects = [...new Set([...user.activeProjects, projectId])];
          return { ...user, activeProjects: updatedProjects, updatedAt: new Date() };
        }
        return user;
      }));

      // Update selected user if it's the one being updated
      if (selectedUser?.uid === uid) {
        const updatedProjects = [...new Set([...selectedUser.activeProjects, projectId])];
        setSelectedUser(prev => prev ? { ...prev, activeProjects: updatedProjects, updatedAt: new Date() } : null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add user to project';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [selectedUser?.uid]);

  // Remove user from project
  const removeUserFromProject = useCallback(async (uid: string, projectId: string) => {
    try {
      setLoading(true);
      setError(null);

      await UserService.removeUserFromProject(uid, projectId);
      
      // Update user in the list
      setUsers(prev => prev.map(user => {
        if (user.uid === uid) {
          const updatedProjects = user.activeProjects.filter(id => id !== projectId);
          return { ...user, activeProjects: updatedProjects, updatedAt: new Date() };
        }
        return user;
      }));

      // Update selected user if it's the one being updated
      if (selectedUser?.uid === uid) {
        const updatedProjects = selectedUser.activeProjects.filter(id => id !== projectId);
        setSelectedUser(prev => prev ? { ...prev, activeProjects: updatedProjects, updatedAt: new Date() } : null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove user from project';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [selectedUser?.uid]);

  // Search users
  const searchUsers = useCallback(async (searchTerm: string, organizationId?: string) => {
    try {
      setLoading(true);
      setError(null);

      const searchResults = await UserService.searchUsers(searchTerm, organizationId);
      setUsers(searchResults);
      setHasMore(false); // Search results don't support pagination
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search users');
    } finally {
      setLoading(false);
    }
  }, []);

  // Check user permission
  const checkUserPermission = useCallback(async (uid: string, permission: Permission) => {
    try {
      return await UserService.checkUserPermission(uid, permission);
    } catch (err) {
      console.error('Error checking user permission:', err);
      return false;
    }
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<UserListFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setLastDoc(null);
    setHasMore(false); // Start with false, will be updated after loading
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load users on mount and when filters change
  useEffect(() => {
    if (currentUser?.uid) {
      refreshUsers();
    }
  }, [currentUser?.uid, filters, refreshUsers]);

  return {
    // State
    users,
    loading,
    error,
    selectedUser,
    filters,
    hasMore,

    // Actions
    loadUsers,
    loadMoreUsers,
    refreshUsers,
    createUser,
    updateUser,
    deactivateUser,
    reactivateUser,
    deleteUser,
    updateUserRoles,
    addUserToProject,
    removeUserFromProject,
    searchUsers,
    checkUserPermission,
    updateFilters,
    clearError,
    setSelectedUser
  };
}; 