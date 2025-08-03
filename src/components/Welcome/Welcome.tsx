import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import NavButton from './NavButton';
import Header from '../Header/Header';

const Welcome: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Don't show welcome page if user is not authenticated (will redirect)
  if (!user) {
    return null;
  }

  // User data for authenticated users
  const userName = user.displayName || user.email || 'User';
  const userRole = 'Risk Plan Coordinator';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Risk Management Platform Navigation" showUserInfo={true} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome, {userName}
          </h2>
          <p className="text-lg text-gray-600 mb-4">{userRole}</p>
          <p className="text-lg text-gray-600">Select a module to continue</p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <NavButton
            label="Dashboard"
            color="blue"
            navigateTo="/dashboard"
            description="Access your personalized dashboard with project overview and key metrics"
          />
          <NavButton
            label="Planning"
            color="red"
            navigateTo="/planning"
            description="Manage project planning, workflows, and risk assessment activities"
          />
          <NavButton
            label="Reports"
            color="teal"
            navigateTo="/reports"
            description="Generate and view comprehensive risk management reports and analytics"
          />
          <NavButton
            label="Admin / Settings"
            color="yellow"
            navigateTo="/admin"
            description="Configure system settings, user management, and administrative functions"
          />
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            SPOiRMM - Strategic Planning of Integrated Risk Management Model
          </p>
        </div>
      </main>
    </div>
  );
};

export default Welcome; 