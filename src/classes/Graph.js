export class Graph {
  constructor() {
    this.nodes = [];
    this.adjacencyList = {};
  }

  isEmpty() {
    return this.nodes.length === 0;
  }

  addNode(node) {
    if (this.searchNode(node.id)) return false;
    this.nodes.push(node);
    this.adjacencyList[node.id] = [];
    return true;
  }

  searchNode(id) {
    return this.nodes.find((node) => node.id === id) || null;
  }

  addEdge(node1Id, node2Id) {
    if (!this.adjacencyList[node1Id] || !this.adjacencyList[node2Id]) return false;
    if (node1Id === node2Id) return false;

    if (!this.adjacencyList[node1Id].includes(node2Id)) {
      this.adjacencyList[node1Id].push(node2Id);
    }
    if (!this.adjacencyList[node2Id].includes(node1Id)) {
      this.adjacencyList[node2Id].push(node1Id);
    }
    return true;
  }

  removeNode(nodeId) {
    this.nodes = this.nodes.filter((n) => n.id !== nodeId);
    delete this.adjacencyList[nodeId];

    for (const key in this.adjacencyList) {
      this.adjacencyList[key] = this.adjacencyList[key].filter((id) => id !== nodeId);
    }
  }

  printAdjacency(nodeId) {
    return this.adjacencyList[nodeId] || [];
  }

  print() {
    console.log('Nodos:', this.nodes);
    console.log('Lista de adyacencia:', this.adjacencyList);
  }

  getPeopleByCity(cityId) {
    const cityNode = this.searchNode(cityId);
    if (!cityNode || cityNode.type !== 'city') return [];

    return this.nodes.filter(
      (node) => node.type === 'person' && node.cityId === cityId
    );
  }

  toD3GraphData() {
    const validIds = new Set(this.nodes.map((n) => n.id));

    const d3Nodes = this.nodes.map((node) => {
      if (node.type === 'city') {
        return {
          id: node.id,
          label: `🏙️ ${node.name}`,
          color: '#ff9800',
          size: 500,
          symbolType: 'square',
        };
      }
      return {
        id: node.id,
        label: `👤 ${node.name} (${node.age} años)`,
        color: '#4fc3f7',
        size: 350,
        symbolType: 'circle',
      };
    });

    const d3Links = [];
    const addedEdges = new Set();

    for (const sourceId in this.adjacencyList) {
      if (!validIds.has(sourceId)) continue;
      for (const targetId of this.adjacencyList[sourceId]) {
        if (!validIds.has(targetId)) continue;
        const edgeKey = [sourceId, targetId].sort().join('--');
        if (!addedEdges.has(edgeKey)) {
          addedEdges.add(edgeKey);
          d3Links.push({ source: sourceId, target: targetId });
        }
      }
    }

    return { nodes: d3Nodes, links: d3Links };
  }
}