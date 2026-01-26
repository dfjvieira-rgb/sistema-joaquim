import { db, auth } from './firebase-config.js';
import { ref, set, onValue, push } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { PDFEngine } from './pdf-engine.js';
import { UI } from './ui-components.js';
import { NaoConfunda } from './nao-confunda.js';
import { ESTRUTURAS } from './estruturas.js';

const Maestro = {
    exameAtual: "44",

    init() {
        this.bindEvents();
        this.loadInitialData();
        console.log("🚀 Sistema Joaquim: Operacional (RO35-RO44)");
    },

    bindEvents() {
        // Troca de Exame
        document.getElementById('exam-select').addEventListener('change', (e) => {
            this.exameAtual = e.target.value;
            this.switchExame();
        });

        // Botão Salvar Rascunho (Firebase)
        document.getElementById('btn-salvar').onclick = () => this.salvarProgresso();

        // Botão Novo Post-it
        document.getElementById('btn-add-nc').onclick = () => UI.abrirModalNC(this.exameAtual);
        
        // Controle de PDF
        document.getElementById('prev-page').onclick = () => PDFEngine.changePage(-1);
        document.getElementById('next-page').onclick = () => PDFEngine.changePage(1);
    },

    async switchExame() {
        const path = `./pdfs/ro${this.exameAtual}.pdf`;
        try {
            const response = await fetch(path);
            const data = await response.arrayBuffer();
            await PDFEngine.init(data);
            
            // Carrega Post-its e Rascunhos específicos do exame
            this.loadInitialData();
            NaoConfunda.renderizar(this.exameAtual, 'container-postits');
            
            // Injeta Estrutura Sugerida se a folha estiver vazia
            this.sugerirEstrutura();
        } catch (e) {
            console.error("Erro ao carregar PDF do Exame:", e);
        }
    },

    loadInitialData() {
        const textoRef = ref(db, `v3_treino/exame_${this.exameAtual}`);
        onValue(textoRef, (snapshot) => {
            if (snapshot.exists()) {
                document.getElementById('texto-final').value = snapshot.val();
            }
        });
    },

    salvarProgresso() {
        const texto = document.getElementById('texto-final').value;
        set(ref(db, `v3_treino/exame_${this.exameAtual}`), texto)
            .then(() => alert("✅ Sincronizado com Firebase (Mobile/PC)"))
            .catch(err => alert("❌ Erro ao sincronizar: " + err.message));
    },

    sugerirEstrutura() {
        const area = document.getElementById('texto-final');
        if (area.value.length < 10) {
            const estrutura = ESTRUTURAS[this.exameAtual] || ESTRUTURAS["PADRAO"];
            area.value = estrutura.esqueleto;
        }
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => Maestro.init());

// Exportação para uso global nos botões do HTML
window.Maestro = Maestro;
