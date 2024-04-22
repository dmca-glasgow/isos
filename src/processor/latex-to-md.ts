import { dirname, basename } from '@tauri-apps/api/path';
import { Command } from '@tauri-apps/api/shell';

export async function latexToMarkdown(filePath: string) {
  const cwd = await dirname(filePath)
  const fileName = await basename(filePath)
  const args = [
    '--shift-heading-level-by', '1',
    '--from', 'latex',
    '--to', 'markdown',
    fileName
  ]
  const command = Command.sidecar('binaries/pandoc', args, { cwd });
  const response = await command.execute()
  const stdOut = response.stdout

  // TODO: this hack seems to work for now
  return stdOut.split('\n\n').join('\n')
}
