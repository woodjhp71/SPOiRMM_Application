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
import { Issue } from '../IssuesList/IssuesList';
import { Risk } from '../RiskRegister/RiskRegister';

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
  issues: Issue[];
  risks: Risk[];
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
    if (tabParam === 'working-groups') return 3; // Working Groups tab index
    if (tabParam === 'workflow') return 0;
    if (tabParam === 'details') return 1;
    if (tabParam === 'action-plan') return 2;
    if (tabParam === 'assessment') return 4;
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

  const tabs = [
    { name: 'Workflow', component: PPWorkflow, dataKey: 'workflow' as keyof ProjectPlanningData },
    { name: 'Details', component: PPDetails, dataKey: 'details' as keyof ProjectPlanningData },
    { name: 'Action Plan', component: PPActionPlan, dataKey: 'actionPlan' as keyof ProjectPlanningData },
    { name: 'Working Groups', component: PPWorkingGroups, dataKey: 'workingGroups' as keyof ProjectPlanningData },
    { name: 'Assessment', component: PPAssessment, dataKey: 'assessment' as keyof ProjectPlanningData },
  ];

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
              {tabs.map((tab, index) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(index)}
                  className={classNames(
                    'w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    activeTab === index
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  role="tab"
                  aria-selected={activeTab === index}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-50 p-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              {tabs[activeTab] && React.createElement(tabs[activeTab].component, {
                data: projectData[tabs[activeTab].dataKey] as any,
                updateData: (data: any) => updateProjectData(tabs[activeTab].dataKey, data),
                projectData: projectData
              })}
            </div>
          </div>
        </div>
      </main>

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