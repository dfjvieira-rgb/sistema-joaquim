// modulo-radar.js - Inteligência de Escaneamento JOAQUIM ELITE 2026

export const RadarElite = {
    analisarGabarito: (textoGabarito) => {
        if (!textoGabarito) return { peca: null, questao: null };
        const texto = textoGabarito.toUpperCase();
        
        const PECAS = [
            { id: "AGRAVO DE PETIÇÃO", display: "AGRAVO DE PETIÇÃO" },
            { id: "RECURSO ORDINÁRIO", display: "RECURSO ORDINÁRIO" },
            { id: "CONTESTAÇÃO", display: "CONTESTAÇÃO TRABALHISTA" },
            { id: "RECLAMAÇÃO", display: "RECLAMATÓRIA TRABALHISTA" }
        ];

        // Mapeamento das linhas alvo para as Questões 1 a 4
        const QUESTOES = [
            { id: "QUESTÃO 1", regex: /QUESTÃO\s*1/i, linhaAlvo: 51 },
            { id: "QUESTÃO 2", regex: /QUESTÃO\s*2/i, linhaAlvo: 81 },
            { id: "QUESTÃO 3", regex: /QUESTÃO\s*3/i, linhaAlvo: 111 },
            { id: "QUESTÃO 4", regex: /QUESTÃO\s*4/i, linhaAlvo: 141 }
        ];

        let pecaAchada = PECAS.find(p => texto.includes(p.id));
        let questaoAchada = QUESTOES.find(q => q.regex.test(texto));

        return { peca: pecaAchada, questao: questaoAchada };
    },

    // Nome corrigido para Preparation (compatível com seu index.html)
    prepararLinhas: (textoBruto) => {
        const LIMITE_MOBILE = 65; // Evita corte no mobile
        return textoBruto
            .replace(/<[^>]*>/g, '') 
            .split('\n')
            .filter(f => f.trim().length > 2)
            .map(f => {
                let txt = f.trim();
                // Identifica letras a e b e adiciona o marcador ●
                if (/^[A-B][\)\.]/i.test(txt)) {
                    return "● " + txt.substring(0, LIMITE_MOBILE).toUpperCase();
                }
                return "  " + txt.substring(0, LIMITE_MOBILE);
            });
    }
};
