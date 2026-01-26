// Dentro do seu ui-components.js
criarPostItNC: (id, data, callbackDelete) => {
    const card = document.createElement('div');
    card.className = 'card-nc-profissional';
    
    // Header com Título e Botão Delete
    card.innerHTML = `
        <div class="nc-header">
            <span class="nc-badge">DIFERENCIAL</span>
            <button onclick="window.removerNC('${id}')" class="nc-del-btn"><i class="fas fa-trash"></i></button>
        </div>
        <h3 class="nc-titulo-card">${data.titulo}</h3>
        
        <div class="nc-secao">
            <button class="nc-collapse-btn" onclick="this.nextElementSibling.classList.toggle('show')">
                <i class="fas fa-gavel"></i> Fundamentação / Teses <span>+</span>
            </button>
            <div class="nc-content-box">
                <ul>${data.teses.map(t => `<li>${t}</li>`).join('')}</ul>
            </div>
        </div>

        <div class="nc-secao">
            <button class="nc-collapse-btn" onclick="this.nextElementSibling.classList.toggle('show')" style="border-left-color: #f39c12;">
                <i class="fas fa-lightbulb"></i> Explicação Estratégica <span>+</span>
            </button>
            <div class="nc-content-box color-expl">
                <ul>${data.explicacoes.map(e => `<li>${e}</li>`).join('')}</ul>
            </div>
        </div>
    `;
    return card;
}
