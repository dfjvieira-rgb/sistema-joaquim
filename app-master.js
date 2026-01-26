import { db } from './firebase-config.js';
import { NaoConfunda } from './nao-confunda.js';
import { PDFEngine } from './pdf-engine.js';
import { DATA_MASTER } from './estruturas.js';
import { UI } from './ui-components.js'; 
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const Maestro = {
    sv: null,

    async inicializar() {
        this.configurarGlobal();
        await this.mudarExame();
        console.log("✅ Maestro Conectado: Todos os botões estão ativos.");
    },

    getExame() {
        return document.getElementById('exam-select').value;
    },

    // 🔗 CONEXÃO DOS BOTÕES (AQUI É ONDE A MÁGICA ACONTECE)
    configurarGlobal() {
        // 🏆 MENTORIA
        window.irParaMentoria = () => alert("Abrindo Cronograma Aryanna 2026...");

        // 📚 QUESTÕES (Abre modal de questões)
        window.abrirModalRespostas = () => window.abrirModal('modal-respostas');

        // ⚖️ ESTRUTURAS (Toggle do menu de peças)
        window.toggleEstruturas = () => {
            const m = document.getElementById('menu-estruturas');
            m.style.display = (m.style.display === 'block') ? 'none' : 'block';
            if(m.style.display === 'block') this.renderizarMenuEstruturas();
        };

        // 🎯 ESPELHO (Abre modal de espelho)
        window.abrirModalEspelho = () => window.abrirModal('modal-espelho');

        // 📌 NÃO CONFUNDA (Abre modal de post-its)
        window.abrirModalNC = () => {
            window.abrirModal('modal-nc');
            NaoConfunda.renderizar(this.getExame(), 'container-postits-nc');
        };

        // 💡 DICAS (Abre modal de dicas)
        window.abrirModalDicas = () => window.abrirModal('modal-dicas');

        // 🗑️ LIMPAR
        window.limparFolha = () => {
            if(confirm("Apagar toda a peça?")) {
                document.getElementById('texto-final').value = "";
                this.autoSave();
            }
        };

        // 🌓 TEMA
        window.toggleDarkMode = () => document.body.classList.toggle('dark-mode');

        // 💾 SALVAR MANUAL
        window.forçarSave = () => this.autoSave();

        // PDF CONTROLS
        window.loadDoc = (t) => this.carregarPDF(t);
        window.changePage = (o) => PDFEngine.changePage(o);
        
        // Listener do Select
        document.getElementById('exam-select').onchange = () => this.mudarExame();
        
        // Listener do Teclado (AutoSave)
        document.getElementById('texto-final').oninput = () => this.autoSave();
    },

    async mudarExame() {
        const ex = this.getExame();
        this.carregarPDF('prova');

        // Busca textos do Firebase
        const caminhos = [
            { p: `v3_treino/exame_${ex}`, id: 'texto-final' },
            { p: `v3_respostas/exame_${ex}`, id: 'res-editor' },
            { p: `v3_dicas/exame_${ex}`, id: 'dicas-editor' }
        ];

        for (const item of caminhos) {
            const s = await get(ref(db, item.p));
            const el = document.getElementById(item.id);
            if (el) el.value = s.val() || "";
        }

        // Atualiza o Espelho 🎯
        const esp = document.getElementById('checklist-fgv');
        if (esp) {
            esp.innerHTML = (DATA_MASTER.espelhos && DATA_MASTER.espelhos[ex]) 
                ? DATA_MASTER.espelhos[ex] 
                : `<p style="text-align:center; padding:20px;">Espelho do Exame ${ex} não disponível.</p>`;
        }
    },

    renderizarMenuEstruturas() {
        const menu = document.getElementById('menu-estruturas');
        const ex = this.getExame();
        const dados = DATA_MASTER.pecas[ex];
        
        if (dados) {
            menu.innerHTML = `
                <div style="background:var(--bg-site); padding:10px; border:1px solid var(--gold); border-radius:8px;">
                    <p style="font-size:0.7rem; font-weight:bold; margin-bottom:5px;">PEÇA IDENTIFICADA: <span style="color:var(--gold)">${dados.nomePeca}</span></p>
                    <button onclick="window.injetarEstrutura()" style="width:100%; background:var(--gold); color:white; border:none; padding:8px; border-radius:5px; font-weight:bold; cursor:pointer;">INJETAR ESTRUTURA COMPLETA</button>
                </div>
            `;
            window.injetarEstrutura = () => {
                if(confirm("Substituir texto atual pela estrutura oficial?")) {
                    document.getElementById('texto-final').value = dados.conteudo;
                    this.autoSave();
                    menu.style.display = 'none';
                }
            };
        }
    },

    async carregarPDF(tipo) {
        const ex = this.getExame();
        const arquivo = tipo === 'prova' ? `ro${ex}.pdf` : `vade.pdf`;
        try {
            const resp = await fetch(`./pdfs/${arquivo}`);
            if (resp.ok) {
                const buf = await resp.arrayBuffer();
                PDFEngine.init(buf);
            }
        } catch (e) { console.error("PDF não carregado"); }
    },

    autoSave() {
        const ex = this.getExame();
        const txt = document.getElementById('texto-final').value;
        clearTimeout(this.sv);
        this.sv = setTimeout(() => {
            set(ref(db, `v3_treino/exame_${ex}`), txt);
            console.log("💾 Sincronizado");
        }, 1000);
    }
};

Maestro.inicializar();
