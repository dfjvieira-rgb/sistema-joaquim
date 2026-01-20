/**
 * gabarito.js - Versão Otimizada 2026
 * Implementa limpeza automática de rodapés/redes sociais e formatação de parágrafos.
 */

// 1. BANCO DE DADOS (PARTE 1)
window.dbGabaritosExternos = {
    'rt': {
        1: `1.2.EXERCÍCIO I DE RECLAMAÇÃO TRABALHISTA
José Fininho foi contratado pela empresa Heart Attack Grill Ltda., para trabalhar na cidade de Florianópolis/SC, como garçom, mediante salário de R$ 2.000,00.
O empregado afirma que uma das especialidades da Lanchonete era o sanduíche denominado quadruple bypass com 4 hambúrgueres: 1 quilo de carne e 8.000 calorias.
Relata que foi contratado no mesmo dia em que Juan para exercer a mesma função, na mesma filial. O trabalho se dava com a mesma perfeição técnica e produtividade, porém Juan recebia salário fixo de R$ 2.500,00 por mês.

O senhor Fininho conta que, em janeiro do ano da extinção do contrato, faltou ao trabalho por um dia para comparecer em juízo como parte no processo em que litigava contra seu ex-empregador. Embora tenha apresentado a certidão da Justiça do Trabalho confirmando suas alegações, o dia foi descontado do seu salário.

O empregado comenta também que trabalhava 8 horas diárias de segunda a sexta-feira e usufruía de apenas 30 minutos de intervalo intrajornada.
No curso do contrato, o empregador depositava apenas 4% do valor da remuneração a título de FGTS, pois havia acordo coletivo de trabalho autorizando o recolhimento de apenas metade do valor.

RESOLUÇÃO
AO DOUTO JUÍZO DA ... VARA DO TRABALHO DE FLORIANÓPOLIS/SC
JOSÉ FININHO, garçom, qualificação e endereço completos, com fulcro no art. 840, caput e § 1º, da CLT, PROPOR:
RECLAMAÇÃO TRABALHISTA em face de HEART ATTACK GRILL LTDA. e SINDICATO DOS EMPREGADOS ..., pelas razões de fato e de direito a seguir expostas.

I – MÉRITO
1. Equiparação salarial (Art. 461, CLT)
2. Devolução do desconto (Art. 473, VIII, CLT / Súmula 155 TST)
3. Intervalo intrajornada (Art. 71, caput e § 4º CLT)
4. Diferenças de FGTS (Art. 611-B, III, CLT e Art. 15 Lei 8.036/90)
5. Honorários advocatícios (Art. 791-A da CLT).

Atribui-se à causa o valor de R$... .
Nestes termos, pede deferimento. Local e data. Advogado(a) OAB nº`,
        'guia': `💡 DICAS DE MENTORIA - RECLAMAÇÃO TRABALHISTA:\n\n1. EQUIPARAÇÃO: Art. 461 CLT. Requisitos preenchidos no enunciado.\n2. DESCONTO INDEVIDO: Art. 473, VIII CLT. Comparecimento em juízo como parte não gera desconto.\n3. INTERVALO: Art. 71 CLT. Jornada > 6h exige 1h de intervalo.\n4. FGTS: Art. 611-B, III CLT. FGTS é direito indisponível.`
    },

    'consigna': {
        1: `6.3. EXERCÍCIO DE AÇÃO DE CONSIGNAÇÃO EM PAGAMENTO
ZENGA MODAS LTDA. dispensa Joana Firmino. Joana cientificada de que deveria comparecer para receber verbas rescisórias, mas não compareceu.

AO DOUTO JUÍZO DA ... VARA DO TRABALHO DE MACEIÓ/AL.
ZENGA MODAS LTDA., com fulcro no art. 539 do CPC c/c art. 769 da CLT, PROPOR:
AÇÃO DE CONSIGNAÇÃO EM PAGAMENTO em face de JOANA FIRMINO.

I – FATOS
A consignatária não compareceu na data designada para o recebimento das verbas e do seu telefone celular pessoal deixado na empresa.

II – MÉRITO
Pretende o depósito das verbas (Saldo Salário, Aviso Prévio, 13º, Férias em dobro e proporcionais, Multa FGTS), bem como devolução do celular e da CTPS (Art. 542, I CPC). Ressalte-se ser indevida a multa do Art. 477, § 8º da CLT pois não há atraso por culpa da empresa.

III – REQUERIMENTOS FINAIS
a) o deferimento do depósito dos valores, celular e CTPS (art. 542, I, do CPC);
b) a citação da consignatária para levantar os valores ou oferecer resposta;
c) a procedência do pedido com a declaração de extinção da obrigação e condenação em honorários de 15% (art. 791-A da CLT).`,
        'guia': `💡 DICAS DE MENTORIA - CONSIGNAÇÃO:\n\n1. OBJETO: A consignação serve para dinheiro E coisas (celular, CTPS). Art. 539 CPC.\n2. TESE: Afastar a multa do Art. 477 da CLT alegando que a demora não é culpa do patrão.`
    },

    'cont': {
        1: `2.6. EXERCÍCIO DE CONTESTAÇÃO (EOB XXV)
FLORICULTURA FLORES BELAS LTDA. vs ESTELA.

AO DOUTO JUÍZO DA 50ª VARA DO TRABALHO DE JOÃO PESSOA/PARAÍBA
Processo no 98.765.
FLORICULTURA FLORES BELAS LTDA., com fulcro nos arts. 847 da CLT e 343 do CPC, OFERECER:
CONTESTAÇÃO com pedido de reconvenção à reclamação trabalhista de ESTELA.

I – PRELIMINAR: Incompetência (Art. 337, II CPC) para crimes e Inépcia da inicial (Art. 330, CPC).
II – PREJUDICIAL: Prescrição quinquenal (Art. 7º, XXIX CF / Art. 11 CLT).
III – MÉRITO: Adicional de Penosidade (Falta de lei), Horas Extras (Dentro do limite), Multa 477 (Pagamento no prazo após aviso projetado) e Plano de Saúde (Súmula 342 TST).
IV – RECONVENÇÃO: Dano Material pela vidraça quebrada (Art. 186 e 927 CC). Requer indenização de R$ 300,00.

V – REQUERIMENTOS FINAIS: Improcedência dos pedidos da autora e procedência da reconvenção.`,
        'guia': `💡 POR QUE ESSA FUNDAMENTAÇÃO?\n\n1. RECONVENÇÃO: Fundamental para cobrar o prejuízo causado pela empregada (vidraça).\n2. PRESCRIÇÃO: Peça a extinção do que passou de 5 anos.\n3. PENOSIDADE: Sem lei regulamentadora, o pedido é improcedente.`
    },

    'emb_exec': {
        1: `8.3. EXERCÍCIO DE EMBARGOS À EXECUÇÃO
RÔMULO DELGADO SILVA vs SÔNIA CRISTINA. Penhora de imóvel único (bem de família) e aplicação de multa do CPC.

AO DOUTO JUÍZO DA 50a VARA DO TRABALHO DE BOA VISTA/RR
Processo no xxx
RÔMULO DELGADO SILVA, com fulcro no art. 884 da CLT, APRESENTAR:
EMBARGOS À EXECUÇÃO em face de SÔNIA CRISTINA DE ALMEIDA.

I – REQUISITOS: Garantia integral do juízo e Tempestividade (5 dias).
II – MÉRITO: 
1. Impenhorabilidade do bem de família (Lei 8.009/90 e Súmula 364 STJ).
2. Multa do art. 523, § 1º, do CPC: Inaplicável ao Processo do Trabalho (Rito próprio dos arts. 880 e 882 CLT).
3. Excesso de penhora (Art. 883 CLT).

IV – REQUERIMENTOS FINAIS: Notificação da embargada e procedência dos pedidos para desconstituir a penhora.`,
        'guia': `💡 DICAS DE MENTORIA - EMBARGOS:\n\n1. BEM DE FAMÍLIA: Proteção absoluta para moradia única.\n2. MULTA 523 CPC: Inaplicável ao Processo do Trabalho.\n3. PRAZO: 5 dias após a garantia do juízo.`
    },

    'ro': { 1: `(Texto de Recurso Ordinário será inserido aqui)` },
    'ed': { 1: `(Texto de Embargos de Declaração será inserido aqui)` },
    'ap': { 1: `(Texto de Agravo de Petição será inserido aqui)` },
    'ai': { 1: `(Texto de Agravo de Instrumento será inserido aqui)` },
    'rr': { 1: `(Texto de Recurso de Revista será inserido aqui)` },
    'epe': { 1: `(Texto de Exceção de Pré-Executividade será inserido aqui)` },
    'ms': { 1: `(Texto de Mandado de Segurança será inserido aqui)` }
};

// 2. LÓGICA DE GERENCIAMENTO E LIMPEZA
const GabaritoManager = {
    config: {
        removerRodapes: /P\s?á\s?gi\s?na\s\d+\s\|\s\d+/gi, 
        removerSociais: /@aryannalinhares|@professoraaryannalinhares/gi,
        espacosExtras: /\n{3,}/g, 
    },

    formatarTexto: function(texto) {
        if (!texto) return "";
        let textoLimpo = texto;

        // Limpeza de rodapés e redes sociais
        textoLimpo = textoLimpo.replace(this.config.removerRodapes, "");
        textoLimpo = textoLimpo.replace(this.config.removerSociais, "");
        textoLimpo = textoLimpo.replace(this.config.espacosExtras, "\n\n");
        
        // Transformação em parágrafos HTML para visibilidade
        const blocos = textoLimpo.split(/\n/);
        return blocos
            .map(linha => {
                const conteudo = linha.trim();
                if (conteudo.length > 0) {
                    return `<p style="margin-bottom: 12px; line-height: 1.6; text-align: justify;">${conteudo}</p>`;
                }
                return "";
            })
            .join("");
    },

    renderizarNoSite: function(categoria, questao) {
        const container = document.getElementById('container-gabarito');
        if (window.dbGabaritosExternos && window.dbGabaritosExternos[categoria]) {
            const textoBruto = window.dbGabaritosExternos[categoria][questao];
            if (textoBruto) {
                container.innerHTML = this.formatarTexto(textoBruto);
            } else {
                container.innerHTML = "<p>Gabarito não encontrado.</p>";
            }
        }
    }
};
