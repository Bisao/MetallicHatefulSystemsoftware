
import { CONFIG } from './config.js';

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
    
    // Criar mapa de tiles consistente
    this.tileMap = Array(CONFIG.GRID.SIZE).fill().map(() => 
      Array(CONFIG.GRID.SIZE).fill().map(() => {
        const rand = Math.random();
        if (rand < 0.4) return CONFIG.TILES.GRASS;
        if (rand < 0.7) return CONFIG.TILES.GRASS_1;
        if (rand < 0.85) return CONFIG.TILES.GRASS_2_FLOWERS;
        return CONFIG.TILES.GRASS_3_FLOWERS;
      })
    );
  }

  toIsometric(x, y) {
    return {
      x: (x - y) * this.tileSize,
      y: (x + y) * this.tileSize / 2
    };
  }

  loadImage(src) {
    const img = new Image();
    img.onerror = () => {
      console.error(`Erro ao carregar imagem: ${src}`);
    };
    img.src = src;
    return img;
  }

  drawTile(x, y) {
    const iso = this.toIsometric(x, y);
    const offsetX = this.canvas.width / 2;
    const offsetY = 100;
    
    const tileType = this.tileMap[y][x];
    const img = this.tileImages[tileType];
    
    try {
      if (img && img.complete && img.naturalHeight !== 0) {
        this.ctx.drawImage(
          img,
          offsetX + iso.x - this.tileSize/2,
          offsetY + iso.y - this.tileSize/4,
          this.tileSize,
          this.tileSize
        );
      }
    } catch (error) {
      console.error('Erro ao desenhar tile:', error);
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
