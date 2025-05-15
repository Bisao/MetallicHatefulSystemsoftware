
export class InfoPanel {
  constructor() {
    this.panel = document.createElement('div');
    this.panel.className = 'info-panel';
    this.panel.style.display = 'none';
    document.body.appendChild(this.panel);

    this.panel.addEventListener('click', (e) => {
      if (e.target.classList.contains('close-button')) {
        this.hide();
      }
    });
  }

  show(entity) {
    let content = '';
    
    if (entity.profession) { // É um NPC
      content = `
        <h2>🧑‍🌾 ${entity.profession.name}</h2>
        <div class="info-content">
          <p>Habilidades:</p>
          <ul>
            ${Object.entries(entity.profession.skills)
              .map(([skill, level]) => `<li>${skill}: ${level}</li>`)
              .join('')}
          </ul>
          <p>Raio de trabalho: ${entity.profession.workRadius}</p>
        </div>
      `;
    } else { // É uma construção
      content = `
        <h2>🏠 ${entity.type.replace('_', ' ')}</h2>
        <div class="info-content">
          <p>Tipo: Residência</p>
          <p>Profissão: ${entity.type.split('_')[0]}</p>
        </div>
      `;
    }

    this.panel.innerHTML = `
      ${content}
      <button class="close-button">✕</button>
    `;
    
    this.panel.style.display = 'block';
  }

  hide() {
    this.panel.style.display = 'none';
  }
}
