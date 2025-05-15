
export class Grid {
  constructor(size) {
    this.size = size;
    this.cells = Array(size).fill().map(() => Array(size).fill(0));
    this.npcs = [];
  }

  addNpc(npc) {
    this.npcs.push(npc);
  }

  getNpcsAt(x, y) {
    return this.npcs.filter(npc => npc.x === x && npc.y === y);
  }
}
