import { useState } from 'react';

export const QueuePage = () => {
  const [queue, setQueue] = useState([
    { name: "Carlos Mendoza", amount: 200000, date: new Date(Date.now() - 3600000).toLocaleTimeString() },
    { name: "Ana Gómez", amount: 150000, date: new Date(Date.now() - 1800000).toLocaleTimeString() }
  ]);
  const [form, setForm] = useState({ name: '', amount: '' });

  const handleEnqueue = (e) => {
    e.preventDefault();
    if (!form.name || !form.amount) return;
    setQueue([...queue, { name: form.name, amount: form.amount, date: new Date().toLocaleTimeString() }]);
    setForm({ name: '', amount: '' });
  };

  const handleDequeue = () => {
    if (queue.length === 0) return alert('Cola vacía');
    const newQueue = [...queue];
    const served = newQueue.shift();
    alert(`Atendido: ${served.name}`);
    setQueue(newQueue);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '20px auto', padding: '20px' }}>
      <h1> Cola del Cajero (Challenge 05)</h1>
      <form onSubmit={handleEnqueue} style={{ display: 'grid', gap: '8px', marginBottom: '20px' }}>
        <input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input type="number" placeholder="Monto" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
        <button type="submit" style={{ padding: '8px', background: '#198754', color: '#fff', border: 'none' }}>Enqueue Persona</button>
      </form>
      <button onClick={handleDequeue} style={{ padding: '8px 15px', background: '#0d6efd', color: '#fff', border: 'none', marginBottom: '15px' }}>Dequeue Persona</button>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {queue.map((p, i) => (
          <div key={i} style={{ border: i === 0 ? '2px solid #198754' : '1px solid #ccc', padding: '10px', background: i === 0 ? '#d1e7dd' : '#fff' }}>
            {i === 0 && <span style={{ float: 'right', background: '#198754', color: '#fff', padding: '2px 6px', fontSize: '12px' }}>Frente</span>}
            <strong>{i + 1}. {p.name}</strong> - Retira: ${p.amount} <small>({p.date})</small>
          </div>
        ))}
      </div>
    </div>
  );
};