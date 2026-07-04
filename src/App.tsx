import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ConfettiBurst } from './components/ConfettiBurst';
import { IslandHub } from './components/IslandHub';
import { ParentDashboard } from './components/ParentDashboard';
import { WorldMap } from './components/WorldMap';
import { ProgressProvider } from './context/ProgressContext';
import { GamePage } from './games/GamePage';

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <div className="app-shell">
          <ConfettiBurst />
          <Routes>
            <Route path="/" element={<WorldMap />} />
            <Route path="/island/:subjectId" element={<IslandHub />} />
            <Route path="/island/:subjectId/:gameId" element={<GamePage />} />
            <Route path="/parent" element={<ParentDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ProgressProvider>
  );
}
