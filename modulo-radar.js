// modulo-radar.js
export const RadarElite = {
    // Identifica o setor e a linha de partida (Questões 1 a 4 ou Peça)
    analisarSetor: (texto) => {
        const t = texto.toUpperCase();
        if (t.includes("QUESTÃO 1")) return { linha: 51, nome: "QUESTÃO 1" };
        if (t.includes("QUESTÃO 2")) return { linha: 81, nome: "QUESTÃO 2" };
        if (t.includes("QUESTÃO 3")) return { linha: 111, nome: "QUESTÃO 3" };
        if (t.includes("QUESTÃO 4")) return { linha: 141, nome: "QUESTÃO 4" };
        return { linha: 1, nome: "PEÇA" };
    },

    // Formata o texto para a folha (Letras a e b com ● e CAIXA ALTA)
    formatarParaFolha: (htmlBruto) => {
        const temp = document.createElement("div");
        temp.innerHTML = htmlBruto;
        
        // Se houver a classe .espelho-txt (do seu banco), usa ela. Se não, limpa o HTML.
        const itens = Array.from(temp.querySelectorAll('.espelho-txt')).map(el => el.innerText);
        const base = itens.length > 0 ? itens : htmlBruto.replace(/<[^>]*>/g, '').split('\n');

        return base.filter(l => l.trim().length > 2).map(l => {
            let s = l.trim();
            // Regra: Identifica letras a) ou b) no início
            if (/^[A-B][\)\.]/i.test(s)) {
                return "● " + s.toUpperCase().substring(0, 75);
            }
            return "  " + s.substring(0, 75);
        });
    }
};
