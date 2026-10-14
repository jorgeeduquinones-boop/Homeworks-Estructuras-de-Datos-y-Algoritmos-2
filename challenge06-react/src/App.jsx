import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PrivateRoute } from './components/PrivateRoute';
import { LoginPage } from './pages/LoginPage';
import { StackPage } from './pages/StackPage';
import { QueuePage } from './pages/QueuePage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rutas Privadas */}
        <Route path="/stack" element={<PrivateRoute><StackPage /></PrivateRoute>} />
        <Route path="/queue" element={<PrivateRoute><QueuePage /></PrivateRoute>} />
        
        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;