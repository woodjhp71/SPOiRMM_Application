import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { classNames } from '../../utils/classNames';
import { useProject as useProjectContext } from '../../contexts/ProjectContext';
import { useProject as useProjectData } from '../../hooks/useProject';
import PPWorkflow from './modules/PPWorkflow';
import PPDetails from './modules/PPDetails';
import PPActionPlan from './modules/PPActionPlan';
import PPWorkingGroups from './modules/PPWorkingGroups';
import PPAssessment from './modules/PPAssessment';
import PlayersChart from '../PlayersChart/PlayersChart';
import IssuesList from '../IssuesList/IssuesList';
import RiskRegister from '../RiskRegister/RiskRegister';
import { Player } from '../PlayersChart/PlayersChart';
import { Issue } from '../IssuesList/IssuesList';
import { Risk } from '../RiskRegister/RiskRegister';
import {
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

export interface ProjectPlanningData {
  workflow: any;
  details: {
    projectTitle: string;
    startDate: string;
    endDate: string;
    projectManager: string;
    riskPlanSponsor: string;
    riskPlanCoordinator: string;
    projectStatus: 'New' | 'In Progress' | 'Closed';
    planApproved: boolean;
    approvalDate: string;
    projectDescription: string;
    whyNeeded: string;
    objectives: string;
  };
  actionPlan: Array<{
    id: string;
    taskNumber: number;
    description: string;
    assignedTo: string;
    dueDate: string;
    status: 'New' | 'In Progress' | 'Completed';
    notes: string;
  }>;
  workingGroups: Array<{
    id: string;
    groupName: string;
    members: string[];
    meetingDates: string[];
  }>;
  assessment: {
    needsSatisfied: boolean;
    needsDescription: string;
    objectivesAchieved: boolean;
    objectivesDescription: string;
    projectManagerSignoff: boolean;
    signoffDate: string;
  };
  players: Player[];
  issues: Issue[];
  risks: Risk[];
}

interface NavigationItem {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  dataKey: keyof ProjectPlanningData;
  icon: React.ComponentType<any>;
  color: string;
  status: 'New' | 'In Progress' | 'Completed';
  description: string;
}

const ProjectPlanning: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { projectData: contextProjectData, loadProjectData } = useProjectContext();
  const { data: apiProjectData, isLoading, error } = useProjectData(projectId || '');

  const handleBackClick = () => {
    navigate('/');
  };
  
  // Get the tab parameter from URL and set initial active tab
  const tabParam = searchParams.get('tab');
  const getInitialTab = () => {
    if (tabParam === 'working-groups') return 3;
    if (tabParam === 'workflow') return 0;
    if (tabParam === 'details') return 1;
    if (tabParam === 'action-plan') return 2;
    if (tabParam === 'assessment') return 4;
    if (tabParam === 'players') return 5;
    if (tabParam === 'issues') return 6;
    if (tabParam === 'register') return 7;
    return 0; // Default to first tab
  };
  
  const [activeTab, setActiveTab] = useState(getInitialTab());
  
  // Load project data from API into context when available
  useEffect(() => {
    if (apiProjectData) {
      // Always load the new project data, regardless of existing context data
      loadProjectData(apiProjectData);
    }
  }, [apiProjectData, loadProjectData]);

  // Update active tab when URL parameter changes
  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [tabParam]);

  const projectData = contextProjectData || {
    workflow: {},
    details: {
      projectTitle: '',
      startDate: '',
      endDate: '',
      projectManager: '',
      riskPlanSponsor: '',
      riskPlanCoordinator: '',
      projectStatus: 'New',
      planApproved: false,
      approvalDate: '',
      projectDescription: '',
      whyNeeded: '',
      objectives: '',
    },
    actionPlan: [],
    workingGroups: [],
    assessment: {
      needsSatisfied: false,
      needsDescription: '',
      objectivesAchieved: false,
      objectivesDescription: '',
      projectManagerSignoff: false,
      signoffDate: '',
    },
    issues: [],
    risks: [],
  };

  const navigationItems: NavigationItem[] = [
    {
      id: 'workflow',
      name: 'Workflow',
      component: PPWorkflow,
      dataKey: 'workflow',
      icon: DocumentTextIcon,
      color: 'bg-purple-500',
      status: 'In Progress',
      description: 'Project workflow and navigation'
    },
    {
      id: 'details',
      name: 'Project Details',
      component: PPDetails,
      dataKey: 'details',
      icon: DocumentTextIcon,
      color: 'bg-blue-500',
      status: 'Completed',
      description: 'Project information and metadata'
    },
    {
      id: 'action-plan',
      name: 'Action Plan',
      component: PPActionPlan,
      dataKey: 'actionPlan',
      icon: ClipboardDocumentListIcon,
      color: 'bg-green-500',
      status: 'In Progress',
      description: 'Task management and action items'
    },
    {
      id: 'working-groups',
      name: 'Working Groups',
      component: PPWorkingGroups,
      dataKey: 'workingGroups',
      icon: UserGroupIcon,
      color: 'bg-orange-500',
      status: 'New',
      description: 'Team collaboration and meetings'
    },
    {
      id: 'assessment',
      name: 'Assessment',
      component: PPAssessment,
      dataKey: 'assessment',
      icon: ClipboardDocumentCheckIcon,
      color: 'bg-yellow-500',
      status: 'New',
      description: 'Project evaluation and signoff'
    },
    {
      id: 'players',
      name: 'Players Chart',
      component: PlayersChart,
      dataKey: 'players',
      icon: UsersIcon,
      color: 'bg-indigo-500',
      status: 'New',
      description: 'Stakeholder mapping and roles'
    },
    {
      id: 'issues',
      name: 'Issues List',
      component: IssuesList,
      dataKey: 'issues',
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
      status: 'New',
      description: 'Issue tracking and management'
    },
    {
      id: 'register',
      name: 'Risk Register',
      component: RiskRegister,
      dataKey: 'risks',
      icon: ChartBarIcon,
      color: 'bg-teal-500',
      status: 'New',
      description: 'Risk documentation and assessment'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New':
        return '●';
      case 'In Progress':
        return '●';
      case 'Completed':
        return '●';
      default:
        return '●';
    }
  };
  
  const updateProjectData = (section: keyof ProjectPlanningData, data: any) => {
    if (contextProjectData) {
      // This would typically update the API as well
      // For now, we'll just update the context
      console.log(`Updating ${section} with:`, data);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading project data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg font-medium mb-2">Error loading project</div>
          <p className="text-gray-600">Unable to load project data. Please try again.</p>
        </div>
      </div>
    );
  }

  const activeItem = navigationItems[activeTab];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className="bg-gradient-to-r from-indigo-700 to-indigo-800 text-white shadow-md"
        role="banner"
        aria-label="Application Header"
      >
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-white">SPOiRMM</h1>
            </div>
            <div className="text-center flex-1">
              <h2 className="text-2xl font-bold text-white">Risk Management Project Planning and Governance</h2>
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

      {/* Main Content */}
      <main className="flex flex-row min-h-screen">
        {/* Sidebar Navigation */}
        <nav 
          className="w-64 bg-white shadow-lg overflow-y-auto"
          aria-label="Project Planning Navigation"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item, index) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => setActiveTab(index)}
                    className={classNames(
                      'w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                      'hover:shadow-md transform hover:scale-105',
                      activeTab === index
                        ? 'bg-blue-100 text-blue-700 font-semibold shadow-md'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                    role="tab"
                    aria-selected={activeTab === index}
                    aria-label={`Navigate to ${item.name} module`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${item.color} text-white flex-shrink-0`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="truncate">{item.name}</span>
                          <div className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 truncate">{item.description}</p>
                      </div>
                      <ChevronRightIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    </div>
                  </button>
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs rounded py-2 px-3 whitespace-nowrap">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-gray-300">{item.description}</div>
                      <div className="text-gray-400 mt-1">Status: {item.status}</div>
                    </div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-50 p-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              {navigationItems[activeTab] && React.createElement(navigationItems[activeTab].component, {
                data: projectData[navigationItems[activeTab].dataKey] as any,
                updateData: (data: any) => updateProjectData(navigationItems[activeTab].dataKey, data),
                projectData: projectData
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Integration Section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Integration & References</h3>
              <p className="text-sm text-gray-600 mt-1">
                This project planning module integrates with organization-level components for comprehensive risk management.
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Players Chart Integration */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-blue-500 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium text-blue-900">Players Chart (Organization-level)</h4>
                  </div>
                  <p className="text-blue-800 text-sm mb-3">
                    Stakeholder context and role mapping are managed at the organization level for consistency across all projects.
                  </p>
                  <button
                    onClick={() => navigate('/organization')}
                    className="inline-flex items-center px-3 py-2 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    View Organization Players
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Organization Setup Integration */}
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-purple-500 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium text-purple-900">Internal Functions & Organization Setup</h4>
                  </div>
                  <p className="text-purple-800 text-sm mb-3">
                    Department structures, internal functions, and organizational context are configured at the organization level.
                  </p>
                  <button
                    onClick={() => navigate('/organization')}
                    className="inline-flex items-center px-3 py-2 border border-purple-300 text-sm font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                  >
                    View Organization Setup
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Read-only Context Information */}
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Context Information</h4>
                <p className="text-sm text-gray-600">
                  Player role context and organizational structures are read-only at the project level and sourced from the organizational configuration. 
                  This ensures consistency and maintains the integrity of stakeholder relationships across all projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleBackClick}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200"
          aria-label="Return to main navigation"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Main Menu
        </button>
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          SPOiRMM - Strategic Planning of Integrated Risk Management Model
        </p>
      </div>
    </div>
  );
};

export default ProjectPlanning; 