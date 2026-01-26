// app-master.js - Maestro com PDF Linkado e Sincronização Firebase
import { db } from './firebase-config.js';
import { NaoConfunda } from './nao-confunda.js';
import { PDFEngine } from './pdf-engine.js';
import { DATA_MASTER } from './estruturas.js';
import { UI } from './ui-components.js'; // Importante para o novo modal de Post-its
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export const App = {
    sv: null, // Timer para o autoSave

    init() {
        this.vincularInterface();
        this.mudarExame();
        console.log("🚀 Maestro Pro: Sistema sincronizado e pronto para o mobile.");
    },

    vincularInterface() {
        // --- NAVEGAÇÃO E MODAIS ---
        window.irParaMentoria = () => window.location.href = 'mentoria.html';
        
        window.abrirModal = (id) => {
            const modal = document.getElementById(id);
            if (modal) {
                modal.style.display = 'flex';
                // Se abrir o modal de Post-its, renderiza a lista do Firebase
                if(id === 'modal-nc') NaoConfunda.renderizar(this.getExame(), 'lista-nc-dinamica');
            }
        };

        // Ponte para o Modal Luxo de Criação de Post-its
        window.abrirModalNC = () => UI.abrirModalNC(this.getExame());

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
                if (txt) {
                    txt.value = ""; 
                    this.autoSave(); // Sincroniza a limpeza no Firebase
                }
            }
        };

        window.toggleDarkMode = () => document.body.classList.toggle('dark-mode');
        
        // --- PONTES DO MOTOR PDF (PDF ENGINE) ---
        window.loadDoc = (tipo) => this.carregarPDF(tipo);
        window.changePage = (off) => PDFEngine.changePage(off);
        
        // --- SINCRONIZAÇÃO ---
        window.autoSave = () => this.autoSave();
        window.mudarExame = () => this.mudarExame();
        
        // Ponte para salvar Questões e Dicas (Modais)
        window.saveMeta = (pasta, valor) => {
            const ex = this.getExame();
            set(ref(db, `${pasta}/exame_${ex}`), valor);
        };
    },

    getExame() { 
        return document.getElementById('exam-select').value; 
    },

    async carregarPDF(tipo) {
        const ex = this.getExame();
        const nomeArquivo = tipo === 'prova' ? `ro${ex}.pdf` : `vade.pdf`;
        
        // Feedback visual nos botões de Tab
        const tabProva = document.getElementById('tab-prova');
        const tabVade = document.getElementById('tab-vade');
        
        if (tabProva) tabProva.style.background = tipo === 'prova' ? 'var(--primary)' : 'transparent';
        if (tabVade) tabVade.style.background = tipo === 'vade' ? 'var(--primary)' : 'transparent';

        try {
            // Busca o PDF na pasta local /pdfs/
            const response = await fetch(`./pdfs/${nomeArquivo}`);
            if (!response.ok) throw new Error("Arquivo não encontrado");
            const buffer = await response.arrayBuffer();
            PDFEngine.init(buffer);
        } catch (err) {
            console.warn(`[UX] PDF ${nomeArquivo} não disponível.`);
        }
    },

    async mudarExame() {
        const ex = this.getExame();
        
        // 1. Carrega o PDF da prova
        this.carregarPDF('prova');

        // 2. Sincroniza campos de texto (Peça, Questões, Dicas)
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

        // 3. Atualiza o Espelho da FGV via estruturas.js
        const esp = document.getElementById('checklist-fgv');
        if (esp) {
            esp.innerHTML = DATA_MASTER.espelhos[ex] || 
            "<p style='padding:20px; opacity:0.6;'>Espelho para este exame ainda não cadastrado.</p>";
        }
    },

    autoSave() {
        const ex = this.getExame();
        const texto = document.getElementById('texto-final').value;

        clearTimeout(this.sv);
        // Debounce de 1.5s para economizar processamento mobile
        this.sv = setTimeout(() => {
            set(ref(db, `v3_treino/exame_${ex}`), texto);
            console.log("📝 Progresso sincronizado.");
        }, 1500);
    }
};

// Inicialização
App.init();
