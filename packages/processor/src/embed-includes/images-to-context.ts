import mimes from 'mime/lite';

import { readBinaryFile } from '@isos/fs';
import { pdfToSvg } from '@isos/pdf-to-svg';

export const supportedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];

export async function getDataUrl(imagePath: string, ext: string) {
  switch (ext) {
    case '.pdf': {
      const mime = mimes.getType('.svg') as string;
      const svg = await pdfToSvg(await readBinaryFile(imagePath));
      const base64 = btoa(svg);
      return toUrl({ mime, base64 });
    }
    case '.jpg':
    case '.jpeg':
    case '.png': {
      const mime = mimes.getType(ext) as string;
      const img = await readBinaryFile(imagePath);
      const base64 = btoa(String.fromCharCode(...img));
      return toUrl({ mime, base64 });
    }
    default:
      throw new Error(
        `[inline-images]: unsupported file extension "${ext || '(none)'}"`,
      );
  }
}

type Props = {
  mime: string;
  base64: string;
};

function toUrl({ mime, base64 }: Props) {
  return `data:${mime};base64,${base64}`;
}
