
export class Renderer {
  constructor(canvas, tileSize) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileSize = tileSize;
    this.imageCache = new Map();
    this.loadingImages = new Set();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  async loadImage(src) {
    if (this.imageCache.has(src)) {
      return this.imageCache.get(src);
    }

    if (this.loadingImages.has(src)) {
      return new Promise(resolve => {
        const checkImage = setInterval(() => {
          if (this.imageCache.has(src)) {
            clearInterval(checkImage);
            resolve(this.imageCache.get(src));
          }
        }, 50);
      });
    }

    this.loadingImages.add(src);

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.imageCache.set(src, img);
        this.loadingImages.delete(src);
        resolve(img);
      };
      img.onerror = () => {
        this.loadingImages.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      img.src = src;
    });
  }

  getOffsets() {
    return {
      x: this.canvas.width / 2,
      y: 100
    };
  }

  async drawTile(x, y, { isOccupied, isHovered, isValid } = {}) {
    if (!this.grid || !this.grid.isValidPosition(x, y)) return;

    const iso = this.toIsometric(x, y);
    const { x: offsetX, y: offsetY } = this.getOffsets();
    const tileType = this.grid.getTileType(x, y);
    const decoration = this.grid.getDecoration(x, y);
    
    // Tiles base
    const tileImages = [
      '/assets/tiles/Grass.png',
      '/assets/tiles/Grass_1.png',
      '/assets/tiles/Grass_2_Flowers.png',
      '/assets/tiles/Grass_3_Flowers.png'
    ];
    
    // Decorações
    const decorations = {
      trees: [
        '/attached_assets/trees/tree_autumn.png',
        '/attached_assets/trees/tree_fruit.png',
        '/attached_assets/trees/tree_pine.png',
        '/attached_assets/trees/tree_simple.png'
      ],
      rocks: [
        '/attached_assets/rocks/2_rock.png',
        '/attached_assets/rocks/big_rock.png',
        '/attached_assets/rocks/small_rock.png'
      ]
    };

    const tileImage = await this.loadImage(tileImages[Math.floor(Math.random() * tileImages.length)]);

    this.ctx.save();
    try {
      // Desenha o tile base
      this.ctx.drawImage(
        tileImage,
        offsetX + iso.x - this.tileSize,
        offsetY + iso.y - this.tileSize / 2,
        this.tileSize * 2,
        this.tileSize
      );

      // Renderiza decoração se existir
      if (decorationType) {
        const decorationList = decorations[decorationType];
        if (decorationList) {
          const decorationImage = await this.loadImage(decorationList[Math.floor(Math.random() * decorationList.length)]);
          this.ctx.drawImage(
            decorationImage,
            offsetX + iso.x - this.tileSize,
            offsetY + iso.y - this.tileSize,
            this.tileSize * 2,
            this.tileSize * 2
          );
        }
      }
      
      // Adiciona highlight para hover e seleção
      if (isHovered || isOccupied) {
        this.ctx.beginPath();
        this.ctx.moveTo(offsetX + iso.x, offsetY + iso.y);
        this.ctx.lineTo(offsetX + iso.x + this.tileSize, offsetY + iso.y + this.tileSize / 2);
        this.ctx.lineTo(offsetX + iso.x, offsetY + iso.y + this.tileSize);
        this.ctx.lineTo(offsetX + iso.x - this.tileSize, offsetY + iso.y + this.tileSize / 2);
        this.ctx.closePath();
        
        this.ctx.fillStyle = isOccupied ? 'rgba(255,0,0,0.2)' : (isValid ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,0,0.2)');
        this.ctx.fill();
      }
    } finally {
      this.ctx.restore();
    }
  }

  async drawBuilding(x, y, building) {
    if (!building || !building.image) return;

    const iso = this.toIsometric(x, y);
    const offsetX = this.canvas.width / 2;
    const offsetY = 100;
    
    try {
      const img = await this.loadImage(building.image);
      this.ctx.save();
      this.ctx.drawImage(
        img,
        offsetX + iso.x - this.tileSize,
        offsetY + iso.y - this.tileSize,
        this.tileSize * 2,
        this.tileSize * 2
      );
    } catch (error) {
      console.error('Error drawing building:', error);
    } finally {
      this.ctx.restore();
    }
  }

  async drawBuildingPreview(x, y, imageUrl) {
    if (!imageUrl) return;

    const iso = this.toIsometric(x, y);
    const offsetX = this.canvas.width / 2;
    const offsetY = 100;
    
    try {
      const img = await this.loadImage(imageUrl);
      this.ctx.save();
      this.ctx.globalAlpha = 0.5;
      this.ctx.drawImage(
        img,
        offsetX + iso.x - this.tileSize,
        offsetY + iso.y - this.tileSize,
        this.tileSize * 2,
        this.tileSize * 2
      );
    } catch (error) {
      console.error('Error drawing building preview:', error);
    } finally {
      this.ctx.restore();
      this.ctx.globalAlpha = 1.0;
    }
  }

  getTileFromScreen(screenX, screenY) {
    const offsetX = this.canvas.width / 2;
    const offsetY = 100;
    
    const x = screenX - offsetX;
    const y = screenY - offsetY;
    
    const tileX = Math.round((x / this.tileSize + y / (this.tileSize / 2)) / 2);
    const tileY = Math.round((y / (this.tileSize / 2) - x / this.tileSize) / 2);
    
    if (tileX >= 0 && tileX < 10 && tileY >= 0 && tileY < 10) {
      return { x: tileX, y: tileY };
    }
    return null;
  }

  toIsometric(x, y) {
    return {
      x: (x - y) * this.tileSize,
      y: (x + y) * this.tileSize / 2
    };
  }

  drawNpc(npc) {
    if (!npc) return;

    const iso = this.toIsometric(npc.x, npc.y);
    const offsetX = this.canvas.width / 2;
    const offsetY = 100;

    this.ctx.save();
    try {
      this.ctx.beginPath();
      this.ctx.arc(
        offsetX + iso.x,
        offsetY + iso.y,
        15,
        0,
        Math.PI * 2
      );
      
      this.ctx.fillStyle = npc.profession.color;
      this.ctx.fill();
      this.ctx.stroke();
    } finally {
      this.ctx.restore();
    }
  }

  dispose() {
    this.imageCache.clear();
    this.loadingImages.clear();
  }
}
