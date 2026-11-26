import { useMemo, useState } from 'react';
import { SongTrie } from './Helpers/SongTrie';
import { MaxHeap } from './Helpers/MaxHeap';
import { SongGraph } from './Helpers/SongGraph';
import './styles/dashboard.scss';

const INITIAL_SONGS = [
  { title: 'Algoritmos en Do Mayor', plays: 950 },
  { title: 'Algoritmos de Ordenamiento', plays: 620 },
  { title: 'Balada Binaria', plays: 840 },
  { title: 'Cumbia Recursiva', plays: 1120 },
  { title: 'Salsa de Grafos', plays: 730 },
  { title: 'Rock del Arbol AVL', plays: 510 },
];

export default function App() {
  const [songs, setSongs] = useState(INITIAL_SONGS);
  const [query, setQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState('Cumbia Recursiva');

  const [newTitle, setNewTitle] = useState('');
  const [newPlays, setNewPlays] = useState('');
  const [relatedTo, setRelatedTo] = useState('Cumbia Recursiva');

  const songTrie = useMemo(() => {
    const trie = new SongTrie();
    songs.forEach((song) => trie.insert(song.title));
    return trie;
  }, [songs]);

  const topSongs = useMemo(() => {
    const heap = new MaxHeap();
    songs.forEach((song) => heap.push(song));
    return heap.getTopK(5);
  }, [songs]);

  const [graphVersion, setGraphVersion] = useState(0);
  const songGraph = useMemo(() => {
    const graph = new SongGraph();
    graph.addRelation('Algoritmos en Do Mayor', 'Algoritmos de Ordenamiento');
    graph.addRelation('Algoritmos en Do Mayor', 'Rock del Arbol AVL');
    graph.addRelation('Cumbia Recursiva', 'Salsa de Grafos');
    graph.addRelation('Cumbia Recursiva', 'Balada Binaria');
    graph.addRelation('Balada Binaria', 'Algoritmos de Ordenamiento');
    return graph;
  }, []);

  const suggestions = query.trim() ? songTrie.autocomplete(query) : [];
  const exactExists = query.trim() ? songTrie.search(query) : false;

  const recommendations = useMemo(() => {
    return songGraph.getRecommendations(selectedSong);
  }, [selectedSong, songGraph, graphVersion]);

  const handlePlaySong = (titleToPlay) => {
    const matched = songs.find(
      (s) => s.title.toLowerCase() === titleToPlay.toLowerCase()
    );
    if (!matched) return;

    setSelectedSong(matched.title);
    setSongs((prev) =>
      prev.map((s) =>
        s.title === matched.title ? { ...s, plays: s.plays + 1 } : s
      )
    );
  };

  const handleAddSong = (e) => {
    e.preventDefault();
    const clean = newTitle.trim();
    const playsCount = parseInt(newPlays, 10) || 100;
    if (!clean) return;

    if (!songTrie.search(clean)) {
      setSongs((prev) => [...prev, { title: clean, plays: playsCount }]);
    }

    if (relatedTo) {
      songGraph.addRelation(clean, relatedTo);
      setGraphVersion((v) => v + 1);
    }

    setSelectedSong(clean);
    setNewTitle('');
    setNewPlays('');
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1>Spotify Edu • Dashboard</h1>
        <span>Estructuras de Datos II</span>
      </header>

      <div className="dashboard__grid">
        <section className="panel-card">
          <h2>1. Buscador Predictivo (Trie)</h2>
          <input
            type="text"
            className="search-input"
            placeholder="Escribe un prefijo (ej: algo, bal, cum)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query.trim() && (
            <p className="status-text">
              ¿Existe título exacto en el Trie?:{' '}
              <strong>{exactExists ? 'Sí existe' : 'No encontrado'}</strong>
            </p>
          )}

          <ul className="song-list">
            {suggestions.map((title) => (
              <li
                key={title}
                className="song-list__item"
                onClick={() => handlePlaySong(title)}
              >
                <span style={{ textTransform: 'capitalize' }}>{title}</span>
                <span className="badge-tag">▶ Reproducir</span>
              </li>
            ))}
          </ul>

          <hr style={{ margin: '1.2rem 0', borderColor: '#282828' }} />

          <form onSubmit={handleAddSong}>
            <h2>Agregar Canción al Sistema</h2>
            <input
              type="text"
              className="form-input"
              placeholder="Título de la canción"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              type="number"
              className="form-input"
              placeholder="Reproducciones iniciales"
              value={newPlays}
              onChange={(e) => setNewPlays(e.target.value)}
            />
            <select
              className="form-input"
              value={relatedTo}
              onChange={(e) => setRelatedTo(e.target.value)}
            >
              {songs.map((s) => (
                <option key={s.title} value={s.title}>
                  Relacionar con: {s.title}
                </option>
              ))}
            </select>
            <button type="submit" className="btn-primary">
              Insertar Canción
            </button>
          </form>
        </section>

        <section className="panel-card">
          <h2>2. TOP 5 Popularidad (Max Heap)</h2>
          <p className="status-text">
            Haz clic en una canción para sumar +1 reproducción y reordenar el Heap.
          </p>
          <ul className="song-list">
            {topSongs.map((song, index) => (
              <li
                key={song.title}
                className={`song-list__item ${
                  selectedSong === song.title ? 'active' : ''
                }`}
                onClick={() => handlePlaySong(song.title)}
              >
                <span>
                  <strong>#{index + 1}</strong> {song.title}
                </span>
                <span className="badge-plays">{song.plays} plays</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel-card">
          <h2>3. Canciones Relacionadas (Grafo)</h2>
          <p className="status-text">
            Canción seleccionada: <strong>{selectedSong}</strong>
          </p>

          <ul className="song-list">
            {recommendations.length > 0 ? (
              recommendations.map((rec) => (
                <li
                  key={rec}
                  className="song-list__item"
                  onClick={() => handlePlaySong(rec)}
                >
                  <span>{rec}</span>
                  <span className="badge-tag">Similares</span>
                </li>
              ))
            ) : (
              <p className="status-text">No tiene canciones conectadas aún.</p>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}