import { PROFESSIONS } from './Professions.js';

export class Npc {
  constructor(x, y, type, homeBuilding) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.profession = PROFESSIONS[type];
    this.state = 'idle';
    this.direction = Math.random() * Math.PI * 2;
    this.speed = 0.02;
    this.homeBuilding = homeBuilding;
  }

  update() {
    this.x += Math.cos(this.direction) * this.speed;
    this.y += Math.sin(this.direction) * this.speed;

    // Manter NPCs dentro dos limites
    if (this.x < 0 || this.x > 9 || this.y < 0 || this.y > 9) {
      this.direction += Math.PI;
    }

    // Mudar direção aleatoriamente
    if (Math.random() < 0.02) {
      this.direction += (Math.random() - 0.5) * Math.PI;
    }

    this.x = Math.max(0, Math.min(9, this.x));
    this.y = Math.max(0, Math.min(9, this.y));
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