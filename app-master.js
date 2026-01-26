import { Maestro } from './app-master.js'; // Caso queira auto-referência ou export
import { PDFEngine } from './pdf-engine.js';
import { UI } from './ui-components.js';
import { NaoConfunda } from './nao-confunda.js';
import { ESTRUTURAS } from './estruturas.js';
import { db } from './firebase-config.js';
import { ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const App = {
    exame: "44",

    async init() {
        this.bindEvents();
        await this.carregarExame();
        NaoConfunda.renderizar(this.exame, 'container-postits');
        this.sincronizarFirebase();
    },

    bindEvents() {
        // Troca de exame no select
        document.getElementById('exam-select').addEventListener('change', async (e) => {
            this.exame = e.target.value;
            await this.carregarExame();
            NaoConfunda.renderizar(this.exame, 'container-postits');
            this.sincronizarFirebase();
        });

        // Botão Salvar
        document.getElementById('btn-salvar').onclick = () => this.salvarManual();

        // Botão Post-it
        document.getElementById('btn-add-nc').onclick = () => UI.abrirModalNC(this.exame);

        // PDF Nav
        document.getElementById('prev-page').onclick = () => PDFEngine.changePage(-1);
        document.getElementById('next-page').onclick = () => PDFEngine.changePage(1);
    },

    async carregarExame() {
        // Mapeamento exato conforme seus nomes de arquivos
        const url = `./pdfs/ro${this.exame}.pdf`;
        try {
            const resp = await fetch(url);
            if (!resp.ok) throw new Error("Arquivo PDF não encontrado");
            const buffer = await resp.arrayBuffer();
            await PDFEngine.init(buffer);
            
            // Se a folha estiver vazia, injeta o esqueleto da Aryanna
            const area = document.getElementById('texto-final');
            if (area.value.length < 5) {
                area.value = ESTRUTURAS[this.exame]?.esqueleto || "EXCELENTÍSSIMO SENHOR DOUTOR JUIZ...";
            }
        } catch (err) {
            console.error("Erro ao carregar exame:", err);
            alert("Erro ao carregar o PDF: " + url);
        }
    },

    sincronizarFirebase() {
        const r = ref(db, `v3_treino/exame_${this.exame}`);
        onValue(r, (snap) => {
            if (snap.exists()) {
                document.getElementById('texto-final').value = snap.val();
            }
        });
    },

    salvarManual() {
        const txt = document.getElementById('texto-final').value;
        set(ref(db, `v3_treino/exame_${this.exame}`), txt)
            .then(() => alert("Sincronizado!"))
            .catch(e => console.error(e));
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
