// pdf-engine.js - Motor de Renderização com Text Layer e Auto-Resize
export const PDFEngine = {
    pdfDoc: null,
    pageNum: 1,
    pageRendering: false,
    pageNumPending: null,
    scale: 1.5,
    canvas: null,
    ctx: null,

    async init(arrayBuffer) {
        // Inicializa referências de DOM
        this.canvas = document.getElementById('pdf-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Carrega o documento
        this.pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        // Atualiza contagem de páginas na UI
        const pageCountSpan = document.getElementById('page-count');
        if (pageCountSpan) pageCountSpan.textContent = this.pdfDoc.numPages;

        // Renderiza a primeira página e ajusta o zoom inicial
        await this.ajustarZoomMobile();
        this.renderPage(1);

        // Ouvinte para redimensionamento (Giro do celular)
        window.addEventListener('resize', () => this.debounceResize());
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

        // Ajusta dimensões do Canvas
        this.canvas.height = viewport.height;
        this.canvas.width = viewport.width;

        // 1. Renderiza a imagem do PDF no Canvas
        const renderContext = {
            canvasContext: this.ctx,
            viewport: viewport
        };
        
        await page.render(renderContext).promise;

        // 2. Renderiza a Camada de Texto (Text Layer) para Seleção/Cópia
        const textLayerDiv = document.getElementById('text-layer');
        if (textLayerDiv) {
            textLayerDiv.innerHTML = "";
            textLayerDiv.style.height = `${viewport.height}px`;
            textLayerDiv.style.width = `${viewport.width}px`;

            const textContent = await page.getTextContent();
            pdfjsLib.renderTextLayer({
                textContent: textContent,
                container: textLayerDiv,
                viewport: viewport,
                textDivs: []
            });
        }

        this.pageRendering = false;
        if (this.pageNumPending !== null) {
            this.renderPage(this.pageNumPending);
            this.pageNumPending = null;
        }

        // Atualiza o input de página na UI
        const pageInput = document.getElementById('page-num');
        if (pageInput) pageInput.value = num;
    },

    changePage(offset) {
        if (!this.pdfDoc || this.pageRendering) return;
        const next = this.pageNum + offset;
        if (next >= 1 && next <= this.pdfDoc.numPages) {
            this.renderPage(next);
        }
    },

    async ajustarZoomMobile() {
        if (!this.pdfDoc) return;
        const container = document.getElementById('pdf-container');
        const page = await this.pdfDoc.getPage(1);
        const unscaledViewport = page.getViewport({ scale: 1 });
        
        // Calcula o scale para ocupar a largura do container menos margens
        this.scale = (container.clientWidth - 20) / unscaledViewport.width;
        
        // Limite mínimo de zoom para não ficar ilegível
        if (this.scale < 0.8) this.scale = 0.8;
    },

    debounceResize() {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(async () => {
            if (this.pdfDoc) {
                await this.ajustarZoomMobile();
                this.renderPage(this.pageNum);
            }
        }, 300);
    }
};
