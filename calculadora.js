// calculadora.js

export const CalculadoraTrabalhista = {
    // Calcula prescrição baseada na data de demissão
    calcularPrescricao: (dataDemissao) => {
        const demissao = new Date(dataDemissao);
        if (isNaN(demissao)) return null;

        // Prescrição Bienal (2 anos após o fim do contrato - Art. 7º, XXIX, CF)
        const bienal = new Date(demissao);
        bienal.setFullYear(bienal.getFullYear() + 2);

        // Marco Quinquenal (5 anos para trás da data de hoje/ajuizamento)
        const hoje = new Date();
        const quinquenal = new Date(hoje);
        quinquenal.setFullYear(quinquenal.getFullYear() - 5);

        return {
            limiteAjuizamento: bienal.toLocaleDateString('pt-BR'),
            marcoRetroativo: quinquenal.toLocaleDateString('pt-BR')
        };
    },

    // Guia rápido de reflexos para fundamentação de peças
    getReflexos: (verba) => {
        const tabela = {
            'horas_extras': 'DSR, 13º Salário, Férias + 1/3, FGTS (8% e 40%) e Aviso Prévio.',
            'adicional_noturno': 'DSR, 13º Salário, Férias + 1/3, FGTS e Aviso Prévio.',
            'adicional_insalubridade': '13º Salário, Férias + 1/3, FGTS e Aviso Prévio. (Não reflete em DSR pois é mensalista - OJ 103 SDI-1)',
            'comissoes': 'DSR (Súmula 27 TST), 13º Salário, Férias + 1/3 e FGTS.'
        };
        return tabela[verba] || "Verba não mapeada.";
    }
};
