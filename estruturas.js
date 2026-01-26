<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>ARYANNA MASTER PRO | 2026</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Courier+Prime&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf_viewer.min.css">
    <style>
        :root {
            --primary: #2563eb; --success: #059669; --warning: #f59e0b; --danger: #e11d48;
            --bg-site: #f8fafc; --gold: #d4af37; --pen-blue: #1e3a8a; --paper: #ffffff; --text: #1e293b;
            --border: #cbd5e1;
        }
        .dark-mode { 
            --paper: #1e293b; --pen-blue: #93c5fd; --bg-site: #0f172a; --text: #f1f5f9; 
            --border: #334155;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        body { font-family: 'Inter', sans-serif; background: var(--bg-site); height: 100vh; display: flex; flex-direction: column; overflow: hidden; color: var(--text); }
        header { background: #1e293b; padding: 0 15px; border-bottom: 2px solid var(--gold); display: flex; justify-content: space-between; align-items: center; height: 45px; z-index: 1001; }
        .logo { font-weight: 800; color: var(--gold); font-size: 0.8rem; }
        .main-container { flex: 1; display: flex; overflow: hidden; position: relative; }
        .editor-section { flex: 1; display: flex; flex-direction: column; background: var(--bg-site); border-right: 1px solid var(--border); min-width: 0; }
        
        .toolbar { background: #ffffff; padding: 8px; display: flex; gap: 5px; border-bottom: 1px solid var(--border); align-items: center; overflow-x: auto; }
        .dark-mode .toolbar { background: #1e293b; }
        
        #exam-select { 
            background-color: #1e293b !important; color: #ffffff !important; border: 1px solid var(--gold) !important;
            padding: 5px 10px; border-radius: 8px; font-weight: 800; outline: none; appearance: none; -webkit-appearance: none;
        }
        #exam-select option { background: #1e293b; color: #ffffff; }

        .btn-symbol { height: 36px; min-width: 40px; border-radius: 8px; border: 1px solid var(--border); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; background: transparent; color: var(--text); flex-shrink: 0; }
        .paper-wrapper { flex: 1; overflow-y: auto; padding: 10px; background: rgba(0,0,0,0.1); }
        .paper-sheet { width: 100%; max-width: 800px; background: var(--paper); min-height: 3000px; display: flex; margin: 0 auto; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
        .line-nums { width: 35px; background: rgba(0,0,0,0.03); border-right: 1px solid var(--border); text-align: center; color: #94a3b8; font-size: 12px; padding-top: 15px; line-height: 28px; }
        .text-area { flex: 1; border: none; outline: none; padding: 15px 15px; font-size: 17px; line-height: 28px; color: var(--pen-blue); background-image: linear-gradient(transparent, transparent 27px, var(--border) 27px); background-size: 100% 28px; background-attachment: local; resize: none; background-color: transparent; font-family: 'Inter', sans-serif; }

        /* ESPELHO SENSIBILIZADO ATUALIZADO */
        .espelho-item { 
            background: var(--paper); border: 1px solid var(--border); padding: 12px; 
            margin-bottom: 8px; border-radius: 8px; display: flex; align-items: center; 
            gap: 12px; cursor: pointer; transition: all 0.2s ease;
        }
        .espelho-item:has(input:checked) { 
            background: rgba(5, 150, 105, 0.15); 
            border: 2px solid var(--success) !important;
        }
        .espelho-item:has(input:checked) .espelho-txt { color: var(--success); font-weight: 800; }
        .espelho-item:has(input:checked) .espelho-pt { background: var(--success); color: white; border-radius: 4px; padding: 2px 6px; }
        .espelho-txt { font-size: 0.85rem; flex: 1; }
        .espelho-pt { font-weight: 800; color: var(--primary); font-size: 0.75rem; margin-left: auto; }
        .nota-floating { position: sticky; top: 0; background: var(--gold); color: #000; padding: 12px; text-align: center; font-weight: 900; border-radius: 8px; margin-bottom: 15px; z-index: 10; }

        .viewer-section { flex: 1.2; display: flex; flex-direction: column; background: #334155; min-width: 0; position: relative; }
        .tabs { display: flex; background: #1e293b; padding: 5px 5px 0; gap: 3px; }
        .tab { padding: 8px 12px; border: none; border-radius: 5px 5px 0 0; background: #0f172a; color: #94a3b8; font-size: 0.7rem; cursor: pointer; }
        .tab.active { background: var(--bg-site); color: var(--primary); font-weight: bold; }
        #pdf-viewport { flex: 1; overflow-y: auto; background: #525659; }
        .page-container { position: relative; margin: 10px auto; background: #fff; display: block; width: fit-content; line-height: 0; }
        
        .modal-full { display: none; position: fixed; inset: 0; background: var(--bg-site); z-index: 9999; flex-direction: column; }
        .modal-header { background: #1e293b; color: white; padding: 0 15px; display: flex; align-items: center; height: 50px; border-bottom: 2px solid var(--gold); }
        .modal-header h3 { font-size: 0.8rem; color: var(--gold); flex: 1; margin-left: 10px; }
        .modal-body { flex: 1; overflow-y: auto; padding: 15px; }
        .btn-back { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 0.7rem; }
        
        #menu-estruturas { display: none; position: absolute; top: 50px; left: 20px; background: var(--paper); border: 1px solid var(--border); border-radius: 8px; z-index: 5000; width: 280px; max-height: 70vh; overflow-y: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        .menu-item { padding: 12px; cursor: pointer; border-bottom: 1px solid var(--border); font-size: 0.8rem; color: var(--text); font-weight: bold; }
        .floating-toggle { position: fixed; bottom: 20px; left: 20px; width: 55px; height: 55px; border-radius: 50%; background: var(--primary); color: white; border: none; z-index: 2000; display: none; align-items: center; justify-content: center; font-size: 1.5rem; }
        @media (max-width: 768px) { .viewer-section { position: absolute; inset: 0; z-index: 100; display: none; } .viewer-section.active-mobile { display: flex; } .floating-toggle { display: flex !important; } }
    </style>
</head>
<body class="dark-mode">

<header>
    <div class="logo">ARYANNA MASTER 2026</div>
    <div id="timer-display" style="color:var(--warning); font-family:'Courier Prime'; font-weight:bold;">05:00:00</div>
</header>

<div class="main-container">
    <section class="editor-section">
        <div class="toolbar">
            <select id="exam-select" onchange="window.mudarExame()" class="btn-symbol" style="width:auto; font-size:0.75rem;"></select>
            <button class="btn-symbol" onclick="window.location.href='mentoria.html'">🏆</button>
            <button class="btn-symbol" title="Questões" onclick="window.abrirModal('modal-respostas')">📚</button>
            <button class="btn-symbol" title="Estruturas" onclick="window.toggleEstruturas()">⚖️</button>
            <button class="btn-symbol" title="Espelho" onclick="window.abrirModal('modal-espelho')">🎯</button>
            <button class="btn-symbol" title="Post-its" onclick="window.abrirModal('modal-nc')">📌</button>
            <button class="btn-symbol" title="Dicas" onclick="window.abrirModal('modal-dicas')">💡</button>
            <button class="btn-symbol" onclick="window.limparFolha()">🗑️</button>
            <button class="btn-symbol" onclick="window.toggleDarkMode()">🌓</button>
            <button class="btn-symbol" style="background:var(--success); color:white; margin-left:auto;" onclick="window.finalizarManual()">💾</button>
        </div>
        <div class="paper-wrapper">
            <div class="paper-sheet">
                <div class="line-nums" id="ln-main"></div>
                <textarea id="texto-final" class="text-area" spellcheck="false" oninput="window.autoSave()" placeholder="Inicie sua peça..."></textarea>
            </div>
        </div>
    </section>

    <section class="viewer-section" id="section-pdf">
        <div class="tabs">
            <button id="tab-prova" class="tab active" onclick="window.carregarPDF('prova')">PROVA</button>
            <button id="tab-gabarito" class="tab" onclick="window.carregarPDF('gabarito')">GABARITO</button>
            <button id="tab-vade" class="tab" onclick="window.carregarPDF('vade')">VADE</button>
        </div>
        <div id="pdf-viewport"></div>
    </section>
</div>

<button class="floating-toggle" onclick="window.toggleMobileView()">⇄</button>

<div id="modal-espelho" class="modal-full">
    <div class="modal-header"><button class="btn-back" onclick="window.fecharModal('modal-espelho')">← VOLTAR</button><h3>ESPELHO FGV</h3></div>
    <div class="modal-body"><div class="nota-floating">NOTA: <span id="nota-valor">0.00</span> / 5.00</div><div id="checklist-fgv"></div></div>
</div>

<div id="modal-respostas" class="modal-full">
    <div class="modal-header"><button class="btn-back" onclick="window.fecharModal('modal-respostas')">← VOLTAR</button><h3>QUESTÕES DISSERTATIVAS</h3></div>
    <div class="modal-body"><div class="paper-sheet"><div class="line-nums" id="ln-res"></div><textarea id="res-editor" class="text-area" oninput="window.saveMeta('v3_respostas', this.value)"></textarea></div></div>
</div>

<div id="modal-dicas" class="modal-full">
    <div class="modal-header"><button class="btn-back" onclick="window.fecharModal('modal-dicas')">← VOLTAR</button><h3>QUAL É A PEÇA</h3></div>
    <div class="modal-body"><div class="paper-sheet"><div class="line-nums" id="ln-dicas"></div><textarea id="dicas-editor" class="text-area" oninput="window.saveMeta('v3_dicas', this.value)"></textarea></div></div>
</div>

<div id="modal-nc" class="modal-full">
    <div class="modal-header"><button class="btn-back" onclick="window.fecharModal('modal-nc')">← VOLTAR</button><h3>POST-ITS / TESES</h3></div>
    <div class="modal-body">
        <div style="background:var(--paper); padding:15px; border-radius:10px; border:1px solid var(--border); margin-bottom:20px;">
            <input type="text" id="nc-assunto" placeholder="Tese Principal" style="width:100%; padding:10px; margin-bottom:10px; border-radius:5px; border:1px solid var(--border); background:var(--bg-site); color:var(--text);">
            <div id="container-explicações"><textarea class="explicação-item" placeholder="Explicação..." style="width:100%; height:60px; padding:10px; border-radius:5px; border:1px solid var(--border); background:var(--bg-site); color:var(--text);"></textarea></div>
            <button onclick="window.addExplicaçãoField()" style="padding: 10px; background: var(--primary); color: white; border: none; border-radius: 5px; cursor: pointer; margin-top:10px;">+ Adicionar Diferença</button>
            <button onclick="window.saveNC()" style="width:100%; background:var(--danger); color:white; border:none; padding:12px; border-radius:5px; font-weight:bold; margin-top:15px; cursor:pointer;">SALVAR POST-IT</button>
        </div>
        <div id="lista-nc"></div>
    </div>
</div>

<div id="menu-estruturas">
    <div class="menu-item" onclick="window.injetar('RT')">RECLAMAÇÃO TRABALHISTA</div>
    <div class="menu-item" onclick="window.injetar('CON')">CONTESTAÇÃO</div>
    <div class="menu-item" onclick="window.injetar('ACP')">AÇÃO DE CONSIGNAÇÃO</div>
    <div class="menu-item" onclick="window.injetar('IAFG')">INQUÉRITO FALTA GRAVE</div>
    <div class="menu-item" onclick="window.injetar('HTE')">HOMOLOGAÇÃO TRANSAÇÃO</div>
    <div class="menu-item" onclick="window.injetar('RO')">RECURSO ORDINÁRIO</div>
    <div class="menu-item" onclick="window.injetar('RR')">RECURSO DE REVISTA</div>
    <div class="menu-item" onclick="window.injetar('AI')">AGRAVO DE INSTRUMENTO</div>
    <div class="menu-item" onclick="window.injetar('ED')">EMBARGOS DE DECLARAÇÃO</div>
    <div class="menu-item" onclick="window.injetar('AIN')">AGRAVO INTERNO</div>
    <div class="menu-item" onclick="window.injetar('CR')">CONTRARRAZÕES</div>
    <div class="menu-item" onclick="window.injetar('AP')">AGRAVO DE PETIÇÃO</div>
    <div class="menu-item" onclick="window.injetar('EE')">EMBARGOS À EXECUÇÃO</div>
    <div class="menu-item" onclick="window.injetar('EPE')">EXCEÇÃO PRÉ-EXECUTIVIDADE</div>
    <div class="menu-item" onclick="window.injetar('IDPJ')">INCIDENTE IDPJ</div>
    <div class="menu-item" onclick="window.injetar('MS')">MANDADO DE SEGURANÇA</div>
    <div class="menu-item" onclick="window.injetar('AR')">AÇÃO RESCISÓRIA</div>
    <div class="menu-item" onclick="window.injetar('ACU')">AÇÃO DE CUMPRIMENTO</div>
</div>

<script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getDatabase, ref, set, onValue, push, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
    
    const config = { apiKey: "AIzaSyAmigODFK8R9c0-fWtagdxLWu9xkODfKYQ", authDomain: "masteroab-db5e1.firebaseapp.com", projectId: "masteroab-db5e1", databaseURL: "https://masteroab-db5e1-default-rtdb.firebaseio.com" };
    const app = initializeApp(config); const db = getDatabase(app);
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

    const SALTO = "\n\n\n\n\n\n\n\n\n\n";
    const QUALIF = "nacionalidade..., estado civil..., profissão..., portador da cédula de identidade RG nº..., inscrito no CPF sob o nº..., endereço eletrônico..., residente e domiciliado na...";
    
    // ESPELHOS ATIVOS
    window.MEUS_ESPELHOS = {
        "44": `
            <label class="espelho-item"><input type="checkbox" value="0.10" onchange="window.calcNota()"><div class="espelho-txt">Endereçamento: 150ª Vara do Trabalho de Manaus</div><div class="espelho-pt">0.10</div></label>
            <label class="espelho-item"><input type="checkbox" value="0.30" onchange="window.calcNota()"><div class="espelho-txt">Indicação reclamados, reclamante e Art. 847 CLT</div><div class="espelho-pt">0.30</div></label>
            <label class="espelho-item"><input type="checkbox" value="0.40" onchange="window.calcNota()"><div class="espelho-txt">Preliminar: Ilegitimidade passiva dos sócios (Art. 50 CCB)</div><div class="espelho-pt">0.40</div></label>
            <label class="espelho-item"><input type="checkbox" value="0.40" onchange="window.calcNota()"><div class="espelho-txt">Preliminar: Inépcia do reenquadramento (Art. 330, § 1º, I ou Art. 337, IV CPC)</div><div class="espelho-pt">0.40</div></label>
            <label class="espelho-item"><input type="checkbox" value="0.40" onchange="window.calcNota()"><div class="espelho-txt">Prejudicial: Prescrição parcial (Art. 7º, XXIX CF ou Art. 11 CLT)</div><div class="espelho-pt">0.40</div></label>
            <label class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Ticket refeição - ausência de ultratividade (Art. 614, § 3º CLT)</div><div class="espelho-pt">0.50</div></label>
            <label class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Aviso prévio - indevida redução pedido demissão (Art. 488 CLT)</div><div class="espelho-pt">0.50</div></label>
            <label class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Periculosidade - não era trabalhadora em moto (Art. 193, § 4º CLT)</div><div class="espelho-pt">0.50</div></label>
            <label class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Reintegração - garantia encerrada ou pedido demissão</div><div class="espelho-pt">0.50</div></label>
            <label class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Vale transporte - uso de moto própria (Lei 7.418/85)</div><div class="espelho-pt">0.50</div></label>
            <label class="espelho-item"><input type="checkbox" value="0.90" onchange="window.calcNota()"><div class="espelho-txt">Pedidos e Fechamento</div><div class="espelho-pt">0.90</div></label>
        `,
        "41": `
            <label class="espelho-item"><input type="checkbox" value="0.20" onchange="window.calcNota()"><div class="espelho-txt">Endereçamento (503ª VT/DF) e Razões ao TRT</div><div class="espelho-pt">0.20</div></label>
            <label class="espelho-item"><input type="checkbox" value="0.10" onchange="window.calcNota()"><div class="espelho-txt">Fundamento: Art. 855-A, § 1º, II ou Art. 897, 'a' CLT</div><div class="espelho-pt">0.10</div></label>
            <label class="espelho-item"><input type="checkbox" value="0.70" onchange="window.calcNota()"><div class="espelho-txt">Tese: Juiz não poderia instaurar IDPJ de ofício (Art. 133 CPC)</div><div class="espelho-pt">0.70</div></label>
            <label class="espelho-item"><input type="checkbox" value="0.80" onchange="window.calcNota()"><div class="espelho-txt">Tese: Ilegitimidade (saída há +2 anos) - Art. 10-A CLT</div><div class="espelho-pt">0.80</div></label>
            <label class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Pedidos e Fechamento</div><div class="espelho-pt">0.50</div></label>
        `,
        "40": `<label class="espelho-item"><input type="checkbox" value="1.60" onchange="window.calcNota()"><div class="espelho-txt">Dano Material: Pensão (Art. 948 CCB)</div><div class="espelho-pt">1.60</div></label>`,
        "37": `<label class="espelho-item"><input type="checkbox" value="0.60" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Adicional transferência - Art. 469 CLT</div><div class="espelho-pt">0.60</div></label>`,
        "35": `<label class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Prescrição parcial: Súmula 153 TST</div><div class="espelho-pt">0.50</div></label>`
    };

    window.injetar = (tipo) => {
        const estruturas = {
            'RT': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}RECLAMANTE, ${QUALIF}, por seu advogado abaixo subscrito, vem propor RECLAMAÇÃO TRABALHISTA (Art. 840, § 1º, da CLT) em face de RECLAMADA, (qualificação), pelos fatos e fundamentos a seguir expostos:\n\nI - PRELIMINARMENTE\na) Justiça Gratuita (Art. 790, §3º CLT);\nb) Tramitação Prioritária (Art. 1.048 CPC);\nc) Antecipação de Tutela (Art. 300 CPC / Art. 273 CLT).\n\nII - DO MÉRITO (Fato, Fundamento e Pedido)\n1. (TÍTULO DO PEDIDO)\nFato: ...\nFundamento: (Artigo/Súmula/OJ) ...\nPedido: Requer a condenação ao pagamento de ...\n\nIII - REQUERIMENTOS FINAIS\na) Notificação da reclamada (Súmula 74 TST);\nb) Produção de provas (documental, testemunhal e pericial);\nc) PROCEDÊNCIA TOTAL com juros e correção;\nd) Honorários de sucumbência de 15% (Art. 791-A da CLT);\ne) Recolhimentos previdenciários e fiscais.\n\nAtribui-se à causa o valor de R$ ...\n\nNestes Termos, Pede Deferimento. Local e Data. Advogado... OAB...`,
            'CON': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}Processo nº...\nRECLAMADA, já qualificada, vem apresentar CONTESTAÇÃO (Art. 847 da CLT) em face de NOME DO RECLAMANTE.\n\nI - PRELIMINARES DE MÉRITO (Art. 337 do CPC)\n(Inépcia, Ilegitimidade, Perempção, Litispendência, Coisa Julgada).\n\nII - PREJUDICIAIS DE MÉRITO\n(Prescrição Bienal ou Quinquenal - Art. 7º, XXIX, CF/88).\n\nIII - DO MÉRITO\n(Impugnação específica para cada item - Fato, Fundamento e Pedido de Improcedência).\n\nIV - REQUERIMENTOS FINAIS\na) Acolhimento das preliminares e prejudiciais;\nb) No mérito, a TOTAL IMPROCEDÊNCIA;\nc) Produção de provas;\nd) Honorários de sucumbência (Art. 791-A, §3º CLT).\n\nNestes Termos, Pede Deferimento. Local e Data. Advogado... OAB...`,
            'ACP': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}NOME DO CONSIGNANTE, ${QUALIF}, vem propor AÇÃO DE CONSIGNAÇÃO EM PAGAMENTO (Art. 539 CPC)...`,
            'IAFG': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}NOME DO REQUERENTE... INQUÉRITO PARA APURAÇÃO DE FALTA GRAVE (Art. 853 CLT)...`,
            'HTE': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}REQUERENTES... HOMOLOGAÇÃO DE TRANSAÇÃO EXTRAJUDICIAL (Art. 855-B CLT)...`,
            'RO': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}Processo nº...\nRECORRENTE, vem interpor RECURSO ORDINÁRIO (Art. 895, I, da CLT) para o Egrégio TRT...`,
            'RR': `AO EXCELENTÍSSIMO SENHOR DOUTOR DESEMBARGADOR PRESIDENTE DO EGRÉGIO TRT... RECURSO DE REVISTA (Art. 896 CLT)...`,
            'AI': `AO DOUTO JUÍZO DA ... AGRAVO DE INSTRUMENTO (Art. 897, 'b' CLT)...`,
            'ED': `AO DOUTO JUÍZO DA ... EMBARGOS DE DECLARAÇÃO (Art. 897-A CLT)...`,
            'AIN': `AO EXCELENTÍSSIMO... AGRAVO INTERNO (Art. 1.021 CPC)...`,
            'CR': `AO DOUTO JUÍZO... CONTRARRAZÕES (Art. 900 CLT)...`,
            'AP': `AO JUÍZO DA... VARA DO TRABALHO... AGRAVO DE PETIÇÃO (Art. 897, 'a' CLT)...`,
            'EE': `AO JUÍZO DA... EMBARGOS À EXECUÇÃO (Art. 884 CLT)...`,
            'EPE': `AO JUÍZO DA... EXCEÇÃO DE PRÉ-EXECUTIVIDADE (Súmula 393 TST)...`,
            'IDPJ': `AO JUÍZO DA... INCIDENTE IDPJ (Art. 855-A CLT)...`,
            'MS': `AO EXCELENTÍSSIMO... MANDADO DE SEGURANÇA (Lei 12.016/09)...`,
            'AR': `AO EXCELENTÍSSIMO... AÇÃO RESCISÓRIA (Art. 836 CLT / Art. 966 CPC)...`,
            'ACU': `AO JUÍZO DA... AÇÃO DE CUMPRIMENTO (Art. 872 CLT)...`
        };
        document.getElementById('texto-final').value = estruturas[tipo];
        window.autoSave(); window.toggleEstruturas();
    };

    window.calcNota = () => {
        let t = 0; document.querySelectorAll('#checklist-fgv input:checked').forEach(i => t += parseFloat(i.value));
        document.getElementById('nota-valor').innerText = t.toFixed(2);
    };

    window.mudarExame = () => {
        const ex = document.getElementById('exam-select').value;
        window.carregarPDF('prova');
        document.getElementById('checklist-fgv').innerHTML = window.MEUS_ESPELHOS[ex] || 'Pendente.';
        document.getElementById('nota-valor').innerText = "0.00";
        get(ref(db, `v3_treino/exame_${ex}`)).then(s => document.getElementById('texto-final').value = s.val() || "");
        get(ref(db, `v3_respostas/exame_${ex}`)).then(s => document.getElementById('res-editor').value = s.val() || "");
        get(ref(db, `v3_dicas/exame_${ex}`)).then(s => document.getElementById('dicas-editor').value = s.val() || "");
        onValue(ref(db, `v7_nc/exame_${ex}`), (s) => {
            const lista = document.getElementById('lista-nc'); lista.innerHTML = "";
            if(s.val()) Object.entries(s.val()).forEach(([id, it]) => { 
                let explica = it.explicações.map(t => `<div style="font-size:0.8rem;">• ${t}</div>`).join('');
                lista.innerHTML += `<div style="background:var(--paper); padding:12px; margin-bottom:10px; border-left:5px solid var(--gold); border-radius:8px;"><b style="color:var(--gold);">${it.assunto}</b>${explica}</div>`; 
            });
        });
    };

    // PDF ENGINE
    let currentPdf = null;
    let totalSeconds = 5 * 60 * 60;
    setInterval(() => { if(totalSeconds > 0) { totalSeconds--; document.getElementById('timer-display').innerText = new Date(totalSeconds * 1000).toISOString().substr(11, 8); } }, 1000);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) renderizarPaginaLazy(parseInt(entry.target.dataset.pagenum), entry.target); });
    }, { root: document.getElementById('pdf-viewport'), threshold: 0.1 });

    window.carregarPDF = async (tipo) => {
        const ex = document.getElementById('exam-select').value;
        const arq = tipo === 'prova' ? `ro${ex}.pdf` : tipo === 'gabarito' ? `ro${ex}-gabarito.pdf` : `vade.pdf`;
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        if(document.getElementById(`tab-${tipo}`)) document.getElementById(`tab-${tipo}`).classList.add('active');
        const viewport = document.getElementById('pdf-viewport'); viewport.innerHTML = "";
        try {
            currentPdf = await pdfjsLib.getDocument(arq).promise;
            for (let i = 1; i <= currentPdf.numPages; i++) {
                const div = document.createElement('div'); div.className = 'page-container'; div.dataset.pagenum = i; div.style.height = "800px";
                viewport.appendChild(div); observer.observe(div);
            }
        } catch(e) { viewport.innerHTML = "<p style='color:white;padding:20px;'>Indisponível.</p>"; }
    };

    async function renderizarPaginaLazy(num, container) {
        if (container.dataset.rendered === "true") return;
        container.dataset.rendered = "true";
        const page = await currentPdf.getPage(num);
        const vp = page.getViewport({ scale: (document.getElementById('pdf-viewport').clientWidth - 20) / page.getViewport({scale:1}).width });
        container.style.height = "auto";
        const canvas = document.createElement('canvas'); canvas.height = vp.height; canvas.width = vp.width;
        container.appendChild(canvas);
        await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
    }

    // AUXILIARES
    window.saveMeta = (p, v) => set(ref(db, `${p}/exame_${document.getElementById('exam-select').value}`), v);
    window.autoSave = () => { clearTimeout(window.sv); window.sv = setTimeout(() => { window.saveMeta('v3_treino', document.getElementById('texto-final').value); }, 1000); };
    window.abrirModal = (id) => document.getElementById(id).style.display = 'flex';
    window.fecharModal = (id) => document.getElementById(id).style.display = 'none';
    window.toggleMobileView = () => document.getElementById('section-pdf').classList.toggle('active-mobile');
    window.toggleDarkMode = () => document.body.classList.toggle('dark-mode');
    window.toggleEstruturas = () => { const m = document.getElementById('menu-estruturas'); m.style.display = m.style.display==='block'?'none':'block'; };
    window.addExplicaçãoField = () => { const t = document.createElement('textarea'); t.className="explicação-item"; t.style.cssText="width:100%; height:60px; padding:10px; border-radius:5px; border:1px solid var(--border); background:var(--bg-site); color:var(--text); margin-top:5px;"; document.getElementById('container-explicações').appendChild(t); };
    window.saveNC = () => {
        const assunto = document.getElementById('nc-assunto').value;
        const ex = document.getElementById('exam-select').value;
        const explicações = Array.from(document.querySelectorAll('.explicação-item')).map(i => i.value).filter(v => v.trim() !== "");
        if(assunto && explicações.length > 0) {
            push(ref(db, `v7_nc/exame_${ex}`), { assunto, explicações }).then(() => {
                document.getElementById('nc-assunto').value = "";
                document.getElementById('container-explicações').innerHTML = '<textarea class="explicação-item" style="width:100%; height:60px; padding:10px; border-radius:5px; border:1px solid var(--border); background:var(--bg-site); color:var(--text);"></textarea>';
            });
        }
    };
    window.limparFolha = () => { if(confirm("Apagar?")) { document.getElementById('texto-final').value = ""; window.autoSave(); } };
    window.finalizarManual = () => window.saveMeta('v3_treino', document.getElementById('texto-final').value).then(() => alert("Sincronizado!"));

    // INIT
    const sel = document.getElementById('exam-select');
    for(let i=45; i>=1; i--) { 
        let n = i<10?"0"+i:i; let opt = document.createElement('option'); opt.value=n; opt.innerText=`EXAME ${n}`; if(i==44) opt.selected=true; sel.appendChild(opt); 
    }
    document.getElementById('ln-main').innerHTML = Array.from({length:350}, (_,i)=>i+1).join('<br>');
    document.getElementById('ln-res').innerHTML = Array.from({length:100}, (_,i)=>i+1).join('<br>');
    document.getElementById('ln-dicas').innerHTML = Array.from({length:100}, (_,i)=>i+1).join('<br>');
    window.mudarExame();
</script>
</body>
</html>
