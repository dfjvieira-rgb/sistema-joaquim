import { db } from './firebase-config.js';
import { NaoConfunda } from './nao-confunda.js';
import { PDFEngine } from './pdf-engine.js';
import { DATA_MASTER } from './estruturas.js';
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export const App = {
    init() {
        this.exporGlobais();
        this.renderMenuEstruturas();
        this.mudarExame();
        console.log("✅ Sistema Restaurado: Todos os botões mapeados.");
    },

    exporGlobais() {
        // 🏆 MENTORIA
        window.irParaMentoria = () => window.location.href = 'mentoria.html';

        // 📚 QUESTÕES / 🎯 ESPELHO / 📌 NC / 💡 DICAS
        window.abrirModal = (id) => {
            document.getElementById(id).style.display = 'flex';
            if(id === 'modal-nc') NaoConfunda.renderizar(this.getExame(), 'lista-nc-dinamica');
        };
        window.fecharModal = (id) => document.getElementById(id).style.display = 'none';

        // ⚖️ ESTRUTURAS
        window.toggleEstruturas = () => {
            const m = document.getElementById('menu-estruturas');
            m.style.display = m.style.display === 'block' ? 'none' : 'block';
        };

        // 🗑️ LIMPAR / 🌓 TEMA / 💾 SALVAR
        window.limparFolha = () => { if(confirm("Apagar peça?")) document.getElementById('texto-final').value = ""; };
        window.toggleDarkMode = () => document.body.classList.toggle('dark-mode');
        window.saveMeta = (path, val) => this.saveMeta(path, val);
        window.autoSave = () => this.autoSave();

        // ◀ ▶ PDF CONTROLS
        window.changePage = (off) => PDFEngine.changePage(off);
        window.loadDoc = (tipo) => this.carregarDocumentoPDF(tipo);

        // EXAME SELECT
        window.mudarExame = () => this.mudarExame();
    },

    getExame() { return document.getElementById('exam-select').value; },

    async carregarDocumentoPDF(tipo) {
        const ex = this.getExame();
        const arq = tipo === 'prova' ? `ro${ex}.pdf` : `vade.pdf`;
        try {
            const resp = await fetch(arq);
            const buffer = await resp.arrayBuffer();
            PDFEngine.init(buffer);
        } catch (e) { console.error("Erro PDF:", arq); }
    },

    async mudarExame() {
        const ex = this.getExame();
        this.carregarDocumentoPDF('prova');
        
        const mapeamento = [
            { path: `v3_treino/exame_${ex}`, id: 'texto-final' },
            { path: `v3_respostas/exame_${ex}`, id: 'res-editor' },
            { path: `v3_dicas/exame_${ex}`, id: 'dicas-editor' }
        ];

        mapeamento.forEach(m => {
            get(ref(db, m.path)).then(s => { document.getElementById(m.id).value = s.val() || ""; });
        });

        if (DATA_MASTER.espelhos[ex]) {
            document.getElementById('checklist-fgv').innerHTML = DATA_MASTER.espelhos[ex];
        }
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
App.init();
