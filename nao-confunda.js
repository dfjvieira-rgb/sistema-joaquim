import { ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { db } from './firebase-config.js';

export const NaoConfunda = {
    // Salvar novo Post-it
    salvar: (exame, titulo, texto) => {
        if (!titulo || !texto) {
            alert("Preencha todos os campos!");
            return;
        }
        return push(ref(db, `v7_nc/exame_${exame}`), { titulo, texto });
    },

    // Deletar Post-it
    deletar: (exame, id) => {
        if (confirm("Deseja excluir este post-it?")) {
            return remove(ref(db, `v7_nc/exame_${exame}/${id}`));
        }
    },

    // Renderizar a lista na tela
    renderizar: (exame, containerId) => {
        const container = document.getElementById(containerId);
        onValue(ref(db, `v7_nc/exame_${exame}`), (snapshot) => {
            container.innerHTML = "";
            if (snapshot.exists()) {
                Object.entries(snapshot.val()).forEach(([id, data]) => {
                    const postit = document.createElement('div');
                    postit.className = 'bloco-tese';
                    postit.innerHTML = `
                        <button class="btn-remover-tese" onclick="window.removerNC('${id}')">×</button>
                        <b style="color:var(--gold); display:block; margin-bottom:5px;">${data.titulo}</b>
                        <p style="font-size:0.85rem; line-height:1.4;">${data.texto}</p>
                    `;
                    container.appendChild(postit);
                });
            }
        });
    }
};

// Vincula ao window para o HTML enxergar
window.saveNC = () => {
    const ex = document.getElementById('exam-select').value;
    const tit = document.getElementById('nc-titulo').value;
    const txt = document.getElementById('nc-texto').value;
    NaoConfunda.salvar(ex, tit, txt).then(() => {
        document.getElementById('nc-titulo').value = "";
        document.getElementById('nc-texto').value = "";
    });
};

window.removerNC = (id) => {
    const ex = document.getElementById('exam-select').value;
    NaoConfunda.deletar(ex, id);
};
