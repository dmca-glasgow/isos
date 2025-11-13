import { ElementContent } from 'hast';
import { exec } from 'node:child_process';
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

// Helpful utility for development and depends on Quarto CLI

export async function markdownToQuartoHtml(input: string) {
  const id = crypto.randomBytes(20).toString('hex');
  const tempDir = await fsPromise.realpath(os.tmpdir());
  const dir = path.join(tempDir, id);
  await fsPromise.mkdir(dir);

  const qmdFile = path.join(dir, 'test.qmd');
  await fsPromise.writeFile(qmdFile, input);
  const html = await quartoToHtml(qmdFile);

  fs.rmSync(dir, { recursive: true, force: true });
  return html;
}

async function quartoToHtml(filePath: string) {
  const html = await execQuarto(filePath);

  const processor = unified().use(rehypeParse).use(rehypeStringify);
  const parsed = processor.parse(html);

  const children: ElementContent[] = [];
  visit(parsed, 'element', (node) => {
    if (node.tagName === 'main') {
      children.push(...node.children);
    }
  });

  const newHtml = processor
    .stringify({ type: 'root', children })
    .replace(/[^\S\r\n]/g, ' ');

  return formatHtml(newHtml);
}

async function execQuarto(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const cmd = `quarto render "${filePath}" --log-level warning --to html --output -`;
    exec(cmd, (error, stdout, stderr) => {
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
