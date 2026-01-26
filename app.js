// Exemplo de como o app.js usa a inteligência que guardamos:

window.calcNota = () => {
    const checks = document.querySelectorAll('#checklist-fgv input[type="checkbox"]:checked');
    let total = 0;
    checks.forEach(c => total += parseFloat(c.value));
    
    // Atualiza o display de nota no modal de espelho
    const display = document.getElementById('nota-total-display');
    if(display) display.innerText = `NOTA: ${total.toFixed(2)}`;
};

window.toggleEstruturas = () => {
    // Aqui ele lê o objeto 'pecas' do estruturas.js e gera os botões dinamicamente
    const menu = document.getElementById('menu-estruturas');
    menu.innerHTML = Object.keys(pecas).map(p => 
        `<button onclick="window.inserirPeca('${p}')">${p}</button>`
    ).join('');
};
