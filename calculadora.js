// calculadora.js - Inteligência de Prazos Trabalhistas
export const CalculadoraPrazos = {
    calcularRO: (dataPublicacao) => {
        const data = new Date(dataPublicacao);
        let diasUteis = 0;
        let dataFinal = new Date(data);

        while (diasUteis < 8) {
            dataFinal.setDate(dataFinal.getDate() + 1);
            const diaSemana = dataFinal.getDay();
            if (diaSemana !== 0 && diaSemana !== 6) { // Pula Sábado e Domingo
                diasUteis++;
            }
        }
        return dataFinal.toLocaleDateString('pt-BR');
    },
    
    exibirPainel() {
        return `
            <div style="padding:15px; background:#f8fafc; border-radius:8px; color:#1e293b">
                <label style="display:block; font-size:12px; font-weight:bold; margin-bottom:5px;">DATA DA PUBLICAÇÃO:</label>
                <input type="date" id="data-pub" style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #ccc; border-radius:4px;">
                <button onclick="window.calcularPrazoUI()" style="width:100%; background:var(--primary); color:white; padding:10px; border-radius:4px; border:none; font-weight:bold; cursor:pointer;">CALCULAR PRAZO RO</button>
                <div id="resultado-prazo" style="margin-top:15px; font-weight:bold; color:var(--wine); text-align:center;"></div>
            </div>
        `;
    }
};

window.calcularPrazoUI = () => {
    const dataInput = document.getElementById('data-pub').value;
    if(!dataInput) return alert("Insira a data de publicação!");
    const resultado = CalculadoraPrazos.calcularRO(dataInput);
    document.getElementById('resultado-prazo').innerHTML = `📅 PRAZO FINAL: ${resultado}`;
};
