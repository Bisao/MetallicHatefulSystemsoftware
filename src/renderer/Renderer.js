export class Renderer {
  constructor(canvas, tileSize) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tileSize = tileSize;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawTile(x, y, { isOccupied, isHovered, isValid } = {}) {
    const iso = this.toIsometric(x, y);
    const offsetX = this.canvas.width / 2;
    const offsetY = 100;

    this.ctx.beginPath();
    this.ctx.moveTo(offsetX + iso.x, offsetY + iso.y);
    this.ctx.lineTo(offsetX + iso.x + this.tileSize, offsetY + iso.y + this.tileSize / 2);
    this.ctx.lineTo(offsetX + iso.x, offsetY + iso.y + this.tileSize);
    this.ctx.lineTo(offsetX + iso.x - this.tileSize, offsetY + iso.y + this.tileSize / 2);
    this.ctx.closePath();

    if (isOccupied) {
      this.ctx.fillStyle = '#ffcccc';
    } else if (isHovered) {
      this.ctx.fillStyle = isValid ? '#ccffcc' : '#ffcccc';
    } else {
      this.ctx.fillStyle = '#eee';
    }

    this.ctx.fill();
    this.ctx.strokeStyle = '#000';
    this.ctx.stroke();
  }

  drawBuilding(x, y, building) {
    const iso = this.toIsometric(x, y);
    const offsetX = this.canvas.width / 2;
    const offsetY = 100;

    const img = new Image();
    img.src = building.image;
    img.onload = () => {
      requestAnimationFrame(() => {
        this.ctx.drawImage(
          img,
          offsetX + iso.x - this.tileSize/2,
          offsetY + iso.y - this.tileSize/2,
          this.tileSize * 2,
          this.tileSize * 2
        );
      });
    };
  }

  drawBuildingPreview(x, y, imageUrl) {
    const iso = this.toIsometric(x, y);
    const offsetX = this.canvas.width / 2;
    const offsetY = 100;

    this.ctx.globalAlpha = 0.5;
    const img = new Image();
    img.src = imageUrl;
    this.ctx.save();
    img.onload = () => {
      requestAnimationFrame(() => {
        this.ctx.drawImage(
          img,
          offsetX + iso.x - this.tileSize/2,
          offsetY + iso.y - this.tileSize/2,
          this.tileSize * 2,
          this.tileSize * 2
        );
        this.ctx.restore();
        this.ctx.globalAlpha = 1.0;
      });
    };
  }

  getTileFromScreen(screenX, screenY) {
    const offsetX = this.canvas.width / 2;
    const offsetY = 100;

    // Convert screen to local coordinates
    const x = screenX - offsetX;
    const y = screenY - offsetY;

    // Convert isometric to cartesian coordinates without rounding
    const tileX = (x / this.tileSize + y / (this.tileSize / 2)) / 2;
    const tileY = (y / (this.tileSize / 2) - x / this.tileSize) / 2;

    // Get the exact tile
    const exactX = Math.floor(tileX);
    const exactY = Math.floor(tileY);

    if (exactX >= 0 && exactX < 10 && exactY >= 0 && exactY < 10) {
      return { x: exactX, y: exactY };
    }
    return null;
  }

  toIsometric(x, y) {
    return {
      x: (x - y) * this.tileSize,
      y: (x + y) * this.tileSize / 2
    };
  }
}