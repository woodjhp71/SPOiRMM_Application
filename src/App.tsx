
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProjectPlanning from './components/ProjectPlanning/ProjectPlanning';
import PlayersChart from './components/PlayersChart/PlayersChart';
import IssuesList from './components/IssuesList/IssuesList';
import RiskRegister from './components/RiskRegister/RiskRegister';
import PlayersChartPage from './components/PlayersChartPage/PlayersChartPage';
import { ProjectProvider } from './contexts/ProjectContext';

function App() {
  return (
    <ProjectProvider>
      <Router>
        <div className="App">
                                <Routes>
                        <Route path="/" element={<Navigate to="/project/new" replace />} />
                        <Route path="/project/:id" element={<ProjectPlanning />} />
                        <Route path="/project/:id/players" element={<PlayersChart />} />
                        <Route path="/project/:id/players-chart" element={<PlayersChartPage />} />
                        <Route path="/project/:id/issues" element={<IssuesList />} />
                        <Route path="/project/:id/register" element={<RiskRegister />} />
                      </Routes>
        </div>
      </Router>
    </ProjectProvider>
  );
}

export default App; 