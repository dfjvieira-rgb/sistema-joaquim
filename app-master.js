// app-master.js - O Maestro do Sistema
import { db } from './firebase-config.js';
import { NaoConfunda } from './nao-confunda.js';
import { PDFEngine } from './pdf-engine.js';
import { DATA_MASTER } from './estruturas.js';
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export const App = {
    init() {
        this.conectarBotoes();
        this.renderMenuEstruturas();
        this.mudarExame();
        console.log("🚀 Sistema Aryanna Master: Conexões restauradas.");
    },

    conectarBotoes() {
        // Vincula as funções ao objeto global window para o HTML enxergar
        window.irParaMentoria = () => window.location.href = 'mentoria.html';
        
        window.abrirModal = (id) => {
            const m = document.getElementById(id);
            if(m) {
                m.style.display = 'flex';
                if(id === 'modal-nc') NaoConfunda.renderizar(this.getExame(), 'lista-nc-dinamica');
            }
        };

        window.fecharModal = (id) => {
            const m = document.getElementById(id);
            if(m) m.style.display = 'none';
        };

        window.toggleEstruturas = () => {
            const m = document.getElementById('menu-estruturas');
            m.style.display = m.style.display === 'block' ? 'none' : 'block';
        };

        window.limparFolha = () => {
            if(confirm("Deseja apagar todo o texto da peça?")) {
                document.getElementById('texto-final').value = "";
                this.autoSave();
            }
        };

        window.toggleDarkMode = () => document.body.classList.toggle('dark-mode');

        window.saveMeta = (path, val) => this.saveMeta(path, val);
        window.autoSave = () => this.autoSave();
        window.mudarExame = () => this.mudarExame();

        // PDF
        window.changePage = (off) => PDFEngine.changePage(off);
        window.loadDoc = (tipo) => this.carregarDocumentoPDF(tipo);
    },

    getExame() { return document.getElementById('exam-select').value; },

    async carregarDocumentoPDF(tipo) {
        const ex = this.getExame();
        const arq = tipo === 'prova' ? `ro${ex}.pdf` : `vade.pdf`;
        
        // Estilo das abas
        document.querySelectorAll('.tab-btn').forEach(b => b.style.opacity = '0.5');
        const ativa = document.getElementById(`tab-${tipo}`);
        if(ativa) ativa.style.opacity = '1';

        try {
            const resp = await fetch(arq);
            const buffer = await resp.arrayBuffer();
            PDFEngine.init(buffer);
        } catch (e) { console.error("Erro ao carregar PDF:", arq); }
    },

    async mudarExame() {
        const ex = this.getExame();
        this.carregarDocumentoPDF('prova');

        // Sincronização de Textos (Peça, Questões, Dicas)
        const mapeamento = [
            { path: `v3_treino/exame_${ex}`, id: 'texto-final' },
            { path: `v3_respostas/exame_${ex}`, id: 'res-editor' },
            { path: `v3_dicas/exame_${ex}`, id: 'dicas-editor' }
        ];

        mapeamento.forEach(m => {
            get(ref(db, m.path)).then(s => {
                const el = document.getElementById(m.id);
                if(el) el.value = s.val() || "";
            });
        });

        // Gabarito/Espelho
        const esp = document.getElementById('checklist-fgv');
        if(esp) esp.innerHTML = DATA_MASTER.espelhos[ex] || "Aguardando gabarito oficial.";
    },

    saveMeta(path, val) {
        set(ref(db, `${path}/exame_${this.getExame()}`), val);
    },

    autoSave() {
        clearTimeout(this.sv);
        this.sv = setTimeout(() => {
            this.saveMeta('v3_treino', document.getElementById('texto-final').value);
        }, 1000);
    },

    renderMenuEstruturas
