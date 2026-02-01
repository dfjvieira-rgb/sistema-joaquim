// modulo-radar.js - Inteligência de Escaneamento JOAQUIM ELITE 2026

export const RadarElite = {
    // Analisa o gabarito e define se é Peça ou Questão (1 a 4, a e b)
    analisarGabarito: (textoGabarito) => {
        if (!textoGabarito) return { peca: null, questao: null };
        const texto = textoGabarito.toUpperCase();
        
        const PECAS = [
            { id: "AGRAVO DE PETIÇÃO", display: "AGRAVO DE PETIÇÃO", cor: "#f87171" },
            { id: "RECURSO ORDINÁRIO", display: "RECURSO ORDINÁRIO", cor: "#3b82f6" },
            { id: "CONTESTAÇÃO", display: "CONTESTAÇÃO TRABALHISTA", cor: "#22c55e" },
            { id: "RECLAMAÇÃO", display: "RECLAMATÓRIA TRABALHISTA", cor: "#a855f7" }
        ];

        // Mapeamento Oficial: Adicionamos a linhaAlvo para o Home saber onde pousar
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

    // Ajustado para o nome que o index.html espera e com inteligência para itens A e B
    prepararLinhas: (textoBruto) => {
        const LIMITE_MOBILE = 65; // Reduzido de 85 para 65 para não cortar no mobile
        return textoBruto
            .replace(/<[^>]*>/g, '') // Remove tags HTML
            .split('\n')
            .filter(f => f.trim().length > 2) 
            .map(f => {
                let txt = f.trim();
                
                // Inteligência para capturar as letras "a" e "b" (Questões 1 a 4)
                if (/^[A-B][\)\.]/i.test(txt)) {
                    return "● " + txt.substring(0, LIMITE_MOBILE).toUpperCase();
                }
                
                // Formatação padrão para fundamentação
                return "  " + txt.substring(0, LIMITE_MOBILE);
            });
    }
};
