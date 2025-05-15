
export class Grid {
  constructor(size) {
    this.size = size;
    this.grid = this.createGrid();
  }

  createGrid() {
    return Array(this.size).fill().map(() => Array(this.size).fill(0));
  }

  getTile(x, y) {
    if (x >= 0 && x < this.size && y >= 0 && y < this.size) {
      return this.grid[y][x];
    }
    return null;
  }
}
