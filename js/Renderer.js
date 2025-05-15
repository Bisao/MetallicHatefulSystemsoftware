
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
      [CONFIG.TILES.GRASS_3_FLOWERS]: this.loadImage('attached_assets/Grass_3_Flowers.png'),
      [CONFIG.TILES.TREE_1]: this.loadImage('attached_assets/tree1.png'),
      [CONFIG.TILES.TREE_2]: this.loadImage('attached_assets/tree2.png'),
      [CONFIG.TILES.TREE_3]: this.loadImage('attached_assets/tree3.png'),
      [CONFIG.TILES.STUMP_1]: this.loadImage('attached_assets/stump1.png'),
      [CONFIG.TILES.STUMP_2]: this.loadImage('attached_assets/stump2.png'),
      [CONFIG.TILES.LOG]: this.loadImage('attached_assets/log.png')
    };
    
    // Criar mapa de tiles consistente
    this.tileMap = Array(CONFIG.GRID.SIZE).fill().map(() => 
      Array(CONFIG.GRID.SIZE).fill().map(() => {
        const rand = Math.random();
        // Distribuição natural:
        // 60% grama (diferentes tipos)
        // 30% árvores
        // 10% troncos/tocos
        if (rand < 0.6) {
          // Distribuição da grama
          const grassRand = Math.random();
          if (grassRand < 0.4) return CONFIG.TILES.GRASS;
          if (grassRand < 0.75) return CONFIG.TILES.GRASS_1;
          if (grassRand < 0.9) return CONFIG.TILES.GRASS_2_FLOWERS;
          return CONFIG.TILES.GRASS_3_FLOWERS;
        } else if (rand < 0.9) {
          // Distribuição das árvores
          const treeRand = Math.random();
          if (treeRand < 0.33) return CONFIG.TILES.TREE_1;
          if (treeRand < 0.66) return CONFIG.TILES.TREE_2;
          return CONFIG.TILES.TREE_3;
        } else {
          // Distribuição dos troncos/tocos
          const stumpRand = Math.random();
          if (stumpRand < 0.4) return CONFIG.TILES.STUMP_1;
          if (stumpRand < 0.7) return CONFIG.TILES.STUMP_2;
          return CONFIG.TILES.LOG;
        }
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
