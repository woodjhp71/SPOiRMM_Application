import { useQuery } from '@tanstack/react-query';

export interface Project {
  id: string;
  title: string;
  status: 'New' | 'In Progress' | 'Approved' | 'Closed';
  sponsor: string;
  coordinator: string;
  progress: number;
  projectManager?: string;
  riskPlanSponsor?: string;
  riskPlanCoordinator?: string;
}

const fetchActiveProjects = async (userName?: string): Promise<Project[]> => {
  // For development, always return mock data
  // When API is available, uncomment the fetch code below
  const mockData: Project[] = [
    {
      id: '1',
      title: 'Enterprise Risk Management Plan',
      status: 'In Progress',
      sponsor: 'Sarah Johnson',
      coordinator: 'Lisa Chen',
      progress: 65,
      projectManager: 'John Smith',
      riskPlanSponsor: 'Sarah Johnson',
      riskPlanCoordinator: 'Lisa Chen'
    },
    {
      id: '2',
      title: 'Operational Risk Assessment',
      status: 'New',
      sponsor: 'David Brown',
      coordinator: 'Jane Doe',
      progress: 25,
      projectManager: 'Mike Wilson',
      riskPlanSponsor: 'David Brown',
      riskPlanCoordinator: 'Jane Doe'
    },
    {
      id: '3',
      title: 'Compliance Framework Update',
      status: 'Approved',
      sponsor: 'John Smith',
      coordinator: 'Sarah Johnson',
      progress: 90,
      projectManager: 'Lisa Chen',
      riskPlanSponsor: 'John Smith',
      riskPlanCoordinator: 'Sarah Johnson'
    }
  ];

  // Filter projects based on user assignment if userName is provided
  if (userName) {
    const filteredProjects = mockData.filter(project => 
      project.projectManager === userName ||
      project.riskPlanSponsor === userName ||
      project.riskPlanCoordinator === userName
    );
    return filteredProjects;
  }

  // Return all projects if no user filter is applied
  return mockData;

  // Uncomment this when API is available:
  /*
  try {
    const response = await fetch(`/api/projects/active${userName ? `?user=${encodeURIComponent(userName)}` : ''}`);
    if (!response.ok) {
      console.warn('API endpoint not available, using mock data');
      return userName ? mockData.filter(project => 
        project.projectManager === userName ||
        project.riskPlanSponsor === userName ||
        project.riskPlanCoordinator === userName
      ) : mockData;
    }
    return response.json();
  } catch (error) {
    console.warn('Error fetching active projects, using mock data:', error);
    return userName ? mockData.filter(project => 
      project.projectManager === userName ||
      project.riskPlanSponsor === userName ||
      project.riskPlanCoordinator === userName
    ) : mockData;
  }
  */
};

export const useActiveProjects = (userName?: string) => {
  return useQuery({
    queryKey: ['activeProjects', userName],
    queryFn: () => fetchActiveProjects(userName),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
    retry: false, // Don't retry failed requests
    retryOnMount: false, // Don't retry on mount
  });
}; 