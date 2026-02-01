// modulo-radar.js - Inteligência de Escaneamento Elite 2026

export const RadarElite = {
    // Analisa o gabarito e define se é Peça ou Questão com alvo de linha exato
    analisarGabarito: (textoGabarito) => {
        if (!textoGabarito) return { peca: null, questao: null };
        const texto = textoGabarito.toUpperCase();
        
        const PECAS = [
            { id: "AGRAVO DE PETIÇÃO", display: "AGRAVO DE PETIÇÃO", cor: "#f87171" },
            { id: "RECURSO ORDINÁRIO", display: "RECURSO ORDINÁRIO", cor: "#3b82f6" },
            { id: "CONTESTAÇÃO", display: "CONTESTAÇÃO TRABALHISTA", cor: "#22c55e" },
            { id: "RECLAMAÇÃO", display: "RECLAMATÓRIA TRABALHISTA", cor: "#a855f7" }
        ];

        // Mapeamento Oficial: Cada questão tem 30 linhas reservadas
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

    // Formata o texto para a Seleção Fluida (limite seguro de 68 caracteres para mobile)
    prepararLinhas: (textoBruto) => {
        const LIMITE_FGV = 68; 
        return textoBruto
            .replace(/<[^>]*>/g, '') // Limpa HTML
            .split('\n')
            .filter(f => f.trim().length > 2)
            .map(f => {
                let txt = f.trim();
                // Se a linha começar com A) ou B), coloca o marcador destacado
                if (/^[A-B][\)\.]/i.test(txt)) {
                    return "● " + txt.substring(0, LIMITE_FGV).toUpperCase();
                }
                // Linhas normais de fundamentação
                return "  " + txt.substring(0, LIMITE_FGV);
            });
    }
};
