import { dirname, basename } from '@tauri-apps/api/path';
import { Command } from '@tauri-apps/api/shell';

export async function execPandoc(filePath: string, rawTex?: boolean) {
  const cwd = await dirname(filePath);
  const fileName = await basename(filePath);
  const args = [
    '--shift-heading-level-by',
    '1',
    '--from',
    rawTex ? 'latex+raw_tex' : 'latex',
    '--to',
    'markdown',
    fileName,
  ];
  const command = Command.sidecar('binaries/pandoc', args, { cwd });
  const response = await command.execute();

  return response.stdout.split('\n\n').join('\n');
}
