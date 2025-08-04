import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../../contexts/ProjectContext';
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  EyeSlashIcon,
  DocumentArrowDownIcon,
  UserIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import Header from '../Header/Header';
import PlayersSidePanel from './PlayersSidePanel';
import { Player } from '../PlayersChart/PlayersChart';

interface VisualPlayer extends Player {
  x: number;
  y: number;
  isDragging: boolean;
}

const PlayersChartPage: React.FC = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { } = useProject();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [visualPlayers, setVisualPlayers] = useState<VisualPlayer[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [filters, setFilters] = useState({
    role: 'all',
    nature: 'all',
    showArrows: true,
    showGuidelines: true
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Initialize visual players from project data
  useEffect(() => {
    // Initialize with empty array since players are now managed at organization level
    setVisualPlayers([]);
  }, []);

  const getPlayerColor = (role: Player['playerRole']) => {
    switch (role) {
      case 'Recipient of Benefit':
        return 'bg-blue-500 border-blue-700';
      case 'Provider of Benefit':
        return 'bg-red-500 border-red-700';
      case 'Cost Minimiser':
      case 'Benefit Maximiser':
        return 'bg-green-500 border-green-700';
      case 'Staff':
        return 'bg-green-500 border-green-700';
      case 'Supplier':
        return 'bg-green-500 border-green-700';
      default:
        return 'bg-yellow-500 border-yellow-700';
    }
  };

  const getPlayerShape = (nature: Player['entityNature']) => {
    return nature === 'Individual' ? 'circle' : 'rect';
  };

  const handleNodeClick = (player: Player) => {
    setSelectedPlayer(player);
    setIsSidePanelOpen(true);
  };

  const handleNodeDragStart = (e: React.MouseEvent, playerId: string) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setVisualPlayers(prev => 
      prev.map(p => p.id === playerId ? { ...p, isDragging: true } : p)
    );
  };

  const handleNodeDrag = (e: React.MouseEvent, playerId: string) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setVisualPlayers(prev => 
      prev.map(p => p.id === playerId ? { 
        ...p, 
        x: p.x + deltaX / zoom, 
        y: p.y + deltaY / zoom 
      } : p)
    );
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleNodeDragEnd = (playerId: string) => {
    setIsDragging(false);
    setVisualPlayers(prev => 
      prev.map(p => p.id === playerId ? { ...p, isDragging: false } : p)
    );
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDragging && e.target === canvasRef.current) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      setPan(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const filteredPlayers = visualPlayers.filter(player => {
    const matchesRole = filters.role === 'all' || player.playerRole === filters.role;
    const matchesNature = filters.nature === 'all' || player.entityNature === filters.nature;
    return matchesRole && matchesNature;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Standardized Header */}
      <Header title="Players Chart Visualizer - Interactive Stakeholder Mapping and Analysis" showUserInfo={true} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Page Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate(`/project/${projectId}`)}
                  className="flex items-center px-3 py-2 text-white hover:bg-blue-700 rounded-md transition-colors"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Back to Project
                </button>
                <div>
                  <p className="text-blue-100 mt-1">
                    Interactive Stakeholder Mapping and Analysis
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleZoomIn}
                  className="flex items-center px-3 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <MagnifyingGlassIcon className="h-4 w-4 mr-1" />
                  Zoom In
                </button>
                <button
                  onClick={handleZoomOut}
                  className="flex items-center px-3 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <MagnifyingGlassIcon className="h-4 w-4 mr-1" />
                  Zoom Out
                </button>
                <button
                  onClick={handleResetView}
                  className="flex items-center px-3 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Reset View
                </button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FunnelIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>
                
                <select
                  value={filters.role}
                  onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="Recipient of Benefit">Recipient of Benefit</option>
                  <option value="Provider of Benefit">Provider of Benefit</option>
                  <option value="Cost Minimiser">Cost Minimiser</option>
                  <option value="Benefit Maximiser">Benefit Maximiser</option>
                  <option value="Staff">Staff</option>
                  <option value="Supplier">Supplier</option>
                </select>

                <select
                  value={filters.nature}
                  onChange={(e) => setFilters(prev => ({ ...prev, nature: e.target.value }))}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="Individual">Individual</option>
                  <option value="Organisation">Organisation</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, showArrows: !prev.showArrows }))}
                  className={`flex items-center px-3 py-1 text-sm rounded-md transition-colors ${
                    filters.showArrows 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {filters.showArrows ? <EyeIcon className="h-4 w-4 mr-1" /> : <EyeSlashIcon className="h-4 w-4 mr-1" />}
                  Arrows
                </button>
                <button
                  onClick={() => setFilters(prev => ({ ...prev, showGuidelines: !prev.showGuidelines }))}
                  className={`flex items-center px-3 py-1 text-sm rounded-md transition-colors ${
                    filters.showGuidelines 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {filters.showGuidelines ? <EyeIcon className="h-4 w-4 mr-1" /> : <EyeSlashIcon className="h-4 w-4 mr-1" />}
                  Guidelines
                </button>
                <button className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors">
                  <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative h-96 bg-gray-100 overflow-hidden">
            <div
              ref={canvasRef}
              className="w-full h-full relative cursor-grab active:cursor-grabbing"
              style={{
                transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                transformOrigin: '0 0'
              }}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
            >
              {/* Guidelines */}
              {filters.showGuidelines && (
                <>
                  {/* Horizontal Time Line */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-300 opacity-50" />
                  {/* Vertical Centre Line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-300 opacity-50" />
                  {/* Gradient Line */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <svg className="w-full h-full">
                      <line
                        x1="0"
                        y1="100%"
                        x2="100%"
                        y2="0"
                        stroke="#10B981"
                        strokeWidth="2"
                        opacity="0.3"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </div>
                </>
              )}

              {/* Player Nodes */}
              {filteredPlayers.map((player) => {
                const shape = getPlayerShape(player.entityNature);
                const color = getPlayerColor(player.playerRole);
                
                return (
                  <div
                    key={player.id}
                    className={`absolute cursor-pointer transition-all duration-200 hover:scale-110 ${
                      player.isDragging ? 'z-50' : 'z-10'
                    }`}
                    style={{
                      left: player.x,
                      top: player.y,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onMouseDown={(e) => handleNodeDragStart(e, player.id)}
                    onMouseMove={(e) => handleNodeDrag(e, player.id)}
                    onMouseUp={() => handleNodeDragEnd(player.id)}
                    onClick={() => handleNodeClick(player)}
                  >
                    {shape === 'circle' ? (
                      <div className={`w-16 h-16 rounded-full ${color} border-2 shadow-lg flex items-center justify-center`}>
                        <span className="text-white text-xs font-medium text-center">
                          {player.playerName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                    ) : (
                      <div className={`w-20 h-12 rounded-lg ${color} border-2 shadow-lg flex items-center justify-center`}>
                        <span className="text-white text-xs font-medium text-center">
                          {player.playerName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                    )}
                    
                    {/* Player Name Tooltip */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {player.playerName}
                    </div>
                  </div>
                );
              })}

              {/* Connection Arrows */}
              {filters.showArrows && (
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  {filteredPlayers.map((player, index) => {
                    if (index === 0) return null;
                    const prevPlayer = filteredPlayers[index - 1];
                    
                    return (
                      <line
                        key={`arrow-${prevPlayer.id}-${player.id}`}
                        x1={prevPlayer.x}
                        y1={prevPlayer.y}
                        x2={player.x}
                        y2={player.y}
                        stroke="#6B7280"
                        strokeWidth="2"
                        opacity="0.5"
                        markerEnd="url(#arrowhead)"
                      />
                    );
                  })}
                  
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                    </marker>
                  </defs>
                </svg>
              )}
            </div>

            {/* Zoom Level Indicator */}
            <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-md shadow-md text-sm text-gray-600">
              {Math.round(zoom * 100)}%
            </div>
          </div>

          {/* Legend */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span>Recipient of Benefit</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>Provider of Benefit</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Benefit Enablers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span>Regulators & Representatives</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded bg-gray-500"></div>
                <span>Organisations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {isSidePanelOpen && selectedPlayer && (
        <PlayersSidePanel
          player={selectedPlayer}
          onClose={() => {
            setIsSidePanelOpen(false);
            setSelectedPlayer(null);
          }}
          projectId={projectId || ''}
        />
      )}
    </div>
  );
};

export default PlayersChartPage; 