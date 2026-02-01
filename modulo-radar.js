// modulo-radar.js - Inteligência de Escaneamento JOAQUIM ELITE 2026

export const RadarElite = {
    // Analisa o gabarito e define se é Peça ou Questão (1 a 4, a e b)
    analisarGabarito: (textoGabarito) => {
        if (!textoGabarito) return { peca: null, questao: null };
        const texto = textoGabarito.toUpperCase();
        
        // Dicionário de Peças Processuais
        const PECAS = [
            { id: "AGRAVO DE PETIÇÃO", display: "AGRAVO DE PETIÇÃO", cor: "#f87171" },
            { id: "RECURSO ORDINÁRIO", display: "RECURSO ORDINÁRIO", cor: "#3b82f6" },
            { id: "CONTESTAÇÃO", display: "CONTESTAÇÃO TRABALHISTA", cor: "#22c55e" },
            { id: "RECLAMAÇÃO", display: "RECLAMATÓRIA TRABALHISTA", cor: "#a855f7" }
        ];

        // Dicionário de Questões e Subitens
        const QUESTOES = [
            { id: "QUESTÃO 1", regex: /QUESTÃO\s*1/i },
            { id: "QUESTÃO 2", regex: /QUESTÃO\s*2/i },
            { id: "QUESTÃO 3", regex: /QUESTÃO\s*3/i },
            { id: "QUESTÃO 4", regex: /QUESTÃO\s*4/i }
        ];

        let pecaAchada = PECAS.find(p => texto.includes(p.id));
        let questaoAchada = QUESTOES.find(q => q.regex.test(texto));

        return { peca: pecaAchada, questao: questaoAchada };
    },

    // Formata o texto para caber nas linhas (limite de 85 caracteres)
    formatarParaInjecao: (textoBruto, limiteChar) => {
        return textoBruto
            .replace(/<[^>]*>/g, '') // Remove tags HTML
            .split('\n')
            .filter(f => f.trim().length > 3) // Remove linhas muito curtas
            .map(f => "➤ " + f.trim().substring(0, limiteChar - 4)); // Adiciona marcador e corta no limite
    }
};

