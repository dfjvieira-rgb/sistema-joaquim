// app-master.js - Maestro com PDF Linkado
import { db } from './firebase-config.js';
import { NaoConfunda } from './nao-confunda.js';
import { PDFEngine } from './pdf-engine.js';
import { DATA_MASTER } from './estruturas.js';
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export const App = {
    init() {
        this.vincularInterface();
        this.renderMenuEstruturas();
        this.mudarExame();
    },

    vincularInterface() {
        window.irParaMentoria = () => window.location.href = 'mentoria.html';
        window.abrirModal = (id) => {
            document.getElementById(id).style.display = 'flex';
            if(id === 'modal-nc') NaoConfunda.renderizar(this.getExame(), 'lista-nc-dinamica');
        };
        window.fecharModal = (id) => document.getElementById(id).style.display = 'none';
        window.toggleEstruturas = () => {
            const m = document.getElementById('menu-estruturas');
            m.style.display = m.style.display === 'block' ? 'none' : 'block';
        };
        window.limparFolha = () => { if(confirm("Apagar peça?")) document.getElementById('texto-final').value = ""; };
        window.toggleDarkMode = () => document.body.classList.toggle('dark-mode');
        
        // PDF BRIDGES (Corrigido)
        window.loadDoc = (tipo) => this.carregarPDF(tipo);
        window.changePage = (off) => PDFEngine.changePage(off);
        
        window.saveMeta = (path, val) => this.saveMeta(path, val);
        window.autoSave = () => this.autoSave();
        window.mudarExame = () => this.mudarExame();
    },

    getExame() { return document.getElementById('exam-select').value; },

    async carregarPDF(tipo) {
        const ex = this.getExame();
        const nomeArquivo = tipo === 'prova' ? `ro${ex}.pdf` : `vade.pdf`;
        
        // Feedback visual nos botões
        document.getElementById('tab-prova').style.background = tipo === 'prova' ? 'var(--primary)' : 'transparent';
        document.getElementById('tab-vade').style.background = tipo === 'vade' ? 'var(--primary)' : 'transparent';

        try {
            const response = await fetch(nomeArquivo);
            if (!response.ok) throw new Error("Arquivo não encontrado");
            const buffer = await response.arrayBuffer();
            PDFEngine.init(buffer);
        } catch (err) {
            alert("Erro: O PDF " + nomeArquivo + " não foi encontrado na pasta.");
        }
    },

    async mudarExame() {
        const ex = this.getExame();
        this.carregarPDF('prova'); // Carrega a prova do exame selecionado

        // Sincroniza Firebase
        const campos = [
            { path: `v3_treino/exame_${ex}`, id: 'texto-final' },
            { path: `v3_respostas/exame_${ex}`, id: 'res-editor' },
            { path: `v3_dicas/exame_${ex}`, id: 'dicas-editor' }
        ];

        campos.forEach(c => {
            get(ref(db, c.path)).then(s => {
                const el = document.getElementById(c.id);
                if (el) el.value = s.val() || "";
            });
        });

        const esp = document.getElementById('checklist-fgv');
        if (esp) esp.innerHTML = DATA_MASTER.espelhos[ex] || "Pendente.";
    },

    saveMeta(path, val) {
        set(ref(db, `${path}/exame_${this.getExame()}`), val);
    },

    autoSave() {
        clearTimeout(this.sv);
        this.sv = setTimeout(() => this.saveMeta('v3_treino', document.getElementById('texto-final').value), 1000);
    }
};

App.init();
