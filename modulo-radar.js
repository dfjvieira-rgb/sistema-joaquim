// modulo-radar.js - O CÉREBRO DO HOME

export const RadarElite = {
    /**
     * Analisa o texto para descobrir onde ele deve começar na folha OAB
     * Peça = Linha 1 | Q1 = 51 | Q2 = 81 | Q3 = 111 | Q4 = 141
     */
    analisarDNA: (texto) => {
        const t = texto.toUpperCase();
        
        const mapeamento = [
            { alvo: "QUESTÃO 1", linha: 51 },
            { alvo: "QUESTÃO 2", linha: 81 },
            { alvo: "QUESTÃO 3", linha: 111 },
            { alvo: "QUESTÃO 4", linha: 141 }
        ];

        const achado = mapeamento.find(item => t.includes(item.alvo));
        
        return {
            linhaInicial: achado ? achado.linha : 1, // Se não achar questão, vai para a Peça
            nomeSetor: achado ? achado.alvo : "PEÇA PROFISSIONAL"
        };
    },

    /**
     * Limpa o texto de tags HTML e aplica as regras de formatação:
     * 1. Itens A e B ganham ● e CAIXA ALTA
     * 2. Limita a 70 caracteres para não vazar da folha
     */
    prepararLinhas: (textoBruto) => {
        const LIMITE = 70;

        return textoBruto
            .replace(/<[^>]*>/g, '') // Remove qualquer HTML vindo do banco
            .split('\n')
            .filter(linha => linha.trim().length > 3) // Ignora linhas vazias
            .map(linha => {
                let s = linha.trim();

                // Identifica se a linha é o início de um item (a) ou (b)
                if (/^[A-B][\)\.]/i.test(s)) {
                    return "● " + s.toUpperCase().substring(0, LIMITE - 2);
                }

                // Texto normal com recuo de parágrafo
                return "  " + s.substring(0, LIMITE);
            });
    }
};
