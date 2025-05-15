
export class Npc {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.profession = '';
    this.state = 'idle';
  }

  update() {
    // Lógica de atualização básica do NPC
    // Será expandida posteriormente
  }
}

export class Farmer extends Npc {
  constructor(x, y) {
    super(x, y, 'FARMER');
    this.profession = 'Farmer';
  }
}

export class Fisherman extends Npc {
  constructor(x, y) {
    super(x, y, 'FISHERMAN');
    this.profession = 'Fisherman';
  }
}

export class Lumberjack extends Npc {
  constructor(x, y) {
    super(x, y, 'LUMBERJACK');
    this.profession = 'Lumberjack';
  }
}

export class Miner extends Npc {
  constructor(x, y) {
    super(x, y, 'MINER');
    this.profession = 'Miner';
  }
}
