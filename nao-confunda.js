import { ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { db } from './firebase-config.js';
import { UI } from './ui-components.js';

/**
 * MÓDULO: NÃO CONFUNDA
 * Gerencia a sincronização de Post-its com o Firebase e interface.
 */
export const NaoConfunda = {
    // Renderiza a lista usando o componente do ui-components.js
    renderizar: (exame, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        onValue(ref(db, `v7_nc/exame_${exame}`), (snapshot) => {
            container.innerHTML = "";
            if (snapshot.exists()) {
                Object.entries(snapshot.val()).forEach(([id, data]) => {
                    const postit = UI.criarPostItNC(id, data, (idParaDeletar) => {
                        window.removerNC(idParaDeletar);
                    });
                    container.appendChild(postit);
                });
            } else {
                container.innerHTML = `<p style="text-align:center; color:#64748b; padding:20px; font-size:0.8rem;">Toque no "+" para adicionar sua primeira comparação.</p>`;
            }
        });
    },

    salvar: (exame, titulo, teses, explicações) => {
        return push(ref(db, `v7_nc/exame_${exame}`), {
            titulo,
            teses,
            explicações,
            data: new Date().getTime()
        });
    }
};

// --- FUNÇÕES DE INTERFACE (WINDOW) PARA ACESSO DIRETO NO HTML ---

/**
 * Adiciona novos campos de input dinamicamente no modal
 */
window.adicionarCampo = (containerId, placeholder) => {
    const container = document.getElementById(containerId);
    const input = document.createElement('input');
    
    // Usando a classe profissional definida no seu estilos.css
    input.className = 'input-nc'; 
    input.placeholder = placeholder;
    
    container.appendChild(input);
    input.focus();
};

/**
 * Coleta os dados dos inputs e envia para o Firebase
 */
window.saveNC = () => {
    // Busca o exame selecionado no select principal do App
    const selectExame = document.getElementById('exam-select');
    if (!selectExame) return console.error("Elemento 'exam-select' não encontrado.");
    
    const ex = selectExame.value;
    const titulo = document.getElementById('nc-titulo').value;
    
    // Mapeia múltiplos inputs de teses e explicações
    const teses = Array.from(document.querySelectorAll('#container-teses input')).map(i => i.value).filter(v => v);
    const explicações = Array.from(document.querySelectorAll('#container-explicações input')).map(i => i.value).filter(v => v);

    if (!titulo || teses.length === 0) return alert("Preencha o título e ao menos uma tese!");

    NaoConfunda.salvar(ex, titulo, teses, explicações).then(() => {
        // Limpa o formulário após salvar
        document.getElementById('nc-titulo').value = "";
        document.getElementById('container-teses').innerHTML = '<input type="text" placeholder="Tese Principal" class="input-nc">';
        document.getElementById('container-explicações').innerHTML = '<input type="text" placeholder="Explicação Principal" class="input-nc">';
        
        // Se houver um modal aberto, ele pode ser fechado aqui
        const modal = document.getElementById('modal-nc-overlay');
        if (modal) modal.remove();
    });
};

/**
 * Remove o post-it do Firebase após confirmação
 */
window.removerNC = (id) => {
    const ex = document.getElementById('exam-select').value;
    if (confirm("Excluir este post-it permanentemente?")) {
        remove(ref(db, `v7_nc/exame_${ex}/${id}`));
    }
};
