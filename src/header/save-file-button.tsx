import { save } from '@tauri-apps/plugin-dialog';
import { Button } from '../styles';
import { parseFilePath } from '@isos/processor';

type Props = {
  filePath: string;
  onSave: (saveFilePath: string) => unknown;
};

export function SaveFileButton({ filePath, onSave }: Props) {
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

    onSave(saveFilePath);
  }

  return <Button onClick={handleSave}>Save HTML</Button>;
}
