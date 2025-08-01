import React from 'react';
import { XMarkIcon, ExclamationTriangleIcon, DocumentTextIcon, UserIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { Player } from '../PlayersChart/PlayersChart';

interface PlayersSidePanelProps {
  player: Player;
  onClose: () => void;
  projectId: string;
}

const PlayersSidePanel: React.FC<PlayersSidePanelProps> = ({ player, onClose }) => {
  // Mock data for linked risks, agreements, and tools
  const mockLinkedRisks = [
    { id: 'R001', title: 'Regulatory Compliance Risk', severity: 'High' },
    { id: 'R002', title: 'Supply Chain Disruption', severity: 'Medium' }
  ];

  const mockAgreements = [
    { id: 'A001', title: 'Service Level Agreement', type: 'SLA', status: 'Active' },
    { id: 'A002', title: 'Non-Disclosure Agreement', type: 'NDA', status: 'Active' }
  ];

  const mockAssociatedTools = [
    { name: 'Enterprise Tool', type: 'Enterprise', description: 'Market contracts and business relationships' },
    { name: 'Jurisdiction Tool', type: 'Jurisdiction', description: 'Regulatory compliance and legal framework' }
  ];

  const getRoleColor = (role: Player['playerRole']) => {
    switch (role) {
      case 'Recipient of Benefit':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Provider of Benefit':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Cost Minimiser':
      case 'Benefit Maximiser':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Staff':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Supplier':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getToolColor = (toolType: string) => {
    switch (toolType) {
      case 'Jurisdiction':
        return 'bg-purple-50 text-purple-700';
      case 'Market':
        return 'bg-orange-50 text-orange-700';
      case 'Enterprise':
        return 'bg-teal-50 text-teal-700';
      case 'Organisation':
        return 'bg-light-blue-50 text-light-blue-700';
      case 'Agreements':
        return 'bg-dark-blue-50 text-dark-blue-700';
      case 'Resources':
        return 'bg-brown-50 text-brown-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-0 right-0 h-full w-96 bg-white shadow-xl">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${player.entityNature === 'Individual' ? 'bg-blue-100' : 'bg-green-100'}`}>
                {player.entityNature === 'Individual' ? (
                  <UserIcon className="h-6 w-6 text-blue-600" />
                ) : (
                  <BuildingOfficeIcon className="h-6 w-6 text-green-600" />
                )}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{player.playerName}</h2>
                <p className="text-sm text-gray-500">{player.entityNature}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Player Details */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Player Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500">Role</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(player.playerRole)}`}>
                    {player.playerRole}
                  </span>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-500">Type</label>
                  <span className="text-sm text-gray-900">{player.playerType}</span>
                </div>

                {player.relationshipToProject && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Relationship to Project</label>
                    <p className="text-sm text-gray-900">{player.relationshipToProject}</p>
                  </div>
                )}

                {player.notes && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Notes</label>
                    <p className="text-sm text-gray-900">{player.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Linked Risks */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <ExclamationTriangleIcon className="h-4 w-4 mr-2 text-red-500" />
                Linked Risks
              </h3>
              {mockLinkedRisks.length > 0 ? (
                <div className="space-y-2">
                  {mockLinkedRisks.map((risk) => (
                    <div key={risk.id} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{risk.title}</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(risk.severity)}`}>
                          {risk.severity}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Risk ID: {risk.id}</span>
                        <button className="text-xs text-blue-600 hover:text-blue-800">
                          View in Risk Register →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No linked risks found.</p>
              )}
            </div>

            {/* Agreements */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <DocumentTextIcon className="h-4 w-4 mr-2 text-blue-500" />
                Related Agreements
              </h3>
              {mockAgreements.length > 0 ? (
                <div className="space-y-2">
                  {mockAgreements.map((agreement) => (
                    <div key={agreement.id} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{agreement.title}</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {agreement.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Type: {agreement.type}</span>
                        <span className="text-xs text-gray-500">ID: {agreement.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No agreements found.</p>
              )}
            </div>

            {/* Associated Tools */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Associated Tools</h3>
              {mockAssociatedTools.length > 0 ? (
                <div className="space-y-2">
                  {mockAssociatedTools.map((tool, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{tool.name}</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getToolColor(tool.type)}`}>
                          {tool.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{tool.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No associated tools found.</p>
              )}
            </div>

            {/* Risk Impact */}
            {player.riskImpacted && player.riskImpacted.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Risk Impact</h3>
                <div className="space-y-2">
                  {player.riskImpacted.map((riskId) => (
                    <div key={riskId} className="p-2 bg-orange-50 border border-orange-200 rounded-md">
                      <span className="text-xs text-orange-800">Risk ID: {riskId}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
              <button
                onClick={() => {
                  // Navigate to edit player page or open edit modal
                  console.log('Edit player:', player.id);
                }}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit Player
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayersSidePanel; 