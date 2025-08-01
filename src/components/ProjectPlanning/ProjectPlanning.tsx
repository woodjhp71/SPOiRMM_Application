import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { classNames } from '../../utils/classNames';
import { useProject as useProjectContext } from '../../contexts/ProjectContext';
import { useProject as useProjectData } from '../../hooks/useProject';
import PPWorkflow from './modules/PPWorkflow';
import PPDetails from './modules/PPDetails';
import PPActionPlan from './modules/PPActionPlan';
import PPWorkingGroups from './modules/PPWorkingGroups';
import PPAssessment from './modules/PPAssessment';
import { Player } from '../PlayersChart/PlayersChart';
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
                players: Player[];
              issues: Issue[];
              risks: Risk[];
            }

const ProjectPlanning: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [searchParams] = useSearchParams();
  const { projectData: contextProjectData, loadProjectData } = useProjectContext();
  const { data: apiProjectData, isLoading, error } = useProjectData(projectId || '');
  
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
    players: [],
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
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              Project Planning - SPOiRMM
            </h1>
            <p className="text-blue-100 mt-1">
              Risk Management Project Planning and Governance
            </p>
          </div>

          <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
            <Tab.List className="flex space-x-1 bg-gray-100 p-1">
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    classNames(
                      'w-full py-2.5 text-sm font-medium leading-5 rounded-lg',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'
                    )
                  }
                >
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {tabs.map((tab) => (
                <Tab.Panel
                  key={tab.name}
                  className={classNames(
                    'rounded-xl bg-white p-6',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                  )}
                >
                  <tab.component
                    data={projectData[tab.dataKey] as any}
                    updateData={(data) => updateProjectData(tab.dataKey, data)}
                    projectData={projectData}
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default ProjectPlanning; 