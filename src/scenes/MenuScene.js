import { Button } from '../ui/Button.js';

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

    this.buttons.push(new Button(
      this.ctx,
      centerX,
      300,
      buttonWidth,
      buttonHeight,
      'Play',
      () => window.game.switchScene('game')
    ));

    this.buttons.push(new Button(
      this.ctx,
      centerX,
      370,
      buttonWidth,
      buttonHeight,
      'Settings',
      () => alert('Settings em desenvolvimento')
    ));
  }

  render() {
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = 'bold 48px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Isometric Game', this.canvas.width / 2, 200);

    this.buttons.forEach(button => button.draw());
  }

  handleClick(x, y) {
    this.buttons.forEach(button => {
      if (button.isClicked(x, y)) {
        button.onClick();
      }
    });
  }
}