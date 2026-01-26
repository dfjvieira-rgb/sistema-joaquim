// app-master.js - Maestro com PDF Linkado e Sincronização Firebase
import { db } from './firebase-config.js';
import { NaoConfunda } from './nao-confunda.js';
import { PDFEngine } from './pdf-engine.js';
import { DATA_MASTER } from './estruturas.js';
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export const App = {
    sv: null, // Timer para o autoSave

    init() {
        this.vincularInterface();
        // Se você tiver uma função de renderMenu no estruturas.js, chame-a aqui
        // this.renderMenuEstruturas(); 
        this.mudarExame();
        console.log("🚀 Maestro Pro sincronizado com sucesso.");
    },

    vincularInterface() {
        // Navegação e Modais
        window.irParaMentoria = () => window.location.href = 'mentoria.html';
        
        window.abrirModal = (id) => {
            const modal = document.getElementById(id);
            if (modal) {
                modal.style.display = 'flex';
                // Se abrir o modal de Post-its, renderiza os dados do Firebase
                if(id === 'modal-nc') NaoConfunda.renderizar(this.getExame(), 'lista-nc-dinamica');
            }
        };

        window.fecharModal = (id) => {
            const modal = document.getElementById(id);
            if (modal) modal.style.display = 'none';
        };

        window.toggleEstruturas = () => {
            const m = document.getElementById('menu-estruturas');
            if (m) m.style.display = m.style.display === 'block' ? 'none' : 'block';
        };

        window.limparFolha = () => { 
            if(confirm("Deseja apagar toda a peça escrita?")) {
                const txt = document.getElementById('texto-final');
                if (txt) txt.value = ""; 
            }
        };

        window.toggleDarkMode = () => document.body.classList.toggle('dark-mode');
        
        // Pontes do Motor PDF (PDF Engine)
        window.loadDoc = (tipo) => this.carregarPDF(tipo);
        window.changePage = (off) => PDFEngine.changePage(off);
        
        // Sincronização
        window.autoSave = () => this.autoSave();
        window.mudarExame = () => this.mudarExame();
    },

    getExame() { 
        return document.getElementById('exam-select').value; 
    },

    async carregarPDF(tipo) {
        const ex = this.getExame();
        // Define se carrega a Prova do Exame ou o Vade Mecum
        const nomeArquivo = tipo === 'prova' ? `ro${ex}.pdf` : `vade.pdf`;
        
        // Feedback visual nos botões de Tab
        const tabProva = document.getElementById('tab-prova');
        const tabVade = document.getElementById('tab-vade');
        
        if (tabProva) tabProva.style.background = tipo === 'prova' ? 'var(--primary)' : 'transparent';
        if (tabVade) tabVade.style.background = tipo === 'vade' ? 'var(--primary)' : 'transparent';

        try {
            const response = await fetch(nomeArquivo);
            if (!response.ok) throw new Error("Arquivo não encontrado");
            const buffer = await response.arrayBuffer();
            PDFEngine.init(buffer);
        } catch (err) {
            console.error("Erro ao carregar PDF:", err);
            // Opcional: Alerta discreto ou log
        }
    },

    async mudarExame() {
        const ex = this.getExame();
        
        // 1. Carrega o PDF da prova automaticamente ao mudar o select
        this.carregarPDF('prova');

        // 2. Sincroniza campos de texto com Firebase (Puxa o que foi salvo antes)
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

        // 3. Atualiza o Espelho/Checklist da FGV
        const esp = document.getElementById('checklist-fgv');
        if (esp) {
            esp.innerHTML = DATA_MASTER.espelhos[ex] || "<p style='padding:20px; opacity:0.6;'>Espelho para este exame ainda não cadastrado.</p>";
        }
    },

    // Função interna de salvamento direto no Firebase
    executarSaveFirebase(path, val) {
        set(ref(db, path), val);
    },

    autoSave() {
        const ex = this.getExame();
        const texto = document.getElementById('texto-final').value;

        clearTimeout(this.sv);
        // Salva após 1 segundo de inatividade no teclado (Debounce)
        this.sv = setTimeout(() => {
            this.executarSaveFirebase(`v3_treino/exame_${ex}`, texto);
            console.log("📝 Progresso salvo automaticamente.");
        }, 1000);
    }
};

// Inicialização única
App.init();
