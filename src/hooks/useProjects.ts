import { useQuery } from '@tanstack/react-query';

export interface Project {
  id: string;
  title: string;
  status: 'New' | 'In Progress' | 'Approved' | 'Closed';
  sponsor: string;
  coordinator: string;
  progress: number;
}

const fetchActiveProjects = async (): Promise<Project[]> => {
  // For development, always return mock data
  // When API is available, uncomment the fetch code below
  const mockData: Project[] = [
    {
      id: '1',
      title: 'Enterprise Risk Management Plan',
      status: 'In Progress',
      sponsor: 'John Smith',
      coordinator: 'Jane Doe',
      progress: 65
    },
    {
      id: '2',
      title: 'Operational Risk Assessment',
      status: 'New',
      sponsor: 'Sarah Johnson',
      coordinator: 'Mike Wilson',
      progress: 25
    },
    {
      id: '3',
      title: 'Compliance Framework Update',
      status: 'Approved',
      sponsor: 'David Brown',
      coordinator: 'Lisa Chen',
      progress: 90
    }
  ];

  // Return mock data immediately for development
  return mockData;

  // Uncomment this when API is available:
  /*
  try {
    const response = await fetch('/api/projects/active');
    if (!response.ok) {
      console.warn('API endpoint not available, using mock data');
      return mockData;
    }
    return response.json();
  } catch (error) {
    console.warn('Error fetching active projects, using mock data:', error);
    return mockData;
  }
  */
};

export const useActiveProjects = () => {
  return useQuery({
    queryKey: ['activeProjects'],
    queryFn: fetchActiveProjects,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
    retry: false, // Don't retry failed requests
    retryOnMount: false, // Don't retry on mount
  });
}; 