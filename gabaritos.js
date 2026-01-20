/**
 * gabarito.js - BANCO DE DADOS INTEGRAL 19 PEÇAS
 */

window.dbGabaritosExternos = {
    'rt': {
        1: `AO DOUTO JUÍZO DA ... VARA DO TRABALHO DE FLORIANÓPOLIS/SC\nJOSÉ FININHO, já qualificado... PROPOR RECLAMAÇÃO TRABALHISTA...`
    },
    'consigna': {
        1: `AO DOUTO JUÍZO DA ... VARA DO TRABALHO DE MACEIÓ/AL.\nZENGA MODAS LTDA... PROPOR AÇÃO DE CONSIGNAÇÃO...`
    },
    'cont': {
        1: `AO DOUTO JUÍZO DA 50ª VARA DO TRABALHO DE JOÃO PESSOA/PARAÍBA\nCONTESTAÇÃO...`
    },
    'emb_exec': {
        1: `AO DOUTO JUÍZO DA 50a VARA DO TRABALHO DE BOA VISTA/RR\nEMBARGOS À EXECUÇÃO...`
    },
    // Categorias vazias para a barra lateral funcionar
    'ro': {1: ""}, 'ed': {1: ""}, 'ap': {1: ""}, 'ai': {1: ""}, 'rr': {1: ""},
    'epe': {1: ""}, 'ms': {1: ""}, 'acao_resc': {1: ""}, 'inquerito': {1: ""},
    'cautelar': {1: ""}, 'habeas_corpus': {1: ""}, 'habeas_data': {1: ""},
    'mandado_injuncao': {1: ""}, 'dissidio_coletivo': {1: ""}, 'recurso_adesivo': {1: ""}
};

const GabaritoManager = {
    config: {
        sujeira: /(P\s?á\s?gi\s?na\s*\d+\s*\|\s*\d+)|(@professoraaryannalinhares)|(@aryannalinhares)/gi
    },

    formatar: function(texto) {
        if (!texto) return "<p style='text-align:center'>Gabarito em breve.</p>";
        
        let limpo = texto.replace(this.config.sujeira, "");
        let linhas = limpo.split('\n');
        let html = "";
        let acumulador = "";

        linhas.forEach(linha => {
            let l = linha.trim();
            if (l === "") {
                if (acumulador) html += `<p>${acumulador}</p>`;
                acumulador = "";
            } else if (/^(I+|AO DOUTO|RECLAMAÇÃO|MÉRITO|PEDIDOS|III –|II –)/i.test(l)) {
                if (acumulador) html += `<p>${acumulador}</p>`;
                html += `<span class="titulo-juridico">${l}</span>`;
                acumulador = "";
            } else {
                acumulador += (acumulador ? " " : "") + l;
            }
        });
        if (acumulador) html += `<p>${acumulador}</p>`;
        return html;
    },

    renderizarNoSite: function(cat, q) {
        const cont = document.getElementById('container-gabarito');
        if (cont && window.dbGabaritosExternos[cat]) {
            cont.innerHTML = this.formatar(window.dbGabaritosExternos[cat][q]);
            cont.parentElement.scrollTop = 0; // Volta ao topo
        }
    }
};
