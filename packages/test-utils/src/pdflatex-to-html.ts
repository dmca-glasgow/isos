import { ElementContent, Root } from 'hast';
import * as mupdf from 'mupdf';
import { exec, spawn } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import fsPromise from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { resolve } from 'pathe';
import formatHtml from 'pretty';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

// Helpful utility for development and have external untracked
// dependencies on pdflatex and poppler (it's CLI pdftohtml)

// PDF-to-HTML conversion by either mupdf (Ghostscript) or Poppler
// which both have pros and cons

const JOB_NAME = 'test';
const FIXTURE_PATH = resolve(import.meta.dirname, '../../fixtures');

export const pdfLatexToHtml = {
  poppler: execPdfLatexToHtml(popplerPdfToHtml),
  mupdf: execPdfLatexToHtml(muPdfToHtml),
};

export const pdfLatexFixtureToHtml = {
  poppler: execPdfLatexFixtureToHtml(popplerPdfToHtml),
  mupdf: execPdfLatexFixtureToHtml(muPdfToHtml),
};

type Fn = (input: string) => Promise<string>;

function execPdfLatexToHtml(fn: Fn) {
  return async (input: string) => {
    const id = crypto.randomBytes(20).toString('hex');
    const tempDir = await fsPromise.realpath(os.tmpdir());
    const cwd = path.join(tempDir, id);
    await fsPromise.mkdir(cwd);

    const filePath = `${JOB_NAME}.tex`;
    const inputPath = path.join(cwd, filePath);
    await fsPromise.writeFile(inputPath, input);

    try {
      // 2 passes
      await execLatex(filePath, cwd);
      await execLatex(filePath, cwd);

      const outputPath = path.join(cwd, `${JOB_NAME}.pdf`);
      const html = fn(outputPath);
      return html;
    } catch (err) {
      console.error(err);
    } finally {
      fs.rmSync(cwd, { recursive: true, force: true });
    }
  };
}

function execPdfLatexFixtureToHtml(fn: Fn) {
  return async (inputPath: string) => {
    const filePath = path.basename(inputPath);
    const cwd = path.join(FIXTURE_PATH, path.dirname(inputPath));

    // 2 passes
    await execLatex(filePath, cwd);
    await execLatex(filePath, cwd);

    const outputPath = path.join(cwd, `${JOB_NAME}.pdf`);

    return fn(outputPath);
  };
}

async function execLatex(filePath: string, cwd: string) {
  return new Promise<string>((resolve, reject) => {
    const args = [
      '-shell-escape',
      '-halt-on-error',
      `-jobname=${JOB_NAME}`,
      `"${filePath}"`,
    ];
    const tex = spawn('pdflatex', args, { cwd });

    let log = '';
    tex.stdout.on('data', (data) => {
      log += data.toString();
    });

    tex.on('exit', async (code) => {
      if (code === 0) {
        resolve(log);
      } else {
        reject(log);
      }
    });
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

    const structuredText = page.toStructuredText();

    // TODO: is it possible to get images?
    // const imageStack = page.getImages();
    // const json = JSON.stringify(JSON.parse(structuredText.asJSON()), null, 2);
    // console.log(json);

    html += structuredText.asHTML(idx);
  }
  return html;
}

async function popplerPdfToHtml(filePath: string) {
  const html = await execPopplerPdfToHtml(filePath);
  const processor = unified().use(rehypeParse).use(rehypeStringify);
  const parsed = processor.parse(html);

  const children: ElementContent[] = [];
  visit(parsed, 'element', (node) => {
    if (node.tagName === 'body') {
      children.push(...node.children);
    }
    if (node.tagName === 'img') {
      node.properties = {
        src: path.basename(String(node.properties?.src || '')),
      };
    }
  });

  const newHtml = processor.stringify({ type: 'root', children }).trim();

  const withReplacements = newHtml
    .replace(/link to page \d+\s*/g, '')
    .replace(/<br>\s<hr>$/, '')
    .replace(/output.html/g, '')
    .replace(/^<a name="\d+"><\/a>/, '')
    .replace(/<br>\s<hr>\s<a name="outline">([\s\S]*)$/, '')
    .replace(/[^\S\r\n]/g, ' ');

  return formatHtml(withReplacements);
}

async function execPopplerPdfToHtml(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`pdftohtml -stdout "${filePath}"`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}
