// app-master.js - O Maestro do Sistema
import { db } from './firebase-config.js';
import { NaoConfunda } from './nao-confunda.js';
import { PDFEngine } from './pdf-engine.js';
import { DATA_MASTER } from './estruturas.js';
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export const App = {
    init() {
        this.bindEvents();
        this.renderMenuEstruturas();
        this.mudarExame();
        console.log("🚀 Sistema Aryanna Master Inicializado");
    },

    bindEvents() {
        // Eventos Globais vinculados ao Window para compatibilidade com o HTML
        window.abrirModal = (id) => {
            document.getElementById(id).style.display = 'flex';
            if(id === 'modal-nc') NaoConfunda.renderizar(this.getExame(), 'lista-nc-dinamica');
        };
        window.fecharModal = (id) => document.getElementById(id).style.display = 'none';
        window.toggleDarkMode = () => document.body.classList.toggle('dark-mode');
        window.limparFolha = () => { if(confirm("Apagar peça?")) document.getElementById('texto-final').value = ""; };
        window.toggleEstruturas = () => {
            const m = document.getElementById('menu-estruturas');
            m.style.display = m.style.display === 'block' ? 'none' : 'block';
        };
    },

    getExame() {
        return document.getElementById('exam-select').value;
    },

    async mudarExame() {
        const ex = this.getExame();
        
        // 1. Carrega PDF da Prova
        try {
            const resp = await fetch(`ro${ex}.pdf`);
            const data = await resp.arrayBuffer();
            PDFEngine.init(data);
        } catch(e) { console.error("PDF não encontrado"); }

        // 2. Sincroniza Textos do Firebase
        const paths = {
            'v3_treino': 'texto-final',
            'v3_respostas': 'res-editor',
            'v3_dicas': 'dicas-editor'
        };

        for (const [path, elementId] of Object.entries(paths)) {
            get(ref(db, `${path}/exame_${ex}`)).then(s => {
                document.getElementById(elementId).value = s.val() || "";
            });
        }

        // 3. Atualiza Espelho
        document.getElementById('checklist-fgv').innerHTML = DATA_MASTER.espelhos[ex] || "Pendente.";
    },

    saveMeta(path, val) {
        set(ref(db, `${path}/exame_${this.getExame()}`), val);
    },

    autoSave() {
        clearTimeout(this.sv);
        this.sv = setTimeout(() => this.saveMeta('v3_treino', document.getElementById('texto-final').value), 1000);
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

// Inicializa o App
App.init();

// Exporta funções para uso no oninput/onclick do HTML
window.autoSave = () => App.autoSave();
window.saveMeta = (path, val) => App.saveMeta(path, val);
window.mudarExame = () => App.mudarExame();
