import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../contexts/ProjectContext';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  XCircleIcon,
  ChevronRightIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  route: string;
  icon: React.ComponentType<any>;
  color: string;
  prerequisites: string[];
  isBlocked: boolean;
  blockReason?: string;
}

export interface WorkflowReminder {
  id: string;
  title: string;
  description: string;
  type: 'overdue' | 'upcoming' | 'action-required';
  dueDate?: string;
  priority: 'high' | 'medium' | 'low';
}

interface WorkflowEngineProps {
  userRole?: string;
  activeProjectId?: string;
  showReminders?: boolean;
}

const WorkflowEngine: React.FC<WorkflowEngineProps> = ({
  userRole = 'Risk Plan Coordinator',
  activeProjectId,
  showReminders = true
}) => {
  const navigate = useNavigate();
  const { projectData } = useProject();
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const [reminders, setReminders] = useState<WorkflowReminder[]>([]);

  // Initialize workflow steps based on project data
  useEffect(() => {
    const projectPlanningBlocked = isProjectPlanningBlocked();
    const blockReason = projectPlanningBlocked ? 'Project plan must be approved first' : undefined;
    
    const steps: WorkflowStep[] = [
      {
        id: 'project-planning',
        name: 'Project Planning',
        description: 'Define project scope, stakeholders, and objectives',
        status: getProjectPlanningStatus(),
        route: '/planning',
        icon: DocumentTextIcon,
        color: 'bg-blue-500',
        prerequisites: [],
        isBlocked: false
      },
      {
        id: 'issues-list',
        name: 'Issues List',
        description: 'Track and manage potential risks and concerns',
        status: getIssuesListStatus(),
        route: '/planning?tab=issues',
        icon: ExclamationTriangleIcon,
        color: 'bg-red-500',
        prerequisites: ['project-planning'],
        isBlocked: projectPlanningBlocked,
        blockReason: blockReason
      },
      {
        id: 'risk-register',
        name: 'Risk Register',
        description: 'Manage validated risks with analysis and treatment',
        status: getRiskRegisterStatus(),
        route: '/planning?tab=register',
        icon: ChartBarIcon,
        color: 'bg-teal-500',
        prerequisites: ['project-planning'],
        isBlocked: projectPlanningBlocked,
        blockReason: blockReason
      }
    ];

    setWorkflowSteps(steps);
  }, [projectData]);

  // Generate reminders based on project data
  useEffect(() => {
    const projectReminders: WorkflowReminder[] = [];

    // Check for overdue project planning
    if (projectData?.details?.projectStatus === 'New' && isProjectOverdue()) {
      projectReminders.push({
        id: 'overdue-planning',
        title: 'Project Planning Overdue',
        description: 'Project planning phase needs to be completed',
        type: 'overdue',
        priority: 'high'
      });
    }

    // Check for pending issues
    if (projectData?.issues?.some(issue => issue.status === 'New' || issue.status === 'In Review')) {
      const pendingIssues = projectData.issues.filter(i => i.status === 'New' || i.status === 'In Review');
      projectReminders.push({
        id: 'pending-issues',
        title: 'Pending Issues Review',
        description: `${pendingIssues.length} issues require review`,
        type: 'action-required',
        priority: 'medium'
      });
    }

    // Check for high-priority risks
    if (projectData?.risks?.some(risk => risk.riskEvaluation === 'High' && 
      (risk.status === 'New' || risk.status === 'Under Review' || risk.status === 'Approved'))) {
      const highPriorityRisks = projectData.risks.filter(r => 
        r.riskEvaluation === 'High' && 
        (r.status === 'New' || r.status === 'Under Review' || r.status === 'Approved')
      );
      projectReminders.push({
        id: 'high-priority-risks',
        title: 'High Priority Risks',
        description: `${highPriorityRisks.length} high-priority risks need attention`,
        type: 'action-required',
        priority: 'high'
      });
    }

    setReminders(projectReminders);
  }, [projectData]);

  const getProjectPlanningStatus = (): WorkflowStep['status'] => {
    if (!projectData) return 'not-started';
    
    if (projectData.details?.planApproved) return 'completed';
    if (projectData.details?.projectStatus === 'In Progress') return 'in-progress';
    if (projectData.details?.projectStatus === 'Closed') return 'completed';
    
    return 'not-started';
  };

  const getIssuesListStatus = (): WorkflowStep['status'] => {
    if (isProjectPlanningBlocked()) return 'blocked';
    if (!projectData?.issues) return 'not-started';
    
    const hasIssues = projectData.issues.length > 0;
    const hasActiveIssues = projectData.issues.some(issue => 
      issue.status === 'New' || issue.status === 'In Review' || issue.status === 'AcceptedAsRisk'
    );
    const allIssuesRejected = projectData.issues.every(issue => issue.status === 'Rejected');
    
    if (allIssuesRejected) return 'completed';
    if (hasActiveIssues) return 'in-progress';
    if (hasIssues) return 'in-progress';
    
    return 'not-started';
  };

  const getRiskRegisterStatus = (): WorkflowStep['status'] => {
    if (isProjectPlanningBlocked()) return 'blocked';
    if (!projectData?.risks) return 'not-started';
    
    const hasRisks = projectData.risks.length > 0;
    const hasActiveRisks = projectData.risks.some(risk => 
      risk.status === 'New' || risk.status === 'Under Review' || risk.status === 'Approved'
    );
    const allRisksClosed = projectData.risks.every(risk => risk.status === 'Closed');
    
    if (allRisksClosed) return 'completed';
    if (hasActiveRisks) return 'in-progress';
    if (hasRisks) return 'in-progress';
    
    return 'not-started';
  };

  const isProjectPlanningBlocked = (): boolean => {
    return !projectData?.details?.planApproved;
  };

  const isProjectOverdue = (): boolean => {
    if (!projectData?.details?.endDate) return false;
    const endDate = new Date(projectData.details.endDate);
    return endDate < new Date();
  };

  const getStatusColor = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'blocked':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <ClockIcon className="h-5 w-5 text-blue-600" />;
      case 'blocked':
        return <XCircleIcon className="h-5 w-5 text-red-600" />;
      default:
        return <div className="h-5 w-5 rounded-full bg-gray-300" />;
    }
  };

  const getReminderColor = (type: WorkflowReminder['type']) => {
    switch (type) {
      case 'overdue':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'action-required':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'upcoming':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const handleStepClick = (step: WorkflowStep) => {
    if (step.isBlocked) {
      // Show alert or tooltip about why it's blocked
      alert(`This step is blocked: ${step.blockReason || 'Prerequisites not met'}`);
      return;
    }
    navigate(step.route);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Workflow</h3>
        <p className="text-sm text-gray-600">
          Track your progress through the risk management workflow
        </p>
      </div>

      {/* Workflow Steps */}
      <div className="space-y-4 mb-6">
        {workflowSteps.map((step, index) => (
          <div key={step.id} className="relative">
            {/* Connection Line */}
            {index < workflowSteps.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-300" />
            )}
            
            <button
              onClick={() => handleStepClick(step)}
              disabled={step.isBlocked}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                step.isBlocked
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-md hover:scale-105 cursor-pointer'
              } ${getStatusColor(step.status)}`}
            >
              <div className="flex items-center space-x-4">
                {/* Status Icon */}
                <div className="flex-shrink-0">
                  {getStatusIcon(step.status)}
                </div>
                
                {/* Step Icon */}
                <div className={`p-2 rounded-lg ${step.color} text-white flex-shrink-0`}>
                  <step.icon className="h-5 w-5" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium truncate">{step.name}</h4>
                    <ChevronRightIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-gray-600 mt-1 truncate">{step.description}</p>
                  
                  {/* Blocked Reason */}
                  {step.isBlocked && step.blockReason && (
                    <p className="text-xs text-red-600 mt-1">{step.blockReason}</p>
                  )}
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Reminders Section */}
      {showReminders && reminders.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Reminders & Alerts</h4>
          <div className="space-y-2">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`p-3 rounded-lg border ${getReminderColor(reminder.type)}`}
              >
                <div className="flex items-start space-x-2">
                  <ExclamationTriangleIcon className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium">{reminder.title}</h5>
                    <p className="text-xs mt-1">{reminder.description}</p>
                    {reminder.dueDate && (
                      <p className="text-xs mt-1">Due: {reminder.dueDate}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Role Info */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <UserGroupIcon className="h-4 w-4" />
          <span>Role: {userRole}</span>
        </div>
      </div>
    </div>
  );
};

export default WorkflowEngine; 