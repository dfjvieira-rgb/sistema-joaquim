// sistema-joaquim/estruturas.js

export const QUALIF = "nacionalidade..., estado civil..., profissão..., portador da cédula de identidade RG nº..., inscrito no CPF sob o nº..., endereço eletrônico..., residente e domiciliado na...";
export const SALTO = "\n\n\n\n\n\n\n\n\n\n";

export const pecas = {
    'RT': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}RECLAMANTE, ${QUALIF}, por seu advogado abaixo subscrito, vem propor RECLAMAÇÃO TRABALHISTA (Art. 840, § 1º, da CLT) em face de RECLAMADA, (qualificação), pelos fatos e fundamentos a seguir expostos:\n\nI - PRELIMINARMENTE\na) Justiça Gratuita (Art. 790, §3º CLT);\nb) Tramitação Prioritária (Art. 1.048 CPC);\nc) Antecipação de Tutela (Art. 300 CPC / Art. 273 CLT).\n\nII - DO MÉRITO (Fato, Fundamento e Pedido)\n1. (TÍTULO DO PEDIDO)\nFato: ...\nFundamento: (Artigo/Súmula/OJ) ...\nPedido: Requer a condenação ao pagamento de ...\n\nIII - REQUERIMENTOS FINAIS\na) Notificação da reclamada (Súmula 74 TST);\nb) Produção de provas (documental, testemunhal e pericial);\nc) PROCEDÊNCIA TOTAL com juros e correção;\nd) Honorários de sucumbência de 15% (Art. 791-A da CLT);\ne) Recolhimentos previdenciários e fiscais.\n\nAtribui-se à causa o valor de R$ ...\n\nNestes Termos, Pede Deferimento. Local e Data. Advogado... OAB...`,
    
    'CON': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}Processo nº...\nRECLAMADA, já qualificada, vem apresentar CONTESTAÇÃO (Art. 847 da CLT) em face de NOME DO RECLAMANTE.\n\nI - PRELIMINARES DE MÉRITO (Art. 337 do CPC)\n(Inépcia, Ilegitimidade, Perempção, Litispendência, Coisa Julgada).\n\nII - PREJUDICIAIS DE MÉRITO\n(Prescrição Bienal ou Quinquenal - Art. 7º, XXIX, CF/88).\n\nIII - DO MÉRITO\n(Impugnação específica para cada item - Fato, Fundamento e Pedido de Improcedência).\n\nIV - REQUERIMENTOS FINAIS\na) Acolhimento das preliminares e prejudiciais;\nb) No mérito, a TOTAL IMPROCEDÊNCIA;\nc) Produção de provas;\nd) Honorários de sucumbência (Art. 791-A, §3º CLT).\n\nNestes Termos, Pede Deferimento. Local e Data. Advogado... OAB...`,
    
    'ACP': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}NOME DO CONSIGNANTE, ${QUALIF}, vem, com fulcro no Art. 539 do CPC e Art. 769 da CLT, propor:\n\nAÇÃO DE CONSIGNAÇÃO EM PAGAMENTO\n\nI - DO DEPÓSITO\nRequer o depósito da quantia/objeto no prazo de 5 dias (Art. 542, I CPC).\n\nII - DO MÉRITO\n(Explicar recusa ou dúvida no pagamento - Art. 544 CPC).\n\nIII - REQUERIMENTOS FINAIS\na) Deferimento do depósito;\nb) Notificação do consignatário para levantar ou contestar;\nc) PROCEDÊNCIA para declarar extinta a obrigação e dar quitação das parcelas;\nd) Honorários.\n\nValor da causa: R$ ...\nNestes Termos, Pede Deferimento.`,
    
    'INQUERITO': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}NOME DO REQUERENTE, ${QUALIF}, vem, com fulcro no Art. 853 da CLT, propor:\n\nINQUÉRITO PARA APURAÇÃO DE FALTA GRAVE\n\nI - DA SUSPENSÃO (Prazo de 30 dias - Art. 853 CLT).\nII - DO MÉRITO (Falta grave - Art. 482 CLT).\nIII - REQUERIMENTOS FINAIS\na) Notificação do requerido;\nb) Oitiva de até 6 testemunhas (Art. 821 CLT);\nc) Procedência para rescindir o contrato por justa causa.\n\nNestes Termos, Pede Deferimento.`,
    
    'HOMOLOG': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}NOME DO REQUERENTE 1 e NOME DO REQUERENTE 2, por seus advogados distintos, vêm, com fulcro no Art. 855-B da CLT, requerer:\n\nHOMOLOGAÇÃO DE TRANSAÇÃO EXTRAJUDICIAL\n\nI - DOS TERMOS (Verbas, valores e prazos).\nII - DOS PEDIDOS\na) Suspensão do prazo prescricional (Art. 855-E CLT);\nb) Homologação por sentença (Título Executivo);\nc) Justiça gratuita.\n\nNestes Termos, Pedem Deferimento.`,
    
    'RO': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}Processo nº...\nRECORRENTE, vem interpor RECURSO ORDINÁRIO (Art. 895, I, da CLT) para o Egrégio TRT. Pressupostos de admissibilidade presentes (Tempestividade e Preparo anexos). Requer intimação da parte contrária e remessa ao Tribunal.\n\n----------\n\nRAZÕES DO RECURSO ORDINÁRIO\n\nI - PRELIMINARES/PREJUDICIAIS RECURSAIS\nII - MÉRITO (REFORMA DO JULGADO)\n(Tese: Fato, Fundamento e Pedido de Reforma).\n\nIII - CONCLUSÃO\nRequer o CONHECIMENTO e PROVIMENTO do recurso.\n\nLocal e Data. Advogado... OAB...`,
    
    'RR': `AO EXCELENTÍSSIMO SENHOR DOUTOR DESEMBARGADOR PRESIDENTE DO EGRÉGIO TRT DA ... REGIÃO\n\nProcesso nº ...${SALTO}NOME DO RECORRENTE, já qualificado, vem, com fulcro no Art. 896 da CLT, interpor RECURSO DE REVISTA.\n\n----------\n\nRAZÕES DO RECURSO DE REVISTA\n\nI - TRANSCENDÊNCIA (Art. 896-A CLT);\nII - PRESSUPOSTOS INTRÍNSECOS (Divergência ou Violação);\nIII - PREQUESTIONAMENTO (Transcrição do trecho da decisão - Art. 896, §1º-A CLT).\nIV - CONCLUSÃO: Conhecimento e Provimento.`,
    
    'AI': `AO DOUTO JUÍZO DA ...\n\nProcesso nº ...${SALTO}NOME DO AGRAVANTE, já qualificado, vem, com fulcro no Art. 897, 'b' da CLT, interpor AGRAVO DE INSTRUMENTO. Declara a formação do instrumento (Art. 897, § 5º CLT). Preparo recolhido (Art. 899, §7º CLT).\n\n----------\n\nRAZÕES DO AGRAVO DE INSTRUMENTO\n\nI - DA REFORMA (Demonstrar cabimento do recurso destrancado).\nII - CONCLUSÃO: Provimento para processar o recurso denegado.`,
    
    'ED': `AO DOUTO JUÍZO DA ...\n\nProcesso nº ...${SALTO}NOME DA PARTE, já qualificada, vem, com fulcro no Art. 897-A da CLT e Art. 1.022 do CPC, opor:\n\nEMBARGOS DE DECLARAÇÃO\n\nI - CABIMENTO (Omissão, Contradição, Obscuridade ou Erro Material).\nII - RAZÕES e PEDIDO: Sanar o vício com efeito modificativo.`,
    
    'AG_INTERNO': `AO EXCELENTÍSSIMO SENHOR DOUTOR DESEMBARGADOR RELATOR DO EGRÉGIO TRT DA ... REGIÃO\n\nProcesso nº ...${SALTO}NOME DO AGRAVANTE, vem, com fulcro no Art. 1.021 do CPC, interpor AGRAVO INTERNO.\n\nI - RAZÕES: Impugnação específica dos fundamentos da decisão monocrática.\nII - CONCLUSÃO: Retratação ou Provimento.`,
    
    'CONTRA': `AO DOUTO JUÍZO DA ...\n\nProcesso nº ...${SALTO}NOME DO RECORRIDO, já qualificado, vem, com fulcro no Art. 900 da CLT, apresentar:\n\nCONTRARRAZÕES AO RECURSO (...)\n\nI - MÉRITO: Manutenção da decisão.\nII - CONCLUSÃO: Não provimento do recurso adverso.`,
    
    'AP': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}Processo nº... (Execução)\nAGRAVANTE, vem interpor AGRAVO DE PETIÇÃO (Art. 897, 'a', da CLT). O Agravante delimita, justificadamente, as matérias e os valores impugnados (Art. 897, § 1º da CLT).\n\n----------\n\nRAZÕES DO AGRAVO DE PETIÇÃO\n\nI - MÉRITO (Reforma na execução).\nII - CONCLUSÃO: Conhecimento e Provimento.`,
    
    'EEX': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}Processo nº ... (Execução)\nNOME DO EXECUTADO, já qualificado, vem, com fulcro no Art. 884 da CLT, opor:\n\nEMBARGOS À EXECUÇÃO\n\n(Garantia do juízo comprovada).\nI - MÉRITO (Art. 884 CLT).\nII - PEDIDO: Procedência para ajustar a execução.`,
    
    'EX_PRE': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}Processo nº ...\nNOME DO EXECUTADO, vem, com base na Súmula 393 do TST, opor:\n\nEXCEÇÃO DE PRÉ-EXECUTIVIDADE\n\nI - CABIMENTO (Ordem pública - sem garantia do juízo).\nII - MÉRITO E PEDIDO: Extinção da execução.`,
    
    'IDPJ': `AO JUÍZO DA... \n\nProcesso nº ...${SALTO}NOME DO REQUERENTE, vem, com fulcro no Art. 855-A da CLT, suscitar:\n\nINCIDENTE DE DESCONSIDERAÇÃO DA PERSONALIDADE JURÍDICA\n\nI - MÉRITO (Art. 50 CC / Art. 28 CDC).\nII - PEDIDO: Citação dos sócios e suspensão do processo (Art. 134, §3º CPC).`,
    
    'MS': `AO EXCELENTÍSSIMO SENHOR DOUTOR DESEMBARGADOR PRESIDENTE DO EGRÉGIO TRT DA ... REGIÃO${SALTO}NOME DO IMPETRANTE, ${QUALIF}, vem, com fulcro no Art. 5º, LXIX da CF/88 e Lei 12.016/09, impetrar:\n\nMANDADO DE SEGURANÇA COM PEDIDO LIMINAR\n\nI - CABIMENTO (OJ 92 SDI-2).\nII - DA LIMINAR (Fumus boni iuris e Periculum in mora).\nIII - MÉRITO (Direito Líquido e Certo).\nIV - PEDIDOS: Liminar, Notificação da Autoridade Coatora, Ciência ao Órgão de Representação, Oitiva do MPT e Segurança Definitiva.\n\nValor da causa: R$ ...`,
    
    'AR': `AO EXCELENTÍSSIMO SENHOR DOUTOR DESEMBARGADOR PRESIDENTE DO EGRÉGIO TRT DA ... REGIÃO${SALTO}NOME DO AUTOR, ${QUALIF}, vem, com fulcro no Art. 836 da CLT e Art. 966 do CPC, propor:\n\nAÇÃO RESCISÓRIA\n\nI - DEPÓSITO PRÉVIO (20% - Art. 836 CLT).\nII - CABIMENTO (Art. 966 CPC - Trânsito em julgado).\nIII - PEDIDOS: Juízo Rescindente (desconstituição) e Juízo Rescisório (novo julgamento).\n\nValor da causa: R$ ...`,
    
    'ACUM': `AO JUÍZO DA... VARA DO TRABALHO DE...${SALTO}NOME DO SINDICATO, substituto processual, vem, com fulcro no Art. 872 da CLT, propor:\n\nAÇÃO DE CUMPRIMENTO\n\nI - MÉRITO (Título Normativo).\nII - PEDIDO: Cumprimento e multa normativa.\n\nValor da causa: R$ ...`
};

export const MEUS_ESPELHOS = {
    "44": `
        <div class="nota-floating">ESPELHO OFICIAL - EXAME 44 (CONTESTAÇÃO)</div>
        <div class="espelho-item"><input type="checkbox" value="0.10" onchange="window.calcNota()"><div class="espelho-txt">Endereçamento: 150ª Vara do Trabalho de Manaus</div><div class="espelho-pt">0.10</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.30" onchange="window.calcNota()"><div class="espelho-txt">Indicação reclamados, reclamante e Art. 847 CLT</div><div class="espelho-pt">0.30</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.40" onchange="window.calcNota()"><div class="espelho-txt">Preliminar: Ilegitimidade passiva dos sócios (Art. 50 CCB)</div><div class="espelho-pt">0.40</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.40" onchange="window.calcNota()"><div class="espelho-txt">Preliminar: Inépcia do reenquadramento (Art. 330, § 1º, I ou Art. 337, IV CPC)</div><div class="espelho-pt">0.40</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.40" onchange="window.calcNota()"><div class="espelho-txt">Prejudicial: Prescrição parcial - anterior a 28/04/2020 (Art. 7º, XXIX CF ou Art. 11 CLT)</div><div class="espelho-pt">0.40</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Ticket refeição - ausência de ultratividade (Art. 614, § 3º CLT)</div><div class="espelho-pt">0.50</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Aviso prévio - indevida redução pedido demissão (Art. 488 CLT)</div><div class="espelho-pt">0.50</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Periculosidade - não era trabalhadora em moto (Art. 193, § 4º CLT)</div><div class="espelho-pt">0.50</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Reintegração - garantia encerrada ou pedido demissão (Súmula 244, II TST ou Art. 10, II, b ADCT)</div><div class="espelho-pt">0.50</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Vale transporte - uso de moto própria (Lei 7.418/85 ou Dec. 10.854/21)</div><div class="espelho-pt">0.50</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.90" onchange="window.calcNota()"><div class="espelho-txt">Pedidos (Renovação preliminares/improcedência/provas/honorários) e Fechamento</div><div class="espelho-pt">0.90</div></div>
    `,
    "41": `
        <div class="nota-floating">ESPELHO OFICIAL - EXAME 41 (AGRAVO DE PETIÇÃO)</div>
        <div class="espelho-item"><input type="checkbox" value="0.20" onchange="window.calcNota()"><div class="espelho-txt">Endereçamento (503ª VT/DF) e Razões ao TRT</div><div class="espelho-pt">0.20</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.20" onchange="window.calcNota()"><div class="espelho-txt">Partes (Maria Serra e Jeferson Peres)</div><div class="espelho-pt">0.20</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.10" onchange="window.calcNota()"><div class="espelho-txt">Fundamento: Art. 855-A, § 1º, II ou Art. 897, 'a' CLT</div><div class="espelho-pt">0.10</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.20" onchange="window.calcNota()"><div class="espelho-txt">Delimitação justificada matérias (Art. 897, § 1º CLT)</div><div class="espelho-pt">0.20</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.20" onchange="window.calcNota()"><div class="espelho-txt">Tempestividade 8 dias (Art. 897, caput CLT)</div><div class="espelho-pt">0.20</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.70" onchange="window.calcNota()"><div class="espelho-txt">Tese: Juiz não poderia instaurar IDPJ de ofício (Art. 133 CPC)</div><div class="espelho-pt">0.70</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.70" onchange="window.calcNota()"><div class="espelho-txt">Tese: Suspensão do processo (Art. 134, § 3º CPC ou Art. 855-A, § 2º CLT)</div><div class="espelho-pt">0.70</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.70" onchange="window.calcNota()"><div class="espelho-txt">Tese: Prazo manifestação 15 dias desrespeitado (Art. 135 CPC)</div><div class="espelho-pt">0.70</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.80" onchange="window.calcNota()"><div class="espelho-txt">Tese: Ilegitimidade (saída há +2 anos ou não era sócia na admissão) - Art. 10-A CLT</div><div class="espelho-pt">0.80</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.70" onchange="window.calcNota()"><div class="espelho-txt">Tese: Impenhorabilidade aposentadoria (Art. 833, IV ou Art. 529, § 3º CPC)</div><div class="espelho-pt">0.70</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Pedidos (Revogação tutela/levantamento penhora/conhecimento e provimento) e Fechamento</div><div class="espelho-pt">0.50</div></div>
    `,
    "40": `
        <div class="nota-floating">ESPELHO OFICIAL - EXAME 40 (RECLAMAÇÃO TRABALHISTA)</div>
        <div class="espelho-item"><input type="checkbox" value="0.20" onchange="window.calcNota()"><div class="espelho-txt">Endereçamento VT Osasco/SP e Art. 840, § 1º CLT</div><div class="espelho-pt">0.20</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.20" onchange="window.calcNota()"><div class="espelho-txt">Qualificação Espólio/Julieta e Distribuidora Capuleto Ltda.</div><div class="espelho-pt">0.20</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.20" onchange="window.calcNota()"><div class="espelho-txt">Gratuidade de justiça (Art. 790, § 3º ou § 4º CLT)</div><div class="espelho-pt">0.20</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.20" onchange="window.calcNota()"><div class="espelho-txt">Prioridade tramitação idosa (Art. 1048 CPC ou Art. 71 Lei 10.741)</div><div class="espelho-pt">0.20</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Reconhecimento vínculo/anotação CTPS (Art. 3º ou Art. 29 CLT)</div><div class="espelho-pt">0.50</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Verbas: Saldo, 13º, Férias, FGTS e Multa Art. 477, § 8º CLT</div><div class="espelho-pt">0.50</div></div>
        <div class="espelho-item"><input type="checkbox" value="1.60" onchange="window.calcNota()"><div class="espelho-txt">Dano Material: Enterro, Seguro Vida, Pensão Morte e Pensão Empregador (Art. 186/927/948 CCB)</div><div class="espelho-pt">1.60</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Dano Moral acidente (Art. 223-B/C/G CLT ou 186/927/944 CCB)</div><div class="espelho-pt">0.50</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.40" onchange="window.calcNota()"><div class="espelho-txt">Honorários advocatícios (Art. 791-A CLT)</div><div class="espelho-pt">0.40</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.70" onchange="window.calcNota()"><div class="espelho-txt">Pedidos (Procedência/Valores estimados) e Fechamento</div><div class="espelho-pt">0.70</div></div>
    `,
    "37": `
        <div class="nota-floating">ESPELHO OFICIAL - EXAME 37 (CONTESTAÇÃO)</div>
        <div class="espelho-item"><input type="checkbox" value="0.30" onchange="window.calcNota()"><div class="espelho-txt">Endereçamento (85ª VT/RJ), Peça Jorge Machado e Art. 847 CLT</div><div class="espelho-pt">0.30</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.60" onchange="window.calcNota()"><div class="espelho-txt">Preliminar: Adiamento audiência (Art. 841 CLT)</div><div class="espelho-pt">0.60</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.60" onchange="window.calcNota()"><div class="espelho-txt">Preliminar: Ilegitimidade Jorge (saída há +2 anos) - Art. 10-A CLT ou 1.003 CC</div><div class="espelho-pt">0.60</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.60" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Adicional transferência (sem mudança domicílio) - Art. 469 CLT</div><div class="espelho-pt">0.60</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.60" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Horas in itinere (deslocamento não é disposição) - Art. 58, § 2º CLT</div><div class="espelho-pt">0.60</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.60" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Intervalo digitador (não era a função) - Art. 72 CLT ou Súmula 346 TST</div><div class="espelho-pt">0.60</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.60" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Acúmulo de tarefas (inseridas na função) - Art. 456, p.u. CLT</div><div class="espelho-pt">0.60</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Pedidos: Renovação preliminares e extinção ex-sócio</div><div class="espelho-pt">0.50</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.60" onchange="window.calcNota()"><div class="espelho-txt">Requerimentos (Improcedência/Provas/Honorários Art. 791-A) e Fechamento</div><div class="espelho-pt">0.60</div></div>
    `,
    "35": `
        <div class="nota-floating">ESPELHO OFICIAL - EXAME 35 (RECURSO ORDINÁRIO)</div>
        <div class="espelho-item"><input type="checkbox" value="0.30" onchange="window.calcNota()"><div class="espelho-txt">Endereçamento (89ª VT Floriano/PI), razões ao TRT e Art. 895, I CLT</div><div class="espelho-pt">0.30</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.20" onchange="window.calcNota()"><div class="espelho-txt">Partes (Sociedade empresária recorrente e empregado recorrido)</div><div class="espelho-pt">0.20</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.20" onchange="window.calcNota()"><div class="espelho-txt">Tempestividade (8 dias) e Preparo (Custas/Depósito Recursal)</div><div class="espelho-pt">0.20</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Prescrição parcial: arguida em instância ordinária (Súmula 153 TST ou Art. 193 CC)</div><div class="espelho-pt">0.50</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Intervalo interjornada de 11h observado (Art. 66 CLT)</div><div class="espelho-pt">0.50</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Indevida reintegração (estabilidade só p/ dirigente sindical) - Art. 543 CLT ou Art. 8º, VIII CF</div><div class="espelho-pt">0.50</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Mérito: FGTS indevido por suspensão contratual (Art. 476 CLT ou Art. 15, §5º Lei 8036)</div><div class="espelho-pt">0.50</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Ajuda de custo - natureza indenizatória (Art. 457, §2º CLT)</div><div class="espelho-pt">0.50</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Equiparação indevida - estabelecimentos distintos (Art. 461 CLT)</div><div class="espelho-pt">0.50</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.50" onchange="window.calcNota()"><div class="espelho-txt">Mérito: Insalubridade indevida por reclassificação (Art. 194 CLT ou Súmula 248 TST)</div><div class="espelho-pt">0.50</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.40" onchange="window.calcNota()"><div class="espelho-txt">Honorários indevidos (improcedência) ou limite 15% (Art. 791-A CLT)</div><div class="espelho-pt">0.40</div></div>
        <div class="espelho-item"><input type="checkbox" value="0.40" onchange="window.calcNota()"><div class="espelho-txt">Requerimentos (Conhecimento/Provimento/Reforma/Acolhimento Prescrição) e Fechamento</div><div class="espelho-pt">0.40</div></div>
    `
};
