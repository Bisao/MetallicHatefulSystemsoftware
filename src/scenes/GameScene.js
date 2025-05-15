
import { BuildPanel } from '../ui/BuildPanel.js';
import { Farmer, Fisherman, Lumberjack, Miner } from '../entities/Npc.js';
import { InfoPanel } from '../ui/InfoPanel.js';

export class GameScene {
  constructor(canvas, ctx, grid, renderer) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.grid = grid;
    this.renderer = renderer;
    this.buildPanel = new BuildPanel();
    this.infoPanel = new InfoPanel();
    this.state = {
      selectedBuilding: null,
      hoverTile: null,
      lastUpdate: Date.now()
    };
    document.getElementById('buildButton').style.visibility = 'visible';
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('buildingSelected', (e) => {
      this.state.selectedBuilding = e.detail;
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      this.state.hoverTile = this.renderer.getTileFromScreen(mouseX, mouseY);
    });
  }

  update() {
    const now = Date.now();
    const deltaTime = (now - this.state.lastUpdate) / 1000;
    this.state.lastUpdate = now;

    // Update NPCs with deltaTime
    this.grid.npcs.forEach(npc => npc.update(deltaTime));
  }

  render() {
    // Update NPCs
    this.update();

    // Draw tiles and buildings
    for(let y = 0; y < this.grid.size; y++) {
      for(let x = 0; x < this.grid.size; x++) {
        const isOccupied = this.grid.cells[y][x] !== 0;
        const isHovered = this.state.hoverTile && 
                         this.state.hoverTile.x === x && 
                         this.state.hoverTile.y === y;

        this.renderer.drawTile(x, y, {
          isOccupied,
          isHovered,
          isValid: !isOccupied && isHovered && this.state.selectedBuilding
        });

        if (isOccupied) {
          this.renderer.drawBuilding(x, y, this.grid.cells[y][x]);
        }

        if (isHovered && this.state.selectedBuilding && !isOccupied) {
          this.renderer.drawBuildingPreview(x, y, this.state.selectedBuilding.image);
        }
      }
    }

    // Draw NPCs
    this.grid.npcs.forEach(npc => {
      this.renderer.drawNpc(npc);
    });
  }

  handleClick(x, y) {
    const tile = this.renderer.getTileFromScreen(x, y);
    if (!tile || !this.grid.isValidPosition(tile.x, tile.y)) return;

    if (this.state.selectedBuilding) {
      if (this.grid.cells[tile.y][tile.x] === 0) {
        this.grid.cells[tile.y][tile.x] = this.state.selectedBuilding;

        // Criar NPC baseado no tipo de construção
        switch(this.state.selectedBuilding.type) {
          case 'FARMER_HOUSE':
            this.grid.addNpc(new Farmer(tile.x, tile.y, 'FARMER', {x: tile.x, y: tile.y}));
            break;
          case 'FISHERMAN_HOUSE':
            this.grid.addNpc(new Fisherman(tile.x, tile.y, 'FISHERMAN', {x: tile.x, y: tile.y}));
            break;
          case 'LUMBERJACK_HOUSE':
            this.grid.addNpc(new Lumberjack(tile.x, tile.y, 'LUMBERJACK', {x: tile.x, y: tile.y}));
            break;
          case 'MINER_HOUSE':
            this.grid.addNpc(new Miner(tile.x, tile.y, 'MINER', {x: tile.x, y: tile.y}));
            break;
        }
        this.state.selectedBuilding = null;
      }
    } else {
      // Verificar se clicou em um NPC
      const clickedNpc = this.grid.npcs.find(npc => {
        const dx = Math.abs(npc.x - tile.x);
        const dy = Math.abs(npc.y - tile.y);
        return dx < 0.5 && dy < 0.5;
      });

      if (clickedNpc) {
        this.infoPanel.show(clickedNpc);
        return;
      }

      // Verificar se clicou em uma construção
      const building = this.grid.cells[tile.y][tile.x];
      if (building !== 0) {
        this.infoPanel.show(building);
      } else {
        this.infoPanel.hide();
      }
    }
  }
}
