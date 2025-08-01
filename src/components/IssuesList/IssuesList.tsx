import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../../contexts/ProjectContext';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

export interface Issue {
  id: string;
  description: string;
  raisedBy: string;
  players: string[];
  tools: string[];
  internalFunctionLevel: 'L1' | 'L2' | 'L3';
  category: 'Governance' | 'Business' | 'Operational';
  dateRaised: string;
  status: 'New' | 'In Review' | 'AcceptedAsRisk' | 'Rejected';
  notes?: string;
}

const IssuesList: React.FC = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projectData, updateIssues } = useProject();

  const [issues] = useState<Issue[]>(projectData?.issues || []);
  const [isAddingIssue, setIsAddingIssue] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPlayer, setFilterPlayer] = useState<string>('all');
  const [filterTool, setFilterTool] = useState<string>('all');

  // Available players and tools for selection
  const availablePlayers = ['Recipient', 'Provider', 'Staff', 'Supplier', 'Regulator', 'Representative'];
  const availableTools = ['Jurisdiction', 'Market', 'Enterprise', 'Organisation', 'Agreements', 'Resources'];

  // Placeholder for future functionality
  useEffect(() => {
    // updateIssues(issues);
  }, [issues, updateIssues]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate(`/project/${projectId}`)}
                  className="flex items-center px-3 py-2 text-white hover:bg-red-700 rounded-md transition-colors"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Back to Project
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Issues List - SPOiRMM
                  </h1>
                  <p className="text-red-100 mt-1">
                    Issue Tracking and Risk Promotion
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddingIssue(true)}
                className="flex items-center px-4 py-2 bg-white text-red-600 rounded-md hover:bg-red-50 transition-colors"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Issue
              </button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Status</option>
                <option value="New">New</option>
                <option value="In Review">In Review</option>
                <option value="AcceptedAsRisk">Accepted as Risk</option>
                <option value="Rejected">Rejected</option>
              </select>

              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Categories</option>
                <option value="Governance">Governance</option>
                <option value="Business">Business</option>
                <option value="Operational">Operational</option>
              </select>

              {/* Player Filter */}
              <select
                value={filterPlayer}
                onChange={(e) => setFilterPlayer(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Players</option>
                {availablePlayers.map(player => (
                  <option key={player} value={player}>{player}</option>
                ))}
              </select>

              {/* Tool Filter */}
              <select
                value={filterTool}
                onChange={(e) => setFilterTool(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Tools</option>
                {availableTools.map(tool => (
                  <option key={tool} value={tool}>{tool}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Issues List */}
          <div className="p-6">
            <div className="text-center py-12">
              <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No issues found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding your first issue.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setIsAddingIssue(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Issue
                </button>
              </div>
              {isAddingIssue && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700">Add Issue functionality coming soon...</p>
                  <button
                    onClick={() => setIsAddingIssue(false)}
                    className="mt-2 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuesList; 