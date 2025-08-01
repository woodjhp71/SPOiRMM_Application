
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProjectPlanning from './components/ProjectPlanning/ProjectPlanning';
import PlayersChart from './components/PlayersChart/PlayersChart';
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
          </Routes>
        </div>
      </Router>
    </ProjectProvider>
  );
}

export default App; 