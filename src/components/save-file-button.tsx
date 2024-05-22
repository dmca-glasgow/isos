import { save } from '@tauri-apps/api/dialog';
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

    if (saveFilePath !== null) {
      onSave(saveFilePath);
    }

    // const mdx = getMarkdown();
    // // console.log('mdx to save:', mdx);
    // const runtimeHtml = await createRuntimeHtml(mdx, {
    //   docTitle: 'Testing 1 2 3',
    // });
    // // console.log(runtimeHtml);
    // await writeTextFile(filePath, runtimeHtml);
  }

  return <Button onClick={handleSave}>Save HTML</Button>;
}
