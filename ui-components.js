/**
 * ui-components.js - Central de Componentes Visuais Profissionais
 * Focado no design estratégico "Não Confunda" e Modais Dinâmicos.
 */

export const UI = {
    
    // 📌 COMPONENTE: POST-IT NÃO CONFUNDA (Renderiza o cartão na tela)
    criarPostItNC: (id, data, onDelete) => {
        const div = document.createElement('div');
        div.className = 'postit-container animated fadeIn';
        
        // Mapeia as teses com o ícone de balança (Corrigido para usar as variáveis do seu CSS)
        const tesesHtml = data.teses.map(t => `
            <div class="tese-item" style="display: flex; gap: 10px; margin-bottom: 8px;">
                <span class="icon-balanca">⚖️</span>
                <div class="item-text" style="font-weight: 600; color: var(--pen-blue); font-size: 0.85rem;">${t}</div>
            </div>
        `).join('');

        // Mapeia as explicações (Atenção: usando 'explicações' com acento como no seu banco)
        const explisHtml = data.explicações.map(e => `
            <div class="expli-item" style="display: flex; gap: 10px; margin-bottom: 8px; background: rgba(255,255,255,0.5); padding: 5px; border-radius: 4px;">
                <span class="icon-lampada">💡</span>
                <div class="item-text" style="font-style: italic; opacity: 0.9; font-size: 0.85rem;">${e}</div>
            </div>
        `).join('');

        div.innerHTML = `
            <div class="postit-pin"></div>
            <div class="postit-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span class="postit-badge" style="background: var(--gold); color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.6rem; font-weight: bold;">NÃO CONFUNDA</span>
                <button class="btn-delete" style="background:none; border:none; color: var(--wine); font-weight:bold; cursor:pointer; font-size: 1.2rem;">×</button>
            </div>
            <h4 class="postit-title" style="margin: 0 0 10px 0; color: var(--wine); border-bottom: 1px solid #eee; padding-bottom: 5px;">${data.titulo}</h4>
            
            <div class="postit-section" style="margin-bottom: 15px;">
                <p class="section-label" style="font-size: 0.65rem; font-weight: bold; color: #666; margin-bottom: 8px; letter-spacing: 1px;">TESES COMPARADAS</p>
                <div class="list-wrapper">${tesesHtml}</div>
            </div>
            
            <div class="postit-section">
                <p class="section-label" style="font-size: 0.65rem; font-weight: bold; color: var(--success); border-left: 2px solid var(--success); padding-left: 5px; margin-bottom: 8px;">FUNDAMENTAÇÃO / DICAS</p>
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

    // 📌 COMPONENTE: MODAL DE CRIAÇÃO (Abre o formulário flutuante)
    abrirModalNC: (exameAtual) => {
        // Verifica se já existe um modal aberto para não duplicar
        if(document.getElementById('modal-nc-overlay')) return;

        const modal = document.createElement('div');
        modal.id = 'modal-nc-overlay';
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; display:flex; align-items:center; justify-content:center; padding:20px; backdrop-filter: blur(4px);';
        
        modal.innerHTML = `
            <div style="background:var(--paper); width:100%; max-width:500px; border-radius:15px; padding:25px; border: 1px solid var(--gold); box-shadow: 0 20px 40px rgba(0,0,0,0.4); animation: slideUp 0.3s ease;">
                <h3 style="color:var(--gold); margin-top:0; display:flex; align-items:center; gap:10px;">
                    <span>⚖️</span> NOVO POST-IT - EXAME ${exameAtual}
                </h3>
                
                <label style="font-size:0.7rem; font-weight:bold; color:#888;">TÍTULO ESTRATÉGICO</label>
                <input type="text" id="nc-titulo" placeholder="Ex: Ilegitimidade vs Carência" class="input-nc" style="width:100%; margin-bottom:15px; padding:12px; border-radius:8px; border:1px solid var(--border);">

                <p class="section-label" style="font-size:0.7rem; font-weight:bold; color:var(--primary); margin-bottom:5px;">TESES (O que escrever na peça)</p>
                <div id="container-teses">
                    <input type="text" placeholder="Tese 1" class="input-nc" style="width:100%; margin-bottom:8px; padding:10px; border-radius:6px; border:1px solid var(--border);">
                </div>
                <button onclick="window.adicionarCampo('container-teses', 'Nova Tese')" style="background:none; color:var(--primary); border:1px dashed var(--primary); padding:5px 15px; border-radius:5px; margin-bottom:20px; cursor:pointer; font-size:0.8rem;">+ Adicionar Tese</button>

                <p class="section-label" style="font-size:0.7rem; font-weight:bold; color:var(--success); margin-bottom:5px;">DICAS / FUNDAMENTOS (Por que fazer isso)</p>
                <div id="container-explicações">
                    <input type="text" placeholder="Explicação 1" class="input-nc" style="width:100%; margin-bottom:8px; padding:10px; border-radius:6px; border:1px solid var(--border);">
                </div>
                <button onclick="window.adicionarCampo('container-explicações', 'Nova Explicação')" style="background:none; color:var(--success); border:1px dashed var(--success); padding:5px 15px; border-radius:5px; margin-bottom:20px; cursor:pointer; font-size:0.8rem;">+ Adicionar Dica</button>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-top:10px;">
                    <button onclick="window.saveNC()" style="background:var(--gold); color:white; border:none; padding:15px; border-radius:10px; font-weight:bold; cursor:pointer; transition:0.2s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">GUARDAR TESE</button>
                    <button onclick="document.getElementById('modal-nc-overlay').remove()" style="background:#eee; color:#666; border:none; padding:15px; border-radius:10px; cursor:pointer;">CANCELAR</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};
