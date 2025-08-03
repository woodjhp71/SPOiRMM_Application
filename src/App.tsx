
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProjectPlanning from './components/ProjectPlanning/ProjectPlanning';
import PlayersChart from './components/PlayersChart/PlayersChart';
import IssuesList from './components/IssuesList/IssuesList';
import RiskRegister from './components/RiskRegister/RiskRegister';
import PlayersChartPage from './components/PlayersChartPage/PlayersChartPage';
import ProjectWorkflow from './components/ProjectWorkflow/ProjectWorkflow';

import ProjectsList from './components/ProjectsList/ProjectsList';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import Planning from './components/Planning';
import ReportsPage from './components/ReportsPage';
import AdminSettingsPage from './components/AdminSettingsPage';
import OrganizationSetup from './components/OrganizationSetup/OrganizationSetup';
import DepartmentsPage from './components/OrganizationSetup/DepartmentsPage';
import AgreementsPage from './components/OrganizationSetup/AgreementsPage';
import PoliciesPage from './components/OrganizationSetup/PoliciesPage';
import SettingsPage from './components/OrganizationSetup/SettingsPage';
import { ProjectProvider } from './contexts/ProjectContext';
import { AuthProvider } from './contexts/AuthContext';
import { LoginPage } from './components/Auth';
import ProtectedRoute from './components/Auth/ProtectedRoute';

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
      <AuthProvider>
        <ProjectProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/workflow" element={<ProtectedRoute><ProjectWorkflow /></ProtectedRoute>} />
                <Route path="/planning" element={<ProtectedRoute><Planning /></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute><AdminSettingsPage /></ProtectedRoute>} />
                <Route path="/organization" element={<ProtectedRoute><OrganizationSetup /></ProtectedRoute>} />
                <Route path="/organization/departments" element={<ProtectedRoute><DepartmentsPage /></ProtectedRoute>} />
                <Route path="/organization/agreements" element={<ProtectedRoute><AgreementsPage /></ProtectedRoute>} />
                <Route path="/organization/policies" element={<ProtectedRoute><PoliciesPage /></ProtectedRoute>} />
                <Route path="/organization/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                <Route path="/projects" element={<ProtectedRoute><ProjectsList /></ProtectedRoute>} />
                <Route path="/projects/:projectId/planning" element={<ProtectedRoute><ProjectPlanning /></ProtectedRoute>} />
                <Route path="/project/:id" element={<ProtectedRoute><ProjectPlanning /></ProtectedRoute>} />
                <Route path="/project/:id/players" element={<ProtectedRoute><PlayersChart /></ProtectedRoute>} />
                <Route path="/project/:id/players-chart" element={<ProtectedRoute><PlayersChartPage /></ProtectedRoute>} />
                <Route path="/project/:id/issues" element={<ProtectedRoute><IssuesList /></ProtectedRoute>} />
                <Route path="/project/:id/register" element={<ProtectedRoute><RiskRegister /></ProtectedRoute>} />
                <Route path="/tools/jurisdiction" element={<ProtectedRoute><div className="p-8 text-center"><h1 className="text-2xl font-bold">Jurisdiction Tool</h1><p className="mt-4 text-gray-600">Tool implementation coming soon...</p></div></ProtectedRoute>} />
                <Route path="/tools/market" element={<ProtectedRoute><div className="p-8 text-center"><h1 className="text-2xl font-bold">Market Tool</h1><p className="mt-4 text-gray-600">Tool implementation coming soon...</p></div></ProtectedRoute>} />
                <Route path="/tools/enterprise" element={<ProtectedRoute><div className="p-8 text-center"><h1 className="text-2xl font-bold">Enterprise Tool</h1><p className="mt-4 text-gray-600">Tool implementation coming soon...</p></div></ProtectedRoute>} />
                <Route path="/tools/organisation" element={<ProtectedRoute><div className="p-8 text-center"><h1 className="text-2xl font-bold">Organisation Tool</h1><p className="mt-4 text-gray-600">Tool implementation coming soon...</p></div></ProtectedRoute>} />
                <Route path="/tools/agreements" element={<ProtectedRoute><div className="p-8 text-center"><h1 className="text-2xl font-bold">Agreements Tool</h1><p className="mt-4 text-gray-600">Tool implementation coming soon...</p></div></ProtectedRoute>} />
                <Route path="/tools/resources" element={<ProtectedRoute><div className="p-8 text-center"><h1 className="text-2xl font-bold">Resources Tool</h1><p className="mt-4 text-gray-600">Tool implementation coming soon...</p></div></ProtectedRoute>} />
                <Route path="*" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Page Not Found</h1><p className="mt-4 text-gray-600">The page you're looking for doesn't exist.</p></div>} />
              </Routes>
            </div>
          </Router>
        </ProjectProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App; 