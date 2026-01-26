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
        console.log("✅ Maestro Reconectado. Dados oficiais ativos.");
    },

    getExame() {
        return document.getElementById('exam-select').value;
    },

    configurarGlobal() {
        // --- MAPEAMENTO DOS EMOJIS (IDs E FUNÇÕES) ---
        
        window.irParaMentoria = () => alert("Cronograma Aryanna 2026...");
        
        // 📚 Questões
        window.abrirModalRespostas = () => {
            const m = document.getElementById('modal-respostas');
            if(m) m.style.display = 'flex';
        };

        // ⚖️ Estruturas (O que você me enviou)
        window.toggleEstruturas = () => {
            const m = document.getElementById('menu-estruturas');
            m.style.display = (m.style.display === 'block') ? 'none' : 'block';
            if(m.style.display === 'block') this.renderizarMenuEstruturas();
        };

        // 🎯 Espelho
        window.abrirModalEspelho = () => {
            const m = document.getElementById('modal-espelho');
            if(m) m.style.display = 'flex';
        };

        // 📌 Post-its
        window.abrirModalNC = () => {
            const m = document.getElementById('modal-nc');
            if(m) {
                m.style.display = 'flex';
                NaoConfunda.renderizar(this.getExame(), 'container-postits-nc');
            }
        };

        // 💡 Dicas
        window.abrirModalDicas = () => {
            const m = document.getElementById('modal-dicas');
            if(m) m.style.display = 'flex';
        };

        // 🗑️ Limpar
        window.limparFolha = () => {
            if(confirm("Apagar tudo?")) {
                document.getElementById('texto-final').value = "";
                this.autoSave();
            }
        };

        // 🌓 Tema
        window.toggleDarkMode = () => document.body.classList.toggle('dark-mode');

        // Botões de fechar modal
        window.fecharModal = (id) => {
            document.getElementById(id).style.display = 'none';
        };

        // Eventos de Sistema
        document.getElementById('exam-select').onchange = () => this.mudarExame();
        document.getElementById('texto-final').oninput = () => this.autoSave();
    },

    async mudarExame() {
        const ex = this.getExame();
        this.carregarPDF('prova');

        // 1. Busca no Firebase (Peça, Questões, Dicas)
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

        // 2. Atualiza o Espelho 🎯 (Puxando de DATA_MASTER.espelhos)
        const esp = document.getElementById('checklist-fgv');
        if (esp) {
            esp.innerHTML = (DATA_MASTER.espelhos && DATA_MASTER.espelhos[ex]) 
                ? DATA_MASTER.espelhos[ex] 
                : `<p>Espelho do Exame ${ex} não carregado.</p>`;
        }
    },

    renderizarMenuEstruturas() {
        const menu = document.getElementById('menu-estruturas');
        const ex = this.getExame();
        // AQUI ESTAVA O ERRO: Ele deve ler .estruturas[ex]
        const dados = DATA_MASTER.estruturas[ex];
        
        if (dados) {
            menu.innerHTML = `
                <div style="background:#fff; padding:15px; border:2px solid #b2943d; border-radius:8px;">
                    <strong style="color:#721c24;">${dados.titulo}</strong>
                    <button onclick="window.injetarTextoFiel()" style="width:100%; margin-top:10px; background:#721c24; color:white; border:none; padding:10px; border-radius:5px; cursor:pointer; font-weight:bold;">INJETAR CONTEÚDO OFICIAL</button>
                </div>
            `;
            window.injetarTextoFiel = () => {
                if(confirm("Injetar modelo do Exame " + ex + "?")) {
                    // Mapeado para .modelo como está no seu arquivo
                    document.getElementById('texto-final').value = dados.modelo;
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
        } catch (e) { console.error("PDF erro"); }
    },

    autoSave() {
        const ex = this.getExame();
        const txt = document.getElementById('texto-final').value;
        clearTimeout(this.sv);
        this.sv = setTimeout(() => {
            set(ref(db, `v3_treino/exame_${ex}`), txt);
        }, 1200);
    }
};

Maestro.inicializar();
