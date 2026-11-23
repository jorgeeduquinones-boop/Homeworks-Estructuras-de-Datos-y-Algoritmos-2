import { MaxHeap } from './MaxHeap';

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.product = null;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(name, popularity) {
    const normalized = name.trim().toLowerCase();
    if (!normalized) return;

    let current = this.root;
    for (const char of normalized) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }

    current.isEndOfWord = true;
    current.product = {
      name: normalized,
      popularity: Number(popularity),
    };
  }

  search(word) {
    const normalized = word.trim().toLowerCase();
    let current = this.root;

    for (const char of normalized) {
      if (!current.children[char]) return false;
      current = current.children[char];
    }

    return current.isEndOfWord;
  }

  collectProducts(node, results) {
    if (node.isEndOfWord && node.product) {
      results.push(node.product);
    }

    for (const char in node.children) {
      this.collectProducts(node.children[char], results);
    }
  }

  getProductsByPrefix(prefix) {
    const normalized = prefix.trim().toLowerCase();
    let current = this.root;

    for (const char of normalized) {
      if (!current.children[char]) return [];
      current = current.children[char];
    }

    const matches = [];
    this.collectProducts(current, matches);
    return matches;
  }

  searchTopK(prefix, k) {
    const matches = this.getProductsByPrefix(prefix);
    if (matches.length === 0 || k <= 0) return [];

    const heap = new MaxHeap();
    heap.heapify(matches);

    const topK = [];
    const limit = Math.min(k, heap.size());

    for (let i = 0; i < limit; i++) {
      topK.push(heap.pop());
    }

    return topK;
  }
}