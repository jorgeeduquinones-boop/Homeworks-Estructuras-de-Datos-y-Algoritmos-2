import { useState } from 'react';
import { createMenuTree } from './NAryTree';
import { SidebarItem } from './SidebarMenu';

const menuTree = createMenuTree();

function App() {
  const [selectedNode, setSelectedNode] = useState(menuTree);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar Navigation basada en el Árbol N-ario */}
      <aside style={{ width: '280px', background: '#212529', color: '#fff', padding: '20px' }}>
        <h2 style={{ color: '#fff', borderBottom: '1px solid #495057', paddingBottom: '10px' }}>
          N-Ary Menu
        </h2>
        <ul style={{ padding: 0, margin: 0 }}>
          {menuTree.children.map((child, index) => (
            <SidebarItem key={index} node={child} onSelect={setSelectedNode} />
          ))}
        </ul>
      </aside>

      {/* Área Principal de Contenido */}
      <main style={{ flex: 1, padding: '40px', background: '#f8f9fa' }}>
        <h1> Challenge 09: Menú Árbol N-ario</h1>
        
        <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #dee2e6', marginTop: '20px' }}>
          <h2 style={{ margin: '0 0 10px 0', color: '#0d6efd' }}>{selectedNode.title}</h2>
          <p><strong>Enlace (Link):</strong> <code style={{ background: '#e9ecef', padding: '2px 6px', borderRadius: '4px' }}>{selectedNode.link}</code></p>
          <hr style={{ margin: '15px 0', borderColor: '#eee' }} />
          <h3>Componente Asociado:</h3>
          <p style={{ fontSize: '1.1rem', color: '#495057' }}>
            {selectedNode.component || "Selecciona un submenú para cargar su vista."}
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;