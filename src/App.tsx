
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProjectPlanning from './components/ProjectPlanning/ProjectPlanning';
import PlayersChart from './components/PlayersChart/PlayersChart';
import IssuesList from './components/IssuesList/IssuesList';
import RiskRegister from './components/RiskRegister/RiskRegister';
import PlayersChartPage from './components/PlayersChartPage/PlayersChartPage';

import ProjectsList from './components/ProjectsList/ProjectsList';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import Planning from './components/Planning';
import ReportsPage from './components/ReportsPage';
import AdminSettingsPage from './components/AdminSettingsPage';
import OrganizationSetup from './components/OrganizationSetup/OrganizationSetup';
import { ProjectProvider } from './contexts/ProjectContext';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ProjectProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/admin" element={<AdminSettingsPage />} />
              <Route path="/organization" element={<OrganizationSetup />} />
              <Route path="/projects" element={<ProjectsList />} />
              <Route path="/projects/:projectId/planning" element={<ProjectPlanning />} />
              <Route path="/project/:id" element={<ProjectPlanning />} />
              <Route path="/project/:id/players" element={<PlayersChart />} />
              <Route path="/project/:id/players-chart" element={<PlayersChartPage />} />
              <Route path="/project/:id/issues" element={<IssuesList />} />
              <Route path="/project/:id/register" element={<RiskRegister />} />
              <Route path="/tools/jurisdiction" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Jurisdiction Tool</h1><p className="mt-4 text-gray-600">Tool implementation coming soon...</p></div>} />
              <Route path="/tools/market" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Market Tool</h1><p className="mt-4 text-gray-600">Tool implementation coming soon...</p></div>} />
              <Route path="/tools/enterprise" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Enterprise Tool</h1><p className="mt-4 text-gray-600">Tool implementation coming soon...</p></div>} />
              <Route path="/tools/organisation" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Organisation Tool</h1><p className="mt-4 text-gray-600">Tool implementation coming soon...</p></div>} />
              <Route path="/tools/agreements" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Agreements Tool</h1><p className="mt-4 text-gray-600">Tool implementation coming soon...</p></div>} />
              <Route path="/tools/resources" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Resources Tool</h1><p className="mt-4 text-gray-600">Tool implementation coming soon...</p></div>} />
            </Routes>
          </div>
        </Router>
      </ProjectProvider>
    </QueryClientProvider>
  );
}

export default App; 