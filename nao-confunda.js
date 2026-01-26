import { ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { db } from './firebase-config.js';

export const NaoConfunda = {
    // Renderiza a lista de post-its salvos
    renderizar: (exame, containerId) => {
        const container = document.getElementById(containerId);
        onValue(ref(db, `v7_nc/exame_${exame}`), (snapshot) => {
            container.innerHTML = "";
            if (snapshot.exists()) {
                Object.entries(snapshot.val()).forEach(([id, data]) => {
                    const postit = document.createElement('div');
                    postit.className = 'bloco-tese';
                    
                    // Monta as listas de teses e explicações salvas
                    const tesesHtml = data.teses.map(t => `<div class="item-comparado">⚖️ ${t}</div>`).join('');
                    const explisHtml = data.explicações.map(e => `<div class="item-comparado">💡 ${e}</div>`).join('');

                    postit.innerHTML = `
                        <button class="btn-remover-tese" onclick="window.removerNC('${id}')">×</button>
                        <b style="color:var(--gold); display:block; margin-bottom:10px; border-bottom:1px solid var(--border);">${data.titulo}</b>
                        <div style="margin-bottom:10px;">${tesesHtml}</div>
                        <div style="border-top: 1px dashed var(--border); padding-top:10px;">${explisHtml}</div>
                    `;
                    container.appendChild(postit);
                });
            }
        });
    }
};

// Funções de Interface
window.adicionarCampo = (containerId, placeholder) => {
    const container = document.getElementById(containerId);
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.className = 'input-nc dynamic-field';
    container.appendChild(input);
};

window.saveNC = () => {
    const ex = document.getElementById('exam-select').value;
    const titulo = document.getElementById('nc-titulo').value;
    
    // Coleta todos os campos de tese e explicação
    const teses = Array.from(document.querySelectorAll('#container-teses input')).map(i => i.value).filter(v => v);
    const explicações = Array.from(document.querySelectorAll('#container-explicações input')).map(i => i.value).filter(v => v);

    if (!titulo || teses.length === 0) return alert("Preencha o título e ao menos uma tese!");

    push(ref(db, `v7_nc/exame_${ex}`), {
        titulo,
        teses,
        explicações
    }).then(() => {
        // Reseta o formulário
        document.getElementById('nc-titulo').value = "";
        document.getElementById('container-teses').innerHTML = '<input type="text" placeholder="Tese Principal" class="input-nc">';
        document.getElementById('container-explicações').innerHTML = '<input type="text" placeholder="Explicação Principal" class="input-nc">';
    });
};

window.removerNC = (id) => {
    const ex = document.getElementById('exam-select').value;
    if(confirm("Excluir comparação?")) remove(ref(db, `v7_nc/exame_${ex}/${id}`));
};
