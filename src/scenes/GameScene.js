
export class GameScene {
  constructor(canvas, ctx, grid, renderer) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.grid = grid;
    this.renderer = renderer;
    this.buildButton = document.getElementById('buildButton');
    this.buildPanel = document.getElementById('buildPanel');
    this.setupBuildSystem();
  }

  setupBuildSystem() {
    this.buildButton.style.display = 'block';
    
    this.buildButton.addEventListener('click', () => {
      this.buildPanel.style.display = this.buildPanel.style.display === 'grid' ? 'none' : 'grid';
    });

    document.addEventListener('click', (e) => {
      if (!this.buildPanel.contains(e.target) && e.target !== this.buildButton) {
        this.buildPanel.style.display = 'none';
      }
    });

    const buildingItems = document.querySelectorAll('.building-item');
    buildingItems.forEach(item => {
      item.addEventListener('click', () => {
        const buildingType = item.dataset.building;
        console.log('Selected building:', buildingType);
        this.buildPanel.style.display = 'none';
      });
    });
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
