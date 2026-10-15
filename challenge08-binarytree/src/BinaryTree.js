export class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value === current.value) return; 

      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  contains(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  getPreOrder(node = this.root, result = []) {
    if (!node) return result;
    result.push(node.value);
    this.getPreOrder(node.left, result);
    this.getPreOrder(node.right, result);
    return result;
  }

  getInOrder(node = this.root, result = []) {
    if (!node) return result;
    this.getInOrder(node.left, result);
    result.push(node.value);
    this.getInOrder(node.right, result);
    return result;
  }

  getPostOrder(node = this.root, result = []) {
    if (!node) return result;
    this.getPostOrder(node.left, result);
    this.getPostOrder(node.right, result);
    result.push(node.value);
    return result;
  }

  toD3Format(node = this.root) {
    if (!node) return null;

    const children = [];
    if (node.left) children.push(this.toD3Format(node.left));
    if (node.right) children.push(this.toD3Format(node.right));

    return {
      name: String(node.value),
      children: children.length > 0 ? children : undefined
    };
  }
}