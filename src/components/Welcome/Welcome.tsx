import React from 'react';
import NavButton from './NavButton';

const Welcome: React.FC = () => {
  // Mock user data - in a real app this would come from authentication context
  const userName = 'Lisa Chen';
  const userRole = 'Risk Plan Coordinator';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">SPOiRMM</h1>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Welcome back, {userName}
                </h2>
                <p className="text-sm text-gray-500">{userRole}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome</h2>
          <p className="text-lg text-gray-600">Select a module to continue</p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <NavButton
            label="Dashboard"
            color="blue"
            navigateTo="/dashboard"
            description="View your personalized dashboard with projects, action items, and key metrics"
          />
          <NavButton
            label="Planning"
            color="red"
            navigateTo="/planning"
            description="Access project planning tools and risk assessment modules"
          />
          <NavButton
            label="Reports"
            color="teal"
            navigateTo="/reports"
            description="Generate and view comprehensive risk management reports"
          />
          <NavButton
            label="Admin / Settings"
            color="yellow"
            navigateTo="/admin"
            description="Manage system settings, user permissions, and administrative functions"
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