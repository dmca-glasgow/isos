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
          name: 'All supported extensions',
          extensions: [
            ...supportedLaTeXExtensions,
            ...supportedMarkdownExtensions,
          ],
        },
        {
          name: 'Supported LaTeX extensions',
          extensions: supportedLaTeXExtensions,
        },
        {
          name: 'Supported Markdown extensions',
          extensions: supportedMarkdownExtensions,
        },
      ],
    });
    onChange(selected);
  }
  return <button onClick={handleOpenFile}>Open File</button>;
}
