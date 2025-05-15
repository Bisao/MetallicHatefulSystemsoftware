
export class Grid {
  constructor(size) {
    this.size = size;
    this.cells = Array(size).fill().map(() => Array(size).fill(0));
    this.tileTypes = Array(size).fill().map((_, y) => 
      Array(size).fill().map((_, x) => {
        const hash = (x * 12345 + y * 67890);
        return hash % 4; // 4 tipos de tiles
      })
    );
    this.decorations = Array(size).fill().map((_, y) => 
      Array(size).fill().map((_, x) => {
        const hash = (x * 12345 + y * 67890);
        return {
          treeType: hash % 4, // 4 tipos de árvores
          rockType: (hash >> 2) % 3, // 3 tipos de pedras
          hasTree: (hash % 100) < 30, // 30% chance de ter árvore
          hasRock: ((hash >> 4) % 100) < 20 // 20% chance de ter pedra
        };
      })
    );
    this.npcs = [];
  }

  isValidPosition(x, y) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size;
  }

  getCell(x, y) {
    if (!this.isValidPosition(x, y)) return null;
    return this.cells[y][x];
  }

  setCell(x, y, value) {
    if (!this.isValidPosition(x, y)) return false;
    this.cells[y][x] = value;
    return true;
  }

  getTileType(x, y) {
    if (!this.isValidPosition(x, y)) return null;
    return this.tileTypes[y][x];
  }

  getDecoration(x, y) {
    if (!this.isValidPosition(x, y)) return null;
    return this.decorations[y][x];
  }

  addNpc(npc) {
    if (!this.isValidPosition(npc.x, npc.y)) return false;
    this.npcs.push(npc);
    return true;
  }

  getNpcsAt(x, y) {
    if (!this.isValidPosition(x, y)) return [];
    return this.npcs.filter(npc => 
      Math.abs(npc.x - x) < 0.5 && Math.abs(npc.y - y) < 0.5
    );
  }

  removeNpc(npc) {
    const index = this.npcs.indexOf(npc);
    if (index !== -1) {
      this.npcs.splice(index, 1);
      return true;
    }
    return false;
  }
}
