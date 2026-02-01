// modulo-radar.js - Padrão FGV/OAB 2026 (Foco em Itens A e B)
export const RadarElite = {
    analisarGabarito: (textoGabarito) => {
        if (!textoGabarito) return { peca: null, questao: null };
        const texto = textoGabarito.toUpperCase();
        
        const PECAS = [
            { id: "AGRAVO DE PETIÇÃO", display: "AGRAVO DE PETIÇÃO", cor: "#f87171" },
            { id: "RECURSO ORDINÁRIO", display: "RECURSO ORDINÁRIO", cor: "#3b82f6" },
            { id: "CONTESTAÇÃO", display: "CONTESTAÇÃO TRABALHISTA", cor: "#22c55e" },
            { id: "RECLAMAÇÃO", display: "RECLAMATÓRIA TRABALHISTA", cor: "#a855f7" }
        ];

        // Mapeamento Oficial FGV: 30 linhas por questão
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

    prepararLinhas: (textoBruto) => {
        const LIMITE_FGV = 75; // Garante que não passe da margem vermelha
        
        return textoBruto
            .replace(/<[^>]*>/g, '') // Remove HTML
            .split('\n')
            .filter(f => f.trim().length > 2)
            .map(f => {
                let linha = f.trim();

                // REGEX PARA IDENTIFICAR A) OU B) (Independente de ser maiúsculo ou minúsculo)
                if (/^([A-B])[\)\.]/i.test(linha)) {
                    // Se for item A ou B, coloca o marcador ● e força CAIXA ALTA
                    return "● " + linha.substring(0, LIMITE_FGV).toUpperCase();
                }
                
                // Para o restante do texto (fundamentação), mantém o recuo normal
                return "  " + linha.substring(0, LIMITE_FGV);
            });
    }
};
