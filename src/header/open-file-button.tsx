import { Button } from '../styles';
import { open } from '@tauri-apps/api/dialog';

import {
  supportedLaTeXExtensions,
  supportedMarkdownExtensions,
} from '@isos/processor';

type Props = {
  onChange: (filePath: string) => unknown;
};

export function OpenFileButton({ onChange }: Props) {
  async function handleOpenFile() {
    const selected = await open({
      multiple: false,
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

    if (Array.isArray(selected)) {
      throw new Error('open file: multiple files are not supported');
    }

    // user clicked Cancel in open file dialog
    if (selected === null) {
      return;
    }

    onChange(selected);
  }

  return <Button onClick={handleOpenFile}>Open File</Button>;
}
