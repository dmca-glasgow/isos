import { PDFDocumentLoadingTask } from 'pdfjs-dist';

type Pdfjs = {
  getDocument: (o: any) => PDFDocumentLoadingTask;
  SVGGraphics: (a: any, b: any) => SVGGraphicsElement;
};

export async function getPdfJs(): Promise<Pdfjs> {
  const pdfjs = await getPackage();
  return {
    getDocument: pdfjs.getDocument,
    SVGGraphics: pdfjs.SVGGraphics,
  };
}

async function getPackage(): Promise<any> {
  if (process.env.NODE_ENV === 'test') {
    // @ts-expect-error
    const SandboxedModule = await import('sandboxed-module');
    // @ts-expect-error
    const { document, Element, Image } = await import('./dom-stubs.js');

    const globals = {
      console,
      document,
      Blob,
      Element,
      Image,
      process,
      URL,
    };

    return SandboxedModule.default.require(
      'pdfjs-dist/legacy/build/pdf.js',
      { globals },
    );
  } else {
    const pdfjsLib = await import('pdfjs-dist');
    const pdfWorker = await import(
      'pdfjs-dist/build/pdf.worker.min.js?url'
    );

    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker.default;

    return pdfjsLib;
  }
}
