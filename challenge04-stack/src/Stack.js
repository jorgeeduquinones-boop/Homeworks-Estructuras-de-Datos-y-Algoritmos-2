// src/Stack.js

export class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    return this.items.length > 0 ? this.items.pop() : null;
  }

  peek() {
    return this.items.length > 0 ? this.items[this.items.length - 1] : null;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  getItems() {
    return [...this.items];
  }
}

export const initialBooks = [
  {
    name: "Cien Años de Soledad",
    isbn: "978-0307474728",
    author: "Gabriel García Márquez",
    editorial: "Editorial Sudamericana"
  },
  {
    name: "El Hobbit",
    isbn: "978-0261102217",
    author: "J.R.R. Tolkien",
    editorial: "Minotauro"
  },
  {
    name: "1984",
    isbn: "978-0451524935",
    author: "George Orwell",
    editorial: "Secker & Warburg"
  }
];