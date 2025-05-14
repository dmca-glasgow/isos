import { exec } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import fsPromise from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

// This package is used in tests and depends on Pandoc CLI

export async function markdownToPandocHtml(input: string) {
  const id = crypto.randomBytes(20).toString('hex');
  const tempDir = await fsPromise.realpath(os.tmpdir());
  const dir = path.join(tempDir, id);
  await fsPromise.mkdir(dir);

  const qmdFile = path.join(dir, 'test.md');
  await fsPromise.writeFile(qmdFile, input);
  const html = await execPandoc(qmdFile);

  fs.rmSync(dir, { recursive: true, force: true });
  return html.trim();
}

async function execPandoc(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const cmd = `pandoc -f markdown -t html "${filePath}"`;
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
