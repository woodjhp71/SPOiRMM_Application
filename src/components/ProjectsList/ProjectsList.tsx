import React from 'react';
import { Link } from 'react-router-dom';
import { useActiveProjects } from '../../hooks/useProjects';
import ProjectCard from '../ProjectCard/ProjectCard';

const ProjectsList: React.FC = () => {
  const { data: activeProjects, isLoading, error } = useActiveProjects();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Active Projects</h1>
              <p className="mt-2 text-gray-600">View and manage all active risk management projects</p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-4 text-gray-500">Loading projects...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="text-red-500 text-lg font-medium mb-2">Error loading projects</div>
              <p className="text-gray-600">Unable to load project data. Please try again.</p>
            </div>
          )}

          {activeProjects && activeProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeProjects.map((project) => (
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

          {activeProjects && activeProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No active projects</h3>
              <p className="text-gray-500">There are currently no active projects to display.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsList; 