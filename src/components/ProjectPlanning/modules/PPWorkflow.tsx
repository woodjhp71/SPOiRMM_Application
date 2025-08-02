import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface PPWorkflowProps {
  data: any;
  updateData: (data: any) => void;
  projectData: any;
}

const PPWorkflow: React.FC<PPWorkflowProps> = () => {
  const navigate = useNavigate();
  const { id: projectId } = useParams<{ id: string }>();
  
  const workflowSteps = [
    {
      id: 'issues',
      name: 'Issues List',
      description: 'Issue tracking and management',
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
      status: 'pending',
      route: `/project/${projectId}/issues`
    },
    {
      id: 'planning',
      name: 'Project Planning',
      description: 'Current module - Project planning and governance',
      icon: DocumentTextIcon,
      color: 'bg-purple-500',
      status: 'active',
      route: `/project/${projectId}`
    },
    {
      id: 'register',
      name: 'Risk Register',
      description: 'Formal risk documentation and assessment',
      icon: ChartBarIcon,
      color: 'bg-green-500',
      status: 'pending',
      route: `/project/${projectId}/register`
    }
  ];

  const integrationLinks = [
    {
      id: 'players-chart',
      name: 'Players Chart',
      description: 'Organization-level stakeholder overview and role mapping',
      icon: UsersIcon,
      color: 'bg-blue-500',
      status: 'read-only',
      route: '/organization',
      isExternal: true
    },
    {
      id: 'organization-setup',
      name: 'Organization Setup',
      description: 'Internal departments and structures',
      icon: BuildingOfficeIcon,
      color: 'bg-indigo-500',
      status: 'read-only',
      route: '/organization',
      isExternal: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'read-only':
        return 'bg-gray-50 text-gray-500 border-gray-100';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-purple-800 mb-4">
          SPOiRMM Workflow Navigation
        </h2>
        <p className="text-purple-700 mb-6">
          Navigate through the integrated risk management workflow. Project-level components focus on issues and risks, while stakeholder context is managed at the organization level for consistency across all projects.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="relative">
              <div 
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md cursor-pointer
                  ${getStatusColor(step.status)}
                `}
                onClick={() => navigate(step.route)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${step.color} text-white`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{step.name}</h3>
                    <p className="text-xs opacity-75 mt-1">{step.description}</p>
                  </div>
                </div>
                
                {step.status === 'active' && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                      Active
                    </div>
                  </div>
                )}
              </div>
              
              {index < workflowSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                  <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Integration Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          Organization-Level Integrations
        </h3>
        <p className="text-blue-700 mb-6">
          Reference organization-level data and structures. These components provide read-only context for project planning.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrationLinks.map((link) => (
            <div key={link.id} className="relative">
              <div 
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200
                  ${getStatusColor(link.status)}
                `}
                onClick={() => navigate(link.route)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${link.color} text-white`}>
                    <link.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{link.name}</h3>
                    <p className="text-xs opacity-75 mt-1">{link.description}</p>
                  </div>
                </div>
                
                <div className="absolute -top-2 -right-2">
                  <div className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                    Read-Only
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => navigate(`/project/${projectId}/issues`)}
            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
            Go to Issues List
          </button>
          <button 
            onClick={() => navigate(`/project/${projectId}/register`)}
            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <ChartBarIcon className="h-4 w-4 mr-2" />
            Go to Risk Register
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Workflow Guidance
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Complete each module in sequence to ensure proper risk management framework development. 
                The current Project Planning module should be completed before proceeding to the Risk Register.
                Player role context is sourced from the organization level and is read-only within project planning.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <CogIcon className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Integration Notes
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                • Players Chart provides stakeholder context from the organization level<br/>
                • Organization Setup contains internal departments and structures<br/>
                • All organizational data is read-only within project planning<br/>
                • Issues List and Risk Register can be launched and linked directly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPWorkflow; 