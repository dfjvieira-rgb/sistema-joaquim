/**
 * ARYANNA MASTER PRO 2026 - Banco de Dados de Estruturas e Espelhos
 * Fidelidade Absoluta: Conteúdo Oficial FGV Sem Supressões.
 */

const SALTO = "\n\n\n\n\n\n\n\n\n\n";
const QUALIF = "nacionalidade..., estado civil..., profissão..., portador da cédula de identidade RG nº..., inscrito no CPF sob o nº..., endereço eletrônico..., residente e domiciliado na...";

const estruturas = {
    // --- MODELOS COMPLETOS POR EXAME ---
    "44": "EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DA 150ª VARA DO TRABALHO DE MANAUS" + SALTO + 
          "Processo nº: ...\nXYZ LTDA, SANDRA PI e WALMIR LÉ, já qualificados nos autos da Reclamação Trabalhista que lhe move RECLAMANTE, vêm, por intermédio de seu advogado, à presença de Vossa Excelência, apresentar CONTESTAÇÃO, com fulcro no Art. 847 da CLT, pelas razões de fato e de direito a seguir expostas:\n\n" +
          "I - PRELIMINARES\n" +
          "1. Ilegitimidade Passiva dos Sócios: Indevidas as suas participações porque não há alegação de fraude ou abuso de direito ou confusão patrimonial ou a empresa é solvente. Indicação do Art. 50 do CCB.\n" +
          "2. Inépcia do Reenquadramento: Porque não tem causa de pedir/fundamento. Indicação do Art. 330, § 1º, inciso I, ou Art. 337, inciso IV, ambos do CPC.\n\n" +
          "II - PREJUDICIAL DE MÉRITO\n" +
          "1. Prescrição Parcial: Requer o pronunciamento da prescrição quanto às pretensões anteriores a 28/04/2020. Indicação do Art. 7º, inciso XXIX, da CF ou Art. 11 da CLT ou Súmula 308, inciso I, do TST.\n\n" +
          "III - MÉRITO\n" +
          "1. Ticket Refeição: Improcedência do pedido por ausência de previsão em norma coletiva ou porque a norma anterior expirou e não há ultratividade. Indicação do Art. 614, § 3º, da CLT.\n" +
          "2. Jornada/Aviso Prévio: Improcedência porque a redução não ocorre no pedido de demissão ou só ocorre na dispensa sem justa causa. Indicação do Art. 488 da CLT.\n" +
          "3. Periculosidade: Improcedência porque a autora não era trabalhadora em motocicleta. Indicação do Art. 193, § 4º, da CLT.\n" +
          "4. Reintegração: Improcedência porque o período da garantia no emprego já terminou (Súmula 244, inciso II, do TST) ou porque houve pedido de demissão (Art. 10, II, alínea b, do ADCT).\n" +
          "5. Vale Transporte: Improcedência porque a autora não usava transporte coletivo ou porque usava motocicleta na ida e na volta do trabalho. Indicação do Art. 1º da Lei nº 7.418/1985 ou do Art. 108 do Decreto nº 10.854/2021.\n\n" +
          "IV - REQUERIMENTOS FINAIS\n" +
          "Renovação das preliminares de ilegitimidade passiva dos sócios e de inépcia, acolhimento da prejudicial de prescrição e, no mérito, a total improcedência dos pedidos. Requer a condenação em honorários de sucumbência (Art. 791-A da CLT) e a produção de provas.\n\n" +
          "Nestes Termos, Pede Deferimento. Local e Data. Advogado... OAB...",

    "41": "EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DA 503ª VARA DO TRABALHO DO DISTRITO FEDERAL" + SALTO + 
          "Processo nº: ...\nMARIA SERRA, por seu advogado, nos autos da execução movida por JEFERSON PERES, vem perante Vossa Excelência interpor AGRAVO DE PETIÇÃO, com fulcro no Art. 855-A, § 1º, II, ou Art. 897, 'a', ambos da CLT. O Agravante delimita, justificadamente, as matérias e os valores impugnados conforme Art. 897, § 1º, da CLT. Peça tempestiva (8 dias) conforme Art. 897, caput, da CLT.\n\n" +
          "----------\n\n" +
          "RAZÕES DO AGRAVO DE PETIÇÃO\n" +
          "EGRÉGIO TRIBUNAL REGIONAL DO TRABALHO DA 10ª REGIÃO\n\n" +
          "I - MÉRITO\n" +
          "1. Nulidade do IDPJ: O Juiz não poderia instaurar o IDPJ de ofício. Indicação Art. 133 do CPC. O processo deveria ser suspenso. Indicação Art. 134, § 3º, do CPC ou Art. 855-A, § 2º, da CLT. O prazo para manifestação não respeitou os 15 (quinze) dias legais. Indicação Art. 135 do CPC.\n" +
          "2. Ilegitimidade Passiva: Maria é parte ilegítima porque saiu do quadro social há mais de 2 anos antes do ajuizamento da ação. Indicação Art. 10-A da CLT ou Art. 1.032 do CC.\n" +
          "3. Impenhorabilidade: Levantamento da penhora sobre proventos de aposentadoria (Art. 833, IV, do CPC).\n\n" +
          "II - CONCLUSÃO\n" +
          "Requer o conhecimento e provimento do recurso para reforma da decisão. Local e Data. Advogado... OAB...",

    "40": "AO JUÍZO DA VARA DO TRABALHO DE OSASCO/SP" + SALTO + 
          "ESPÓLIO DE..., representado por sua sucessora JULIETA, " + QUALIF + ", por seu advogado abaixo subscrito, vem propor RECLAMAÇÃO TRABALHISTA pelo rito ordinário em face de DISTRIBUIDORA CAPULETO LTDA, com fulcro no Art. 840, § 1º, da CLT.\n\n" +
          "I - PRELIMINARMENTE\n" +
          "1. Justiça Gratuita: Requer o benefício conforme Art. 790, § 3º ou § 4º da CLT.\n" +
          "2. Tramitação Prioritária: Requer a prioridade por ser a sucessora idosa conforme Art. 1048 do CPC ou Art. 71 da Lei 10.741/03.\n\n" +
          "II - DO MÉRITO\n" +
          "1. Vínculo e Verbas: Reconhecimento do vínculo empregatício ou anotação da CTPS (Art. 3º ou Art. 29 da CLT). Pagamento de saldo salarial, 13º salário proporcional, férias proporcionais, FGTS e multa do Art. 477, § 8º, da CLT.\n" +
          "2. Dano Patrimonial: Indenização pelo gasto com o enterro, pelo seguro de vida, pela pensão previdenciária por morte e pensão a cargo do empregador (Art. 186, 927, 948 ou 949 do CCB).\n" +
          "3. Dano Moral: Indenização por dano moral pelo acidente do trabalho conforme o Art. 186 e o Art. 927 do CC, ou o Art. 223-B da CLT.\n\n" +
          "III - REQUERIMENTOS FINAIS\n" +
          "Notificação da reclamada, procedência total com juros e correção, honorários advocatícios (Art. 791-A da CLT). Atribui-se à causa o valor de R$... (valor estimado).\n\n" +
          "Nestes Termos, Pede Deferimento. Local e Data. Advogado... OAB...",

    "37": "AO JUÍZO DA 85ª VARA DO TRABALHO DO RIO DE JANEIRO/RJ" + SALTO + 
          "Processo nº: ...\nJORGE MACHADO, já qualificado nos autos, vem apresentar CONTESTAÇÃO em face da Reclamação Trabalhista movida por (NOME), com fulcro no Art. 847 da CLT.\n\n" +
          "I - PRELIMINARES\n" +
          "1. Adiamento: Da audiência por não se observar o prazo mínimo de 5 dias entre a notificação e a audiência. Indicação Art. 841, CLT.\n" +
          "2. Ilegitimidade: De Jorge Machado porque ele saiu da sociedade há mais de 2 anos antes do ajuizamento da ação. Indicação Art. 10-A, CLT ou Art. 1.003, parágrafo único, CCB.\n\n" +
          "II - MÉRITO\n" +
          "1. Adicional de Transferência: Improcedência por não haver mudança de domicílio. Indicação Art. 469, CLT.\n" +
          "2. Horas in itinere: Improcedência porque o deslocamento não é tempo à disposição ou não é computado na jornada. Indicação Art. 58, § 2º, CLT.\n" +
          "3. Intervalo Digitador: Improcedência porque o autor não exercia essa função ou não digitava de forma contínua. Indicação Art. 72, CLT ou Súmula 346 TST.\n" +
          "4. Acúmulo de Função: Improcedência porque as tarefas estavam inseridas na função do autor. Indicação Art. 456, parágrafo único, CLT.\n\n" +
          "III - REQUERIMENTOS FINAIS\n" +
          "Renovação da preliminar de adiamento e exclusão do ex-sócio com extinção sem resolução de mérito, e no mérito a improcedência total. Honorários de sucumbência.\n\n" +
          "Nestes Termos, Pede Deferimento. Local e Data. Advogado... OAB...",

    "35": "AO JUÍZO DA 89ª VARA DO TRABALHO DE FLORIANO/PI" + SALTO + 
          "Processo nº: ...\nSOCIEDADE EMPRESÁRIA..., já qualificada, vem interpor RECURSO ORDINÁRIO para o Egrégio TRT da 22ª Região, com fulcro no Art. 895, inciso I, da CLT. Pressupostos presentes: tempestividade (8 dias), custas e depósito recursal recolhidos.\n\n" +
          "----------\n\n" +
          "RAZÕES DO RECURSO ORDINÁRIO\n\n" +
          "1. Prescrição parcial: Arguida em instância ordinária conforme Súmula 153 do TST.\n" +
          "2. Intervalo Interjornada: Respeitado o intervalo de 11 horas entre jornadas. Indicação Art. 66 da CLT.\n" +
          "3. Reintegração: Inexistência de estabilidade por não se tratar de dirigente sindical. Indicação Art. 543, § 3º da CLT ou Art. 8º, VIII da CF.\n" +
          "4. FGTS: Indevido o recolhimento porque o contrato estava suspenso. Indicação Art. 476, CLT.\n" +
          "5. Ajuda de Custo: Indevida a integração por não ter natureza salarial. Indicação Art. 457, § 2º, da CLT.\n" +
          "6. Equiparação salarial: Indevida porque autor e modelo não atuavam no mesmo estabelecimento. Indicação Art. 461 da CLT.\n" +
          "7. Insalubridade: Indevida porque a reclassificação gera perda do adicional. Indicação Art. 194 da CLT ou Súmula 248 do TST.\n\n" +
          "III - CONCLUSÃO\n" +
          "Requer o conhecimento e provimento para reforma da sentença. Local e Data. Advogado... OAB...",

    // --- ESQUELETOS TÉCNICOS GERAIS ---
    'RT': "AO JUÍZO DA... VARA DO TRABALHO DE..." + SALTO + "RECLAMANTE, " + QUALIF + ", por seu advogado abaixo subscrito, vem propor RECLAMAÇÃO TRABALHISTA (Art. 840, § 1º, da CLT)...",
    'CON': "AO JUÍZO DA... VARA DO TRABALHO DE..." + SALTO + "Processo nº...\nRECLAMADA, já qualificada, vem apresentar CONTESTAÇÃO (Art. 847 da CLT)...",
    'RO': "AO JUÍZO DA... VARA DO TRABALHO DE..." + SALTO + "Processo nº...\nRECORRENTE, vem interpor RECURSO ORDINÁRIO (Art. 895, I, da CLT)..."
};
