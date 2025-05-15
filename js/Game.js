import { Grid } from './Grid.js';
import { Renderer } from './Renderer.js';
import { CONFIG } from './config.js';
import { Scene } from './Scene.js';

export class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.setupCanvas();

    this.grid = new Grid(CONFIG.GRID.SIZE);
    this.renderer = new Renderer(this.canvas, CONFIG.GRID.TILE_SIZE);
    this.scene = new Scene(this.canvas, this.ctx);
    this.isPlaying = false;

    // Create menu buttons
    const buttonWidth = 200;
    const buttonHeight = 50;
    const centerX = (this.canvas.width - buttonWidth) / 2;

    this.scene.createButton(
      centerX,
      300,
      buttonWidth,
      buttonHeight,
      'Play',
      () => this.isPlaying = true
    );

    this.scene.createButton(
      centerX,
      370,
      buttonWidth,
      buttonHeight,
      'Settings',
      () => console.log('Settings clicked')
    );

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
      this.scene.handleClick(x, y);
    });

    const buildButton = document.getElementById('buildButton');
    const buildPanel = document.getElementById('buildPanel');
    
    buildButton.addEventListener('click', () => {
      buildPanel.style.display = buildPanel.style.display === 'grid' ? 'none' : 'grid';
    });

    document.addEventListener('click', (e) => {
      if (!buildPanel.contains(e.target) && e.target !== buildButton) {
        buildPanel.style.display = 'none';
      }
    });

    const buildingItems = document.querySelectorAll('.building-item');
    buildingItems.forEach(item => {
      item.addEventListener('click', () => {
        const buildingType = item.dataset.building;
        console.log('Selected building:', buildingType);
        // Aqui você pode implementar a lógica para colocar a estrutura no grid
        buildPanel.style.display = 'none';
      });
    });
  }

  handleResize() {
    const scale = Math.min(
      window.innerWidth / CONFIG.CANVAS.WIDTH,
      window.innerHeight / CONFIG.CANVAS.HEIGHT
    );

    this.canvas.style.transform = `scale(${scale})`;
  }

  render() {
    this.renderer.clear();

    if (this.isPlaying) {
      for(let y = 0; y < CONFIG.GRID.SIZE; y++) {
        for(let x = 0; x < CONFIG.GRID.SIZE; x++) {
          this.renderer.drawTile(x, y);
        }
      }
    } else {
      this.scene.render();
    }

    requestAnimationFrame(() => this.render());
  }
}