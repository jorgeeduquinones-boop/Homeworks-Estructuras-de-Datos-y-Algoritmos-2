import { useState } from 'react';
import { Trie } from './classes/Trie';

function createInitialTrie() {
  const trie = new Trie();
  trie.insert('air max', 90);
  trie.insert('air force', 95);
  trie.insert('air jordan', 85);
  trie.insert('adidas boost', 80);
  trie.insert('adidas samba', 88);
  trie.insert('nike dunk', 92);
  return trie;
}

export default function App() {
  const [trie] = useState(() => createInitialTrie());
  const [, setVersion] = useState(0);

  const [prefix, setPrefix] = useState('air');
  const [topK, setTopK] = useState(2);

  const [productName, setProductName] = useState('');
  const [popularity, setPopularity] = useState('');

  const handleInsert = (e) => {
    e.preventDefault();
    if (!productName.trim() || popularity === '') return;
    trie.insert(productName, Number(popularity));
    setProductName('');
    setPopularity('');
    setVersion((v) => v + 1);
  };

  const allMatches = trie.getProductsByPrefix(prefix);
  const topResults = trie.searchTopK(prefix, Number(topK));

  return (
    <div style={{ maxWidth: 850, margin: '2rem auto', padding: '0 1rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <h1>Challenge 12 - Smart Search Engine (Trie + Heap)</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#1e1e2e', padding: 16, borderRadius: 8 }}>
            <h3 style={{ marginTop: 0 }}>Buscar por Prefijo (Top K)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <label>
                Prefijo del producto:
                <input
                  type="text"
                  placeholder="Ej: air, ad..."
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
                />
              </label>

              <label>
                Cantidad Top K:
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={topK}
                  onChange={(e) => setTopK(e.target.value)}
                  style={{ width: '100%', padding: 8, marginTop: 4, boxSizing: 'border-box' }}
                />
              </label>
            </div>
          </div>

          <form onSubmit={handleInsert} style={{ background: '#1e1e2e', padding: 16, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <h3 style={{ marginTop: 0 }}>Insertar Producto en el Trie</h3>
            <input
              type="text"
              placeholder="Nombre (ej: air zoom)"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              style={{ padding: 8 }}
              required
            />
            <input
              type="number"
              placeholder="Popularidad (ej: 98)"
              min="1"
              max="100"
              value={popularity}
              onChange={(e) => setPopularity(e.target.value)}
              style={{ padding: 8 }}
              required
            />
            <button type="submit" style={{ padding: 8 }}>Guardar Producto</button>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#181825', padding: 16, borderRadius: 8, border: '1px solid #313244' }}>
            <h3 style={{ marginTop: 0 }}>Top {topK} Más Populares (Heap)</h3>
            {topResults.length === 0 ? (
              <p style={{ color: '#aaa' }}>No hay coincidencias para "{prefix}".</p>
            ) : (
              <ol style={{ paddingLeft: 20, marginBottom: 0 }}>
                {topResults.map((item, idx) => (
                  <li key={`${item.name}-${idx}`} style={{ padding: '6px 0' }}>
                    <strong>{item.name}</strong> — Popularidad: {item.popularity}
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div style={{ background: '#181825', padding: 16, borderRadius: 8, border: '1px solid #313244' }}>
            <h3 style={{ marginTop: 0 }}>Todas las coincidencias en el Trie ({allMatches.length})</h3>
            {allMatches.length === 0 ? (
              <p style={{ color: '#aaa' }}>Sin resultados.</p>
            ) : (
              <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
                {allMatches.map((item, idx) => (
                  <li key={`${item.name}-all-${idx}`} style={{ padding: '4px 0' }}>
                    {item.name} ({item.popularity})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}