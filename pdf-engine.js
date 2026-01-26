// pdf-engine.js

export const PDFEngine = {
    // Busca um texto no PDF e faz scroll até a primeira ocorrência
    buscarTexto: async (pdfDocument, termo) => {
        if (!termo || !pdfDocument) return null;
        
        const termoBusca = termo.toLowerCase();
        
        for (let i = 1; i <= pdfDocument.numPages; i++) {
            const page = await pdfDocument.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map(item => item.str.toLowerCase());
            
            if (strings.some(s => s.includes(termoBusca))) {
                return i; // Retorna o número da página onde encontrou
            }
        }
        return null;
    },

    // Ajusta o zoom ideal para mobile/desktop
    obterEscala: (containerWidth, page) => {
        const viewport = page.getViewport({ scale: 1 });
        return (containerWidth - 20) / viewport.width;
    }
};
