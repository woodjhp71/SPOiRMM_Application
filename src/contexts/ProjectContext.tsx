import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Player } from '../components/PlayersChart/PlayersChart';
import { ProjectPlanningData } from '../components/ProjectPlanning/ProjectPlanning';
import { Issue } from '../components/IssuesList/IssuesList';

export interface ProjectData extends ProjectPlanningData {
  id: string;
  issues: Issue[];
}

interface ProjectContextType {
  projectData: ProjectData | null;
  setProjectData: (data: ProjectData) => void;
  updateProjectSection: (section: keyof ProjectData, data: any) => void;
  updatePlayers: (players: Player[]) => void;
  updateIssues: (issues: Issue[]) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);

  const updateProjectSection = (section: keyof ProjectData, data: any) => {
    if (projectData) {
      setProjectData(prev => prev ? ({
        ...prev,
        [section]: { ...(prev[section] as any), ...data }
      }) : null);
    }
  };

                const updatePlayers = (players: Player[]) => {
                if (projectData) {
                  setProjectData(prev => prev ? ({
                    ...prev,
                    players
                  }) : null);
                }
              };

              const updateIssues = (issues: Issue[]) => {
                if (projectData) {
                  setProjectData(prev => prev ? ({
                    ...prev,
                    issues
                  }) : null);
                }
              };

              return (
                <ProjectContext.Provider value={{
                  projectData,
                  setProjectData,
                  updateProjectSection,
                  updatePlayers,
                  updateIssues
                }}>
                  {children}
                </ProjectContext.Provider>
              );
}; 