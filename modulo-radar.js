// modulo-radar.js - Inteligência de Escaneamento JOAQUIM ELITE 2026

export const RadarElite = {
    /**
     * Identifica se o DNA é uma Peça ou uma das 4 Questões.
     * Mapeia para as linhas oficiais: Q1(51), Q2(81), Q3(111), Q4(141).
     */
    analisarGabarito: (textoGabarito) => {
        if (!textoGabarito) return { peca: null, questao: null };
        const texto = textoGabarito.toUpperCase();
        
        const QUESTOES = [
            { id: "QUESTÃO 1", regex: /QUESTÃO\s*1/i, linhaAlvo: 51 },
            { id: "QUESTÃO 2", regex: /QUESTÃO\s*2/i, linhaAlvo: 81 },
            { id: "QUESTÃO 3", regex: /QUESTÃO\s*3/i, linhaAlvo: 111 },
            { id: "QUESTÃO 4", regex: /QUESTÃO\s*4/i, linhaAlvo: 141 }
        ];

        let questaoAchada = QUESTOES.find(q => q.regex.test(texto));
        return { questao: questaoAchada };
    },

    /**
     * Formata o texto para a folha.
     * Identifica "a)" e "b)", aplica o marcador ● e limita para mobile.
     */
    prepararLinhas: (textoBruto) => {
        const LIMITE_MOBILE = 65; // Segurança para o texto não sumir no celular
        
        return textoBruto
            .replace(/<[^>]*>/g, '') // Remove HTML
            .split('\n')
            .filter(f => f.trim().length > 2)
            .map(f => {
                let txt = f.trim();

                // Lógica das letras a e b solicitadas
                if (/^[A-B][\)\.]/i.test(txt)) {
                    return "● " + txt.substring(0, LIMITE_MOBILE).toUpperCase();
                }
                
                // Fundamentação com recuo
                return "  " + txt.substring(0, LIMITE_MOBILE);
            });
    }
};
