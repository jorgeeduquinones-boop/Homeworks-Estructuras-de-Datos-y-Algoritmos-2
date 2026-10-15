import { useState } from 'react';

export const SidebarItem = ({ node, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = (e) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
    onSelect(node);
  };

  return (
    <li style={{ listStyle: 'none', margin: '6px 0' }}>
      <div
        onClick={handleClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          padding: '8px 12px',
          background: '#343a40',
          color: '#fff',
          borderRadius: '4px',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <span>{node.title}</span>
        {hasChildren && <span>{isOpen ? '▼' : '►'}</span>}
      </div>

      {/* Renderizado recursivo de la rama de hijos si está desplegada */}
      {hasChildren && isOpen && (
        <ul style={{ paddingLeft: '15px', margin: '4px 0' }}>
          {node.children.map((child, index) => (
            <SidebarItem key={index} node={child} onSelect={onSelect} />
          ))}
        </ul>
      )}
    </li>
  );
};