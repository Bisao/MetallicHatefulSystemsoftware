
export class Renderer {
  constructor(canvas, tileSize) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileSize = tileSize;
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

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
