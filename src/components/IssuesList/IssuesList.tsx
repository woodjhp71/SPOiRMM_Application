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

  const [issues, setIssues] = useState<Issue[]>(projectData?.issues || []);
  const [isAddingIssue, setIsAddingIssue] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPlayer, setFilterPlayer] = useState<string>('all');
  const [filterTool, setFilterTool] = useState<string>('all');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [newIssue, setNewIssue] = useState<Partial<Issue>>({
    description: '',
    raisedBy: '',
    players: [],
    tools: [],
    internalFunctionLevel: 'L1',
    category: 'Governance',
    dateRaised: new Date().toISOString().split('T')[0],
    status: 'New',
    notes: ''
  });

  // Available players and tools for selection
  const availablePlayers = ['Recipient', 'Provider', 'Staff', 'Supplier', 'Regulator', 'Representative'];
  const availableTools = ['Jurisdiction', 'Market', 'Enterprise', 'Organisation', 'Agreements', 'Resources'];

  // Mock team members for raisedBy dropdown
  const mockTeamMembers = [
    { id: 'user1', name: 'John Smith', role: 'Working Group Member' },
    { id: 'user2', name: 'Sarah Johnson', role: 'Risk Plan Coordinator' },
    { id: 'user3', name: 'Mike Davis', role: 'Project Manager' },
    { id: 'user4', name: 'Lisa Wilson', role: 'Working Group Member' }
  ];

  useEffect(() => {
    updateIssues(issues);
  }, [issues, updateIssues]);

  const validateIssue = (issue: Partial<Issue>): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!issue.description?.trim()) {
      errors.description = 'Issue description is required';
    }

    if (!issue.raisedBy) {
      errors.raisedBy = 'Please select who raised this issue';
    }

    if (!issue.players || issue.players.length === 0) {
      errors.players = 'At least one player must be selected';
    }

    if (!issue.tools || issue.tools.length === 0) {
      errors.tools = 'At least one tool must be selected';
    }

    return errors;
  };

  const handleAddIssue = () => {
    const validationErrors = validateIssue(newIssue);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const issue: Issue = {
      id: Date.now().toString(),
      description: newIssue.description!,
      raisedBy: newIssue.raisedBy!,
      players: newIssue.players!,
      tools: newIssue.tools!,
      internalFunctionLevel: newIssue.internalFunctionLevel!,
      category: newIssue.category!,
      dateRaised: newIssue.dateRaised!,
      status: newIssue.status!,
      notes: newIssue.notes || ''
    };

    setIssues([...issues, issue]);
    setNewIssue({
      description: '',
      raisedBy: '',
      players: [],
      tools: [],
      internalFunctionLevel: 'L1',
      category: 'Governance',
      dateRaised: new Date().toISOString().split('T')[0],
      status: 'New',
      notes: ''
    });
    setIsAddingIssue(false);
    setErrors({});
  };

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

          {/* Add Issue Form */}
          {isAddingIssue && (
            <div className="p-6 border-b border-gray-200 bg-red-50">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Issue</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Description *
                  </label>
                  <textarea
                    value={newIssue.description}
                    onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe the issue or concern..."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Raised By *
                  </label>
                  <select
                    value={newIssue.raisedBy}
                    onChange={(e) => setNewIssue({ ...newIssue, raisedBy: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                      errors.raisedBy ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select team member...</option>
                    {mockTeamMembers.map(member => (
                      <option key={member.id} value={member.id}>{member.name} ({member.role})</option>
                    ))}
                  </select>
                  {errors.raisedBy && (
                    <p className="text-red-500 text-sm mt-1">{errors.raisedBy}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newIssue.category}
                    onChange={(e) => setNewIssue({ ...newIssue, category: e.target.value as Issue['category'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="Governance">Governance</option>
                    <option value="Business">Business</option>
                    <option value="Operational">Operational</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Internal Function Level *
                  </label>
                  <select
                    value={newIssue.internalFunctionLevel}
                    onChange={(e) => setNewIssue({ ...newIssue, internalFunctionLevel: e.target.value as Issue['internalFunctionLevel'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="L1">L1 (Decision)</option>
                    <option value="L2">L2 (Exchange)</option>
                    <option value="L3">L3 (Satisfy)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Players Involved *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availablePlayers.map(player => (
                      <label key={player} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newIssue.players?.includes(player) || false}
                          onChange={(e) => {
                            const updatedPlayers = e.target.checked
                              ? [...(newIssue.players || []), player]
                              : (newIssue.players || []).filter(p => p !== player);
                            setNewIssue({ ...newIssue, players: updatedPlayers });
                          }}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{player}</span>
                      </label>
                    ))}
                  </div>
                  {errors.players && (
                    <p className="text-red-500 text-sm mt-1">{errors.players}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tools Involved *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableTools.map(tool => (
                      <label key={tool} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newIssue.tools?.includes(tool) || false}
                          onChange={(e) => {
                            const updatedTools = e.target.checked
                              ? [...(newIssue.tools || []), tool]
                              : (newIssue.tools || []).filter(t => t !== tool);
                            setNewIssue({ ...newIssue, tools: updatedTools });
                          }}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{tool}</span>
                      </label>
                    ))}
                  </div>
                  {errors.tools && (
                    <p className="text-red-500 text-sm mt-1">{errors.tools}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={newIssue.notes}
                    onChange={(e) => setNewIssue({ ...newIssue, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Additional notes about this issue..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setIsAddingIssue(false);
                    setNewIssue({
                      description: '',
                      raisedBy: '',
                      players: [],
                      tools: [],
                      internalFunctionLevel: 'L1',
                      category: 'Governance',
                      dateRaised: new Date().toISOString().split('T')[0],
                      status: 'New',
                      notes: ''
                    });
                    setErrors({});
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddIssue}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Add Issue
                </button>
              </div>
            </div>
          )}

          {/* Issues List */}
          <div className="p-6">
            {issues.length === 0 ? (
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
              </div>
            ) : (
              <div className="space-y-4">
                {issues.map((issue) => (
                  <div key={issue.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{issue.description}</h3>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span>Raised by: {mockTeamMembers.find(m => m.id === issue.raisedBy)?.name || issue.raisedBy}</span>
                          <span>Category: {issue.category}</span>
                          <span>Level: {issue.internalFunctionLevel}</span>
                          <span>Date: {issue.dateRaised}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {issue.players.map(player => (
                            <span key={player} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                              {player}
                            </span>
                          ))}
                          {issue.tools.map(tool => (
                            <span key={tool} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                              {tool}
                            </span>
                          ))}
                        </div>
                        {issue.notes && (
                          <p className="mt-2 text-sm text-gray-600">{issue.notes}</p>
                        )}
                      </div>
                      <div className="ml-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          issue.status === 'New' ? 'bg-blue-100 text-blue-800' :
                          issue.status === 'In Review' ? 'bg-yellow-100 text-yellow-800' :
                          issue.status === 'AcceptedAsRisk' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {issue.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuesList; 