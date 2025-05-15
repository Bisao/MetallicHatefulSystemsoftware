
export class Button {
  constructor(ctx, x, y, width, height, text, onClick) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.onClick = onClick;
  }

  draw() {
    const gradient = this.ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
    gradient.addColorStop(0, '#4CAF50');
    gradient.addColorStop(1, '#45a049');
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.roundRect(this.x, this.y, this.width, this.height, 10);
    this.ctx.fill();
    
    this.ctx.font = 'bold 24px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2 + 8
    );
  }

  isClicked(mouseX, mouseY) {
    return mouseX >= this.x && mouseX <= this.x + this.width &&
           mouseY >= this.y && mouseY <= this.y + this.height;
  }
}
