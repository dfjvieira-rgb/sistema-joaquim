import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { pecas, MEUS_ESPELHOS } from './estruturas.js';

// Configuração do Firebase
const config = { databaseURL: "https://masteroab-db5e1-default-rtdb.firebaseio.com" };
const app = initializeApp(config); 
const db = getDatabase(app);

// Configuração PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

let currentPdf = null;

// Função Universal de Salvamento
window.saveMeta = (path, val) => {
    const ex = document.getElementById('exam-select').value;
    set(ref(db, `${path}/exame_${ex}`), val);
};

// Atalho para salvamento da peça principal
window.autoSave = () => window.saveMeta('v3_treino', document.getElementById('texto-final').value);

// Troca de Exame e Carregamento de Dados
window.mudarExame = async () => {
    const ex = document.getElementById('exam-select').value;
    const items = [
        {path: 'v3_treino', id: 'texto-final'},
        {path: 'v3_respostas', id: 'res-editor'},
        {path: 'v3_dicas', id: 'dicas-editor'},
        {path: 'v3_mentoria', id: 'mentoria-editor'}
    ];

    for(let item of items) {
        const snap = await get(ref(db, `${item.path}/exame_${ex}`));
        document.getElementById(item.id).value = snap.exists() ? snap.val() : "";
    }

    // Atualiza o checklist do espelho
    document.getElementById('checklist-fgv').innerHTML = MEUS_ESPELHOS[ex] || "Espelho não disponível para este exame.";
    window.calcNota(); // Zera ou recalcula a nota
    window.carregarPDF('prova');
};

// Visualizador de PDF
window.carregarPDF = async (tipo) => {
    const ex = document.getElementById('exam-select').value;
    const url = `https://raw.githubusercontent.com/Anshul-69/PDFs/main/OAB${ex}${tipo === 'prova' ? 'PR' : 'GB'}.pdf`;
    
    try {
        currentPdf = await pdfjsLib.getDocument(url).promise;
        const viewport = document.getElementById('pdf-viewport');
        viewport.innerHTML = "";
        
        for (let i = 1; i <= currentPdf.numPages; i++) {
            const page = await currentPdf.getPage(i);
            const canvas = document.createElement('canvas');
            viewport.appendChild(canvas);
            const renderCtx = { 
                canvasContext: canvas.getContext('2d'), 
                viewport: page.getViewport({ scale: 1.2 }) 
            };
            canvas.width = renderCtx.viewport.width; 
            canvas.height = renderCtx.viewport.height;
            await page.render(render
