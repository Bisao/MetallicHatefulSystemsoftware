
export class BuildPanel {
  constructor() {
    this.panel = document.getElementById('buildPanel');
    this.button = document.getElementById('buildButton');
    this.setupEvents();
  }

  setupEvents() {
    this.button.addEventListener('click', () => this.toggle());
    
    document.addEventListener('click', (e) => {
      if (!this.panel.contains(e.target) && e.target !== this.button) {
        this.hide();
      }
    });

    const buildingItems = document.querySelectorAll('.building-item');
    buildingItems.forEach(item => {
      item.addEventListener('click', () => {
        const buildingType = item.dataset.building;
        const buildingImg = item.querySelector('img').src;
        document.dispatchEvent(new CustomEvent('buildingSelected', {
          detail: { type: buildingType, image: buildingImg }
        }));
        this.hide();
      });
    });
  }

  show() {
    this.panel.style.display = 'grid';
  }

  hide() {
    this.panel.style.display = 'none';
  }

  toggle() {
    this.panel.style.display = this.panel.style.display === 'grid' ? 'none' : 'grid';
  }
}
