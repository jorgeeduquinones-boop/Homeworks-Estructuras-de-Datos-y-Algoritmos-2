class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

export class SongTrie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(title) {
    let current = this.root;
    const cleanTitle = title.toLowerCase().trim();
    for (const char of cleanTitle) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    current.isEndOfWord = true;
  }

  search(title) {
    let current = this.root;
    const cleanTitle = title.toLowerCase().trim();
    for (const char of cleanTitle) {
      if (!current.children[char]) return false;
      current = current.children[char];
    }
    return current.isEndOfWord;
  }

  autocomplete(prefix) {
    let current = this.root;
    const cleanPrefix = prefix.toLowerCase().trim();
    const suggestions = [];

    if (!cleanPrefix) return suggestions;

    for (const char of cleanPrefix) {
      if (!current.children[char]) return suggestions;
      current = current.children[char];
    }

    this._collectWords(current, cleanPrefix, suggestions);
    return suggestions;
  }

  _collectWords(node, currentWord, suggestions) {
    if (node.isEndOfWord) {
      suggestions.push(currentWord);
    }
    for (const char in node.children) {
      this._collectWords(node.children[char], currentWord + char, suggestions);
    }
  }
}