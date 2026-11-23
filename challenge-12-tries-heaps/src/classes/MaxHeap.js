export class MaxHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0] || null;
  }

  toArray() {
    return [...this.heap];
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  push(item) {
    this.heap.push(item);
    this.percolateUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.percolateDown(0);
    return max;
  }

  heapify(items) {
    this.heap = [...items];
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.percolateDown(i);
    }
  }

  percolateUp(index) {
    let current = index;
    while (current > 0) {
      const parent = Math.floor((current - 1) / 2);
      if (this.heap[current].popularity > this.heap[parent].popularity) {
        this.swap(current, parent);
        current = parent;
      } else {
        break;
      }
    }
  }

  percolateDown(index) {
    let current = index;
    const length = this.heap.length;

    while (true) {
      let largest = current;
      const left = 2 * current + 1;
      const right = 2 * current + 2;

      if (left < length && this.heap[left].popularity > this.heap[largest].popularity) {
        largest = left;
      }

      if (right < length && this.heap[right].popularity > this.heap[largest].popularity) {
        largest = right;
      }

      if (largest !== current) {
        this.swap(current, largest);
        current = largest;
      } else {
        break;
      }
    }
  }
}