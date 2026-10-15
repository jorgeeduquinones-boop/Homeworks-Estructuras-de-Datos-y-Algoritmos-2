import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const TreeNodeView = ({ node, onCreate, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(true);
  const [addingType, setAddingType] = useState(null); // 'folder' | 'file' | null
  const [newItemName, setNewItemName] = useState("");
  const isFolder = node.type === 'folder';

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    onCreate(newItemName, addingType, node.id);
    setNewItemName("");
    setAddingType(null);
  };

  return (
    <div className="tree-node">
      <div className={`node-header ${node.type}`}>
        <span onClick={() => setIsOpen(!isOpen)} style={{ cursor: isFolder ? 'pointer' : 'default', fontWeight: 'bold' }}>
          {/* Texto limpio en lugar de emojis */}
          {isFolder ? (isOpen ? '[-] ' : '[+] ') : ''}{node.name}
        </span>

        {/* Correo del creador */}
        <span className="creator">Creado por: {node.createdBy || 'Sistema'}</span>

        {/* Opciones de creación solo en carpetas para usuarios autenticados */}
        {isFolder && user && (
          <>
            <button className="btn-add" onClick={() => setAddingType('folder')}>+ Carpeta</button>
            <button className="btn-add" onClick={() => setAddingType('file')}>+ Archivo</button>
          </>
        )}

        {/* Botón eliminar */}
        {user && node.parentId !== null && (
          <button className="btn-del" onClick={() => onDelete(node.id)}>✕</button>
        )}
      </div>

      {/* Formulario rápido en pantalla */}
      {addingType && (
        <form onSubmit={handleAddSubmit} style={{ margin: "5px 0 5px 20px", display: "flex", gap: "5px" }}>
          <input
            type="text"
            placeholder={`Nombre del nuevo ${addingType === 'folder' ? 'directorio' : 'archivo'}`}
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            style={{ padding: "4px 8px", fontSize: "0.85rem" }}
            autoFocus
            required
          />
          <button type="submit" style={{ padding: "4px 8px", background: "#27ae60", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer" }}>
            Guardar
          </button>
          <button type="button" onClick={() => setAddingType(null)} style={{ padding: "4px 8px", background: "#95a5a6", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer" }}>
            Cancelar
          </button>
        </form>
      )}

      {/* Renderizado recursivo de hijos */}
      {isFolder && isOpen && node.children.length > 0 && (
        <div className="children-list">
          {node.children.map((child) => (
            <TreeNodeView key={child.id} node={child} onCreate={onCreate} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};