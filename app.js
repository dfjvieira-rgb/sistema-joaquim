// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { pecas, MEUS_ESPELHOS } from './estruturas.js';

const config = { 
    apiKey: "AIzaSyAmigODFK8R9c0-fWtagdxLWu9xkODfKYQ", 
    authDomain: "masteroab-db5e1.firebaseapp.com", 
    projectId: "masteroab-db5e1", 
    databaseURL: "https://masteroab-db5e1-default-rtdb.firebaseio.com" 
};
const app = initializeApp(config); 
const db = getDatabase(app);

// Inicia Workers do PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

let currentPdf = null;

// --- PERSISTÊNCIA AUTOMÁTICA ---
window.saveMeta = (path, value) => {
    const exame = document.getElementById('exam-select').value;
    set(ref(db, `${path}/exame_${exame}`), value);
};

// Funções de salvamento com "Debounce" (evita excesso de chamadas ao Firebase)
let timeoutPeca, timeoutRes, timeoutDicas;
window.autoSavePeca = (val) => { clearTimeout(timeoutPeca); timeoutPeca = setTimeout(() => window.saveMeta('v3_treino', val), 1000); };
window.autoSaveRes = (val) => { clearTimeout(timeoutRes); timeoutRes = setTimeout(() => window.saveMeta('v3_respostas', val), 1000); };
window.autoSaveDicas = (val) => { clearTimeout(timeoutDicas); timeoutDicas = setTimeout(() => window.saveMeta('v3_dicas', val), 1000); };

// --- CARREGAMENTO DE DADOS ---
window.mudarExame = async () => {
    const ex = document.getElementById('exam-select').value;
    
    // Limpar e Carregar Espelho
    const checklist = document.getElementById('checklist-fgv');
    checklist.innerHTML = MEUS_ESPELHOS[ex] || '<p style="padding:20px; color:gray;">Espelho não cadastrado para este exame.</p>';
    document.getElementById('nota-valor').innerText = "0.00";

    // Buscar do Firebase
    const nodes = {
        'v3_treino': 'texto-final',
        'v3_respostas': 'res-editor',
        'v3_dicas': 'dicas-editor'
    };

    for (const [path, id] of Object.entries(nodes)) {
        const snap = await get(ref(db, `${path}/exame_${ex}`));
        document.getElementById(id).value = snap.exists() ? snap.val() : "";
    }

    window.carregarPDF('prova');
};

// --- PDF ENGINE ---
window.carregarPDF = async (tipo) => {
    const ex = document.getElementById('exam-select').value;
    const v = document.getElementById('pdf-viewport');
    v.innerHTML = "<div style='color:white; padding:20px;'>Carregando PDF...</div>";
    
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`tab-${tipo}`).classList.add('active');

    const urls = {
        prova: `https://raw.githubusercontent.com/Anshul-69/PDFs/main/OAB${ex}PR.pdf`,
        gabarito: `https://raw.githubusercontent.com/Anshul-69/PDFs/main/OAB${ex}GB.pdf`,
        vade: `https://raw.githubusercontent.com/Anshul-69/PDFs/main/CLT.pdf`
    };

    try {
        currentPdf = await pdfjsLib.getDocument(urls[tipo]).promise;
        v.innerHTML = "";
        for (let i = 1; i <= currentPdf.numPages; i++) {
            const container = document.createElement('div');
            container.id = `page-${i}`;
            container.style.marginBottom = "15px";
            v.appendChild(container);
            renderPage(i, container);
        }
    } catch(e) {
        v.innerHTML = "<div style='color:red; padding:20px;'>Erro ao carregar o documento.</div>";
    }
};

async function renderPage(num, container) {
    const page = await currentPdf.getPage(num);
    const scale = window.innerWidth < 768 ? 1.2 : 1.8;
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.style.width = "100%";
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    container.appendChild(canvas);
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
}

// --- UTILITÁRIOS ---
window.abrirModal = id => document.getElementById(id).style.display = 'flex';
window.fecharModal = id => document.getElementById(id).style.display = 'none';

window.toggleDarkMode = () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

window.toggleEstruturas = () => {
    const m = document.getElementById('menu-estruturas');
    m.style.display = m.style.display === 'none' ? 'block' : 'none';
    m.innerHTML = Object.keys(pecas).map(k => `
        <div onclick="window.inserirPeca('${k}')" style="padding:15px; border-bottom:1px solid var(--border); cursor:pointer; font-size:14px;">
            📄 ${k}
        </div>
    `).join('');
};

window.inserirPeca = (k) => {
    const area = document.getElementById('texto-final');
    area.value = pecas[k] + "\n\n" + area.value;
    window.autoSavePeca(area.value);
    window.toggleEstruturas();
};

window.calcNota = () => {
    let t = 0;
    document.querySelectorAll('#checklist-fgv input:checked').forEach(i => t += parseFloat(i.value));
    document.getElementById('nota-valor').innerText = t.toFixed(2);
};

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    const sel = document.getElementById('exam-select');
    for(let i=45; i>=35; i--) sel.add(new Option(`EXAME ${i}`, i));
    
    // Gerar números de linha
    const genLines = (id, count) => {
        document.getElementById(id).innerHTML = Array.from({length: count}, (_, i) => i + 1).join('<br>');
    };
    genLines('ln-main', 500);
    genLines('ln-res', 150);
    genLines('ln-dicas', 100);

    // Eventos de input
    document.getElementById('texto-final').oninput = (e) => window.autoSavePeca(e.target.value);
    document.getElementById('res-editor').oninput = (e) => window.autoSaveRes(e.target.value);
    document.getElementById('dicas-editor').oninput = (e) => window.autoSaveDicas(e.target.value);

    window.mudarExame();
});
