import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, onValue, push, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// --- CONFIGURAÇÃO ---
const config = {
    apiKey: "AIzaSyAmigODFK8R9c0-fWtagdxLWu9xkODfKYQ",
    authDomain: "masteroab-db5e1.firebaseapp.com",
    projectId: "masteroab-db5e1",
    databaseURL: "https://masteroab-db5e1-default-rtdb.firebaseio.com"
};
const app = initializeApp(config);
const db = getDatabase(app);

// --- ESTRUTURAS ---
const SALTO = "\n\n\n\n\n\n\n\n\n\n";
const pecas = {
    'Reclamação Trabalhista': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}RECLAMANTE, qualificação completa... propor RECLAMAÇÃO TRABALHISTA...`,
    'Contestação': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}Processo nº...\nRECLAMADA, já qualificada, vem apresentar CONTESTAÇÃO...`,
    'Recurso Ordinário': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}Processo nº...\nRECORRENTE, vem interpor RECURSO ORDINÁRIO...`
};

// --- CORE ENGINE ---
window.state = { exame: "44", modo: "escrita" };

window.abrirModal = (id) => {
    document.getElementById(id).style.display = 'flex';
    if(id === 'modal-mentoria') carregarMuseu();
};

window.fecharModal = (id) => document.getElementById(id).style.display = 'none';

window.updateLines = (idArea, idLines) => {
    const ta = document.getElementById(idArea);
    const ln = document.getElementById(idLines);
    const count = ta.value.split('\n').length;
    ln.innerHTML = Array.from({length: Math.max(count, 40)}, (_, i) => i + 1).join('<br>');
};

// --- FIREBASE OPS ---
window.autoSave = () => {
    const data = {
        texto: document.getElementById('texto-final').value,
        respostas: document.getElementById('res-editor').value,
        timestamp: new Date().toISOString()
    };
    set(ref(db, `v3_treino/exame_${window.state.exame}`), data);
    console.log("Sincronizado...");
};

async function carregarDadosExame() {
    const snap = await get(ref(db, `v3_treino/exame_${window.state.exame}`));
    if(snap.exists()){
        const d = snap.val();
        document.getElementById('texto-final').value = d.texto || "";
        document.getElementById('res-editor').value = d.respostas || "";
    } else {
        document.getElementById('texto-final').value = "";
        document.getElementById('res-editor').value = "";
    }
    window.updateLines('texto-final', 'ln-main');
}

// --- MUSEU / HISTÓRICO ---
function carregarMuseu() {
    onValue(ref(db, 'v3_treino'), (snap) => {
        const h = document.getElementById('mentoria-historico');
        h.innerHTML = "";
        const data = snap.val() || {};
        Object.keys(data).reverse().forEach(ex => {
            h.innerHTML += `
                <div class="hist-card">
                    <div style="display:flex; justify-content:space-between">
                        <strong>${ex.toUpperCase()}</strong>
                        <span class="nota-badge">SALVO</span>
                    </div>
                    <div style="font-size:12px; color:#94a3b8; margin-top:5px">
                        Última alteração: ${new Date(data[ex].timestamp).toLocaleString()}
                    </div>
                </div>`;
        });
    });
}

// --- PDF ---
window.carregarPDF = (tipo) => {
    const ex = window.state.exame;
    const urls = {
        'prova': `https://oab.fgv.br/exames/exame${ex}/prova_peca.pdf`,
        'gabarito': `https://oab.fgv.br/exames/exame${ex}/gabarito_peca.pdf`,
        'vade': `https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm`
    };
    const container = document.getElementById('pdf-viewport');
    container.innerHTML = `<iframe src="${urls[tipo]}"></iframe>`;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`tab-${tipo}`).classList.add('active');
};

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    const sel = document.getElementById('exam-select');
    [44, 41, 40, 37, 35].forEach(n => sel.add(new Option(`EXAME ${n}`, n)));
    
    sel.onchange = (e) => { window.state.exame = e.target.value; carregarDadosExame(); window.carregarPDF('prova'); };

    document.getElementById('texto-final').oninput = () => {
        window.updateLines('texto-final', 'ln-main');
        window.autoSave();
    };

    // Lista de Peças no Modal
    const lista = document.getElementById('lista-pecas-content');
    Object.keys(pecas).forEach(p => {
        const d = document.createElement('div');
        d.className = 'btn-tool'; d.style.marginBottom = "5px"; d.style.display="block";
        d.innerText = p;
        d.onclick = () => { document.getElementById('texto-final').value = pecas[p]; window.fecharModal('modal-estruturas'); window.updateLines('texto-final', 'ln-main'); };
        lista.appendChild(d);
    });

    carregarDadosExame();
    window.carregarPDF('prova');
});
