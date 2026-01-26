<script type="module">
    import { PDFEngine } from './pdf-engine.js';
    import { UI } from './ui-components.js';
    import { NaoConfunda } from './nao-confunda.js';
    import { ESTRUTURAS } from './estruturas.js';
    import { db } from './firebase-config.js';
    import { ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

    // Configura Worker do PDF (Fundamental para renderizar)
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const App = {
        exame: "44",
        tempoRestante: 18000, // 5 horas

        async init() {
            this.setupEvents();
            await this.atualizarEstacao();
            this.iniciarCronometro();
            console.log("🚀 Sistema Joaquim 2026: Inteligências Conectadas.");
        },

        setupEvents() {
            // Seletor de Exame
            document.getElementById('exam-select').onchange = (e) => {
                this.exame = e.target.value;
                this.atualizarEstacao();
            };

            // Botão Salvar (Firebase)
            document.getElementById('btn-salvar').onclick = () => this.salvarProgresso();

            // Botão Novo Post-it (Não Confunda)
            document.getElementById('btn-add-nc').onclick = () => UI.abrirModalNC(this.exame);

            // Navegação PDF
            document.getElementById('prev-page').onclick = () => PDFEngine.changePage(-1);
            document.getElementById('next-page').onclick = () => PDFEngine.changePage(1);

            // Conexão dos Botões do Rodapé (Questões, Espelho, Prazos, Vade)
            const botoesRodape = document.querySelectorAll('footer .btn-util');
            botoesRodape.forEach(btn => {
                btn.onclick = () => {
                    const texto = btn.innerText.toUpperCase();
                    if (texto.includes("QUESTÕES")) this.abrirInteligencia('questoes');
                    else if (texto.includes("ESPELHO")) this.abrirInteligencia('espelho');
                    else if (texto.includes("PRAZOS")) this.abrirInteligencia('calculadora');
                    else if (texto.includes("VADE")) this.abrirInteligencia('vade');
                };
            });
        },

        async atualizarEstacao() {
            // 1. MOTOR PDF: Carrega o enunciado oficial roXX.pdf
            try {
                const response = await fetch(`./pdfs/ro${this.exame}.pdf`);
                const arrayBuffer = await response.arrayBuffer();
                await PDFEngine.init(arrayBuffer);
            } catch (err) { console.error("PDF ro" + this.exame + ".pdf não encontrado."); }

            // 2. FIREBASE: Sincroniza o texto da folha
            const area = document.getElementById('texto-final');
            onValue(ref(db, `v3_treino/exame_${this.exame}`), (snap) => {
                if (snap.exists()) {
                    area.value = snap.val();
                } else {
                    // Se não houver texto salvo, injeta esqueleto oficial da Aryanna
                    area.value = ESTRUTURAS[this.exame]?.esqueleto || ESTRUTURAS["PADRAO"].esqueleto;
                }
            });

            // 3. NÃO CONFUNDA: Renderiza os post-its dinâmicos
            NaoConfunda.renderizar(this.exame, 'container-postits');
        },

        async abrirInteligencia(tipo) {
            const conteudo = document.getElementById(`conteudo-${tipo}`);
            if (!conteudo) return;

            if (tipo === 'calculadora') {
                const { CalculadoraPrazos } = await import('./calculadora.js');
                conteudo.innerHTML = CalculadoraPrazos.exibirPainel();
            } 
            
            else if (tipo === 'questoes') {
                const q = ESTRUTURAS[this.exame]?.questoes || ["Nenhuma questão mapeada."];
                conteudo.innerHTML = q.map((item, i) => `
                    <div style="margin-bottom:15px; border-left:4px solid var(--gold); padding:10px; background:#f1f5f9; color:#1e293b">
                        <strong>QUESTÃO ${i+1}:</strong><p>${item}</p>
                    </div>
                `).join('');
            }

            else if (tipo === 'espelho') {
                const itens = ESTRUTURAS[this.exame]?.espelho || ["Espelho indisponível."];
                conteudo.innerHTML = `<ul style="list-style:none; color:#1e293b">
                    ${itens.map(i => `<li style="padding:8px; border-bottom:1px solid #ddd">✅ ${i}</li>`).join('')}
                </ul>`;
            }

            else if (tipo === 'vade') {
                conteudo.innerHTML = `
                    <input type="text" placeholder="Pesquisar artigo..." style="width:100%; padding:10px; border:1px solid #ddd; border-radius:5px;">
                    <div style="margin-top:10px; color:#666; font-size:12px;">Atalhos: CLT Art. 895 (RO), Art. 897-A (Embargos), Súmula 126 TST.</div>
                `;
            }

            window.toggleModal(`modal-${tipo}`);
        },

        salvarProgresso() {
            const texto = document.getElementById('texto-final').value;
            set(ref(db, `v3_treino/exame_${this.exame}`), texto)
                .then(() => {
                    alert("✅ Sincronizado! Acesse pelo Mobile para revisar.");
                });
        },

        iniciarCronometro() {
            const display = document.getElementById('cronometro');
            setInterval(() => {
                let h = Math.floor(this.tempoRestante / 3600);
                let m = Math.floor((this.tempoRestante % 3600) / 60);
                let s = this.tempoRestante % 60;
                display.innerText = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
                if(this.tempoRestante > 0) this.tempoRestante--;
            }, 1000);
        }
    };

    // Função global para os botões "Fechar" dos modais
    window.toggleModal = (id) => {
        const m = document.getElementById(id);
        if (m) m.style.display = m.style.display === 'block' ? 'none' : 'block';
    };

    // Inicialização do Sistema
    document.addEventListener('DOMContentLoaded', () => App.init());
</script>
