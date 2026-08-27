import { useState } from 'react';

function ContactForm({ onAddContact }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim()) return;

    onAddContact({
      id: Date.now(),
      nombre,
      telefono
    });

    setNombre('');
    setTelefono('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Agregar Contacto</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>
      <button type="submit">Guardar Contacto</button>
    </form>
  );
}

export default ContactForm;