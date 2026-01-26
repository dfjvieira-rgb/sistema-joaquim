// ui-components.js - Central de Componentes Visuais
export const UI = {
    
    // 📌 COMPONENTE: POST-IT NÃO CONFUNDA
    criarPostItNC: (id, data, onDelete) => {
        const div = document.createElement('div');
        div.className = 'postit-container';
        
        // Formata as teses e explicações em HTML
        const tesesHtml = data.teses.map(t => `<div class="tese-item"><span>⚖️</span> ${t}</div>`).join('');
        const explisHtml = data.explicações.map(e => `<div class="expli-item"><span>💡</span> ${e}</div>`).join('');

        div.innerHTML = `
            <div class="postit-header">
                <span class="postit-badge">NÃO CONFUNDA</span>
                <button class="btn-delete" title="Excluir">×</button>
            </div>
            <h4 class="postit-title">${data.titulo}</h4>
            
            <div class="postit-section">
                <p class="section-label">TESES / COMPARATIVO</p>
                ${tesesHtml}
            </div>
            
            <div class="postit-section">
                <p class="section-label">FUNDAMENTAÇÃO</p>
                ${explisHtml}
            </div>
        `;

        // Lógica de deleção
        div.querySelector('.btn-delete').onclick = () => onDelete(id);
        
        return div;
    },

    // 🏆 COMPONENTE: CARD DE MENTORIA (Exemplo para o futuro)
    criarCardMentoria: (titulo, progresso) => {
        // ... lógica futura aqui
    }
};
