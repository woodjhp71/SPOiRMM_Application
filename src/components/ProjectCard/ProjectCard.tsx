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
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  status,
  coordinator,
  sponsor,
  progress,
  className = ''
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
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 text-sm leading-tight">{title}</h4>
          <div className="mt-2 space-y-1">
            <p className="text-xs text-gray-500">
              Coordinator: {coordinator}
            </p>
            {sponsor && (
              <p className="text-xs text-gray-500">
                Sponsor: {sponsor}
              </p>
            )}
          </div>
          {progress !== undefined && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
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
        </div>
        <div className="flex flex-col items-end space-y-3 ml-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
            {status}
          </span>
                     <Link 
             to={`/projects/${id}/planning`}
             className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 transition-colors"
           >
             View Plan
           </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 