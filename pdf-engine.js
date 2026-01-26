// pdf-engine.js - Motor de Renderização Restaurado
export const PDFEngine = {
    pdfDoc: null,
    pageNum: 1,
    pageRendering: false,
    pageNumPending: null,
    scale: 1.3,
    canvas: null,
    ctx: null,

    async init(arrayBuffer) {
        this.canvas = document.getElementById('pdf-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Carrega o documento usando a biblioteca PDF.js
        this.pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        document.getElementById('page-count').textContent = this.pdfDoc.numPages;

        this.ajustarZoom();
        this.renderPage(1);
    },

    ajustarZoom() {
        const container = document.getElementById('pdf-container');
        if (container && container.clientWidth < 600) {
            this.scale = 0.8; // Mobile: Zoom menor para caber na tela
        } else {
            this.scale = 1.3; // Desktop
        }
    },

    async renderPage(num) {
        if (this.pageRendering) {
            this.pageNumPending = num;
            return;
        }
        this.pageRendering = true;
        this.pageNum = num;

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

        document.getElementById('page-num').value = num;
    },

    changePage(offset) {
        if (!this.pdfDoc || this.pageRendering) return;
        const next = this.pageNum + offset;
        if (next >= 1 && next <= this.pdfDoc.numPages) {
            this.renderPage(next);
        }
    }
};
