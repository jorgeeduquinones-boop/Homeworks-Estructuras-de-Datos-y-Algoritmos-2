export class FileSystemNode {
  constructor(id, name, type = 'folder', createdBy = '', parentId = null) {
    this.id = id;
    this.name = name;
    this.type = type; 
    this.createdBy = createdBy;
    this.parentId = parentId;
    this.children = []; 
  }

  addChild(childNode) {
    if (this.type === 'file') {
      throw new Error("Un archivo no puede contener elementos hijos.");
    }
    this.children.push(childNode);
  }
}

export const buildTreeFromList = (flatList) => {
  const nodeMap = {};
  let root = null;

  flatList.forEach((item) => {
    nodeMap[item.id] = new FileSystemNode(
      item.id,
      item.name,
      item.type,
      item.createdBy,
      item.parentId
    );
  });

  flatList.forEach((item) => {
    const node = nodeMap[item.id];
    if (item.parentId === null) {
      root = node; 
    } else if (nodeMap[item.parentId]) {
      nodeMap[item.parentId].addChild(node);
    }
  });

  return root;
};