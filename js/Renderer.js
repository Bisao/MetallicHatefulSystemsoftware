
export class Renderer {
  constructor(canvas, tileSize) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileSize = tileSize;
    this.tileImages = {
      [CONFIG.TILES.GRASS]: this.loadImage('attached_assets/Grass.png'),
      [CONFIG.TILES.GRASS_1]: this.loadImage('attached_assets/Grass_1.png'),
      [CONFIG.TILES.GRASS_2_FLOWERS]: this.loadImage('attached_assets/Grass_2_Flowers.png'),
      [CONFIG.TILES.GRASS_3_FLOWERS]: this.loadImage('attached_assets/Grass_3_Flowers.png')
    };
  }

  toIsometric(x, y) {
    return {
      x: (x - y) * this.tileSize,
      y: (x + y) * this.tileSize / 2
    };
  }

  loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
  }

  drawTile(x, y) {
    const iso = this.toIsometric(x, y);
    const offsetX = this.canvas.width / 2;
    const offsetY = 100;
    
    const tileType = Math.floor(Math.random() * 4); // Random tile for demonstration
    const img = this.tileImages[tileType];
    
    if (img.complete) {
      this.ctx.drawImage(
        img,
        offsetX + iso.x - this.tileSize,
        offsetY + iso.y - this.tileSize/2,
        this.tileSize * 2,
        this.tileSize * 2
      );
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
