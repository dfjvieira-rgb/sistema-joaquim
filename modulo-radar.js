// modulo-radar.js - Padrão FGV/OAB 2026
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

    formatarParaInjecao: (textoBruto, limiteChar) => {
        // Margem de segurança rigorosa para não vazar a linha
        const margemSegura = limiteChar - 12; 
        return textoBruto
            .replace(/<[^>]*>/g, '') 
            .split('\n')
            .filter(f => f.trim().length > 3)
            .map(f => {
                let linha = f.trim();
                // Destaca subitens a) e b) com um marcador
                if (/^[A-D][\)\.]/i.test(linha)) {
                    return "● " + linha.substring(0, margemSegura).toUpperCase();
                }
                return "  " + linha.substring(0, margemSegura);
            });
    }
};
