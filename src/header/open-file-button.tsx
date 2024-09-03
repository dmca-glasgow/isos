import { Button } from '../styles';
import { open } from '@tauri-apps/plugin-dialog';

import {
  supportedLaTeXExtensions,
  supportedMarkdownExtensions,
} from '@isos/processor';

type Props = {
  onChange: (filePath: string) => unknown;
};

export function OpenFileButton({ onChange }: Props) {
  async function handleOpenFile() {
    console.log('hey!');

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

    // user clicked Cancel in open file dialog
    if (selected === null) {
      return;
    }

    onChange(selected);
  }

  return <Button onClick={handleOpenFile}>Open File</Button>;
}
