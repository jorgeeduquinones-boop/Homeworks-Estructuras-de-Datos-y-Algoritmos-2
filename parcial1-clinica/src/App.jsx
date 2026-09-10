import React, { useState, useEffect } from 'react';
import {
  SimpleLinkedList,
  DoublyLinkedList,
  CircularLinkedList,
  DoublyCircularLinkedList
} from './structures/LinkedLists';

export default function App() {
  const [pacientesList] = useState(() => {
    const list = new SimpleLinkedList();
    list.append('Carlos Pérez');
    list.append('María Rodríguez');
    list.append('Juan Gómez');
    return list;
  });

  const [historialList] = useState(new DoublyLinkedList());

  const [medicosList] = useState(() => {
    const list = new CircularLinkedList();
    list.append('Dr. Arango');
    list.append('Dra. Torres');
    list.append('Dr. Bermúdez');
    return list;
  });
// La verdad es que no entendí muy bien el punto del comité administrativo.
  const [comiteList] = useState(() => {
    const list = new DoublyCircularLinkedList();
    list.append('Directora General');
    list.append('Jefe de Cirugía');
    list.append('Coordinador de Urgencias');
    return list;
  });

  const [pacientes, setPacientes] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [comite, setComite] = useState([]);
  const [medicoActualIndex, setMedicoActualIndex] = useState(0);
  const [nuevoPaciente, setNuevoPaciente] = useState('');

  useEffect(() => {
    setPacientes(pacientesList.toArray());
    setHistorial(historialList.toArray());
    setMedicos(medicosList.toArray());
    setComite(comiteList.toArray());
  }, [pacientesList, historialList, medicosList, comiteList]);

  // Rotación de médico cada 10s
  useEffect(() => {
    const timer = setInterval(() => {
      setMedicoActualIndex((prevIndex) => {
        const total = medicosList.toArray().length;
        return total > 0 ? (prevIndex + 1) % total : 0;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, [medicosList]);

  const atenderPaciente = () => {
    const pacienteAtendido = pacientesList.shift();
    if (pacienteAtendido) {
      const medicoAtendio = medicos[medicoActualIndex] || 'Médico no asignado';
      historialList.append({
        paciente: pacienteAtendido,
        medico: medicoAtendio,
        fecha: new Date().toLocaleTimeString()
      });

      setPacientes(pacientesList.toArray());
      setHistorial(historialList.toArray());
    }
  };

  const agregarPaciente = (e) => {
    e.preventDefault();
    if (!nuevoPaciente.trim()) return;
    pacientesList.append(nuevoPaciente);
    setPacientes(pacientesList.toArray());
    setNuevoPaciente('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Sistema de Gestión Clínica</h1>

      <section style={{ background: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Médico de Guardia Actual</h2>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1565c0' }}>
          {medicos[medicoActualIndex] || 'Sin médicos'}
        </p>
        <p><strong>Equipo médico completo:</strong> {medicos.join(' ➔ ')}</p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <section style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h2>Pacientes en Espera</h2>
          <form onSubmit={agregarPaciente} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Nombre del paciente"
              value={nuevoPaciente}
              onChange={(e) => setNuevoPaciente(e.target.value)}
              style={{ padding: '5px', marginRight: '5px' }}
            />
            <button type="submit">Agregar</button>
          </form>
          <button onClick={atenderPaciente} disabled={pacientes.length === 0} style={{ padding: '8px 12px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Atender Siguiente Paciente
          </button>
          <ul>
            {pacientes.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>

        <section style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h2>Historial de Atención</h2>
          <ul>
            {historial.map((item, i) => (
              <li key={i}>
                <strong>{item.paciente}</strong> - Atendido por {item.medico} ({item.fecha})
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>Comité Administrativo</h2>
        <p> {comite.join(' ⇄ ')} ⇄ (circular)</p>
      </section>
    </div>
  );
}