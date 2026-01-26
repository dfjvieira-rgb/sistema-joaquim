import { ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { db } from './firebase-config.js';
import { UI } from './ui-components.js';

export const NaoConfunda = {
    // Renderiza a lista usando o componente do ui-components.js
    renderizar: (exame, containerId) => {
        const container = document.getElementById(containerId);
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

// --- FUNÇÕES DE INTERFACE (WINDOW) ---

window.adicionarCampo = (containerId, placeholder) => {
    const container = document.getElementById(containerId);
    const input = document.createElement('input');
    input.className = 'input-nc';
    input.placeholder = placeholder;
    input.style.width = "100%";
    input.style.marginBottom = "8px";
    input.style.padding = "12px";
    input.style.borderRadius = "8px";
    input.style.border = "1px solid var(--border)";
    input.style.background = "var(--bg-site)";
    input.style.color = "var(--text)";
    container.appendChild(input);
    input.focus();
};

window.saveNC = () => {
    const ex = document.getElementById('exam-select').value;
    const titulo = document.getElementById('nc-titulo').value;
    const teses = Array.from(document.querySelectorAll('#container-teses input')).map(i => i.value).filter(v => v);
    const explicações = Array.from(document.querySelectorAll('#container-explicações input')).map(i => i.value).filter(v => v);

    if (!titulo || teses.length === 0) return alert("Preencha o título e ao menos uma tese!");

    NaoConfunda.salvar(ex, titulo, teses, explicações).then(() => {
        document.getElementById('nc-titulo').value = "";
        document.getElementById('container-teses').innerHTML = '<input type="text" placeholder="Tese Principal" class="input-nc" style="width:100%; margin-bottom:8px; padding:12px; border-radius:8px; border:1px solid var(--border); background:var(--bg-site); color:var(--text);">';
        document.getElementById('container-explicações').innerHTML = '<input type="text" placeholder="Explicação Principal" class="input-nc" style="width:100%; margin-bottom:8px; padding:12px; border-radius:8px; border:1px solid var(--border); background:var(--bg-site); color:var(--text);">';
    });
};

window.removerNC = (id) => {
    const ex = document.getElementById('exam-select').value;
    if (confirm("Excluir este post-it permanentemente?")) {
        remove(ref(db, `v7_nc/exame_${ex}/${id}`));
    }
};
