export class MaxHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) { return Math.floor((i - 1) / 2); }
  getLeftChildIndex(i) { return 2 * i + 1; }
  getRightChildIndex(i) { return 2 * i + 2; }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  push(song) {
    this.heap.push(song);
    this.percolateUp(this.heap.length - 1);
  }

  percolateUp(index) {
    let current = index;
    while (current > 0) {
      const parent = this.getParentIndex(current);
      if (this.heap[current].plays > this.heap[parent].plays) {
        this.swap(current, parent);
        current = parent;
      } else {
        break;
      }
    }
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.percolateDown(0);
    return max;
  }

  percolateDown(index) {
    let largest = index;
    const left = this.getLeftChildIndex(index);
    const right = this.getRightChildIndex(index);

    if (left < this.heap.length && this.heap[left].plays > this.heap[largest].plays) {
      largest = left;
    }
    if (right < this.heap.length && this.heap[right].plays > this.heap[largest].plays) {
      largest = right;
    }

    if (largest !== index) {
      this.swap(index, largest);
      this.percolateDown(largest);
    }
  }

  getTopK(k = 5) {
    const temp = new MaxHeap();
    temp.heap = [...this.heap];
    const result = [];
    for (let i = 0; i < k && temp.heap.length > 0; i++) {
      result.push(temp.pop());
    }
    return result;
  }
}