import { ref, push, onValue, remove, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { db } from './firebase-config.js';

/**
 * CONFIGURAÇÃO VISUAL (CSS INJETADO)
 * Garante o ar profissional sem precisar mexer no seu arquivo .css
 */
const estilosNC = `
    .card-nc-profissional { background: #fff; border-radius: 10px; padding: 15px; margin-bottom: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; animation: fadeIn 0.4s ease; }
    .nc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .nc-badge { background: #fee2e2; color: #ef4444; font-size: 0.6rem; font-weight: bold; padding: 2px 8px; border-radius: 12px; text-transform: uppercase; }
    .nc-del-btn { background: none; border: none; color: #cbd5e1; cursor: pointer; transition: 0.3s; padding: 5px; }
    .nc-del-btn:hover { color: #ef4444; }
    .nc-titulo-card { font-size: 1rem; color: #1e293b; margin-bottom: 12px; font-weight: 700; line-height: 1.3; }
    .nc-secao { margin-bottom: 8px; }
    .nc-collapse-btn { 
        width: 100%; text-align: left; background: #f8fafc; border: none; border-left: 4px solid #3498db; 
        padding: 10px; font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; 
        justify-content: space-between; border-radius: 0 4px 4px 0; color: #475569;
    }
    .nc-collapse-btn:hover { background: #f1f5f9; }
    .nc-content-box { display: none; padding: 12px; font-size: 0.85rem; color: #475569; background: #fff; border: 1px solid #f1f5f9; border-top: none; }
    .nc-content-box.show { display: block; }
    .nc-content-box ul { padding-left: 18px; list-style-type: disc; }
    .nc-content-box li { margin-bottom: 5px; }
    .color-expl { border-left-color: #f39c12 !important; }
    .input-nc { width: 100%; padding: 10px; margin-top: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.85rem; }
    .toast-sucesso { position: fixed; bottom: 20px; right: 20px; background: #27ae60; color: white; padding: 12px 25px; border-radius: 5px; z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = estilosNC;
document.head.appendChild(styleSheet);

/**
 * MÓDULO: NÃO CONFUNDA
 */
export const NaoConfunda = {
    renderizar: (exame, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        onValue(ref(db, `v7_nc/exame_${exame}`), (snapshot) => {
            container.innerHTML = "";
            if (snapshot.exists()) {
                const entries = Object.entries(snapshot.val()).reverse();
                entries.forEach(([id, data]) => {
                    const card = document.createElement('div');
                    card.className = 'card-nc-profissional';
                    card.innerHTML = `
                        <div class="nc-header">
                            <span class="nc-badge">Tese Estratégica</span>
                            <button onclick="window.removerNC('${id}')" class="nc-del-btn"><i class="fas fa-trash"></i></button>
                        </div>
                        <h3 class="nc-titulo-card">${data.titulo}</h3>
                        
                        <div class="nc-secao">
                            <button class="nc-collapse-btn" onclick="this.nextElementSibling.classList.toggle('show')">
                                <span><i class="fas fa-gavel"></i> FUNDAMENTAÇÃO (TESES)</span> <i class="fas fa-plus"></i>
                            </button>
                            <div class="nc-content-box">
                                <ul>${(data.teses || []).map(t => `<li>${t}</li>`).join('')}</ul>
                            </div>
                        </div>

                        <div class="nc-secao">
                            <button class="nc-collapse-btn color-expl" onclick="this.nextElementSibling.classList.toggle('show')">
                                <span><i class="fas fa-lightbulb"></i> EXPLICAÇÃO (DICA)</span> <i class="fas fa-plus"></i>
                            </button>
                            <div class="nc-content-box show">
                                <ul>${(data.explicacoes || []).map(e => `<li>${e}</li>`).join('')}</ul>
                            </div>
                        </div>
                    `;
                    container.appendChild(card);
                });
            } else {
                container.innerHTML = `<div style="text-align:center; color:#64748b; padding:40px 20px; font-size:0.85rem;">
                    <p>💡 Nenhuma tese salva para o Exame ${exame}.</p>
                </div>`;
            }
        });
    },

    salvar: (exame, titulo, teses, explicacoes) => {
        const novaRef = push(ref(db, `v7_nc/exame_${exame}`));
        return set(novaRef, {
            titulo,
            teses,
            explicacoes,
            data: new Date().getTime()
        });
    }
};

// --- FUNÇÕES GLOBAIS (WINDOW) ---

window.adicionarCampo = (containerId, placeholder) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'input-nc';
    input.placeholder = placeholder;
    container.appendChild(input);
    input.focus();
};

window.saveNC = () => {
    const ex = document.getElementById('exam-select')?.value || "Geral";
    const tituloInput = document.getElementById('nc-titulo');
    const titulo = tituloInput ? tituloInput.value.trim() : "";
    
    const getValues = (selector) => Array.from(document.querySelectorAll(selector))
                                        .map(i => i.value.trim())
                                        .filter(v => v !== "");

    const teses = getValues('#container-teses input');
    const explicacoes = getValues('#container-explicações input');

    if (!titulo || teses.length === 0) {
        return alert("⚠️ Preencha o título e pelo menos uma tese!");
    }

    NaoConfunda.salvar(ex, titulo, teses, explicacoes).then(() => {
        // Limpeza
        if (tituloInput) tituloInput.value = "";
        document.getElementById('container-teses').innerHTML = '<input type="text" placeholder="Tese Principal (Artigo/Súmula)" class="input-nc">';
        document.getElementById('container-explicações').innerHTML = '<input type="text" placeholder="Dica de Ouro" class="input-nc">';
        
        const modal = document.getElementById('modal-nc-overlay');
        if (modal) modal.style.display = 'none';

        // Feedback
        const feedback = document.createElement('div');
        feedback.className = 'toast-sucesso';
        feedback.innerText = "✅ Tese Salva com Sucesso!";
        document.body.appendChild(feedback);
        setTimeout(() => feedback.remove(), 2500);
    });
};

window.removerNC = (id) => {
    const ex = document.getElementById('exam-select').value;
    if (confirm("Deseja excluir esta tese estratégica?")) {
        remove(ref(db, `v7_nc/exame_${ex}/${id}`));
    }
};
