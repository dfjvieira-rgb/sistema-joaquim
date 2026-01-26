// app-master.js - O Maestro do Sistema
import { db } from './firebase-config.js';
import { NaoConfunda } from './nao-confunda.js';
import { PDFEngine } from './pdf-engine.js';
import { DATA_MASTER } from './estruturas.js';
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export const App = {
    init() {
        this.configurarGlobal();
        this.renderMenuEstruturas();
        this.mudarExame();
        console.log("🚀 Sistema Aryanna Master Blindado e Pronto.");
    },

    // Centraliza todas as funções que o HTML chama via onclick/oninput
    configurarGlobal() {
        window.abrirModal = (id) => {
            document.getElementById(id).style.display = 'flex';
            if(id === 'modal-nc') NaoConfunda.renderizar(this.getExame(), 'lista-nc-dinamica');
        };
        window.fecharModal = (id) => document.getElementById(id).style.display = 'none';
        window.toggleDarkMode = () => document.body.classList.toggle('dark-mode');
        window.toggleEstruturas = () => {
            const m = document.getElementById('menu-estruturas');
            m.style.display = m.style.display === 'block' ? 'none' : 'block';
        };
        window.limparFolha = () => { if(confirm("Deseja apagar todo o texto da peça?")) document.getElementById('texto-final').value = ""; };
        
        // Funções de PDF
        window.loadDoc = (tipo) => this.carregarDocumentoPDF(tipo);
        window.changePage = (off) => PDFEngine.changePage(off);
        
        // Funções de Sync
        window.autoSave = () => this.autoSave();
        window.saveMeta = (path, val) => this.saveMeta(path, val);
        window.mudarExame = () => this.mudarExame();
    },

    getExame() {
        return document.getElementById('exam-select').value;
    },

    async carregarDocumentoPDF(tipo) {
        const ex = this.getExame();
        const arq = tipo === 'prova' ? `ro${ex}.pdf` : `vade.pdf`;
        
        // Atualiza UI das abas
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        const tabAtiva = document.getElementById(`tab-${tipo}`);
        if(tabAtiva) tabAtiva.classList.add('active');

        try {
            const resp = await fetch(arq);
            const buffer = await resp.arrayBuffer();
            PDFEngine.init(buffer);
        } catch (e) {
            console.error("Erro ao carregar PDF:", arq);
        }
    },

    async mudarExame() {
        const ex = this.getExame();
        
        // 1. PDF
        this.carregarDocumentoPDF('prova');

        // 2. Sincronização de Textos (Peça, Respostas, Dicas)
        const mappings = [
            { path: `v3_treino/exame_${ex}`, id: 'texto-final' },
            { path: `v3_respostas/exame_${ex}`, id: 'res-editor' },
            { path: `v3_dicas/exame_${ex}`, id: 'dicas-editor' }
        ];

        mappings.forEach(m => {
            get(ref(db, m.path)).then(s => {
                document.getElementById(m.id).value = s.val() || "";
            });
        });

        // 3. Espelho FGV
        document.getElementById('checklist-fgv').innerHTML = DATA_MASTER.espelhos[ex] || "Gabarito ainda não disponível.";
    },

    saveMeta(path, val) {
        const ex = this.getExame();
        set(ref(db, `${path}/exame_${ex}`), val);
    },

    autoSave() {
        clearTimeout(this.sv);
        this.sv = setTimeout(() => {
            this.saveMeta('v3_treino', document.getElementById('texto-final').value);
        }, 1000);
    },

    renderMenuEstruturas() {
        const menu = document.getElementById('menu-estruturas');
        menu.innerHTML = "";
        Object.keys(DATA_MASTER.estruturas).forEach(sigla => {
            const d = document.createElement('div');
            d.className = 'menu-item';
            d.innerText = sigla;
            d.onclick = () => {
                document.getElementById('texto-final').value = DATA_MASTER.estruturas[sigla];
                window.toggleEstruturas();
                this.autoSave();
            };
            menu.appendChild(d);
        });
    }
};

// Auto-inicialização
App.init();
