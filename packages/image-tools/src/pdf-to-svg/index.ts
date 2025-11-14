import { outlineFonts } from './outline-fonts';
import { pdfToSvg as _pdfToSvg } from './pdfjs';

export async function pdfToSvg(data: ArrayBufferView) {
  return outlineFonts(await _pdfToSvg(data));
}
