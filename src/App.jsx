import { useEffect, useState } from 'react';

export default function App() {
  const [query, setQuery] = useState('coding');
  const [searchInput, setSearchInput] = useState('coding');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGifs = async () => {
      if (!query.trim()) return;

      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams({
          api_key: import.meta.env.VITE_GIPHY_API_KEY,
          q: query,
          limit: 24,
          offset: 0,
          rating: 'g',
          lang: 'en',
        });

        const resp = await fetch(`https://api.giphy.com/v1/gifs/search?${params}`);

        if (!resp.ok) {
          throw new Error(`Error HTTP: ${resp.status}`);
        }

        const { data } = await resp.json();
        setGifs(data);
      } catch (err) {
        setError(err.message || 'No se pudieron cargar los GIFs');
      } finally {
        setLoading(false);
      }
    };

    fetchGifs();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setQuery(searchInput.trim());
  };

  return (
    <div style={{ maxWidth: 1100, margin: '2rem auto', padding: '0 1.25rem' }}>
      <h1 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '1.5rem' }}>
        Challenge 13 - GIPHY Search App
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', gap: 10, maxWidth: 550, margin: '0 auto 2rem auto' }}
      >
        <input
          type="text"
          placeholder="Buscar GIFs (ej: cats, react, smile)..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 6,
            border: '1px solid #45475a',
            background: '#181825',
            color: '#fff',
            fontSize: '1rem',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            borderRadius: 6,
            border: 'none',
            background: '#89b4fa',
            color: '#11111b',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Buscar
        </button>
      </form>

      {loading && <p style={{ textAlign: 'center', color: '#a6adc8' }}>Cargando GIFs...</p>}
      {error && <p style={{ textAlign: 'center', color: '#f38ba8' }}>{error}</p>}

      {!loading && !error && gifs.length === 0 && (
        <p style={{ textAlign: 'center', color: '#a6adc8' }}>
          No se encontraron GIFs para "{query}".
        </p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        {gifs.map((gif) => (
          <div
            key={gif.id}
            style={{
              background: '#1e1e2e',
              borderRadius: 8,
              overflow: 'hidden',
              border: '1px solid #313244',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img
              src={gif.images.fixed_height.url}
              alt={gif.title || 'GIF'}
              style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
            />
            <p
              style={{
                margin: 0,
                padding: '10px 12px',
                fontSize: '0.85rem',
                color: '#cdd6f4',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {gif.title || 'Sin título'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}