
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
    this.ctx.fillStyle = '#4CAF50';
    this.ctx.fillRect(button.x, button.y, button.width, button.height);
    
    this.ctx.font = '24px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      button.text,
      button.x + button.width / 2,
      button.y + button.height / 2 + 8
    );
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
