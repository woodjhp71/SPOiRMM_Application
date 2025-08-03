import { useQuery } from '@tanstack/react-query';
import { ProjectPlanningData } from '../components/ProjectPlanning/ProjectPlanning';
import { Player } from '../components/PlayersChart/PlayersChart';

export interface FullProjectData extends ProjectPlanningData {
  id: string;
  title: string;
  status: 'New' | 'In Progress' | 'Approved' | 'Closed';
  sponsor: string;
  coordinator: string;
  progress: number;
  players: Player[];
}

const fetchProject = async (projectId: string): Promise<FullProjectData> => {
  // For development, return different mock data based on projectId
  // When API is available, uncomment the fetch code below
  
  // Define different mock projects
  const mockProjects: { [key: string]: FullProjectData } = {
    '1': {
      id: '1',
      title: 'Enterprise Risk Management Plan',
      status: 'In Progress',
      sponsor: 'John Smith',
      coordinator: 'Jane Doe',
      progress: 65,
      workflow: {},
      details: {
        projectTitle: 'Enterprise Risk Management Plan',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        projectManager: 'Jane Doe',
        riskPlanSponsor: 'John Smith',
        riskPlanCoordinator: 'Jane Doe',
        projectStatus: 'In Progress',
        planApproved: false,
        approvalDate: '',
        projectDescription: 'Comprehensive enterprise risk management framework',
        whyNeeded: 'To establish systematic risk identification and mitigation',
        objectives: 'Reduce risk exposure by 25% within 12 months'
      },
      actionPlan: [
        {
          id: '1',
          taskNumber: 1,
          description: 'Conduct initial risk assessment',
          assignedTo: 'Jane Doe',
          dueDate: '2024-02-15',
          status: 'In Progress',
          notes: 'Review existing risk documentation'
        },
        {
          id: '2',
          taskNumber: 2,
          description: 'Develop risk mitigation strategies',
          assignedTo: 'Mike Wilson',
          dueDate: '2024-03-01',
          status: 'New',
          notes: 'Focus on high-priority risks first'
        }
      ],
      workingGroups: [
        {
          id: '1',
          groupName: 'Risk Assessment Team',
          members: ['Jane Doe', 'John Smith', 'Sarah Wilson', 'Mike Johnson'],
          meetingDates: ['2024-01-15', '2024-02-01']
        }
      ],
      assessment: {
        needsSatisfied: false,
        needsDescription: 'Risk assessment framework needs refinement',
        objectivesAchieved: false,
        objectivesDescription: 'Still in early stages of implementation',
        projectManagerSignoff: false,
        signoffDate: ''
      },
      players: [],
      issues: [],
      risks: []
    },
    '2': {
      id: '2',
      title: 'Operational Risk Assessment',
      status: 'New',
      sponsor: 'Sarah Johnson',
      coordinator: 'Mike Wilson',
      progress: 25,
      workflow: {},
      details: {
        projectTitle: 'Operational Risk Assessment',
        startDate: '2024-02-01',
        endDate: '2024-08-31',
        projectManager: 'Mike Wilson',
        riskPlanSponsor: 'Sarah Johnson',
        riskPlanCoordinator: 'Mike Wilson',
        projectStatus: 'New',
        planApproved: false,
        approvalDate: '',
        projectDescription: 'Assessment of operational risks across business units',
        whyNeeded: 'To identify and mitigate operational risks in daily operations',
        objectives: 'Implement operational risk controls within 6 months'
      },
      actionPlan: [
        {
          id: '1',
          taskNumber: 1,
          description: 'Map operational processes',
          assignedTo: 'Mike Wilson',
          dueDate: '2024-03-01',
          status: 'New',
          notes: 'Document all key operational processes'
        }
      ],
      workingGroups: [
        {
          id: '1',
          groupName: 'Operational Review Team',
          members: ['Mike Wilson', 'Sarah Johnson', 'Lisa Chen', 'David Brown'],
          meetingDates: ['2024-02-15', '2024-03-01']
        }
      ],
      assessment: {
        needsSatisfied: false,
        needsDescription: 'Assessment framework needs development',
        objectivesAchieved: false,
        objectivesDescription: 'Project in early planning phase',
        projectManagerSignoff: false,
        signoffDate: ''
      },
      players: [],
      issues: [],
      risks: []
    },
    '3': {
      id: '3',
      title: 'Compliance Framework Update',
      status: 'Approved',
      sponsor: 'David Brown',
      coordinator: 'Lisa Chen',
      progress: 90,
      workflow: {},
      details: {
        projectTitle: 'Compliance Framework Update',
        startDate: '2023-10-01',
        endDate: '2024-06-30',
        projectManager: 'Lisa Chen',
        riskPlanSponsor: 'David Brown',
        riskPlanCoordinator: 'Lisa Chen',
        projectStatus: 'In Progress',
        planApproved: true,
        approvalDate: '2023-12-15',
        projectDescription: 'Update compliance framework to meet new regulatory requirements',
        whyNeeded: 'New regulations require updated compliance procedures',
        objectives: 'Implement updated compliance framework across organization'
      },
      actionPlan: [
        {
          id: '1',
          taskNumber: 1,
          description: 'Review regulatory requirements',
          assignedTo: 'Lisa Chen',
          dueDate: '2024-01-15',
          status: 'Completed',
          notes: 'Regulatory review completed'
        },
        {
          id: '2',
          taskNumber: 2,
          description: 'Update compliance procedures',
          assignedTo: 'David Brown',
          dueDate: '2024-03-30',
          status: 'In Progress',
          notes: 'Procedures being updated'
        },
        {
          id: '3',
          taskNumber: 3,
          description: 'Train staff on new procedures',
          assignedTo: 'Lisa Chen',
          dueDate: '2024-05-15',
          status: 'New',
          notes: 'Training schedule to be developed'
        }
      ],
      workingGroups: [
        {
          id: '1',
          groupName: 'Compliance Review Team',
          members: ['Lisa Chen', 'David Brown', 'Jane Doe', 'John Smith'],
          meetingDates: ['2024-01-30', '2024-02-15', '2024-03-01']
        }
      ],
      assessment: {
        needsSatisfied: true,
        needsDescription: 'Compliance requirements clearly identified',
        objectivesAchieved: true,
        objectivesDescription: 'Project on track to meet objectives',
        projectManagerSignoff: true,
        signoffDate: '2024-01-15'
      },
      players: [],
      issues: [],
      risks: []
    }
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const project = mockProjects[projectId];
  if (!project) {
    throw new Error(`Project with ID ${projectId} not found`);
  }

  return project;
};

export const useProject = (projectId: string) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchProject(projectId),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}; 