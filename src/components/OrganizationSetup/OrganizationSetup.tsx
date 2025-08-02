import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserGroupIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  CogIcon,
  ShieldCheckIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import OrgPlayers from './modules/OrgPlayers';

// Mock user role - in real app this would come from authentication context
const mockUserRole = 'Risk Plan Coordinator' as const;

interface Module {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  component: React.ComponentType;
}

const OrganizationSetup: React.FC = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState<string | null>(null);

  // Check if user has access to Organization Setup
  const hasAccess = ['Admin', 'Risk Plan Coordinator'].includes(mockUserRole);

  const handleBackClick = () => {
    navigate('/');
  };

  const modules: Module[] = [
    {
      id: 'players',
      name: 'Org Players',
      description: 'Manage master Player list with conditional logic',
      icon: UserGroupIcon,
      color: 'blue',
      component: OrgPlayers
    },
    {
      id: 'departments',
      name: 'Org Departments',
      description: 'Define internal departments (L1, L2, L3 functions)',
      icon: BuildingOfficeIcon,
      color: 'green',
      component: () => <div className="p-6">Org Departments Module - Coming Soon</div>
    },
    {
      id: 'agreements',
      name: 'Org Agreements',
      description: 'Store reusable contract or SLA records',
      icon: DocumentTextIcon,
      color: 'purple',
      component: () => <div className="p-6">Org Agreements Module - Coming Soon</div>
    },
    {
      id: 'policies',
      name: 'Org Policies',
      description: 'Define risk evaluation criteria and governance standards',
      icon: ShieldCheckIcon,
      color: 'red',
      component: () => <div className="p-6">Org Policies Module - Coming Soon</div>
    },
    {
      id: 'settings',
      name: 'Org Settings',
      description: 'Set time zone, jurisdiction, and default frameworks',
      icon: CogIcon,
      color: 'yellow',
      component: () => <div className="p-6">Org Settings Module - Coming Soon</div>
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-600',
        hover: 'hover:bg-blue-700',
        border: 'border-blue-200',
        text: 'text-blue-700',
        icon: 'text-blue-500'
      },
      green: {
        bg: 'bg-green-600',
        hover: 'hover:bg-green-700',
        border: 'border-green-200',
        text: 'text-green-700',
        icon: 'text-green-500'
      },
      purple: {
        bg: 'bg-purple-600',
        hover: 'hover:bg-purple-700',
        border: 'border-purple-200',
        text: 'text-purple-700',
        icon: 'text-purple-500'
      },
      red: {
        bg: 'bg-red-600',
        hover: 'hover:bg-red-700',
        border: 'border-red-200',
        text: 'text-red-700',
        icon: 'text-red-500'
      },
      yellow: {
        bg: 'bg-yellow-600',
        hover: 'hover:bg-yellow-700',
        border: 'border-yellow-200',
        text: 'text-yellow-700',
        icon: 'text-yellow-500'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header
          className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md"
          role="banner"
          aria-label="Application Header"
        >
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">SPOiRMM</h1>
              </div>
              <div className="text-center flex-1">
                <h2 className="text-2xl font-bold text-white">Organization Setup</h2>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={handleBackClick}
                  className="p-2 text-white hover:text-red-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-md transition-colors duration-200"
                  aria-label="Return to main navigation"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <ShieldCheckIcon className="mx-auto h-16 w-16 text-red-400" />
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Access Denied</h1>
            <p className="mt-2 text-gray-600">
              You don't have permission to access the Organization Setup page.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              This page is restricted to Administrators and Risk Plan Coordinators.
            </p>
            <button
              onClick={handleBackClick}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Main Menu
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header
        className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md"
        role="banner"
        aria-label="Application Header"
      >
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-white">SPOiRMM</h1>
            </div>
            <div className="text-center flex-1">
              <h2 className="text-2xl font-bold text-white">Organization Setup and Configuration</h2>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleBackClick}
                className="p-2 text-white hover:text-indigo-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-md transition-colors duration-200"
                aria-label="Return to main navigation"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!activeModule ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Organization Setup
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Manage enterprise-level data and configuration for {mockUserRole}
              </p>
              <p className="text-lg text-gray-600">Select a module to continue</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {modules.map((module) => {
                const colors = getColorClasses(module.color);
                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`relative group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-${module.color}-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${module.color}-500`}
                    aria-label={`Open ${module.name} module`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`flex-shrink-0 p-3 rounded-lg ${colors.bg} text-white`}>
                        <module.icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
                          {module.name}
                        </h3>
                        <p className="text-sm text-gray-600 group-hover:text-gray-500">
                          {module.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={handleBackClick}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200"
                aria-label="Return to main navigation"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back to Main Menu
              </button>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-gray-500">
                SPOiRMM - Strategic Planning of Integrated Risk Management Model
              </p>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setActiveModule(null)}
                    className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Back to Modules
                  </button>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {modules.find(m => m.id === activeModule)?.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {modules.find(m => m.id === activeModule)?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              {(() => {
                const module = modules.find(m => m.id === activeModule);
                if (module) {
                  const Component = module.component;
                  return <Component />;
                }
                return null;
              })()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrganizationSetup; 