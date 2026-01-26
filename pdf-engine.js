// pdf-engine.js - Motor de Renderização com Gestão de Memória e Auto-Zoom
export const PDFEngine = {
    pdfDoc: null,
    pageNum: 1,
    pageRendering: false,
    pageNumPending: null,
    scale: 1.3,
    canvas: null,
    ctx: null,

    async init(arrayBuffer) {
        // --- BOA PRÁTICA 3: GESTÃO DE MEMÓRIA ---
        // Se já existir um PDF na memória, destrói antes de carregar o novo
        if (this.pdfDoc) {
            await this.pdfDoc.destroy();
            this.pdfDoc = null;
            console.log("♻️ Memória RAM liberada (PDF anterior destruído)");
        }

        this.canvas = document.getElementById('pdf-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        try {
            // Carrega o documento usando a biblioteca PDF.js
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            this.pdfDoc = await loadingTask.promise;
            
            const totalPagesElem = document.getElementById('page-count');
            if (totalPagesElem) totalPagesElem.textContent = this.pdfDoc.numPages;

            this.ajustarZoom();
            this.renderPage(1);
        } catch (error) {
            console.error("Erro ao carregar PDF:", error);
        }
    },

    ajustarZoom() {
        // Detecta a largura da tela para ajustar o zoom automaticamente
        const container = document.getElementById('pdf-container');
        const larguraTela = container ? container.clientWidth : window.innerWidth;

        if (larguraTela < 600) {
            this.scale = 0.8; // Mobile: Zoom menor para visão geral
        } else {
            this.scale = 1.3; // Desktop: Zoom confortável para leitura
        }
    },

    async renderPage(num) {
        if (this.pageRendering) {
            this.pageNumPending = num;
            return;
        }
        this.pageRendering = true;
        this.pageNum = num;

        try {
            const page = await this.pdfDoc.getPage(num);
            const viewport = page.getViewport({ scale: this.scale });

            this.canvas.height = viewport.height;
            this.canvas.width = viewport.width;

            const renderContext = {
                canvasContext: this.ctx,
                viewport: viewport
            };
            
            await page.render(renderContext).promise;
            this.pageRendering = false;

            if (this.pageNumPending !== null) {
                this.renderPage(this.pageNumPending);
                this.pageNumPending = null;
            }

            // Atualiza o contador de página no input
            const inputPagina = document.getElementById('page-num');
            if (inputPagina) inputPagina.value = num;
        } catch (error) {
            console.error("Erro na renderização:", error);
            this.pageRendering = false;
        }
    },

    changePage(offset) {
        if (!this.pdfDoc || this.pageRendering) return;
        const next = this.pageNum + offset;
        if (next >= 1 && next <= this.pdfDoc.numPages) {
            this.renderPage(next);
        }
    }
};
