import { open } from '@tauri-apps/api/dialog';
import { watchImmediate } from 'tauri-plugin-fs-watch-api';
import {
  supportedMarkdownExtensions,
  supportedLaTeXExtensions,
} from '@isos/processor';
import { Button } from '../styles';

type Props = {
  onChange: (filePath: string) => unknown;
};

let destroyWatcher = () => {};

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

    // destroy previous watcher by calling it
    // https://github.com/tauri-apps/tauri-plugin-fs-watch#usage
    destroyWatcher();

    onChange(selected);

    destroyWatcher = await watchImmediate(selected, async (event) => {
      // TODO: find a better way to do this
      // @ts-expect-error
      if (event.type.modify.kind === 'data') {
        onChange(selected);
      }
    });
  }

  return <Button onClick={handleOpenFile}>Open File</Button>;
}
