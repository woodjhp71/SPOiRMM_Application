import React, { useState } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  UserIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

export interface OrgPlayer {
  id: string;
  playerName: string;
  playerType: 'Recipient' | 'Provider' | 'Staff' | 'Supplier' | 'Benefit Maximiser' | 'Cost Minimiser' | 'Regulator' | 'Representative';
  playerRole: string;
  entityNature: 'Individual' | 'Organization';
  notes?: string;
  linkedProjects?: string[];
}

const OrgPlayers: React.FC = () => {
  const [players, setPlayers] = useState<OrgPlayer[]>([]);
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  // const [editingPlayer, setEditingPlayer] = useState<OrgPlayer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [newPlayer, setNewPlayer] = useState<Partial<OrgPlayer>>({
    playerName: '',
    playerType: 'Recipient',
    playerRole: 'Recipient of Benefit',
    entityNature: 'Individual',
    notes: ''
  });

  // Business logic for conditional dropdowns
  const getPlayerRoleOptions = (playerType: OrgPlayer['playerType']): string[] => {
    switch (playerType) {
      case 'Recipient':
        return ['Recipient of Benefit', 'Purchaser (Cost Minimiser)'];
      case 'Provider':
        return ['Provider of Benefit'];
      case 'Staff':
        return ['Staff Member (Benefit Enabler)'];
      case 'Supplier':
        return ['Supplier (Benefit Enabler)'];
      case 'Benefit Maximiser':
        return ['Clinician', 'Salesperson', 'Advisor'];
      case 'Cost Minimiser':
        return ['Purchaser', 'Broker', 'Insurer'];
      case 'Regulator':
        return ['Government Agency', 'Accreditation Body'];
      case 'Representative':
        return ['Union', 'Professional Association', 'Consumer Group'];
      default:
        return [];
    }
  };

  const getEntityNatureOptions = (playerType: OrgPlayer['playerType']): OrgPlayer['entityNature'][] => {
    switch (playerType) {
      case 'Recipient':
        return ['Individual', 'Organization'];
      case 'Provider':
      case 'Supplier':
      case 'Cost Minimiser':
      case 'Regulator':
      case 'Representative':
        return ['Organization'];
      case 'Staff':
      case 'Benefit Maximiser':
        return ['Individual'];
      default:
        return ['Individual', 'Organization'];
    }
  };

  const validatePlayerCombination = (playerType: OrgPlayer['playerType'], playerRole: string, entityNature: OrgPlayer['entityNature']): boolean => {
    const validCombinations = [
      { type: 'Recipient', role: 'Recipient of Benefit', nature: 'Individual' },
      { type: 'Recipient', role: 'Purchaser (Cost Minimiser)', nature: 'Organization' },
      { type: 'Provider', role: 'Provider of Benefit', nature: 'Organization' },
      { type: 'Staff', role: 'Staff Member (Benefit Enabler)', nature: 'Individual' },
      { type: 'Supplier', role: 'Supplier (Benefit Enabler)', nature: 'Organization' },
      { type: 'Benefit Maximiser', role: 'Clinician', nature: 'Individual' },
      { type: 'Benefit Maximiser', role: 'Salesperson', nature: 'Individual' },
      { type: 'Benefit Maximiser', role: 'Advisor', nature: 'Individual' },
      { type: 'Cost Minimiser', role: 'Purchaser', nature: 'Organization' },
      { type: 'Cost Minimiser', role: 'Broker', nature: 'Organization' },
      { type: 'Cost Minimiser', role: 'Insurer', nature: 'Organization' },
      { type: 'Regulator', role: 'Government Agency', nature: 'Organization' },
      { type: 'Regulator', role: 'Accreditation Body', nature: 'Organization' },
      { type: 'Representative', role: 'Union', nature: 'Organization' },
      { type: 'Representative', role: 'Professional Association', nature: 'Organization' },
      { type: 'Representative', role: 'Consumer Group', nature: 'Organization' }
    ];

    return validCombinations.some(combo => 
      combo.type === playerType && 
      combo.role === playerRole && 
      combo.nature === entityNature
    );
  };

  const getPlayerTypeColor = (type: OrgPlayer['playerType']) => {
    switch (type) {
      case 'Recipient': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Provider': return 'bg-red-100 text-red-800 border-red-200';
      case 'Staff': return 'bg-green-100 text-green-800 border-green-200';
      case 'Supplier': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Benefit Maximiser': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Cost Minimiser': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Regulator': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Representative': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const validatePlayer = (player: Partial<OrgPlayer>): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!player.playerName?.trim()) {
      errors.playerName = 'Player Name is required';
    }

    // Validate business logic combinations
    if (player.playerType && player.playerRole && player.entityNature) {
      if (!validatePlayerCombination(player.playerType, player.playerRole, player.entityNature)) {
        errors.combination = 'Invalid combination of Player Type, Role, and Entity Nature. Please check the business rules.';
      }
    }

    // Check for uniqueness: Player Name + Role + Nature
    const isDuplicate = players.some(p => 
      p.id !== player.id && 
      p.playerName.toLowerCase() === player.playerName?.toLowerCase() &&
      p.playerRole === player.playerRole &&
      p.entityNature === player.entityNature
    );

    if (isDuplicate) {
      errors.playerName = 'A player with this name, role, and nature already exists';
    }

    return errors;
  };

  const handleAddPlayer = () => {
    const validationErrors = validatePlayer(newPlayer);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const player: OrgPlayer = {
      id: Date.now().toString(),
      playerName: newPlayer.playerName!,
      playerType: newPlayer.playerType!,
      playerRole: newPlayer.playerRole!,
      entityNature: newPlayer.entityNature!,
      notes: newPlayer.notes || '',
      linkedProjects: []
    };

    setPlayers([...players, player]);
    setNewPlayer({
      playerName: '',
      playerType: 'Recipient',
      playerRole: 'Recipient of Benefit',
      entityNature: 'Individual',
      notes: ''
    });
    setIsAddingPlayer(false);
    setErrors({});
  };

  const handleDeletePlayer = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    if (player && player.linkedProjects && player.linkedProjects.length > 0) {
      alert('Cannot delete player that is linked to active projects');
      return;
    }
    setPlayers(players.filter(player => player.id !== playerId));
  };

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || player.playerType === filterType;
    return matchesSearch && matchesType;
  });

  const getEntityIcon = (nature: OrgPlayer['entityNature']) => {
    return nature === 'Individual' ? UserIcon : BuildingOfficeIcon;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Master Player List</h2>
          <p className="text-gray-600">Manage enterprise-level players with conditional business logic</p>
        </div>
        <button
          onClick={() => setIsAddingPlayer(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Player
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="Recipient">Recipient</option>
            <option value="Provider">Provider</option>
            <option value="Staff">Staff</option>
            <option value="Supplier">Supplier</option>
            <option value="Benefit Maximiser">Benefit Maximiser</option>
            <option value="Cost Minimiser">Cost Minimiser</option>
            <option value="Regulator">Regulator</option>
            <option value="Representative">Representative</option>
          </select>
        </div>
      </div>

      {/* Add Player Form */}
      {isAddingPlayer && (
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Player</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Player Name *
              </label>
              <input
                type="text"
                value={newPlayer.playerName}
                onChange={(e) => setNewPlayer({ ...newPlayer, playerName: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.playerName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.playerName && (
                <p className="text-red-500 text-sm mt-1">{errors.playerName}</p>
              )}
            </div>

            {errors.combination && (
              <div className="md:col-span-3">
                <p className="text-red-500 text-sm mt-1">{errors.combination}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Player Type *
              </label>
              <select
                value={newPlayer.playerType}
                onChange={(e) => {
                  const newType = e.target.value as OrgPlayer['playerType'];
                  const availableRoles = getPlayerRoleOptions(newType);
                  const availableNatures = getEntityNatureOptions(newType);
                  
                  setNewPlayer({ 
                    ...newPlayer, 
                    playerType: newType,
                    playerRole: availableRoles[0] || '',
                    entityNature: availableNatures[0] || 'Individual'
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Recipient">Recipient</option>
                <option value="Provider">Provider</option>
                <option value="Staff">Staff</option>
                <option value="Supplier">Supplier</option>
                <option value="Benefit Maximiser">Benefit Maximiser</option>
                <option value="Cost Minimiser">Cost Minimiser</option>
                <option value="Regulator">Regulator</option>
                <option value="Representative">Representative</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Player Role *
              </label>
              <select
                value={newPlayer.playerRole}
                onChange={(e) => setNewPlayer({ ...newPlayer, playerRole: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {getPlayerRoleOptions(newPlayer.playerType || 'Recipient').map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Entity Nature *
              </label>
              <select
                value={newPlayer.entityNature}
                onChange={(e) => setNewPlayer({ ...newPlayer, entityNature: e.target.value as OrgPlayer['entityNature'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {getEntityNatureOptions(newPlayer.playerType || 'Recipient').map(nature => (
                  <option key={nature} value={nature}>{nature}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={newPlayer.notes}
                onChange={(e) => setNewPlayer({ ...newPlayer, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Additional details about this player..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => {
                setIsAddingPlayer(false);
                setNewPlayer({
                  playerName: '',
                  playerType: 'Recipient',
                  playerRole: 'Recipient of Benefit',
                  entityNature: 'Individual',
                  notes: ''
                });
                setErrors({});
              }}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPlayer}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Player
            </button>
          </div>
        </div>
      )}

      {/* Players Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nature
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Linked Projects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          {React.createElement(getEntityIcon(player.entityNature), {
                            className: "h-6 w-6 text-gray-600"
                          })}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {player.playerName}
                        </div>
                        {player.notes && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {player.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPlayerTypeColor(player.playerType)}`}>
                        {player.playerType}
                      </span>
                      <div className="text-xs text-gray-500">
                        {player.playerRole}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {player.entityNature}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {player.linkedProjects && player.linkedProjects.length > 0 ? (
                        <span className="text-green-600 font-medium">
                          {player.linkedProjects.length} project(s)
                        </span>
                      ) : (
                        <span className="text-gray-400">No projects</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                                             <button
                         onClick={() => {/* TODO: Implement edit functionality */}}
                         className="text-blue-600 hover:text-blue-900"
                       >
                         <PencilIcon className="h-4 w-4" />
                       </button>
                      <button
                        onClick={() => handleDeletePlayer(player.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No players found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterType !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Get started by adding your first player.'}
            </p>
            {!searchTerm && filterType === 'all' && (
              <div className="mt-6">
                <button
                  onClick={() => setIsAddingPlayer(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Player
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 px-6 py-4 rounded-lg border">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {filteredPlayers.length} of {players.length} players
          </div>
          <div className="flex space-x-4 text-sm text-gray-600">
            <span>Recipients: {players.filter(p => p.playerType === 'Recipient').length}</span>
            <span>Providers: {players.filter(p => p.playerType === 'Provider').length}</span>
            <span>Staff: {players.filter(p => p.playerType === 'Staff').length}</span>
            <span>Suppliers: {players.filter(p => p.playerType === 'Supplier').length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgPlayers; 