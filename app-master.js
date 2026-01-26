import { db } from './firebase-config.js';
import { NaoConfunda } from './nao-confunda.js';
import { PDFEngine } from './pdf-engine.js';
import { DATA_MASTER } from './estruturas.js';
import { ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const Maestro = {
    sv: null,

    async inicializar() {
        this.configurarGlobal();
        this.popularSelectExames();
        await this.mudarExame();
        console.log("✅ Sistema Master: Mapeamento de arquivos concluído.");
    },

    getExame() {
        const sel = document.getElementById('exam-select');
        return sel ? sel.value : "44";
    },

    configurarGlobal() {
        // --- MAPEAMENTO DE COMANDOS DO HTML (window.xxx) ---

        // 📚 Questões Dissertativas
        window.abrirModalRespostas = () => this.abrirModal('modal-respostas');

        // ⚖️ Estruturas (Injeta Peça do estruturas.js)
        window.toggleEstruturas = () => {
            const m = document.getElementById('menu-estruturas');
            m.style.display = (m.style.display === 'block') ? 'none' : 'block';
            if (m.style.display === 'block') this.renderizarMenuEstruturas();
        };

        // 🎯 Espelho de Correção (banco-espelhos.js / DATA_MASTER)
        window.abrirModalEspelho = () => this.abrirModal('modal-espelho');

        // 📌 Não Confunda (Post-its)
        window.abrirModalNC = () => {
            this.abrirModal('modal-nc');
            NaoConfunda.renderizar(this.getExame(), 'lista-nc'); // Ajustado para seu ID do modal
        };

        // 💡 Dicas / Qual é a Peça
        window.abrirModalDicas = () => this.abrirModal('modal-dicas');

        // 🗑️ Limpar Folha
        window.limparFolha = () => {
            if (confirm("Deseja apagar sua peça escrita?")) {
                document.getElementById('texto-final').value = "";
                this.autoSave();
            }
        };

        // 🌓 Dark Mode
        window.toggleDarkMode = () => document.body.classList.toggle('dark-mode');

        // 💾 Sincronização Manual
        window.finalizarManual = () => {
            this.autoSave(true);
            alert("Progresso sincronizado com o Firebase!");
        };

        // 📱 Mobile View Toggle
        window.toggleMobileView = () => {
            document.getElementById('section-pdf').classList.toggle('active-mobile');
        };

        // Auxiliares de Interface
        window.abrirModal = (id) => document.getElementById(id).style.display = 'flex';
        window.fecharModal = (id) => document.getElementById(id).style.display = 'none';

        // Listeners de Input para AutoSave
        document.getElementById('texto-final').oninput = () => this.autoSave();
        document.getElementById('res-editor').oninput = () => this.autoSaveMeta('v3_respostas', 'res-editor');
        document.getElementById('dicas-editor').oninput = () => this.autoSaveMeta('v3_dicas', 'dicas-editor');
        
        // Listener de Troca de Exame
        document.getElementById('exam-select').onchange = () => this.mudarExame();
    },

    async mudarExame() {
        const ex = this.getExame();
        
        // 1. Carrega PDF correspondente (roXX.pdf)
        this.carregarDocumento('prova');

        // 2. Recupera do Firebase o que o usuário já escreveu
        const snapshots = [
            { path: `v3_treino/exame_${ex}`, id: 'texto-final' },
            { path: `v3_respostas/exame_${ex}`, id: 'res-editor' },
            { path: `v3_dicas/exame_${ex}`, id: 'dicas-editor' }
        ];

        for (const item of snapshots) {
            const snap = await get(ref(db, item.p));
            const el = document.getElementById(item.id);
            if (el) el.value = snap.val() || "";
        }

        // 3. Carrega o Espelho (Se existir no DATA_MASTER)
        const espelhoArea = document.getElementById('checklist-fgv');
        if (espelhoArea) {
            espelhoArea.innerHTML = (DATA_MASTER.espelhos && DATA_MASTER.espelhos[ex])
                ? DATA_MASTER.espelhos[ex]
                : `<p style="padding:20px; text-align:center; opacity:0.5;">Gabarito oficial do Exame ${ex} pendente.</p>`;
        }
    },

    renderizarMenuEstruturas() {
        const container = document.getElementById('menu-estruturas');
        const ex = this.getExame();
        const dados = DATA_MASTER.estruturas[ex];

        if (dados) {
            container.innerHTML = `
                <div style="padding:15px; background:var(--paper); border-radius:8px;">
                    <p style="color:var(--wine); font-weight:bold; font-size:12px; margin-bottom:10px;">PEÇA OFICIAL IDENTIFICADA:</p>
                    <div style="border-left:4px solid var(--gold); padding-left:10px; margin-bottom:15px;">
                        <strong style="font-size:14px;">${dados.titulo}</strong>
                    </div>
                    <button onclick="window.injetarModelo()" style="width:100%; padding:12px; background:var(--wine); color:white; border:none; border-radius:5px; font-weight:bold; cursor:pointer;">
                        INJETAR TEXTO COMPLETO
                    </button>
                </div>
            `;

            window.injetarModelo = () => {
                if (confirm("Substituir sua folha pelo modelo oficial do Exame " + ex + "?")) {
                    document.getElementById('texto-final').value = dados.modelo;
                    this.autoSave(true);
                    container.style.display = 'none';
                }
            };
        } else {
            container.innerHTML = `<div style="padding:15px; font-size:12px; color:red;">Estrutura do Exame ${ex} não localizada no banco.</div>`;
        }
    },

    async carregarDocumento(tipo) {
        const ex = this.getExame();
        let path = `./pdfs/ro${ex}.pdf`;
        
        if (tipo === 'vade') path = './pdfs/vade.pdf';
        if (tipo === 'gabarito') path = `./pdfs/ro${ex}-gabarito.pdf`;

        try {
            const resp = await fetch(path);
            if (resp.ok) {
                const buffer = await resp.arrayBuffer();
                PDFEngine.init(buffer); // Chama seu pdf-engine.js
            }
        } catch (e) { console.error("Erro ao carregar PDF:", path); }
    },

    autoSave(imediato = false) {
        const ex = this.getExame();
        const texto = document.getElementById('texto-final').value;
        clearTimeout(this.sv);
        
        const delay = imediato ? 0 : 1200;
        this.sv = setTimeout(() => {
            set(ref(db, `v3_treino/exame_${ex}`), texto);
        }, delay);
    },

    autoSaveMeta(path, id) {
        const ex = this.getExame();
        const val = document.getElementById(id).value;
        set(ref(db, `${path}/exame_${ex}`), val);
    },

    popularSelectExames() {
        const sel = document.getElementById('exam-select');
        if (!sel) return;
        sel.innerHTML = "";
        // Alinhado com seus arquivos físicos (ro35 a ro44)
        for (let i = 44; i >= 35; i--) {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = `EXAME ${i}`;
            if (i === 44) opt.selected = true;
            sel.appendChild(opt);
        }
    }
};

Maestro.inicializar();
