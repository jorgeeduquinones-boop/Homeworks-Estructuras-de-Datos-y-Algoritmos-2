import { useState } from 'react';
import { Stack, initialBooks } from './Stack';
import './App.css';

const bookStack = new Stack();
initialBooks.forEach((book) => bookStack.push(book));

function App() {
  const [books, setBooks] = useState(bookStack.getItems());

  const [formData, setFormData] = useState({
    name: '',
    isbn: '',
    author: '',
    editorial: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.isbn || !formData.author || !formData.editorial) {
      alert('Por favor completa todos los campos');
      return;
    }

    bookStack.push(formData);

    setBooks(bookStack.getItems());

    setFormData({ name: '', isbn: '', author: '', editorial: '' });
  };

  const handlePop = () => {
    if (bookStack.isEmpty()) {
      alert('La pila está vacía');
      return;
    }
    bookStack.pop();
    setBooks(bookStack.getItems());
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1> Challenge 04: Pila de Libros (Stack)</h1>

      <section style={{ background: '#f4f4f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>Agregar Nuevo Libro (Push)</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input
            type="text"
            name="name"
            placeholder="Nombre del Libro"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={handleChange}
          />
          <input
            type="text"
            name="author"
            placeholder="Autor"
            value={formData.author}
            onChange={handleChange}
          />
          <input
            type="text"
            name="editorial"
            placeholder="Editorial"
            value={formData.editorial}
            onChange={handleChange}
          />
          <button type="submit" style={{ padding: '10px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Push a la Pila
          </button>
        </form>
      </section>

      <section style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button onClick={handlePop} style={{ padding: '10px 15px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Desapilar (Pop)
        </button>
        <span><strong>Total de libros en la pila:</strong> {bookStack.size()}</span>
      </section>

      <h2> Pila Actual (El elemento de arriba es el TOP)</h2>
      <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '10px' }}>
        {books.map((book, index) => {
          const isTop = index === books.length - 1;
          return (
            <div
              key={index}
              style={{
                border: isTop ? '2px solid #007bff' : '1px solid #ccc',
                backgroundColor: isTop ? '#e7f1ff' : '#fff',
                padding: '15px',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              {isTop && <span style={{ background: '#007bff', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', float: 'right' }}>TOP</span>}
              <h3 style={{ margin: '0 0 5px 0' }}>{book.name}</h3>
              <p style={{ margin: '2px 0' }}><strong>Autor:</strong> {book.author}</p>
              <p style={{ margin: '2px 0' }}><strong>Editorial:</strong> {book.editorial}</p>
              <p style={{ margin: '2px 0', color: '#666', fontSize: '0.9rem' }}><strong>ISBN:</strong> {book.isbn}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;