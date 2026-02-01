// modulo-radar.js

export const RadarElite = {
    // Analisa o gabarito e define o que o sistema está lendo
    analisarGabarito: (textoGabarito) => {
        const texto = textoGabarito.toUpperCase();
        
        // Dicionário de Peças
        const PECAS = [
            { id: "AGRAVO DE PETIÇÃO", display: "AGRAVO DE PETIÇÃO", cor: "#f87171" },
            { id: "RECURSO ORDINÁRIO", display: "RECURSO ORDINÁRIO", cor: "#3b82f6" },
            { id: "CONTESTAÇÃO", display: "CONTESTAÇÃO TRABALHISTA", cor: "#22c55e" },
            { id: "RECLAMAÇÃO", display: "RECLAMATÓRIA TRABALHISTA", cor: "#a855f7" }
        ];

        // Dicionário de Questões (1 a 4 e letras a/b)
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

    // Limpa o texto e prepara para as linhas da folha
    formatarParaInjecao: (textoBruto, limiteChar) => {
        return textoBruto
            .replace(/<[^>]*>/g, '') // Remove HTML
            .split('\n')
            .filter(f => f.trim().length > 5)
            .map(f => "➤ " + f.trim().substring(0, limiteChar - 2));
    }
};
