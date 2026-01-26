// ui-components.js - Central de Componentes Visuais
export const UI = {
    
    // 📌 COMPONENTE: POST-IT NÃO CONFUNDA
    criarPostItNC: (id, data, onDelete) => {
        const div = document.createElement('div');
        div.className = 'postit-container';
        
        const tesesHtml = data.teses.map(t => `
            <div class="tese-item">
                <span class="icon-balanca">⚖️</span>
                <div class="item-text">${t}</div>
            </div>
        `).join('');

        const explisHtml = data.explicações.map(e => `
            <div class="expli-item">
                <span class="icon-lampada">💡</span>
                <div class="item-text">${e}</div>
            </div>
        `).join('');

        div.innerHTML = `
            <div class="postit-header">
                <span class="postit-badge">NÃO CONFUNDA</span>
                <button class="btn-delete" title="Excluir">×</button>
            </div>
            <h4 class="postit-title">${data.titulo}</h4>
            
            <div class="postit-section">
                <p class="section-label">TESES COMPARADAS</p>
                <div class="list-wrapper">${tesesHtml}</div>
            </div>
            
            <div class="postit-section">
                <p class="section-label">FUNDAMENTAÇÃO / DICAS</p>
                <div class="list-wrapper">${explisHtml}</div>
            </div>
        `;

        // Evento de deleção
        div.querySelector('.btn-delete').onclick = () => onDelete(id);
        
        return div;
    }
};
