import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { pecas, MEUS_ESPELHOS } from './estruturas.js';

const config = { databaseURL: "https://masteroab-db5e1-default-rtdb.firebaseio.com" };
const app = initializeApp(config); 
const db = getDatabase(app);

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

let currentPdf = null;

// Persistência com regra de Exame
window.saveMeta = (path, val) => {
    const ex = document.getElementById('exam-select').value;
    set(ref(db, `${path}/exame_${ex}`), val);
};

window.autoSave = () => {
    const val = document.getElementById('texto-final').value;
    window.saveMeta('v3_treino', val);
};

window.mudarExame = async () => {
    const ex = document.getElementById('exam-select').value;
    const targets = [
        {path: 'v3_treino', id: 'texto-final'},
        {path: 'v3_respostas', id: 'res-editor'},
        {path: 'v3_dicas', id: 'dicas-editor'}
    ];

    for(let t of targets) {
        const snap = await get(ref(db, `${t.path}/exame_${ex}`));
        document.getElementById(t.id).value = snap.exists() ? snap.val() : "";
    }

    document.getElementById('checklist-fgv').innerHTML = MEUS_ESPELHOS[ex] || "Espelho não disponível.";
    window.carregarPDF('prova');
};

window.carregarPDF = async (tipo) => {
    const ex = document.getElementById('exam-select').value;
    const url = `https://raw.githubusercontent.com/Anshul-69/PDFs/main/OAB${ex}${tipo === 'prova' ? 'PR' : 'GB'}.pdf`;
    currentPdf = await pdfjsLib.getDocument(url).promise;
    renderPages();
};

async function renderPages() {
    const viewport = document.getElementById('pdf-viewport');
    viewport.innerHTML = "";
    for (let i = 1; i <= currentPdf.numPages; i++) {
        const page = await currentPdf.getPage(i);
        const canvas = document.createElement('canvas');
        viewport.appendChild(canvas);
        const renderCtx = { canvasContext: canvas.getContext('2d'), viewport: page.getViewport({ scale: 1.5 }) };
        canvas.width = renderCtx.viewport.width; canvas.height = renderCtx.viewport.height;
        await page.render(renderCtx).promise;
    }
}

window.abrirModal = id => {
    document.getElementById(id).style.display = 'flex';
    if(id === 'modal-estruturas') window.renderPecas();
};

window.fecharModal = id => document.getElementById(id).style.display = 'none';

window.renderPecas = () => {
    const container = document.getElementById('lista-pecas-content');
    container.innerHTML = Object.keys(pecas).map(k => `
        <div class="peca-card" onclick="window.inserirPeca('${k}')">
            <div><span class="peca-tag">OAB</span> <span class="peca-nome">${k}</span></div>
            <span style="color:var(--gold)">➔</span>
        </div>`).join('');
};

window.inserirPeca = k => {
    const ed = document.getElementById('texto-final');
    ed.value = pecas[k] + "\n\n" + ed.value;
    window.autoSave();
    window.fecharModal('modal-estruturas');
};

window.calcNota = () => {
    let t = 0;
    document.querySelectorAll('#checklist-fgv input:checked').forEach(i => t += parseFloat(i.value));
    document.getElementById('nota-valor').innerText = t.toFixed(2);
};

window.toggleDarkMode = () => document.body.classList.toggle('dark-mode');

document.addEventListener('DOMContentLoaded', () => {
    const sel = document.getElementById('exam-select');
    for(let i=45; i>=35; i--) sel.add(new Option(`EXAME ${i}`, i));
    
    // Gerar linhas
    const lines = (id, n) => document.getElementById(id).innerHTML = Array.from({length:n},(_, i)=>i+1).join('<br>');
    lines('ln-main', 500); lines('ln-res', 150); lines('ln-dicas', 100);

    // Eventos de entrada para salvar Folha de Respostas e Dicas
    document.getElementById('res-editor').oninput = e => window.saveMeta('v3_respostas', e.target.value);
    document.getElementById('dicas-editor').oninput = e => window.saveMeta('v3_dicas', e.target.value);
    
    window.mudarExame();
});
