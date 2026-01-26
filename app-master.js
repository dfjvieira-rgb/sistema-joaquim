// app-master.js - Maestro com PDF Linkado e Sincronização Firebase
import { db } from './firebase-config.js';
import { NaoConfunda } from './nao-confunda.js';
import { PDFEngine } from './pdf-engine.js';
import { DATA_MASTER } from './estruturas.js';
import { UI } from './ui-components.js'; 
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
        window.irParaMentoria = () => alert("Redirecionando para Mentoria Aryanna...");
        
        window.abrirModal = (id) => {
            const modal = document.getElementById(id);
            if (modal) {
                modal.style.display = 'flex';
                // Se abrir o modal de Post-its, renderiza a lista do Firebase
                if(id === 'modal-nc') NaoConfunda.renderizar(this.getExame(), 'container-postits-nc');
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
                    this.autoSave(); 
                }
            }
        };

        window.toggleDarkMode = () => document.body.classList.toggle('dark-mode');
        
        // --- PONTES DO MOTOR PDF ---
        window.loadDoc = (tipo) => this.carregarPDF(tipo);
        window.changePage = (off) => {
            if (typeof PDFEngine !== 'undefined' && PDFEngine.changePage) {
                PDFEngine.changePage(off);
            }
        };
        
        // --- SINCRONIZAÇÃO ---
        window.autoSave = () => this.autoSave();
        window.mudarExame = () => this.mudarExame();
        
        // Listener para o Select de Exames
        document.getElementById('exam-select').onchange = () => this.mudarExame();

        // Listener para AutoSave no digitar
        document.getElementById('texto-final').oninput = () => this.autoSave();

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
        
        // Ajuste de IDs para bater com o seu HTML
        const btnProva = document.getElementById('btn-prova');
        const btnVade = document.getElementById('btn-vade');
        
        if (btnProva) btnProva.style.background = tipo === 'prova' ? 'var(--primary)' : 'transparent';
        if (btnVade) btnVade.style.background = tipo === 'vade' ? 'var(--primary)' : 'transparent';

        try {
            const response = await fetch(`./pdfs/${nomeArquivo}`);
            if (!response.ok) throw new Error("Arquivo não encontrado");
            const buffer = await response.arrayBuffer();
            PDFEngine.init(buffer);
        } catch (err) {
            console.warn(`[UX] PDF ${nomeArquivo} não disponível na pasta /pdfs/`);
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
            // Verifica se DATA_MASTER e espelhos existem para evitar erro
            const conteudoEspelho = (DATA_MASTER && DATA_MASTER.espelhos) ? DATA_MASTER.espelhos[ex] : null;
            esp.innerHTML = conteudoEspelho || 
            "<p style='padding:20px; opacity:0.6; text-align:center;'>Espelho oficial para o Exame " + ex + " ainda não carregado.</p>";
        }
    },

    autoSave() {
        const ex = this.getExame();
        const texto = document.getElementById('texto-final').value;

        clearTimeout(this.sv);
        this.sv = setTimeout(() => {
            set(ref(db, `v3_treino/exame_${ex}`), texto);
            console.log("📝 Progresso do Exame " + ex + " salvo no Firebase.");
        }, 1500);
    }
};

// Inicialização
App.init();
