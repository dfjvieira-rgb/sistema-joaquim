// sistema-joaquim/app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { pecas, MEUS_ESPELHOS, SALTO } from './estruturas.js';

// 1. CONFIGURAÇÃO E INICIALIZAÇÃO
const firebaseConfig = {
    apiKey: "AIzaSyAmigODFK8R9c0-fWtagdxLWu9xkODfKYQ",
    authDomain: "masteroab-db5e1.firebaseapp.com",
    projectId: "masteroab-db5e1",
    databaseURL: "https://masteroab-db5e1-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

let currentPdf = null;
const exams = ["44", "41", "40", "37", "35"];

// 2. CONTROLE DE INTERFACE (MODAIS E TELA)
window.abrirModal = (id) => {
    document.getElementById(id).style.display = 'flex';
    if(id === 'modal-espelho') window.calcNota();
};

window.fecharModal = (id) => document.getElementById(id).style.display = 'none';

window.toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
};

window.toggleMobileView = () => {
    document.getElementById('section-pdf').classList.toggle('active-mobile');
};

// 3. INTELIGÊNCIA JURÍDICA (PEÇAS E NOTAS)
window.toggleEstruturas = () => {
    const menu = document.getElementById('menu-estruturas');
    if (menu.innerHTML === "") {
        menu.innerHTML = Object.keys(pecas).map(p => 
            `<button class="btn-peca" onclick="window.inserirPeca('${p}')">${p}</button>`
        ).join('');
    }
    menu.style.display = menu.style.display === 'grid' ? 'none' : 'grid';
};

window.inserirPeca = (id) => {
    const txt = document.getElementById('texto-final');
    txt.value = pecas[id];
    window.toggleEstruturas();
    window.autoSave();
};

window.calcNota = () => {
    const checks = document.querySelectorAll('#checklist-fgv input[type="checkbox"]');
    let total = 0;
    checks.forEach(c => { if(c.checked) total += parseFloat(c.value); });
    const display = document.getElementById('nota-total');
    if(display) display.innerText = total.toFixed(2);
};

// 4. MOTOR DE PDF (COM CAMADA DE TEXTO)
window.carregarPDF = async (tipo) => {
    const ex = document.getElementById('exam-select').value;
    const container = document.getElementById('pdf-viewport');
    container.innerHTML = '<div class="loading">Carregando PDF...</div>';
    
    // Atualiza Abas
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`tab-${tipo}`).classList.add('active');

    const urls = {
        prova: `https://raw.githubusercontent.com/Anshul-69/PDFs/main/OAB${ex}PR.pdf`,
        gabarito: `https://raw.githubusercontent.com/Anshul-69/PDFs/main/OAB${ex}GB.pdf`,
        vade: `https://raw.githubusercontent.com/Anshul-69/PDFs/main/CLT.pdf`
    };

    try {
        const loadingTask = pdfjsLib.getDocument(urls[tipo]);
        const pdf = await loadingTask.promise;
        container.innerHTML = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1.5 });
            
            const pageDiv = document.createElement('div');
            pageDiv.className = 'page-container';
            pageDiv.style.width = viewport.width + 'px';
            pageDiv.style.height = viewport.height + 'px';

            const canvas = document.createElement('canvas');
            pageDiv.appendChild(canvas);
            container.appendChild(pageDiv);

            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport }).promise;

            // Camada de Texto para Seleção/Busca
            const textContent = await page.getTextContent();
            const textLayer = document.createElement('div');
            textLayer.className = 'textLayer';
            pageDiv.appendChild(textLayer);
            pdfjsLib.renderTextLayer({ textContent, container: textLayer, viewport });
        }
    } catch (e) { container.innerHTML = '<div class="error">Erro ao carregar documento.</div>'; }
};

// 5. PERSISTÊNCIA (FIREBASE)
window.autoSave = () => {
    const ex = document.getElementById('exam-select').value;
    const data = {
        texto: document.getElementById('texto-final').value,
        timestamp: new Date().getTime()
    };
    set(ref(db, `estudos/${ex}/rascunho`), data);
};

window.finalizarManual = () => {
    const ex = document.getElementById('exam-select').value;
    const nota = document.getElementById('nota-total').innerText;
    const pps = document.getElementById('postits-save').value;
    
    set(ref(db, `finalizados/${ex}`), {
        texto: document.getElementById('texto-final').value,
        nota: nota,
        postits: pps,
        data: new Date().toLocaleDateString()
    }).then(() => alert("✅ Estudo salvo com sucesso!"));
};

// 6. INICIALIZAÇÃO DO SISTEMA
document.addEventListener('DOMContentLoaded', () => {
    const sel = document.getElementById('exam-select');
    exams.forEach(ex => sel.add(new Option(`Exame ${ex}`, ex)));
    
    // Recupera tema
    if(localStorage.getItem('theme') === 'light') document.body.classList.remove('dark-mode');

    // Carrega o espelho inicial
    document.getElementById('checklist-fgv').innerHTML = MEUS_ESPELHOS["
