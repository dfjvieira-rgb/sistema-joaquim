// ui-components.js - Central de Componentes Visuais Profissionais
export const UI = {
    
    // 📌 COMPONENTE: POST-IT NÃO CONFUNDA
    criarPostItNC: (id, data, onDelete) => {
        const div = document.createElement('div');
        div.className = 'postit-container animated fadeIn';
        
        const tesesHtml = data.teses.map(t => `
            <div class="tese-item">
                <span class="icon-balanca">⚖️</span>
                <div class="item-text" style="font-weight: 600; color: var(--pen-blue);">${t}</div>
            </div>
        `).join('');

        const explisHtml = data.explicações.map(e => `
            <div class="expli-item">
                <span class="icon-lampada">💡</span>
                <div class="item-text" style="font-style: italic; opacity: 0.9;">${e}</div>
            </div>
        `).join('');

        div.innerHTML = `
            <div class="postit-pin"></div>
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
                <p class="section-label" style="color: var(--success); border-color: var(--success);">FUNDAMENTAÇÃO / DICAS</p>
                <div class="list-wrapper">${explisHtml}</div>
            </div>
        `;

        // Evento de deleção
        div.querySelector('.btn-delete').onclick = (e) => {
            e.stopPropagation();
            onDelete(id);
        };
        
        return div;
    },

    // 📌 COMPONENTE: MODAL DE CRIAÇÃO
    abrirModalNC: (exameAtual) => {
        const modal = document.createElement('div');
        modal.id = 'modal-nc-overlay';
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:2000; display:flex; align-items:center; justify-content:center; padding:20px;';
        
        modal.innerHTML = `
            <div style="background:var(--paper); width:100%; max-width:500px; border-radius:15px; padding:25px; border: 1px solid var(--gold);">
                <h3 style="color:var(--gold); margin-top:0;">⚖️ NOVO POST-IT</h3>
                
                <input type="text" id="nc-titulo" placeholder="Título (Ex: Ilegitimidade Passiva)" class="input-nc">

                <p class="section-label">TESES</p>
                <div id="container-teses">
                    <input type="text" placeholder="Tese 1" class="input-nc">
                </div>
                <button onclick="window.adicionarCampo('container-teses', 'Nova Tese')" style="background:var(--primary); color:white; border:none; padding:5px 15px; border-radius:5px; margin-bottom:15px; cursor:pointer;">+ Tese</button>

                <p class="section-label" style="color:var(--success);">DICAS / EXPLICAÇÕES</p>
                <div id="container-explicações">
                    <input type="text" placeholder="Explicação 1" class="input-nc">
                </div>
                <button onclick="window.adicionarCampo('container-explicações', 'Nova Explicação')" style="background:var(--success); color:white; border:none; padding:5px 15px; border-radius:5px; margin-bottom:15px; cursor:pointer;">+ Dica</button>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:20px;">
                    <button onclick="window.saveNC()" style="background:var(--gold); color:white; border:none; padding:15px; border-radius:8px; font-weight:bold; cursor:pointer;">SALVAR</button>
                    <button onclick="document.getElementById('modal-nc-overlay').remove()" style="background:var(--border); border:none; padding:15px; border-radius:8px; cursor:pointer;">CANCELAR</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};
