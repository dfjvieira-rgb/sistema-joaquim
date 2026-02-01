<!DOCTYPE html>
<html>
<head>
    <style>
        body { background: #000; color: #fff; font-family: sans-serif; margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; text-align: center; }
        #status { font-size: 0.6rem; font-weight: 900; text-transform: uppercase; line-height: 1.2; }
        .blink { animation: b 1.5s infinite; color: #fbbf24; }
        @keyframes b { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
    </style>
</head>
<body>
    <div id="status">SCANNER<br><span class="blink">BUSCANDO...</span></div>

    <script>
        window.atualizar = function(texto, exame) {
            const status = document.getElementById('status');
            const t = texto.toUpperCase();
            
            const DICIONARIO = [
                { id: "AGRAVO DE PETIÇÃO", cor: "#f87171" },
                { id: "RECURSO ORDINÁRIO", cor: "#3b82f6" },
                { id: "CONTESTAÇÃO", cor: "#22c55e" },
                { id: "RECLAMAÇÃO", cor: "#a855f7" }
            ];

            let encontrado = DICIONARIO.find(p => t.includes(p.id));
            if (encontrado) {
                status.innerHTML = `<span style="color:${encontrado.cor}">ALVO IDENTIFICADO</span><br>${encontrado.id}`;
                document.body.style.border = `1px solid ${encontrado.cor}`;
            } else {
                status.innerHTML = `SCANNER EX${exame}<br><span class="blink">BUSCANDO...</span>`;
                document.body.style.border = "none";
            }
        };
    </script>
</body>
</html>
