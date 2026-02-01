<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>JOAQUIM ELITE 2026 - FOLHA FGV</title>
    <style>
        :root {
            --bg-paper: #cbd5e1;
            --paper-color: #ffffff;
            --line-color: #d1d5db;
            --text-color: #1e293b;
            --margem-cor: #f87171;
            --gold: #fbbf24;
            --primary: #1e293b;
        }

        * { box-sizing: border-box; }
        body { background: var(--bg-paper); padding: 20px; font-family: sans-serif; display: flex; justify-content: center; margin: 0; }

        .paper { 
            background: var(--paper-color); 
            width: 100%; 
            max-width: 850px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); 
            display: flex; 
            position: relative;
            min-height: 200vh; /* Aumentado para garantir que role */
        }

        .regua { 
            width: 50px; 
            border-right: 1px solid var(--line-color); 
            background: #f8fafc; 
            user-select: none; 
            flex-shrink: 0;
            padding-top: 52px; /* Alinhado com o Identificador */
        }
        
        /* Estilo para os números na régua coincidirem com as linhas */
        .regua-num { 
            height: 35px; 
            font-size: 0.7rem; 
            color: #64748b; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            border-bottom: 1px solid transparent;
        }

        .conteudo-total { flex: 1; position: relative; display: flex; flex-direction: column; }

        .margem-oab { 
            position: absolute; top: 0; right: 50px; width: 1px; 
            height: 100%; background: var(--margem-cor); opacity: 0.4; pointer-events: none; z-index: 10; 
        }

        #identificador { 
            padding: 15px; text-align: center; font-weight: 900; 
            border-bottom: 2px solid var(--line-color); background: #fff;
            color: var(--primary); letter-spacing: 2px;
        }

        .grid-oab { width: 100%; border-collapse: collapse; table-layout: fixed; }
        
        .grid-oab td { 
            height: 35px; 
            padding: 0 65px 0 15px; 
            border-bottom: 1px solid var(--line-color);
            font-family: 'Courier New', Courier, monospace; 
            font-size: 18px; 
            color: var(--text-color);
            outline: none;
        }

        /* Classes de utilidade para as divisórias */
        .separador { 
            height: auto !important;
            contenteditable: false;
            user-select: none;
        }
        
        .header-separador { 
            background: var(--primary); color: var(--gold); 
            padding: 8px !important; text-align: center; 
            font-size: 0.75rem !important; font-weight: bold; 
        }
        
        .item-separador { 
            background: #f1f5f9; color: #64748b; 
            padding: 4px 15px !important; font-size: 0.65rem !important; 
            font-weight: bold; 
        }
    </style>
</head>
<body>

    <div class="paper">
        <div class="regua" id="regua-oab"></div>
        
        <div class="conteudo-total">
            <div class="margem-oab"></div>
            <div id="identificador">CADERNO DE RESPOSTAS - FGV</div>
            
            <table class="grid-oab">
                <tbody id="CORPO_FOLHA_ELITE" contenteditable="true" spellcheck="false">
                    </tbody>
            </table>
        </div>
    </div>

<script>
    const inicializarFolha = () => {
        const corpo = document.getElementById('CORPO_FOLHA_ELITE');
        const regua = document.getElementById('regua-oab');
        
        // Limpa conteúdos prévios
        corpo.innerHTML = "";
        regua.innerHTML = "";
        
        for(let i = 1; i <= 190; i++) {
            
            // 1. Gerar Divisórias de Questões (Padrão FGV: Questões começam na 51)
            if(i === 1) addDivisoria(corpo, "PEÇA PROFISSIONAL", "header-separador");
            
            if(i === 51) {
                addDivisoria(corpo, "QUESTÃO 1", "header-separador");
                addDivisoria(corpo, "ITEM A)", "item-separador");
            }
            if(i === 66) addDivisoria(corpo, "ITEM B)", "item-separador");
            
            if(i === 81) {
                addDivisoria(corpo, "QUESTÃO 2", "header-separador");
                addDivisoria(corpo, "ITEM A)", "item-separador");
            }
            if(i === 96) addDivisoria(corpo, "ITEM B)", "item-separador");

            // 2. Gerar a Linha de Texto
            const row = corpo.insertRow();
            const cell = row.insertCell();
            cell.id = `L${i}`;
            // Adiciona um espaço invisível para a célula existir e ser clicável
            cell.innerHTML = ""; 

            // 3. Gerar Número na Régua correspondente
            const numDiv = document.createElement('div');
            numDiv.className = "regua-num";
            numDiv.innerText = i;
            regua.appendChild(numDiv);

            // Ajuste especial: Se houver divisórias, a régua precisa de espaço extra
            // (Opcional: você pode adicionar divs vazias na régua para compensar o espaço dos headers)
        }
    };

    const addDivisoria = (parent, texto, classe) => {
        const row = parent.insertRow();
        row.contentEditable = "false"; // Bloqueia a linha inteira
        const cell = row.insertCell();
        cell.className = `separador ${classe}`;
        cell.innerText = texto;
        
        // Adiciona um espaço na régua para compensar a altura da divisória
        const regua = document.getElementById('regua-oab');
        const compensador = document.createElement('div');
        compensador.style.height = (classe === "header-separador" ? "31px" : "21px");
        regua.appendChild(compensador);
    };

    window.onload = inicializarFolha;
</script>

</body>
</html>
