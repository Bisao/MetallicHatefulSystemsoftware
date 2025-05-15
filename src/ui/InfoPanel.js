
export class InfoPanel {
  constructor() {
    this.panel = document.createElement('div');
    this.panel.className = 'info-panel';
    this.panel.style.display = 'none';
    document.body.appendChild(this.panel);

    // Fechar ao clicar fora do painel
    document.addEventListener('click', (e) => {
      if (this.panel.style.display === 'block' && 
          !this.panel.contains(e.target)) {
        this.hide();
      }
    });
  }

  show(entity) {
    let content = '';
    
    if (entity.profession) { // É um NPC
      content = `
        <div class="info-header">
          <h2>👤 ${entity.profession.name}</h2>
        </div>
        <div class="info-content">
          <div class="info-row">
            <span class="label">Profissão:</span>
            <span class="value">${entity.profession.name}</span>
          </div>
          <div class="info-row">
            <span class="label">Raio de trabalho:</span>
            <span class="value">${entity.profession.workRadius}</span>
          </div>
          <div class="info-section">
            <h3>Habilidades:</h3>
            <div class="skills-grid">
              ${Object.entries(entity.profession.skills)
                .map(([skill, level]) => `
                  <div class="skill-item">
                    <span class="skill-name">${skill}</span>
                    <span class="skill-level">Nível ${level}</span>
                  </div>
                `).join('')}
            </div>
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
            <span class="value">Construção</span>
          </div>
          <div class="info-row">
            <span class="label">Função:</span>
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
