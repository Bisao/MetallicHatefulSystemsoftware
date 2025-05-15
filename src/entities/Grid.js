
export class Grid {
  constructor(size) {
    this.size = size;
    this.cells = Array(size).fill().map(() => Array(size).fill(0));
    this.decorations = Array(size).fill().map(() => 
      Array(size).fill().map(() => {
        const rand = Math.random();
        if (rand < 0.1) return 'trees';
        if (rand < 0.15) return 'rocks';
        return null;
      })
    );
    this.npcs = [];
  }

  addNpc(npc) {
    this.npcs.push(npc);
  }

  getNpcsAt(x, y) {
    return this.npcs.filter(npc => npc.x === x && npc.y === y);
  }
}
