import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav style={{ background: '#212529', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/stack" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}> Pila de Libros (Ch 04)</Link>
        <Link to="/queue" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}> Cola de Cajero (Ch 05)</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span><strong>Usuario:</strong> {user?.email}</span>
        <button onClick={handleLogout} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};