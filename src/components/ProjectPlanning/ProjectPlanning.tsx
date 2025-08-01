import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { classNames } from '../../utils/classNames';
import { useProject } from '../../contexts/ProjectContext';
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
  const { id: projectId } = useParams<{ id: string }>();
  const { projectData: contextProjectData, setProjectData } = useProject();
  const [activeTab, setActiveTab] = useState(0);
  
  // Initialize project data if not exists
  useEffect(() => {
    if (!contextProjectData) {
      const initialData: ProjectPlanningData = {
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
      setProjectData({ ...initialData, id: projectId || 'new' });
    }
  }, [contextProjectData, setProjectData, projectId]);

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
      setProjectData({
        ...contextProjectData,
        [section]: { ...(contextProjectData[section] as any), ...data }
      });
    }
  };

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