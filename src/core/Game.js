
import { Grid } from '../entities/Grid.js';
import { Renderer } from '../renderer/Renderer.js';
import { CONFIG } from '../config/config.js';
import { MenuScene } from '../scenes/MenuScene.js';
import { GameScene } from '../scenes/GameScene.js';

export class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.setupCanvas();

    this.grid = new Grid(CONFIG.GRID.SIZE);
    this.renderer = new Renderer(this.canvas, CONFIG.GRID.TILE_SIZE, this.grid);
    this.menuScene = new MenuScene(this.canvas, this.ctx);
    this.gameScene = new GameScene(this.canvas, this.ctx, this.grid, this.renderer);
    this.currentScene = this.menuScene;

    this.bindEvents();
    this.render();
  }

  setupCanvas() {
    this.canvas.width = CONFIG.CANVAS.WIDTH;
    this.canvas.height = CONFIG.CANVAS.HEIGHT;
  }

  bindEvents() {
    window.addEventListener('resize', () => this.handleResize());
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.currentScene.handleClick(x, y);
    });
  }

  handleResize() {
    const scale = Math.min(
      window.innerWidth / CONFIG.CANVAS.WIDTH,
      window.innerHeight / CONFIG.CANVAS.HEIGHT
    );
    this.canvas.style.transform = `scale(${scale})`;
  }

  switchScene(sceneName) {
    if (sceneName === 'game') {
      this.currentScene = this.gameScene;
    } else {
      this.currentScene = this.menuScene;
      document.getElementById('buildButton').style.visibility = 'hidden';
    }
  }

  render() {
    this.renderer.clear();
    this.currentScene.render();
    requestAnimationFrame(() => this.render());
  }
}
