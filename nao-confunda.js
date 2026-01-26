import { ref, push, onValue, remove, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { db } from './firebase-config.js';
import { UI } from './ui-components.js';

/**
 * MÓDULO: NÃO CONFUNDA
 * Gerencia a sincronização de Post-its dinâmicos com o Firebase.
 */
export const NaoConfunda = {
    // Renderiza a lista usando o componente do ui-components.js
    renderizar: (exame, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        onValue(ref(db, `v7_nc/exame_${exame}`), (snapshot) => {
            container.innerHTML = "";
            if (snapshot.exists()) {
                // Inverte a ordem para que o mais recente apareça primeiro
                const entries = Object.entries(snapshot.val()).reverse();
                
                entries.forEach(([id, data]) => {
                    const postit = UI.criarPostItNC(id, data, (idParaDeletar) => {
                        window.removerNC(idParaDeletar);
                    });
                    container.appendChild(postit);
                });
            } else {
                container.innerHTML = `
                    <div style="text-align:center; color:#64748b; padding:40px 20px; font-size:0.9rem; opacity:0.7;">
                        <p>💡 Nenhuma tese estratégica salva para o Exame ${exame}.</p>
                        <p style="font-size:0.75rem; margin-top:10px;">Toque no "+" para criar seu primeiro Post-it.</p>
                    </div>`;
            }
        });
    },

    salvar: (exame, titulo, teses, explicacoes) => {
        const novaRef = push(ref(db, `v7_nc/exame_${exame}`));
        return set(novaRef, {
            titulo,
            teses,
            explicacoes, // Note que corrigi para 'explicacoes' sem acento para evitar erros no banco
            data: new Date().getTime()
        });
    }
};

// --- FUNÇÕES DE INTERFACE (WINDOW) ---

/**
 * Adiciona novos campos de input dinamicamente no modal de criação
 */
window.adicionarCampo = (containerId, placeholder) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'input-nc'; // Classe profissional do seu estilos.css
    input.placeholder = placeholder;
    input.style.marginTop = "8px";
    input.style.animation = "fadeIn 0.3s ease";
    
    container.appendChild(input);
    input.focus();
};

/**
 * Coleta os dados dos inputs dinâmicos e envia para o Firebase
 */
window.saveNC = () => {
    const selectExame = document.getElementById('exam-select');
    if (!selectExame) return console.error("Elemento 'exam-select' não encontrado.");
    
    const ex = selectExame.value;
    const tituloInput = document.getElementById('nc-titulo');
    const titulo = tituloInput ? tituloInput.value.trim() : "";
    
    // Mapeia múltiplos inputs de teses e explicações
    const teses = Array.from(document.querySelectorAll('#container-teses input'))
                       .map(i => i.value.trim())
                       .filter(v => v !== "");
                       
    const explicacoes = Array.from(document.querySelectorAll('#container-explicações input'))
                            .map(i => i.value.trim())
                            .filter(v => v !== "");

    if (!titulo || teses.length === 0) {
        return alert("⚠️ Atenção: Preencha o título e pelo menos uma tese principal!");
    }

    NaoConfunda.salvar(ex, titulo, teses, explicacoes).then(() => {
        console.log("✅ Post-it salvo na v7_nc");
        
        // Limpa o formulário após salvar
        if (tituloInput) tituloInput.value = "";
        const cTeses = document.getElementById('container-teses');
        const cExpl = document.getElementById('container-explicações');
        
        if (cTeses) cTeses.innerHTML = '<input type="text" placeholder="Tese Principal" class="input-nc">';
        if (cExpl) cExpl.innerHTML = '<input type="text" placeholder="Explicação Principal" class="input-nc">';
        
        // Fecha o modal de criação (ajustado para o seu ID de overlay)
        const modal = document.getElementById('modal-nc-overlay');
        if (modal) modal.remove();
        
        // Feedback visual
        const feedback = document.createElement('div');
        feedback.className = 'toast-sucesso';
        feedback.innerText = "Post-it Adicionado!";
        document.body.appendChild(feedback);
        setTimeout(() => feedback.remove(), 2000);
    }).catch(err => {
        alert("Erro ao salvar: " + err.message);
    });
};

/**
 * Remove o post-it do Firebase após confirmação
 */
window.removerNC = (id) => {
    const ex = document.getElementById('exam-select').value;
    if (confirm("Deseja excluir permanentemente este Post-it estratégico?")) {
        remove(ref(db, `v7_nc/exame_${ex}/${id}`))
            .then(() => console.log("🗑️ Post-it removido."))
            .catch(err => console.error("Erro ao remover:", err));
    }
};
