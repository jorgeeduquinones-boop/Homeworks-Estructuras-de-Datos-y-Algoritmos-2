export class SimpleLinkedList {
  constructor() {
    this.head = null;
  }

  append(data) {
    const newNode = { data, next: null };
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = newNode;
    }
  }

  shift() {
    if (!this.head) return null;
    const removed = this.head.data;
    this.head = this.head.next;
    return removed;
  }

  toArray() {
    const arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    return arr;
  }
}

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(data) {
    const newNode = { data, next: null, prev: null };
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  toArray() {
    const arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    return arr;
  }
}

export class CircularLinkedList {
  constructor() {
    this.head = null;
  }

  append(data) {
    const newNode = { data, next: null };
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head;
    } else {
      let current = this.head;
      while (current.next !== this.head) current = current.next;
      current.next = newNode;
      newNode.next = this.head;
    }
  }

  toArray() {
    if (!this.head) return [];
    const arr = [];
    let current = this.head;
    do {
      arr.push(current.data);
      current = current.next;
    } while (current !== this.head);
    return arr;
  }
}

export class DoublyCircularLinkedList {
  constructor() {
    this.head = null;
  }

  append(data) {
    const newNode = { data, next: null, prev: null };
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head;
      newNode.prev = this.head;
    } else {
      const tail = this.head.prev;
      tail.next = newNode;
      newNode.prev = tail;
      newNode.next = this.head;
      this.head.prev = newNode;
    }
  }

  toArray() {
    if (!this.head) return [];
    const arr = [];
    let current = this.head;
    do {
      arr.push(current.data);
      current = current.next;
    } while (current !== this.head);
    return arr;
  }
}