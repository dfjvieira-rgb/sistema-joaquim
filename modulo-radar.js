// modulo-radar.js (Ajuste para o novo banco)
export const RadarElite = {
    // ... (manter analisarDNA anterior)

    prepararLinhas: (htmlBruto) => {
        const LIMITE = 75;
        // Cria um elemento temporário para converter HTML em texto puro
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlBruto;
        
        // Pega apenas o texto dos itens do espelho (classe .espelho-txt)
        const itens = Array.from(tempDiv.querySelectorAll('.espelho-txt')).map(el => el.innerText);

        // Se o banco não tiver a classe .espelho-txt, tenta limpar o HTML direto
        const listaFinal = itens.length > 0 ? itens : htmlBruto.replace(/<[^>]*>/g, '').split('\n');

        return listaFinal
            .filter(linha => linha.trim().length > 3)
            .map(linha => {
                let s = linha.trim();
                // Regra das Letras A e B para questões (se houver no texto)
                if (/^[A-B][\)\.]/i.test(s)) {
                    return "● " + s.toUpperCase().substring(0, LIMITE - 2);
                }
                return "  " + s.substring(0, LIMITE);
            });
    }
};
