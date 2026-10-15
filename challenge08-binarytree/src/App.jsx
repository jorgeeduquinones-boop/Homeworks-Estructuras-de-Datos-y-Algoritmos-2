import { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import { BinarySearchTree } from './BinaryTree';

// Instancia inicial del Árbol Binario de Búsqueda
const bst = new BinarySearchTree();

// Insertamos la serie inicial de números
const initialValues = [25, 15, 50, 10, 22, 35, 70, 12, 18, 44, 66, 90];
initialValues.forEach(num => bst.insert(num));

function App() {
  const [treeData, setTreeData] = useState(bst.toD3Format());
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Imprimir recorridos por consola al cargar y actualizar
  useEffect(() => {
    console.clear();
    console.log("--- RECORRIDOS DEL ÁRBOL BINARIO ---");
    console.log("PreOrder (N-L-R):", bst.getPreOrder().join(" -> "));
    console.log("InOrder (L-N-R):", bst.getInOrder().join(" -> "));
    console.log("PostOrder (L-R-N):", bst.getPostOrder().join(" -> "));
  }, [treeData]);

  const handleInsert = (e) => {
    e.preventDefault();
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) return;

    bst.insert(val);
    setTreeData(bst.toD3Format());
    setInputValue('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const val = parseInt(searchValue, 10);
    if (isNaN(val)) return;

    const exists = bst.contains(val);
    setSearchResult(exists ? ` El valor ${val} SÍ existe en el árbol.` : ` El valor ${val} NO está en el árbol.`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
      <h1> Challenge 08: Visualizador de Árbol Binario</h1>
      <p style={{ color: '#555' }}>
        * Revisa la <strong>Consola del Navegador (F12)</strong> para ver la impresión de Inorder, Postorder y Preorder.
      </p>

      {/* Panel de Controles */}
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginBottom: '20px', background: '#e9ecef', padding: '15px', borderRadius: '8px' }}>
        
        {/* Insertar */}
        <form onSubmit={handleInsert} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="number"
            placeholder="Número"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '8px 15px', background: '#198754', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Insertar Valor
          </button>
        </form>

        {/* Buscar */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="number"
            placeholder="Número a buscar"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '8px 15px', background: '#0d6efd', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Buscar
          </button>
        </form>
      </div>

      {searchResult && (
        <div style={{ marginBottom: '15px', padding: '10px', background: '#fff3cd', border: '1px solid #ffe69c', borderRadius: '4px' }}>
          <strong>{searchResult}</strong>
        </div>
      )}

      {/* Renderizado Gráfico del Árbol con react-d3-tree */}
      <div style={{ width: '100%', height: '500px', border: '1px solid #ccc', borderRadius: '8px', background: '#ffffff' }}>
        {treeData ? (
          <Tree
            data={treeData}
            orientation="vertical"
            pathFunc="straight"
            translate={{ x: 550, y: 50 }}
            nodeSize={{ x: 80, y: 80 }}
          />
        ) : (
          <p style={{ textAlign: 'center', marginTop: '200px' }}>El árbol está vacío</p>
        )}
      </div>
    </div>
  );
}

export default App;