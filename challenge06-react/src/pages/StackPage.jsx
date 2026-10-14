import { useState } from 'react';

export const StackPage = () => {
  const [items, setItems] = useState([
    { name: "Cien Años de Soledad", isbn: "978-0307474728", author: "G. García Márquez", editorial: "Sudamericana" },
    { name: "1984", isbn: "978-0451524935", author: "George Orwell", editorial: "Secker" }
  ]);
  const [form, setForm] = useState({ name: '', isbn: '', author: '', editorial: '' });

  const handlePush = (e) => {
    e.preventDefault();
    if (!form.name || !form.isbn || !form.author || !form.editorial) return;
    setItems([...items, form]);
    setForm({ name: '', isbn: '', author: '', editorial: '' });
  };

  const handlePop = () => {
    if (items.length === 0) return alert('Pila vacía');
    const newItems = [...items];
    newItems.pop();
    setItems(newItems);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '20px auto', padding: '20px' }}>
      <h1> Pila de Libros (Challenge 04)</h1>
      <form onSubmit={handlePush} style={{ display: 'grid', gap: '8px', marginBottom: '20px' }}>
        <input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="ISBN" value={form.isbn} onChange={e => setForm({...form, isbn: e.target.value})} />
        <input placeholder="Autor" value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
        <input placeholder="Editorial" value={form.editorial} onChange={e => setForm({...form, editorial: e.target.value})} />
        <button type="submit" style={{ padding: '8px', background: '#198754', color: '#fff', border: 'none' }}>Push Libro</button>
      </form>
      <button onClick={handlePop} style={{ padding: '8px 15px', background: '#dc3545', color: '#fff', border: 'none', marginBottom: '15px' }}>Pop Libro</button>
      <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '10px' }}>
        {items.map((b, i) => (
          <div key={i} style={{ border: i === items.length - 1 ? '2px solid #0d6efd' : '1px solid #ccc', padding: '10px', background: '#fff' }}>
            {i === items.length - 1 && <span style={{ float: 'right', background: '#0d6efd', color: '#fff', padding: '2px 6px', fontSize: '12px' }}>TOP</span>}
            <strong>{b.name}</strong> - {b.author} ({b.editorial})
          </div>
        ))}
      </div>
    </div>
  );
};