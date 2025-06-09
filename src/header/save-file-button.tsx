import { save } from '@tauri-apps/plugin-dialog';
import { useState } from 'preact/hooks';

import { parseFilePath } from '@isos/processor';

type Props = {
  filePath: string;
  onSave: (saveFilePath: string) => unknown;
};

export function SaveFileButton({ filePath, onSave }: Props) {
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    const { name } = parseFilePath(filePath);
    const saveFilePath = await save({
      defaultPath: `${name}.html`,
      filters: [
        {
          name: 'HTML',
          extensions: ['html'],
        },
      ],
    });

    // user clicked Cancel in save file dialog
    if (saveFilePath === null) {
      return;
    }

    await onSave(saveFilePath);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <button onClick={handleSave}>{saved ? 'Saved' : 'Save HTML'}</button>
  );
}
