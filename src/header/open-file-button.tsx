import { open } from '@tauri-apps/plugin-dialog';

import {
  supportedLaTeXExtensions,
  supportedMarkdownExtensions,
} from '@isos/processor';

type Props = {
  onChange: (filePath: string | null) => unknown;
};

export function OpenFileButton({ onChange }: Props) {
  async function handleOpenFile() {
    const selected = await open({
      multiple: false,
      directory: false,
      filters: [
        {
          name: 'LaTeX',
          extensions: supportedLaTeXExtensions,
        },
        {
          name: 'Markdown',
          extensions: supportedMarkdownExtensions,
        },
      ],
    });
    onChange(selected);
  }
  return <button onClick={handleOpenFile}>Open File</button>;
}
