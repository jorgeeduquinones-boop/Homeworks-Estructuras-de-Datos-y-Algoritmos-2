import { useState } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import { Graph } from './classes/Graph';

function createInitialGraph() {
  const g = new Graph();

  g.addNode({ id: 'city-cali', type: 'city', name: 'Cali' });
  g.addNode({ id: 'city-bogota', type: 'city', name: 'Bogotá' });
  g.addNode({ id: 'city-medellin', type: 'city', name: 'Medellín' });

  g.addNode({ id: 'person-ana', type: 'person', name: 'Ana', age: 21, cityId: 'city-cali' });
  g.addNode({ id: 'person-carlos', type: 'person', name: 'Carlos', age: 23, cityId: 'city-cali' });
  g.addNode({ id: 'person-laura', type: 'person', name: 'Laura', age: 22, cityId: 'city-bogota' });
  g.addNode({ id: 'person-mateo', type: 'person', name: 'Mateo', age: 24, cityId: 'city-medellin' });

  g.addEdge('person-ana', 'city-cali');
  g.addEdge('person-carlos', 'city-cali');
  g.addEdge('person-laura', 'city-bogota');
  g.addEdge('person-mateo', 'city-medellin');

  g.addEdge('person-ana', 'person-carlos');
  g.addEdge('person-ana', 'person-laura');
  g.addEdge('person-laura', 'person-mateo');

  return g;
}

const graphConfig = {
  nodeHighlightBehavior: true,
  directed: false,
  height: 450,
  width: 750,
  node: {
    labelProperty: 'label',
    fontSize: 13,
    fontColor: '#ffffff',
    highlightStrokeColor: '#ffffff',
  },
  link: {
    highlightColor: '#ffeb3b',
    color: '#90a4ae',
  },
  d3: {
    gravity: -250,
    linkLength: 130,
  },
};

export default function App() {
  const [graph] = useState(() => createInitialGraph());
  const [, setVersion] = useState(0);

  const [cityName, setCityName] = useState('');
  const [personName, setPersonName] = useState('');
  const [personAge, setPersonAge] = useState('');
  const [personCityId, setPersonCityId] = useState('city-cali');

  const [friend1, setFriend1] = useState('person-ana');
  const [friend2, setFriend2] = useState('person-mateo');

  const [selectedCityFilter, setSelectedCityFilter] = useState('city-cali');

  const refresh = () => setVersion((v) => v + 1);

  const cities = graph.nodes.filter((n) => n.type === 'city');
  const people = graph.nodes.filter((n) => n.type === 'person');

  const handleAddCity = (e) => {
    e.preventDefault();
    if (!cityName.trim()) return;
    const id = `city-${cityName.trim().toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    graph.addNode({ id, type: 'city', name: cityName.trim() });
    setCityName('');
    if (!personCityId) setPersonCityId(id);
    if (!selectedCityFilter) setSelectedCityFilter(id);
    refresh();
  };

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (!personName.trim() || !personAge || !personCityId) return;
    const id = `person-${personName.trim().toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    graph.addNode({
      id,
      type: 'person',
      name: personName.trim(),
      age: Number(personAge),
      cityId: personCityId,
    });
    graph.addEdge(id, personCityId);
    setPersonName('');
    setPersonAge('');
    refresh();
  };

  const handleAddFriendship = (e) => {
    e.preventDefault();
    if (!friend1 || !friend2 || friend1 === friend2) return;
    graph.addEdge(friend1, friend2);
    refresh();
  };

  const residents = graph.getPeopleByCity(selectedCityFilter);
  const selectedCityObj = graph.searchNode(selectedCityFilter);
  const d3Data = graph.toD3GraphData();

  return (
    <div style={{ maxWidth: 1100, margin: '1.5rem auto', padding: '0 1rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <h1>Challenge 11 - Grafo de Amigos y Ciudades</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <form onSubmit={handleAddCity} style={{ background: '#1e1e2e', padding: 14, borderRadius: 8 }}>
            <h3 style={{ marginTop: 0 }}>1. Agregar Ciudad</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                placeholder="Nombre de ciudad"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                style={{ flex: 1, padding: 6 }}
                required
              />
              <button type="submit">Crear</button>
            </div>
          </form>

          <form onSubmit={handleAddPerson} style={{ background: '#1e1e2e', padding: 14, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h3 style={{ marginTop: 0 }}>2. Agregar Persona</h3>
            <input
              type="text"
              placeholder="Nombre"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              style={{ padding: 6 }}
              required
            />
            <input
              type="number"
              placeholder="Edad"
              min="1"
              value={personAge}
              onChange={(e) => setPersonAge(e.target.value)}
              style={{ padding: 6 }}
              required
            />
            <select
              value={personCityId}
              onChange={(e) => setPersonCityId(e.target.value)}
              style={{ padding: 6 }}
            >
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  Vive en: {c.name}
                </option>
              ))}
            </select>
            <button type="submit">Agregar Persona</button>
          </form>

          <form onSubmit={handleAddFriendship} style={{ background: '#1e1e2e', padding: 14, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h3 style={{ marginTop: 0 }}>3. Conectar Amigos</h3>
            <select value={friend1} onChange={(e) => setFriend1(e.target.value)} style={{ padding: 6 }}>
              {people.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <select value={friend2} onChange={(e) => setFriend2(e.target.value)} style={{ padding: 6 }}>
              {people.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <button type="submit">Crear Amistad</button>
          </form>

          <div style={{ background: '#1e1e2e', padding: 14, borderRadius: 8 }}>
            <h3 style={{ marginTop: 0 }}>4. Habitantes por Ciudad</h3>
            <select
              value={selectedCityFilter}
              onChange={(e) => setSelectedCityFilter(e.target.value)}
              style={{ width: '100%', padding: 6, marginBottom: 10 }}
            >
              {cities.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <strong>Viven en {selectedCityObj?.name}:</strong>
            {residents.length === 0 ? (
              <p style={{ color: '#aaa' }}>Nadie registrado en esta ciudad.</p>
            ) : (
              <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
                {residents.map((person) => (
                  <li key={person.id}>
                    {person.name} — {person.age} años
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div style={{ background: '#181825', borderRadius: 8, padding: 16, border: '1px solid #313244' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>🟧 Ciudad &nbsp;&nbsp; 🔵 Persona</span>
            <button onClick={() => graph.print()}>Imprimir en consola</button>
          </div>
          {d3Data.nodes.length > 0 && (
            <D3Graph id="friends-cities-graph" data={d3Data} config={graphConfig} />
          )}
        </div>
      </div>
    </div>
  );
}