import { BuildPanel } from '../ui/BuildPanel.js';

export class GameScene {
  constructor(canvas, ctx, grid, renderer) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.grid = grid;
    this.renderer = renderer;
    this.buildPanel = new BuildPanel();
    document.getElementById('buildButton').style.visibility = 'visible';
  }

  render() {
    for(let y = 0; y < this.grid.size; y++) {
      for(let x = 0; x < this.grid.size; x++) {
        this.renderer.drawTile(x, y);
      }
    }
  }

  handleClick(x, y) {
    // Implementar lógica de click no grid
  }
}