
export class Grid {
  constructor(size) {
    this.size = size;
    this.cells = Array(size).fill().map(() => Array(size).fill(0));
    
    // Gerar tipo de tile para cada posição
    this.tileTypes = Array(size).fill().map((_, y) => 
      Array(size).fill().map((_, x) => {
        const hash = (x * 12345 + y * 67890) % 100;
        
        if (hash < 30) { // 30% chance de ser árvore
          return { type: 'trees', variant: hash % 4 };
        } else if (hash < 45) { // 15% chance de ser pedra
          return { type: 'rocks', variant: hash % 3 };
        } else { // 55% chance de ser grama
          return { type: 'grass', variant: hash % 4 };
        }
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

  getTileType(x, y) {
    return this.tileTypes[y][x];
  }
}
