
export class MenuScene {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.buttons = [];
    this.setupButtons();
  }

  setupButtons() {
    const buttonWidth = 200;
    const buttonHeight = 50;
    const centerX = (this.canvas.width - buttonWidth) / 2;

    this.buttons.push({
      x: centerX,
      y: 300,
      width: buttonWidth,
      height: buttonHeight,
      text: 'Play',
      onClick: () => window.game.switchScene('game')
    });

    this.buttons.push({
      x: centerX,
      y: 370,
      width: buttonWidth,
      height: buttonHeight,
      text: 'Settings',
      onClick: () => alert('Settings em desenvolvimento')
    });
  }

  drawButton(button) {
    const gradient = this.ctx.createLinearGradient(button.x, button.y, button.x, button.y + button.height);
    gradient.addColorStop(0, '#4CAF50');
    gradient.addColorStop(1, '#45a049');
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.roundRect(button.x, button.y, button.width, button.height, 10);
    this.ctx.fill();
    
    this.ctx.font = 'bold 24px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      button.text,
      button.x + button.width / 2,
      button.y + button.height / 2 + 8
    );
  }

  render() {
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.font = 'bold 48px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Isometric Game', this.canvas.width / 2, 200);
    
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
