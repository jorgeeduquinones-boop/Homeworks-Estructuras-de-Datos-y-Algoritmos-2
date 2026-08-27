function ContactList({ contactos, onDeleteContact }) {
  if (contactos.length === 0) {
    return <p>No hay contactos guardados.</p>;
  }

  return (
    <div>
      <h3>Lista de Contactos</h3>
      <ul>
        {contactos.map((contacto) => (
          <li key={contacto.id} style={{ marginBottom: '8px' }}>
            <strong>{contacto.nombre}</strong> - {contacto.telefono}{' '}
            <button onClick={() => onDeleteContact(contacto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;