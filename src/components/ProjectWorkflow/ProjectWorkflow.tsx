import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../contexts/ProjectContext';
import { useActiveProjects } from '../../hooks/useProjects';
import { useProject as useProjectData } from '../../hooks/useProject';
import WorkflowEngine from '../WorkflowEngine/WorkflowEngine';
import ProjectCard from '../ProjectCard/ProjectCard';
import Header from '../Header/Header';
import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface ProjectWorkflowProps {
  userRole?: string;
}

const ProjectWorkflow: React.FC<ProjectWorkflowProps> = ({
  userRole = 'Risk Plan Coordinator'
}) => {
  const navigate = useNavigate();
  const { projectData, setProjectData } = useProject();
  
  // Use the same approach as Dashboard - userId and working group membership
  const [userId] = useState('LC'); // Dynamic user ID - change this to test different users
  const { data: activeProjects, isLoading: projectsLoading } = useActiveProjects();

  // Fetch project data for each project to check working group membership
  const project1Query = useProjectData('1');
  const project2Query = useProjectData('2');
  const project3Query = useProjectData('3');

  const [selectedProjectId, setSelectedProjectId] = useState<string>('1');
  const [activeProject, setActiveProject] = useState<any>(null);

  // Map user IDs to full names for comparison (same as Dashboard)
  const getUserFullName = (userId: string): string => {
    const nameMap: { [key: string]: string } = {
      'LC': 'Lisa Chen',
      'JD': 'Jane Doe',
      'JS': 'John Smith',
      'MW': 'Mike Wilson',
      'SJ': 'Sarah Johnson',
      'DB': 'David Brown',
      'SW': 'Sarah Wilson'
    };
    return nameMap[userId] || userId;
  };

  // Get user's project IDs where they are a working group member (same as Dashboard)
  const getUserProjectIds = (): string[] => {
    const userFullName = getUserFullName(userId);
    const projectIds: string[] = [];
    
    // Check each project's working groups to see if user is a member
    if (project1Query.data?.workingGroups) {
      const isMember = project1Query.data.workingGroups.some((group: any) => 
        group.members.includes(userFullName)
      );
      if (isMember) projectIds.push('1');
    }
    
    if (project2Query.data?.workingGroups) {
      const isMember = project2Query.data.workingGroups.some((group: any) => 
        group.members.includes(userFullName)
      );
      if (isMember) projectIds.push('2');
    }
    
    if (project3Query.data?.workingGroups) {
      const isMember = project3Query.data.workingGroups.some((group: any) => 
        group.members.includes(userFullName)
      );
      if (isMember) projectIds.push('3');
    }
    
    return projectIds;
  };

  const userProjectIds = getUserProjectIds();

  // Filter projects based on user's working group membership (same as Dashboard)
  const getUserProjects = () => {
    if (!activeProjects) return [];
    
    // Use the already calculated userProjectIds to filter projects
    return activeProjects.filter(project => userProjectIds.includes(project.id));
  };

  const userProjects = getUserProjects();

  // Mock project data for different projects
  const mockProjectData = {
    '1': {
      id: '1',
      details: {
        projectTitle: 'Enterprise Risk Management Plan',
        projectDescription: 'Comprehensive risk management framework for enterprise operations',
        projectStatus: 'In Progress' as const,
        projectManager: 'John Smith',
        riskPlanSponsor: 'Sarah Johnson',
        riskPlanCoordinator: 'Lisa Chen',
        planApproved: false,
        startDate: '2024-01-15',
        endDate: '2024-12-31',
        approvalDate: '',
        whyNeeded: 'To establish comprehensive risk management framework',
        objectives: 'Implement enterprise-wide risk management processes'
      },
      workflow: {},
      actionPlan: [],
      workingGroups: [],
      assessment: {
        needsSatisfied: false,
        needsDescription: '',
        objectivesAchieved: false,
        objectivesDescription: '',
        projectManagerSignoff: false,
        signoffDate: ''
      },
      playersChart: {},
      players: [],
      issues: [
        { 
          id: '1', 
          description: 'Resource allocation concerns for the project', 
          raisedBy: 'John Smith',
          players: ['Provider', 'Staff'],
          tools: ['Resources', 'Enterprise'],
          relatedPlayers: [],
          internalFunctionLevel: 'L2' as const,
          category: 'Operational' as const,
          dateRaised: '2024-03-15',
          status: 'New' as const,
          notes: 'Concerns about resource allocation for the project'
        },
        { 
          id: '2', 
          description: 'Timeline constraints affecting project delivery', 
          raisedBy: 'Lisa Chen',
          players: ['Provider', 'Staff'],
          tools: ['Enterprise', 'Organisation'],
          relatedPlayers: [],
          internalFunctionLevel: 'L1' as const,
          category: 'Business' as const,
          dateRaised: '2024-03-20',
          status: 'In Review' as const,
          notes: 'Timeline constraints affecting project delivery'
        },
        { 
          id: '3', 
          description: 'Communication challenges with stakeholders', 
          raisedBy: 'Sarah Johnson',
          players: ['Recipient', 'Provider'],
          tools: ['Agreements', 'Enterprise'],
          relatedPlayers: [],
          internalFunctionLevel: 'L3' as const,
          category: 'Governance' as const,
          dateRaised: '2024-03-25',
          status: 'AcceptedAsRisk' as const,
          notes: 'Communication challenges with stakeholders'
        }
      ],
      risks: [
        { 
          id: '1', 
          projectId: '1',
          issueDescription: 'Budget overrun risk',
          riskStatement: 'Risk of exceeding project budget',
          riskCategory: 'Business' as const,
          spoirmmToolContext: 'Resources' as const,
          externalStakeholders: ['Provider'],
          internalDepartments: ['L1 - Decision'],
          likelihood: 4,
          consequence: 4,
          riskScore: 16,
          riskEvaluation: 'High' as const,
          mitigationStrategy: 'Regular budget reviews',
          accountablePerson: 'John Smith',
          status: 'New' as const,
          reviewDate: '2024-04-15',
          attachments: [],
          createdBy: 'John Smith',
          lastModified: '2024-03-15',
          relatedPlayers: []
        },
        { 
          id: '2', 
          projectId: '1',
          issueDescription: 'Scope creep',
          riskStatement: 'Risk of project scope expanding beyond original plan',
          riskCategory: 'Business' as const,
          spoirmmToolContext: 'Enterprise' as const,
          externalStakeholders: ['Provider'],
          internalDepartments: ['L2 - Exchange'],
          likelihood: 3,
          consequence: 3,
          riskScore: 9,
          riskEvaluation: 'Medium' as const,
          mitigationStrategy: 'Change control process',
          accountablePerson: 'Lisa Chen',
          status: 'Under Review' as const,
          reviewDate: '2024-04-20',
          attachments: [],
          createdBy: 'Lisa Chen',
          lastModified: '2024-03-20',
          relatedPlayers: []
        },
        { 
          id: '3', 
          projectId: '1',
          issueDescription: 'Team availability',
          riskStatement: 'Risk of team members not being available',
          riskCategory: 'Operational' as const,
          spoirmmToolContext: 'Resources' as const,
          externalStakeholders: ['Staff'],
          internalDepartments: ['L3 - Satisfy'],
          likelihood: 2,
          consequence: 2,
          riskScore: 4,
          riskEvaluation: 'Low' as const,
          mitigationStrategy: 'Resource planning',
          accountablePerson: 'Sarah Johnson',
          status: 'Approved' as const,
          reviewDate: '2024-04-25',
          attachments: [],
          createdBy: 'Sarah Johnson',
          lastModified: '2024-03-25',
          relatedPlayers: []
        }
      ]
    },
    '2': {
      id: '2',
      details: {
        projectTitle: 'Operational Risk Assessment',
        projectDescription: 'Assessment of operational risks across business units',
        projectStatus: 'New' as const,
        projectManager: 'Mike Wilson',
        riskPlanSponsor: 'David Brown',
        riskPlanCoordinator: 'Jane Doe',
        planApproved: false,
        startDate: '2024-02-01',
        endDate: '2024-08-31',
        approvalDate: '',
        whyNeeded: 'To assess operational risks across business units',
        objectives: 'Identify and assess operational risks'
      },
      workflow: {},
      actionPlan: [],
      workingGroups: [],
      assessment: {
        needsSatisfied: false,
        needsDescription: '',
        objectivesAchieved: false,
        objectivesDescription: '',
        projectManagerSignoff: false,
        signoffDate: ''
      },
      playersChart: {},
      players: [],
      issues: [
        { 
          id: '1', 
          description: 'Need to establish data collection methodology', 
          raisedBy: 'Mike Wilson',
          players: ['Provider', 'Staff'],
          tools: ['Enterprise', 'Organisation'],
          relatedPlayers: [],
          internalFunctionLevel: 'L2' as const,
          category: 'Operational' as const,
          dateRaised: '2024-03-30',
          status: 'New' as const,
          notes: 'Need to establish data collection methodology'
        },
        { 
          id: '2', 
          description: 'Coordination challenges between departments', 
          raisedBy: 'Jane Doe',
          players: ['Provider', 'Staff'],
          tools: ['Enterprise', 'Organisation'],
          relatedPlayers: [],
          internalFunctionLevel: 'L1' as const,
          category: 'Business' as const,
          dateRaised: '2024-04-05',
          status: 'New' as const,
          notes: 'Coordination challenges between departments'
        }
      ],
      risks: [
        { 
          id: '1', 
          projectId: '2',
          issueDescription: 'Data quality issues',
          riskStatement: 'Risk of poor data quality affecting assessment',
          riskCategory: 'Operational' as const,
          spoirmmToolContext: 'Enterprise' as const,
          externalStakeholders: ['Provider'],
          internalDepartments: ['L1 - Decision'],
          likelihood: 4,
          consequence: 4,
          riskScore: 16,
          riskEvaluation: 'High' as const,
          mitigationStrategy: 'Data validation protocols',
          accountablePerson: 'Mike Wilson',
          status: 'New' as const,
          reviewDate: '2024-04-30',
          attachments: [],
          createdBy: 'Mike Wilson',
          lastModified: '2024-03-30',
          relatedPlayers: []
        },
        { 
          id: '2', 
          projectId: '2',
          issueDescription: 'Department resistance',
          riskStatement: 'Risk of departments resisting the assessment process',
          riskCategory: 'Business' as const,
          spoirmmToolContext: 'Organisation' as const,
          externalStakeholders: ['Provider'],
          internalDepartments: ['L2 - Exchange'],
          likelihood: 3,
          consequence: 3,
          riskScore: 9,
          riskEvaluation: 'Medium' as const,
          mitigationStrategy: 'Change management plan',
          accountablePerson: 'Jane Doe',
          status: 'New' as const,
          reviewDate: '2024-05-05',
          attachments: [],
          createdBy: 'Jane Doe',
          lastModified: '2024-04-05',
          relatedPlayers: []
        }
      ]
    },
    '3': {
      id: '3',
      details: {
        projectTitle: 'Compliance Framework Update',
        projectDescription: 'Update compliance framework to meet new regulatory requirements',
        projectStatus: 'Closed' as const,
        projectManager: 'Lisa Chen',
        riskPlanSponsor: 'John Smith',
        riskPlanCoordinator: 'Sarah Johnson',
        planApproved: true,
        startDate: '2023-09-01',
        endDate: '2024-02-28',
        approvalDate: '2023-08-15',
        whyNeeded: 'To meet new regulatory requirements',
        objectives: 'Update compliance framework to meet new regulations'
      },
      workflow: {},
      actionPlan: [],
      workingGroups: [],
      assessment: {
        needsSatisfied: true,
        needsDescription: 'Compliance framework updated successfully',
        objectivesAchieved: true,
        objectivesDescription: 'All objectives achieved within timeline',
        projectManagerSignoff: true,
        signoffDate: '2024-02-28'
      },
      playersChart: {},
      players: [],
      issues: [
        { 
          id: '1', 
          description: 'Changes in regulatory requirements', 
          raisedBy: 'Lisa Chen',
          players: ['Provider', 'Regulator'],
          tools: ['Jurisdiction', 'Enterprise'],
          relatedPlayers: [],
          internalFunctionLevel: 'L1' as const,
          category: 'Governance' as const,
          dateRaised: '2024-01-15',
          status: 'AcceptedAsRisk' as const,
          notes: 'Changes in regulatory requirements'
        },
        { 
          id: '2', 
          description: 'Timeline for implementation was rejected', 
          raisedBy: 'Sarah Johnson',
          players: ['Provider', 'Staff'],
          tools: ['Enterprise', 'Organisation'],
          relatedPlayers: [],
          internalFunctionLevel: 'L2' as const,
          category: 'Business' as const,
          dateRaised: '2024-01-20',
          status: 'Rejected' as const,
          notes: 'Timeline for implementation was rejected'
        }
      ],
      risks: [
        { 
          id: '1', 
          projectId: '3',
          issueDescription: 'Regulatory non-compliance',
          riskStatement: 'Risk of non-compliance with new regulations',
          riskCategory: 'Governance' as const,
          spoirmmToolContext: 'Jurisdiction' as const,
          externalStakeholders: ['Regulator'],
          internalDepartments: ['L1 - Decision'],
          likelihood: 4,
          consequence: 4,
          riskScore: 16,
          riskEvaluation: 'High' as const,
          mitigationStrategy: 'Compliance monitoring',
          accountablePerson: 'Lisa Chen',
          status: 'Treated' as const,
          reviewDate: '2024-02-15',
          attachments: [],
          createdBy: 'Lisa Chen',
          lastModified: '2024-01-15',
          relatedPlayers: []
        },
        { 
          id: '2', 
          projectId: '3',
          issueDescription: 'Implementation delays',
          riskStatement: 'Risk of delays in implementation',
          riskCategory: 'Business' as const,
          spoirmmToolContext: 'Enterprise' as const,
          externalStakeholders: ['Provider'],
          internalDepartments: ['L2 - Exchange'],
          likelihood: 3,
          consequence: 3,
          riskScore: 9,
          riskEvaluation: 'Medium' as const,
          mitigationStrategy: 'Project management oversight',
          accountablePerson: 'Sarah Johnson',
          status: 'Closed' as const,
          reviewDate: '2024-02-28',
          attachments: [],
          createdBy: 'Sarah Johnson',
          lastModified: '2024-01-20',
          relatedPlayers: []
        }
      ]
    }
  };

  useEffect(() => {
    // Set the current project data based on selection
    const selectedProject = mockProjectData[selectedProjectId as keyof typeof mockProjectData];
    if (selectedProject) {
      setActiveProject(selectedProject);
      setProjectData(selectedProject);
    }
  }, [selectedProjectId, setProjectData]);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-gray-100 text-gray-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectStatusIcon = (status: string) => {
    switch (status) {
      case 'New':
        return <ClockIcon className="h-4 w-4" />;
      case 'In Progress':
        return <DocumentTextIcon className="h-4 w-4" />;
      case 'Closed':
        return <CheckCircleIcon className="h-4 w-4" />;
      default:
        return <InformationCircleIcon className="h-4 w-4" />;
    }
  };

  const getWorkflowStats = () => {
    if (!activeProject) return null;

    const stats = {
      issues: {
        total: activeProject.issues?.length || 0,
        new: activeProject.issues?.filter((i: any) => i.status === 'New').length || 0,
        inReview: activeProject.issues?.filter((i: any) => i.status === 'In Review').length || 0,
        accepted: activeProject.issues?.filter((i: any) => i.status === 'AcceptedAsRisk').length || 0,
        rejected: activeProject.issues?.filter((i: any) => i.status === 'Rejected').length || 0
      },
      risks: {
        total: activeProject.risks?.length || 0,
        new: activeProject.risks?.filter((r: any) => r.status === 'New').length || 0,
        underReview: activeProject.risks?.filter((r: any) => r.status === 'Under Review').length || 0,
        approved: activeProject.risks?.filter((r: any) => r.status === 'Approved').length || 0,
        treated: activeProject.risks?.filter((r: any) => r.status === 'Treated').length || 0,
        closed: activeProject.risks?.filter((r: any) => r.status === 'Closed').length || 0
      }
    };

    return stats;
  };

  const stats = getWorkflowStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Standardized Header */}
      <Header title="Project Workflow Management" showUserInfo={true} />

      {/* Main Content */}
      <main className="flex flex-row min-h-screen">
        {/* Sidebar - Project Cards */}
        <nav 
          className="w-96 bg-white shadow-lg overflow-y-auto"
          aria-label="Project Selection Navigation"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Projects</h3>
            {projectsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="ml-2 text-gray-500">Loading projects...</span>
              </div>
            ) : userProjects && userProjects.length > 0 ? (
              <div className="space-y-2">
                {userProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => handleProjectSelect(project.id)}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedProjectId === project.id
                        ? 'ring-2 ring-indigo-500 ring-opacity-50'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <ProjectCard
                      id={project.id}
                      title={project.title}
                      status={project.status}
                      coordinator={project.coordinator}
                      sponsor={project.sponsor}
                      progress={project.progress}
                      projectManager={project.projectManager}
                      riskPlanSponsor={project.riskPlanSponsor}
                      riskPlanCoordinator={project.riskPlanCoordinator}
                      className={selectedProjectId === project.id ? 'border-indigo-300 bg-indigo-50' : ''}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No projects found.</p>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {/* Workflow Engine Section */}
          <div className="mb-8">
            <WorkflowEngine 
              userRole={userRole}
              showReminders={true}
            />
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Issues Statistics */}
            {stats && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                  Issues Overview
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Issues:</span>
                    <span className="font-semibold">{stats.issues.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">New:</span>
                    <span className="text-blue-600 font-medium">{stats.issues.new}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">In Review:</span>
                    <span className="text-yellow-600 font-medium">{stats.issues.inReview}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Accepted as Risk:</span>
                    <span className="text-green-600 font-medium">{stats.issues.accepted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rejected:</span>
                    <span className="text-red-600 font-medium">{stats.issues.rejected}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Risks Statistics */}
            {stats && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ChartBarIcon className="h-5 w-5 text-teal-500 mr-2" />
                  Risks Overview
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Risks:</span>
                    <span className="font-semibold">{stats.risks.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">New:</span>
                    <span className="text-blue-600 font-medium">{stats.risks.new}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Under Review:</span>
                    <span className="text-yellow-600 font-medium">{stats.risks.underReview}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Approved:</span>
                    <span className="text-green-600 font-medium">{stats.risks.approved}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Treated:</span>
                    <span className="text-purple-600 font-medium">{stats.risks.treated}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Closed:</span>
                    <span className="text-gray-600 font-medium">{stats.risks.closed}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              SPOiRMM - Strategic Planning of Integrated Risk Management Model
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectWorkflow; 