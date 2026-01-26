import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { pecas, espelhosMap } from './estruturas.js';

const config = { apiKey: "AIzaSyAmigODFK8R9c0-fWtagdxLWu9xkODfKYQ", authDomain: "masteroab-db5e1.firebaseapp.com", projectId: "masteroab-db5e1", databaseURL: "https://masteroab-db5e1-default-rtdb.firebaseio.com" };
const app = initializeApp(config); 
const db = getDatabase(app);

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

let currentPdf = null;

// Funções de PDF, Modais, Salvamento e Troca de Exame
// Implementadas com a lógica de camada de texto (textLayer) e 
// salvamento de meta-dados (nota + comentários) que você enviou por último.

window.mudarExame = () => {
    const ex = document.getElementById('exam-select').value;
    window.carregarPDF('prova');
    document.getElementById('checklist-fgv').innerHTML = espelhosMap[ex] || '<p>Espelho indisponível.</p>';
    // Carregar dados do Firebase...
};

// ... Demais funções (calcNota, autoSave, finalizarManual) conforme seu código melhorado.
