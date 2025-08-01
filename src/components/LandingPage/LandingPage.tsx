import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProject } from '../../contexts/ProjectContext';
import ProjectCard from '../ProjectCard/ProjectCard';
import { useActiveProjects } from '../../hooks/useProjects';
import StarChart from '../StarChart/StarChart';

interface Project {
  id: string;
  title: string;
  status: 'New' | 'In Progress' | 'Approved' | 'Closed';
  sponsor: string;
  coordinator: string;
  progress: number;
}

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

const LandingPage: React.FC = () => {
  const { projectData } = useProject();
  const [userRole] = useState('Risk Plan Coordinator');
  const [userName] = useState('Lisa Chen');
  const [userId] = useState('LC'); // Dynamic user ID - change this to test different users
  const { data: activeProjects, isLoading, error } = useActiveProjects();

  // Role-based component visibility
  const isSponsor = userRole === 'Risk Plan Sponsor';
  const isCoordinator = userRole === 'Risk Plan Coordinator';
  const isWorkingGroupMember = userRole === 'Working Group Member';
  const isViewer = userRole === 'Viewer';



  const workingGroups: WorkingGroup[] = [
    {
      id: '1',
      name: 'Risk Assessment Team',
      members: ['JD', 'JS', 'SW', 'MW'],
      nextMeeting: '2024-01-15',
      openIssues: 3,
      projectId: '1'
    },
    {
      id: '2',
      name: 'Operational Review Team',
      members: ['MW', 'SJ', 'LC', 'DB'],
      nextMeeting: '2024-02-15',
      openIssues: 1,
      projectId: '2'
    },
    {
      id: '3',
      name: 'Compliance Review Team',
      members: ['LC', 'DB', 'JD', 'JS'],
      nextMeeting: '2024-03-01',
      openIssues: 2,
      projectId: '3'
    }
  ];

  const actionItems: ActionItem[] = [
    {
      id: '1',
      description: 'Review risk assessment criteria',
      dueDate: '2024-01-10',
      projectRef: 'Enterprise Risk Management Plan',
      projectId: '1',
      status: 'In Progress',
      assignedTo: 'JD' // Assigned to Jane Doe
    },
    {
      id: '2',
      description: 'Update stakeholder matrix',
      dueDate: '2024-01-12',
      projectRef: 'Operational Risk Assessment',
      projectId: '2',
      status: 'New',
      assignedTo: 'LC' // Assigned to Lisa Chen
    },
    {
      id: '3',
      description: 'Update compliance procedures',
      dueDate: '2024-03-30',
      projectRef: 'Compliance Framework Update',
      projectId: '3',
      status: 'In Progress',
      assignedTo: 'LC' // Assigned to Lisa Chen
    }
  ];

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
    
    // Get the projects where the current user is a member of a working group
    const userProjectIds = workingGroups
      .filter(group => group.members.includes(userId)) // Only groups where current user is a member
      .map(group => group.projectId);
    
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">SPOiRMM</h1>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Welcome back, {userName}
                </h2>
                <p className="text-sm text-gray-500">{userRole}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12a1 1 0 012 0v12z" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

                     {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            
            {/* Active Projects - Full width on mobile, spans 2 columns on larger screens */}
            <div className="md:col-span-2 xl:col-span-2 2xl:col-span-3">
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

                         {/* My Action Items - Single column on all screen sizes */}
             {(isCoordinator || isWorkingGroupMember) && (
               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                 <h3 className="text-lg font-medium text-gray-900 mb-4">My Action Items</h3>
                 <div className="space-y-3">
                                       {actionItems
                      .filter(item => {
                        // Only show action items assigned to the current user
                        console.log('Filtering action item:', item.description, 'assignedTo:', item.assignedTo, 'userId:', userId, 'match:', item.assignedTo === userId);
                        return item.assignedTo === userId;
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
                       const userProjectIds = workingGroups
                         .filter(group => group.members.includes(userId))
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
                     .filter(group => group.members.includes(userId)) // Only show groups where current user is a member
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
                               {member}
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
        </main>
    </div>
  );
};

export default LandingPage; 