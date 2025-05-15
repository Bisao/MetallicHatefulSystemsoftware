
export class Scene {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.buttons = [];
  }

  createButton(x, y, width, height, text, onClick) {
    this.buttons.push({ x, y, width, height, text, onClick });
  }

  drawText(text, x, y, size = '48px') {
    this.ctx.font = `${size} Arial`;
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(text, x, y);
  }

  drawButton(button) {
    // Sombra do botão
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    this.ctx.shadowBlur = 10;
    this.ctx.shadowOffsetY = 5;
    
    // Gradiente do botão
    const gradient = this.ctx.createLinearGradient(button.x, button.y, button.x, button.y + button.height);
    gradient.addColorStop(0, '#4CAF50');
    gradient.addColorStop(1, '#45a049');
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.roundRect(button.x, button.y, button.width, button.height, 10);
    this.ctx.fill();
    
    // Resetar sombra
    this.ctx.shadowColor = 'transparent';
    
    // Texto do botão
    this.ctx.font = 'bold 24px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      button.text,
      button.x + button.width / 2,
      button.y + button.height / 2 + 8
    );
  }

  drawText(text, x, y, size = '48px') {
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    this.ctx.shadowBlur = 15;
    this.ctx.font = `bold ${size} Arial`;
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(text, x, y);
    this.ctx.shadowColor = 'transparent';
  }

  render() {
    // Background
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Title
    this.drawText('Isometric Game', this.canvas.width / 2, 200);
    
    // Buttons
    this.buttons.forEach(button => this.drawButton(button));
  }

  handleClick(x, y) {
    this.buttons.forEach(button => {
      if (x >= button.x && x <= button.x + button.width &&
          y >= button.y && y <= button.y + button.height) {
        button.onClick();
      }
    });
  }
}
