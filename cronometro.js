// cronometro.js
export class Cronometro {
    constructor(displayId, tempoInicialMinutos = 300) {
        this.display = document.getElementById(displayId);
        this.tempoRestante = tempoInicialMinutos * 60; // converter para segundos
        this.timer = null;
    }

    iniciar() {
        if (this.timer) return;
        this.timer = setInterval(() => {
            this.tempoRestante--;
            this.atualizarDisplay();
            if (this.tempoRestante <= 0) this.parar();
        }, 1000);
    }

    parar() {
        clearInterval(this.timer);
        this.timer = null;
    }

    atualizarDisplay() {
        const h = Math.floor(this.tempoRestante / 3600);
        const m = Math.floor((this.tempoRestante % 3600) / 60);
        const s = this.tempoRestante % 60;

        const format = (n) => n.toString().padStart(2, '0');
        this.display.innerText = `${format(h)}:${format(m)}:${format(s)}`;

        // Alerta visual abaixo de 30 minutos
        if (this.tempoRestante < 1800) {
            this.display.classList.add('timer-low');
            this.display.style.color = '#ff4444';
        }
    }
}
