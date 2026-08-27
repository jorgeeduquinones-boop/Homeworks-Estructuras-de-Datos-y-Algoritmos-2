import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Simulación de carga inicial de datos mediante useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setContactos([
        { id: 1, nombre: 'Ana García', telefono: '3001234567' },
        { id: 2, nombre: 'Carlos López', telefono: '3159265443' }
      ]);
      setCargando(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddContact = (nuevoContacto) => {
    setContactos((prev) => [...prev, nuevoContacto]);
  };

  const handleDeleteContact = (id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px' }}>
      <h2>Gestor de Contactos</h2>
      {cargando ? (
        <Loader />
      ) : (
        <>
          <ContactForm onAddContact={handleAddContact} />
          <hr />
          <ContactList contactos={contactos} onDeleteContact={handleDeleteContact} />
        </>
      )}
    </div>
  );
}

export default App;
