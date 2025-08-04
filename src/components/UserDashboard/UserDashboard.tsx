import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// useProjectContext is available but not used in this component
import { useProject } from '../../hooks/useProject';
import ProjectCard from '../ProjectCard/ProjectCard';
import { useActiveProjects } from '../../hooks/useProjects';
import StarChart from '../StarChart/StarChart';
import Header from '../Header/Header';

// Project interface is used by ProjectCard component

interface WorkingGroup {
  id: string;
  name: string;
  members: string[];
  nextMeeting: string;
  openIssues: number;
  projectId: string;
}

interface ActionItem {
  id: string;
  description: string;
  dueDate: string;
  projectRef: string;
  projectId: string;
  status: 'New' | 'In Progress' | 'Overdue';
  assignedTo: string; // User ID of the person assigned to this action item
}

interface RiskSignal {
  id: string;
  title: string;
  rank: number;
  status: 'Accountable' | 'Unassigned' | 'Overdue Review';
  projectRef: string;
  projectId: string;
}

interface ToolActivity {
  id: string;
  name: string;
  color: string;
  activity: number;
}

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  // projectData is available from context but not used in this component
  const [userRole] = useState('Risk Plan Coordinator');
  const [userId] = useState('LC'); // Dynamic user ID - change this to test different users
  const { data: activeProjects, isLoading, error } = useActiveProjects();

  const handleBackClick = () => {
    navigate('/');
  };

  // Role-based component visibility
  const isSponsor = userRole === 'Risk Plan Sponsor';
  const isCoordinator = userRole === 'Risk Plan Coordinator';
  const isWorkingGroupMember = userRole === 'Working Group Member';
  const isViewer = userRole === 'Viewer';

  // Fetch project data for each project
  const project1Query = useProject('1');
  const project2Query = useProject('2');
  const project3Query = useProject('3');

  // Map user IDs to full names for comparison
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

  // Get user's project IDs where they are a working group member
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

  // Extract working groups from all projects where user is a member
  const getAllWorkingGroups = (): WorkingGroup[] => {
    const allWorkingGroups: WorkingGroup[] = [];
    
    // Check each project and add working groups if user is a member
    if (userProjectIds.includes('1') && project1Query.data?.workingGroups) {
      project1Query.data.workingGroups.forEach((group: any) => {
        allWorkingGroups.push({
          id: `1-${group.id}`,
          name: group.groupName,
          members: group.members,
          nextMeeting: group.meetingDates[0] || '2024-01-01',
          openIssues: 0, // This would need to be calculated from issues data
          projectId: '1'
        });
      });
    }
    
    if (userProjectIds.includes('2') && project2Query.data?.workingGroups) {
      project2Query.data.workingGroups.forEach((group: any) => {
        allWorkingGroups.push({
          id: `2-${group.id}`,
          name: group.groupName,
          members: group.members,
          nextMeeting: group.meetingDates[0] || '2024-01-01',
          openIssues: 0, // This would need to be calculated from issues data
          projectId: '2'
        });
      });
    }
    
    if (userProjectIds.includes('3') && project3Query.data?.workingGroups) {
      project3Query.data.workingGroups.forEach((group: any) => {
        allWorkingGroups.push({
          id: `3-${group.id}`,
          name: group.groupName,
          members: group.members,
          nextMeeting: group.meetingDates[0] || '2024-01-01',
          openIssues: 0, // This would need to be calculated from issues data
          projectId: '3'
        });
      });
    }
    
    return allWorkingGroups;
  };

  const workingGroups = getAllWorkingGroups();

  // Extract action items from all projects where user is a member
  const getAllActionItems = (): ActionItem[] => {
    const allActionItems: ActionItem[] = [];
    // userFullName is used in the filter below
    
    // Check each project and add action items if user is a member
    if (userProjectIds.includes('1') && project1Query.data?.actionPlan) {
      project1Query.data.actionPlan.forEach((action: any) => {
        allActionItems.push({
          id: `1-${action.id}`,
          description: action.description,
          dueDate: action.dueDate,
          projectRef: project1Query.data.title,
          projectId: '1',
          status: action.status,
          assignedTo: action.assignedTo
        });
      });
    }
    
    if (userProjectIds.includes('2') && project2Query.data?.actionPlan) {
      project2Query.data.actionPlan.forEach((action: any) => {
        allActionItems.push({
          id: `2-${action.id}`,
          description: action.description,
          dueDate: action.dueDate,
          projectRef: project2Query.data.title,
          projectId: '2',
          status: action.status,
          assignedTo: action.assignedTo
        });
      });
    }
    
    if (userProjectIds.includes('3') && project3Query.data?.actionPlan) {
      project3Query.data.actionPlan.forEach((action: any) => {
        allActionItems.push({
          id: `3-${action.id}`,
          description: action.description,
          dueDate: action.dueDate,
          projectRef: project3Query.data.title,
          projectId: '3',
          status: action.status,
          assignedTo: action.assignedTo
        });
      });
    }
    
    return allActionItems;
  };

  const actionItems = getAllActionItems();

  const toolActivities: ToolActivity[] = [
    { id: '1', name: 'Jurisdiction Tool', color: 'purple', activity: 85 },
    { id: '2', name: 'Market Tool', color: 'orange', activity: 72 },
    { id: '3', name: 'Enterprise Tool', color: 'teal', activity: 90 },
    { id: '4', name: 'Organisation Tool', color: 'light-blue', activity: 68 },
    { id: '5', name: 'Agreements Tool', color: 'dark-blue', activity: 45 },
    { id: '6', name: 'Resources Tool', color: 'brown', activity: 60 }
  ];

  const riskSignals: RiskSignal[] = [
    {
      id: '1',
      title: 'Regulatory Compliance Risk',
      rank: 1,
      status: 'Accountable',
      projectRef: 'Enterprise Risk Management Plan',
      projectId: '1'
    },
    {
      id: '2',
      title: 'Operational Disruption Risk',
      rank: 2,
      status: 'Unassigned',
      projectRef: 'Operational Risk Assessment',
      projectId: '2'
    },
    {
      id: '3',
      title: 'Regulatory Update Risk',
      rank: 3,
      status: 'Accountable',
      projectRef: 'Compliance Framework Update',
      projectId: '3'
    }
  ];

  // Filter projects based on user's working group membership
  const getUserProjects = () => {
    if (!activeProjects) return [];
    
    // Use the already calculated userProjectIds to filter projects
    return activeProjects.filter(project => userProjectIds.includes(project.id));
  };

  const userProjects = getUserProjects();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Convert full name to initials
  const getInitials = (fullName: string): string => {
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase();
  };

  const getToolColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'purple': 'bg-purple-500',
      'orange': 'bg-orange-500',
      'teal': 'bg-teal-500',
      'light-blue': 'bg-blue-400',
      'dark-blue': 'bg-blue-600',
      'brown': 'bg-amber-700'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Standardized Header */}
      <Header title="Risk Management Dashboard and Overview" showUserInfo={true} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          
          {/* Row 1: My Active Projects - Full width */}
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">My Active Projects</h3>
                <Link to="/projects" className="text-sm text-blue-600 hover:text-blue-500">
                  View all
                </Link>
              </div>
              {isLoading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-500">Loading projects...</span>
                </div>
              )}
              {error && (
                <div className="text-center py-8">
                  <p className="text-red-500">Error loading projects. Please try again.</p>
                </div>
              )}
              {userProjects && userProjects.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {userProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      id={project.id}
                      title={project.title}
                      status={project.status}
                      coordinator={project.coordinator}
                      sponsor={project.sponsor}
                      progress={project.progress}
                    />
                  ))}
                </div>
              )}
              {userProjects && userProjects.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No projects found where you are a working group member.</p>
                </div>
              )}
            </div>
          </div>

          {/* Row 2: My Action Items, Key Risk Signals, My Working Groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {/* My Action Items - Single column on all screen sizes */}
            {(isCoordinator || isWorkingGroupMember) && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">My Action Items</h3>
                <div className="space-y-3">
                  {actionItems
                    .filter(item => {
                      // Only show action items assigned to the current user
                      const userFullName = getUserFullName(userId);
                      return item.assignedTo === userFullName;
                    })
                    .map((item) => (
                      <Link
                        key={item.id}
                        to={`/projects/${item.projectId}/planning?tab=action-plan`}
                        className="block p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{item.description}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.projectRef}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              Due: {new Date(item.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}

            {/* Key Risk Signals - Single column on all screen sizes */}
            {(isSponsor || isCoordinator) && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Key Risk Signals</h3>
                <div className="space-y-3">
                  {riskSignals
                    .filter(risk => {
                      // Only show risk signals for projects where current user is in a working group
                      const userFullName = getUserFullName(userId);
                      const userProjectIds = workingGroups
                        .filter(group => group.members.includes(userFullName))
                        .map(group => group.projectId);
                      return userProjectIds.includes(risk.projectId);
                    })
                    .map((risk) => (
                      <Link
                        key={risk.id}
                        to={`/projects/${risk.projectId}/planning?tab=assessment`}
                        className="block p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-medium text-gray-500">#{risk.rank}</span>
                              <h4 className="text-sm font-medium text-gray-900">{risk.title}</h4>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{risk.projectRef}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(risk.status)}`}>
                            {risk.status}
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}

            {/* My Working Groups - Single column on all screen sizes */}
            {(isCoordinator || isWorkingGroupMember) && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">My Working Groups</h3>
                <div className="space-y-4">
                  {workingGroups
                    .filter(group => group.members.includes(getUserFullName(userId))) // Only show groups where current user is a member
                    .map((group) => (
                      <Link
                        key={group.id}
                        to={`/projects/${group.projectId}/planning?tab=working-groups`}
                        className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <h4 className="font-medium text-gray-900">{group.name}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex -space-x-2">
                            {group.members.map((member, index) => (
                              <div key={index} className="w-8 h-8 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
                                {getInitials(member)}
                              </div>
                            ))}
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Next: {new Date(group.nextMeeting).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-400">{group.openIssues} open issues</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Tool Activity Navigator and other sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            
            {/* Tool Activity Navigator - Full width on mobile, spans 2 columns on larger screens */}
            {!isViewer && (
              <div className="md:col-span-2 xl:col-span-2 2xl:col-span-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Tool Activity Navigator</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {toolActivities.map((tool) => (
                      <div key={tool.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getToolColor(tool.color)}`}></div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{tool.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                                <div 
                                  className={`h-2 ${getToolColor(tool.color)} rounded-full`}
                                  style={{ width: `${tool.activity}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500">{tool.activity}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tool Activity Buttons - Full width on mobile, spans 2 columns on larger screens */}
            {!isViewer && (
              <div className="md:col-span-2 xl:col-span-2 2xl:col-span-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Tool Activity</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                    <Link 
                      to="/tools/jurisdiction"
                      className="flex items-center justify-center p-4 border border-purple-200 rounded-lg hover:shadow-md transition-all bg-purple-50 hover:bg-purple-100"
                    >
                      <div className="text-center">
                        <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">J</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Jurisdiction</span>
                      </div>
                    </Link>
                    
                    <Link 
                      to="/tools/market"
                      className="flex items-center justify-center p-4 border border-orange-200 rounded-lg hover:shadow-md transition-all bg-orange-50 hover:bg-orange-100"
                    >
                      <div className="text-center">
                        <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">M</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Market</span>
                      </div>
                    </Link>
                    
                    <Link 
                      to="/tools/enterprise"
                      className="flex items-center justify-center p-4 border border-teal-200 rounded-lg hover:shadow-md transition-all bg-teal-50 hover:bg-teal-100"
                    >
                      <div className="text-center">
                        <div className="w-8 h-8 bg-teal-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">E</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Enterprise</span>
                      </div>
                    </Link>
                    
                    <Link 
                      to="/tools/organisation"
                      className="flex items-center justify-center p-4 border border-blue-200 rounded-lg hover:shadow-md transition-all bg-blue-50 hover:bg-blue-100"
                    >
                      <div className="text-center">
                        <div className="w-8 h-8 bg-blue-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">O</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Organisation</span>
                      </div>
                    </Link>
                    
                    <Link 
                      to="/tools/agreements"
                      className="flex items-center justify-center p-4 border border-blue-600 rounded-lg hover:shadow-md transition-all bg-blue-600 bg-opacity-10 hover:bg-opacity-20"
                    >
                      <div className="text-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Agreements</span>
                      </div>
                    </Link>
                    
                    <Link 
                      to="/tools/resources"
                      className="flex items-center justify-center p-4 border border-amber-200 rounded-lg hover:shadow-md transition-all bg-amber-50 hover:bg-amber-100"
                    >
                      <div className="text-center">
                        <div className="w-8 h-8 bg-amber-700 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">R</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Resources</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Star Chart Snapshot - Full width on mobile, spans 2 columns on larger screens */}
            <div className="md:col-span-2 xl:col-span-2 2xl:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Star Chart Snapshot</h3>
                <div className="h-80 bg-gray-50 rounded-lg p-4">
                  <StarChart width={600} height={320} className="w-full h-full" />
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
       </main>
     </div>
   );
 };

export default UserDashboard; 