export class InfoPanel {
  constructor() {
    this.panel = document.createElement('div');
    this.panel.className = 'info-panel';
    this.panel.style.display = 'none';
    this.panel.style.zIndex = '1000';
    document.body.appendChild(this.panel);

    // Fechar ao clicar fora do painel
    document.addEventListener('mousedown', (e) => {
      if (this.panel.style.display === 'block' && 
          !this.panel.contains(e.target) &&
          !e.target.closest('#gameCanvas')) {
        this.hide();
      }
    });
  }

  show(entity) {
    let content = '';

    if (entity.profession) { // É um NPC
      content = `
        <div class="info-header">
          <h2>👤 ${entity.profession}</h2>
        </div>
        <div class="info-content">
          <div class="info-row">
            <span class="label">Profissão:</span>
            <span class="value">${entity.profession}</span>
          </div>
          <div class="info-row">
            <span class="label">Posição:</span>
            <span class="value">X: ${Math.floor(entity.x)}, Y: ${Math.floor(entity.y)}</span>
          </div>
        </div>
      `;
    } else { // É uma construção
      content = `
        <div class="info-header">
          <h2>🏠 ${entity.type.replace(/_/g, ' ')}</h2>
        </div>
        <div class="info-content">
          <div class="info-row">
            <span class="label">Tipo:</span>
            <span class="value">${entity.type.split('_')[0]}</span>
          </div>
        </div>
      `;
    }

    this.panel.innerHTML = content;
    this.panel.style.display = 'block';
  }

  hide() {
    this.panel.style.display = 'none';
  }
}