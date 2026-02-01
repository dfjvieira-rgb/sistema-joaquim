// modulo-radar.js - Versão Seleção Fluida FGV
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

        // Mapeamento FGV: Questões começam na 51, 81, 111, 141
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

    // Prepara o array de strings para serem distribuídas nas células
    prepararLinhas: (textoBruto) => {
        const LIMITE_FGV = 75; // Margem de segurança
        return textoBruto
            .replace(/<[^>]*>/g, '') 
            .split('\n')
            .filter(f => f.trim().length > 2)
            .map(f => {
                let txt = f.trim();
                if (/^[A-D][\)\.]/i.test(txt)) return "● " + txt.substring(0, LIMITE_FGV).toUpperCase();
                return "  " + txt.substring(0, LIMITE_FGV);
            });
    }
};
