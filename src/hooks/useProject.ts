import { useQuery } from '@tanstack/react-query';
import { ProjectPlanningData } from '../components/ProjectPlanning/ProjectPlanning';

export interface FullProjectData extends ProjectPlanningData {
  id: string;
  title: string;
  status: 'New' | 'In Progress' | 'Approved' | 'Closed';
  sponsor: string;
  coordinator: string;
  progress: number;
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
          groupName: 'Operations Team',
          members: ['Mike Wilson', 'Sarah Johnson', 'David Brown'],
          meetingDates: ['2024-02-15']
        }
      ],
      assessment: {
        needsSatisfied: false,
        needsDescription: 'Assessment not yet started',
        objectivesAchieved: false,
        objectivesDescription: 'Project in planning phase',
        projectManagerSignoff: false,
        signoffDate: ''
      },
      issues: [],
      risks: []
    },
    '3': {
      id: '3',
      title: 'Compliance Risk Framework',
      status: 'Approved',
      sponsor: 'Lisa Chen',
      coordinator: 'Robert Taylor',
      progress: 90,
      workflow: {},
      details: {
        projectTitle: 'Compliance Risk Framework',
        startDate: '2023-09-01',
        endDate: '2024-06-30',
        projectManager: 'Robert Taylor',
        riskPlanSponsor: 'Lisa Chen',
        riskPlanCoordinator: 'Robert Taylor',
        projectStatus: 'Closed',
        planApproved: true,
        approvalDate: '2023-08-15',
        projectDescription: 'Development of comprehensive compliance risk management framework',
        whyNeeded: 'To ensure regulatory compliance and reduce compliance risks',
        objectives: 'Achieve 100% regulatory compliance by end of project'
      },
      actionPlan: [
        {
          id: '1',
          taskNumber: 1,
          description: 'Review regulatory requirements',
          assignedTo: 'Robert Taylor',
          dueDate: '2023-10-01',
          status: 'Completed',
          notes: 'All regulatory requirements documented'
        },
        {
          id: '2',
          taskNumber: 2,
          description: 'Develop compliance procedures',
          assignedTo: 'Robert Taylor',
          dueDate: '2024-01-15',
          status: 'Completed',
          notes: 'Procedures implemented across organization'
        },
        {
          id: '3',
          taskNumber: 3,
          description: 'Conduct compliance audit',
          assignedTo: 'Robert Taylor',
          dueDate: '2024-05-30',
          status: 'In Progress',
          notes: 'Final audit in progress'
        }
      ],
      workingGroups: [
        {
          id: '1',
          groupName: 'Compliance Team',
          members: ['Robert Taylor', 'Lisa Chen', 'Jennifer Martinez'],
          meetingDates: ['2023-09-15', '2023-10-15', '2023-11-15', '2023-12-15']
        }
      ],
      assessment: {
        needsSatisfied: true,
        needsDescription: 'Compliance framework successfully implemented',
        objectivesAchieved: true,
        objectivesDescription: 'All compliance objectives met or exceeded',
        projectManagerSignoff: true,
        signoffDate: '2024-05-15'
      },
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