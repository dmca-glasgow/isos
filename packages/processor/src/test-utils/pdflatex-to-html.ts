import { Root } from 'hast';
import * as mupdf from 'mupdf';
import latex from 'node-latex';
// import { exec } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import fsPromise from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import formatHtml from 'pretty';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

// This package is used in tests and depends on pdflatex and mupdf (Ghostscript)

export async function pdfLatexToHtml(input: string) {
  const id = crypto.randomBytes(20).toString('hex');
  const tempDir = await fsPromise.realpath(os.tmpdir());
  const dir = path.join(tempDir, id);
  await fsPromise.mkdir(dir);

  const outputFile = path.join(dir, 'output.pdf');
  await execLatex(input.trim(), outputFile);
  const html = await muPdfToHtml(outputFile);
  // console.log(html);

  fs.rmSync(dir, { recursive: true, force: true });
  return html;
}

async function execLatex(input: string, outputPath: string) {
  return new Promise((resolve, reject) => {
    const pdf = latex(input, { passes: 2 });
    pdf.pipe(fs.createWriteStream(outputPath));
    pdf.on('error', reject);
    pdf.on('finish', resolve);
  });
}

async function muPdfToHtml(filePath: string) {
  const html = await execMuPdfToHtml(filePath);
  // console.log(html);
  const processor = unified().use(rehypeParse).use(rehypeStringify);
  const parsed = processor.parse(html);

  const root: Root = {
    type: 'root',
    children: [],
  };
  visit(parsed, 'element', (node) => {
    if (node.tagName === 'div' && node.properties.id === 'page0') {
      visit(node, 'element', (el, idx, parent) => {
        delete el.properties.style;

        switch (el.tagName) {
          case 'b':
            el.tagName = 'strong';
            break;
          case 'i':
            el.tagName = 'em';
            break;
          case 'tt':
            el.tagName = 'code';
            break;
          case 'span':
            parent?.children.splice(idx || 0, 1, ...el.children);
            break;
        }
      });
      root.children.push(...node.children);
    }
  });

  return formatHtml(processor.stringify(root));
}

async function execMuPdfToHtml(input: string) {
  const buffer = await fsPromise.readFile(input);
  const doc = mupdf.Document.openDocument(buffer, 'application/pdf');

  const pages = doc.countPages();
  let html = '';
  for (let idx = 0; idx < pages; ++idx) {
    const page = doc.loadPage(idx);

    // TODO: is it possible to get anchor links?
    // const links = page.getLinks();
    // const link = links[0];
    // const uri = link.getURI();
    // const bounds = link.getBounds();
    // const linkDestination = doc.resolveLink(uri);
    // console.log({ uri, bounds, linkDestination });

    html += page.toStructuredText().asHTML(idx);
  }
  return html;
}

// async function popplerPdfToHtml(filePath: string) {
//   const html = await execPopplerPdfToHtml(filePath);
//   const processor = unified().use(rehypeParse).use(rehypeStringify);
//   const parsed = processor.parse(html);

//   const children: ElementContent[] = [];
//   visit(parsed, 'element', (node) => {
//     if (node.tagName === 'body') {
//       children.push(...node.children);
//     }
//   });

//   const newHtml = processor.stringify({ type: 'root', children }).trim();

//   const withReplacements = newHtml
//     .replace(/link to page \d+\s*/g, '')
//     .replace(/<br>\s<hr>$/, '')
//     .replace(/output.html/g, '')
//     .replace(/^<a name="\d+"><\/a>/, '')
//     .replace(/<br>\s<hr>\s<a name="outline">([\s\S]*)$/, '')
//     .replace(/[^\S\r\n]/g, ' ');

//   return formatHtml(withReplacements);
// }

// async function execPopplerPdfToHtml(filePath: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     exec(`pdftohtml -stdout "${filePath}"`, (error, stdout, stderr) => {
//       if (error) {
//         reject(error);
//       } else if (stderr) {
//         reject(stderr);
//       } else {
//         resolve(stdout);
//       }
//     });
//   });
// }
