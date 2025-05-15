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
    this.selectedBuilding = null;
    this.hoverTile = null;
    document.getElementById('buildButton').style.visibility = 'visible';

    document.addEventListener('buildingSelected', (e) => {
      this.selectedBuilding = e.detail;
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      this.hoverTile = this.renderer.getTileFromScreen(mouseX, mouseY);
    });
  }

  render() {
    // Update NPCs
    this.grid.npcs.forEach(npc => npc.update());

    // Draw tiles and buildings
    for(let y = 0; y < this.grid.size; y++) {
      for(let x = 0; x < this.grid.size; x++) {
        const isOccupied = this.grid.cells[y][x] !== 0;
        const isHovered = this.hoverTile && 
                         this.hoverTile.x === x && 
                         this.hoverTile.y === y;

        this.renderer.drawTile(x, y, {
          isOccupied,
          isHovered,
          isValid: !isOccupied && isHovered && this.selectedBuilding
        });

        if (isOccupied) {
          this.renderer.drawBuilding(x, y, this.grid.cells[y][x]);
        }

        if (isHovered && this.selectedBuilding && !isOccupied) {
          this.renderer.drawBuildingPreview(x, y, this.selectedBuilding.image);
        }
      }
    }

    // Draw NPCs
    this.grid.npcs.forEach(npc => {
      this.renderer.drawNpc(npc);
    });
  }

  handleClick(x, y) {
    if (!this.selectedBuilding) return;

    const tile = this.renderer.getTileFromScreen(x, y);
    if (!tile) return;

    if (this.grid.cells[tile.y][tile.x] === 0) {
      this.grid.cells[tile.y][tile.x] = this.selectedBuilding;

      // Criar NPC baseado no tipo de construção
      switch(this.selectedBuilding.type) {
        case 'FARMER_HOUSE':
          this.grid.addNpc(new Farmer(tile.x, tile.y));
          break;
        case 'FISHERMAN_HOUSE':
          this.grid.addNpc(new Fisherman(tile.x, tile.y));
          break;
        case 'LUMBERJACK_HOUSE':
          this.grid.addNpc(new Lumberjack(tile.x, tile.y));
          break;
        case 'MINER_HOUSE':
          this.grid.addNpc(new Miner(tile.x, tile.y));
          break;
      }

      this.selectedBuilding = null;
    }
  }
}