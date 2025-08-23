declare module 'pdfjs-dist/legacy/build/pdf.js' {
  export * from 'pdfjs-dist';
}

declare module 'pdfjs-dist' {
  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
  }

  export interface PDFPageProxy {
    getTextContent(): Promise<any>;
  }

  export interface GlobalWorkerOptions {
    workerSrc: string | boolean;
  }

  export const GlobalWorkerOptions: GlobalWorkerOptions;

  export function getDocument(options: any): {
    promise: Promise<PDFDocumentProxy>;
  };
}