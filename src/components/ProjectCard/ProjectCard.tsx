import React from 'react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: string;
  title: string;
  status: 'New' | 'In Progress' | 'Approved' | 'Closed';
  coordinator: string;
  sponsor?: string;
  progress?: number;
  className?: string;
  projectManager?: string;
  riskPlanSponsor?: string;
  riskPlanCoordinator?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  status,
  coordinator,
  sponsor,
  progress,
  className = '',
  projectManager,
  riskPlanSponsor,
  riskPlanCoordinator
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow ${className}`}>
      <div className="space-y-4">
        {/* Title and Status */}
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-gray-900 text-sm leading-tight flex-1 pr-3">{title}</h4>
          <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>

        {/* Project Details */}
        <div className="space-y-3 text-xs">
          {projectManager && (
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Project Manager:</span>
              <span className="text-gray-600 break-words">{projectManager}</span>
            </div>
          )}
          {riskPlanSponsor && (
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Risk Plan Sponsor:</span>
              <span className="text-gray-600 break-words">{riskPlanSponsor}</span>
            </div>
          )}
          {riskPlanCoordinator && (
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Risk Plan Coordinator:</span>
              <span className="text-gray-600 break-words">{riskPlanCoordinator}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {progress !== undefined && (
          <div className="pt-3">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-500 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-3">
          <Link 
            to={`/projects/${id}/planning`}
            className="inline-flex items-center justify-center w-full px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 transition-colors"
          >
            View Plan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 