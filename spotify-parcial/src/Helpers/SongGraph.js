export class SongGraph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addSong(song) {
    if (!this.adjacencyList.has(song)) {
      this.adjacencyList.set(song, []);
    }
  }

  addRelation(song1, song2) {
    this.addSong(song1);
    this.addSong(song2);

    if (!this.adjacencyList.get(song1).includes(song2)) {
      this.adjacencyList.get(song1).push(song2);
    }
    if (!this.adjacencyList.get(song2).includes(song1)) {
      this.adjacencyList.get(song2).push(song1);
    }
  }

  getRecommendations(song) {
    return this.adjacencyList.get(song) || [];
  }
}