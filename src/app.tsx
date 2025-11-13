import { resolveResource } from '@tauri-apps/api/path';
import { startCase } from 'lodash';
import { filename } from 'pathe/utils';
import { useEffect, useState } from 'preact/hooks';

import { createRuntimeHtml } from '@isos/export';
import { fs } from '@isos/fs/tauri';

import { Runtime } from '../packages/runtime/src';
import { Header } from './header';
import { useLocalStorage } from './use-local-storage';

import './styles.scss';

import { createProcessor } from '@isos/processor/input-to-markdown';

import { Log } from './log';
import { WarningLineHighlight } from './warnings/warn-line-highlight';

export function App() {
  const [filePath, setFilePath] = useLocalStorage('file-path', '');
  const [subFilePaths, setSubFilePaths] = useState<string[]>([]);
  const [_error, setError] = useState('');
  // const { setError } = useContext(ErrorContext);
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const processor = createProcessor(filePath, fs, {
      onError(err) {
        setError(err.message);
      },
      onComplete({ markdown, ctx }) {
        setMarkdown(markdown);

        const filePaths = ctx.fileCache.getFilePaths();
        setSubFilePaths(filePaths);
        setError('');
      },
      onLoading: setLoading,
      onStatus: setStatus,
    });

    (async () => {
      if (filePath !== '') {
        await processor.process();
      }
    })();

    return () => {
      processor.destroy();
    };
  }, [filePath]);

  async function handleProcessFile(newFilePath: string | null) {
    if (newFilePath === null || newFilePath === filePath) {
      return;
    }
    setLoading(true);
    setFilePath(newFilePath);
    setMarkdown('');
    // createFileWatcher(newFilePath);
  }

  async function handleExportFile(saveFilePath: string) {
    const frontmatter = {
      docTitle: startCase(filename(filePath)),
    };
    const bundle = {
      css: await fs.readTextFile(
        await resolveResource('resources/runtime/index.css'),
      ),
      js: await fs.readTextFile(
        await resolveResource('resources/runtime/runtime.js'),
      ),
    };
    const html = await createRuntimeHtml(markdown, frontmatter, bundle);
    await fs.writeTextFile(saveFilePath, html);
  }

  function handleRendered() {
    setLoading(false);
  }

  return (
    <>
      <Header
        filePath={filePath}
        numWatchedFiles={subFilePaths.length}
        loading={loading}
        status={status}
        handleProcessFile={handleProcessFile}
        handleExportFile={handleExportFile}
      />
      <Log />
      {markdown !== '' && (
        <Runtime
          markdown={markdown}
          hide={loading}
          onRendered={handleRendered}
          setStatus={setStatus}
        />
      )}
      <WarningLineHighlight loading={loading} />
    </>
  );
}
