// pdf-engine.js
export const PDFEngine = {
    pdfDoc: null,
    pageNum: 1,
    pageRendering: false,
    scale: 1.5,

    async init(arrayBuffer) {
        this.pdfDoc = await pdfjsLib.getDocument(arrayBuffer).promise;
        document.getElementById('page-count').textContent = this.pdfDoc.numPages;
        this.renderPage(1);
    },

    async renderPage(num) {
        this.pageRendering = true;
        const page = await this.pdfDoc.getPage(num);
        const viewport = page.getViewport({ scale: this.scale });
        
        const canvas = document.getElementById('pdf-canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Renderiza a imagem do PDF
        await page.render({ canvasContext: context, viewport: viewport }).promise;

        // Renderiza a camada de texto para permitir SELEÇÃO e CÓPIA
        const textLayerDiv = document.getElementById('text-layer');
        textLayerDiv.innerHTML = "";
        textLayerDiv.style.height = viewport.height + "px";
        textLayerDiv.style.width = viewport.width + "px";
        
        const textContent = await page.getTextContent();
        pdfjsLib.renderTextLayer({
            textContent: textContent,
            container: textLayerDiv,
            viewport: viewport,
            textDivs: []
        });

        this.pageRendering = false;
        this.pageNum = num;
        document.getElementById('page-num').value = num;
    },

    changePage(offset) {
        if (!this.pdfDoc || this.pageRendering) return;
        const next = this.pageNum + offset;
        if (next >= 1 && next <= this.pdfDoc.numPages) {
            this.renderPage(next);
        }
    },

    goToPage(num) {
        const n = parseInt(num);
        if (this.pdfDoc && n >= 1 && n <= this.pdfDoc.numPages) {
            this.renderPage(n);
        }
    }
};
