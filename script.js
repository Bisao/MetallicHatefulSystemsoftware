
class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.tileSize = 40;
    this.gridSize = 10;
    
    this.setupCanvas();
    this.createGrid();
    this.render();
  }

  setupCanvas() {
    this.canvas.width = 800;
    this.canvas.height = 600;
  }

  createGrid() {
    this.grid = Array(this.gridSize).fill().map(() => 
      Array(this.gridSize).fill(0)
    );
  }

  toIsometric(x, y) {
    return {
      x: (x - y) * this.tileSize,
      y: (x + y) * this.tileSize / 2
    };
  }

  drawTile(x, y) {
    const iso = this.toIsometric(x, y);
    const offsetX = this.canvas.width / 2;
    const offsetY = 100;

    this.ctx.beginPath();
    this.ctx.moveTo(offsetX + iso.x, offsetY + iso.y);
    this.ctx.lineTo(offsetX + iso.x + this.tileSize, offsetY + iso.y + this.tileSize / 2);
    this.ctx.lineTo(offsetX + iso.x, offsetY + iso.y + this.tileSize);
    this.ctx.lineTo(offsetX + iso.x - this.tileSize, offsetY + iso.y + this.tileSize / 2);
    this.ctx.closePath();
    
    this.ctx.strokeStyle = '#000';
    this.ctx.stroke();
    this.ctx.fillStyle = '#eee';
    this.ctx.fill();
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for(let y = 0; y < this.gridSize; y++) {
      for(let x = 0; x < this.gridSize; x++) {
        this.drawTile(x, y);
      }
    }
  }
}

// Start the game when the page loads
window.onload = () => {
  const game = new Game();
};
