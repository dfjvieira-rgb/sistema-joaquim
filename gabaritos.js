/**
 * gabarito.js - VERSÃO 19 PEÇAS TESTADA
 */

window.dbGabaritosExternos = {
    'rt': { 
        1: `AO DOUTO JUÍZO DA ... VARA DO TRABALHO DE FLORIANÓPOLIS/SC\nJOSÉ FININHO, garçom, qualificação e endereço completos, com fulcro no art. 840, caput e § 1º, da CLT, PROPOR:\nRECLAMAÇÃO TRABALHISTA em face de HEART ATTACK GRILL LTDA. e SINDICATO DOS EMPREGADOS ..., pelas razões de fato e de direito a seguir expostas.\n\nI – MÉRITO\n1. Equiparação salarial (Art. 461, CLT)\n2. Devolução do desconto (Art. 473, VIII, CLT / Súmula 155 TST)\n3. Intervalo intrajornada (Art. 71, caput e § 4º CLT)\n4. Diferenças de FGTS (Art. 611-B, III, CLT e Art. 15 Lei 8.036/90)\n5. Honorários advocatícios (Art. 791-A da CLT).\n\nAtribui-se à causa o valor de R$... .\nNestes termos, pede deferimento. Local e data. Advogado(a) OAB nº`
    },
    'consigna': { 
        1: `AO DOUTO JUÍZO DA ... VARA DO TRABALHO DE MACEIÓ/AL.\nZENGA MODAS LTDA., com fulcro no art. 539 do CPC c/c art. 769 da CLT, PROPOR:\nAÇÃO DE CONSIGNAÇÃO EM PAGAMENTO em face de JOANA FIRMINO.\n\nI – FATOS\nA consignatária não compareceu na data designada para o recebimento das verbas e do seu telefone celular pessoal deixado na empresa.\n\nII – MÉRITO\nPretende o depósito das verbas, bem como devolução do celular e da CTPS (Art. 542, I CPC).\n\nIII – REQUERIMENTOS FINAIS\na) o deferimento do depósito dos valores, celular e CTPS (art. 542, I, do CPC);\nb) a citação da consignatária para levantar os valores ou oferecer resposta;\nc) a procedência do pedido.`
    },
    'cont': { 
        1: `AO DOUTO JUÍZO DA 50ª VARA DO TRABALHO DE JOÃO PESSOA/PARAÍBA\nProcesso no 98.765.\nFLORICULTURA FLORES BELAS LTDA., com fulcro nos arts. 847 da CLT e 343 do CPC, OFERECER:\nCONTESTAÇÃO com pedido de reconvenção à reclamação trabalhista de ESTELA.\n\nI – PRELIMINAR: Incompetência (Art. 337, II CPC).\nII – PREJUDICIAL: Prescrição quinquenal (Art. 7º, XXIX CF / Art. 11 CLT).\nIII – MÉRITO: Adicional de Penosidade, Horas Extras e Plano de Saúde.\nIV – RECONVENÇÃO: Dano Material (Art. 186 e 927 CC).`
    },
    'emb_exec': { 
        1: `AO DOUTO JUÍZO DA 50a VARA DO TRABALHO DE BOA VISTA/RR\nProcesso no xxx\nRÔMULO DELGADO SILVA, com fulcro no art. 884 da CLT, APRESENTAR:\nEMBARGOS À EXECUÇÃO em face de SÔNIA CRISTINA DE ALMEIDA.\n\nI – REQUISITOS: Garantia integral do juízo e Tempestividade (5 dias).\nII – MÉRITO:\n1. Impenhorabilidade do bem de família (Lei 8.009/90).\n2. Multa do art. 523, § 1º, do CPC: Inaplicável ao Processo do Trabalho.`
    },
    // Categorias restantes para não quebrar a barra lateral
    'ro': {1:""}, 'ed': {1:""}, 'ap': {1:""}, 'ai': {1:""}, 'rr': {1:""}, 'epe': {1:""}, 
    'ms': {1:""}, 'acao_resc': {1:""}, 'inquerito': {1:""}, 'cautelar': {1:""}, 
    'habeas_corpus': {1:""}, 'habeas_data': {1:""}, 'mandado_injuncao': {1:""}, 
    'dissidio_coletivo': {1:""}, 'recurso_adesivo': {1:""}
};

const GabaritoManager = {
    config: {
        sujeira: /(P\s?á\s?gi\s?na\s*\d+\s*\|\s*\d+)|(@professoraaryannalinhares)|(@aryannalinhares)/gi
    },

    formatar: function(texto) {
        if (!texto) return "<p style='text-align:center; text-indent:0;'>Gabarito em breve.</p>";
        let limpo = texto.replace(this.config.sujeira, "");
        let linhas = limpo.split('\n');
        let html = "";
        let pAcumulado = "";

        linhas.forEach(linha => {
            let l = linha.trim();
            if (l === "") {
                if (pAcumulado) html += `<p>${pAcumulado}</p>`;
                pAcumulado = "";
            } else if (/^(I+|AO DOUTO|RECLAMAÇÃO|MÉRITO|PEDIDOS|III –|II –|Atribui-se|Nestes)/i.test(l)) {
                if (pAcumulado) html += `<p>${pAcumulado}</p>`;
                html += `<span class="titulo-juridico">${l}</span>`;
                pAcumulado = "";
            } else {
                pAcumulado += (pAcumulado ? " " : "") + l;
            }
        });
        if (pAcumulado) html += `<p>${pAcumulado}</p>`;
        return html;
    },

    renderizarNoSite: function(cat, q) {
        const container = document.getElementById('container-gabarito');
        if (container && window.dbGabaritosExternos[cat]) {
            container.innerHTML = this.formatar(window.dbGabaritosExternos[cat][q]);
            document.getElementById('viewport').scrollTop = 0;
        }
    }
};
