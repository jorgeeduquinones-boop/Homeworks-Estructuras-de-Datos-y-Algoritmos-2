import { useState } from 'react';
import { Queue, initialPeople } from './Queue';

const atmQueue = new Queue();
initialPeople.forEach((person) => atmQueue.enqueue(person));

function App() {
  const [people, setPeople] = useState(atmQueue.getItemsSortedByArrival());

  const [formData, setFormData] = useState({
    name: '',
    amount: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.amount) {
      alert('Por favor completa todos los campos');
      return;
    }

    const newPerson = {
      name: formData.name,
      amount: parseFloat(formData.amount),
      arrivalDate: new Date().toISOString()
    };

    atmQueue.enqueue(newPerson);

    setPeople(atmQueue.getItemsSortedByArrival());

    setFormData({ name: '', amount: '' });
  };

  const handleDequeue = () => {
    if (atmQueue.isEmpty()) {
      alert('No hay personas en la cola del cajero');
      return;
    }
    const served = atmQueue.dequeue();
    alert(`Atendido: ${served.name} (Retiró: $${served.amount.toLocaleString()})`);
    setPeople(atmQueue.getItemsSortedByArrival());
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1> Challenge 05: Cola del Cajero Automático (Queue)</h1>

      <section style={{ background: '#e9ecef', padding: '20px', borderRadius: '8px', marginBottom: '25px' }}>
        <h2>Registrar Persona en la Fila (Enqueue)</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Monto a retirar ($)"
            value={formData.amount}
            onChange={handleChange}
          />
          <button
            type="submit"
            style={{ padding: '10px', background: '#198754', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Agregar a la Cola
          </button>
        </form>
      </section>

      <section style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button
          onClick={handleDequeue}
          style={{ padding: '10px 15px', background: '#0d6efd', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Atender Siguiente (Dequeue)
        </button>
        <span><strong>Personas esperando:</strong> {atmQueue.size()}</span>
      </section>

      <h2> Fila del Cajero (Ordenada por Hora de Llegada)</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {people.length === 0 ? (
          <p>No hay personas en la fila.</p>
        ) : (
          people.map((person, index) => {
            const isFirst = index === 0;
            return (
              <div
                key={index}
                style={{
                  border: isFirst ? '2px solid #198754' : '1px solid #ced4da',
                  backgroundColor: isFirst ? '#d1e7dd' : '#ffffff',
                  padding: '15px',
                  borderRadius: '6px'
                }}
              >
                {isFirst && (
                  <span style={{ background: '#198754', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', float: 'right' }}>
                    Turno Actual (Frente)
                  </span>
                )}
                <h3 style={{ margin: '0 0 5px 0' }}>{index + 1}. {person.name}</h3>
                <p style={{ margin: '2px 0' }}><strong>Monto a retirar:</strong> ${Number(person.amount).toLocaleString()}</p>
                <p style={{ margin: '2px 0', color: '#6c757d', fontSize: '0.85rem' }}>
                  <strong>Llegada:</strong> {new Date(person.arrivalDate).toLocaleTimeString()} ({new Date(person.arrivalDate).toLocaleDateString()})
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;