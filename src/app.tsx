import { styled } from '@linaria/react';
import { resolveResource } from '@tauri-apps/api/path';
import {
  readTextFile,
  watch,
  watchImmediate,
  writeTextFile,
} from '@tauri-apps/plugin-fs';
import { useContext, useEffect, useState } from 'preact/hooks';

import { createRuntimeHtml } from '@isos/export';
import { createContext, inputToMarkdown } from '@isos/processor';
import { ErrorContext, LoadingContext, Runtime } from '@isos/runtime';
import { useLocalStorage } from '@isos/use-local-storage';

import { Header } from './header';

import './styles.scss';

let destroyWatcher = () => {};

export function App() {
  const [filePath, setFilePath] = useLocalStorage('file-path', '');
  const { loading, setLoading } = useContext(LoadingContext);
  const { setError } = useContext(ErrorContext);
  const [markdown, setMarkdown] = useState('');

  // on load
  useEffect(() => {
    if (filePath !== '') {
      handleProcessFile(filePath);
    }
  }, []);

  async function handleProcessFile(newFilePath: string) {
    setFilePath(newFilePath);
    const ctx = await createContext(newFilePath);

    try {
      setLoading(true);
      const newMarkdown = await inputToMarkdown(ctx);
      setMarkdown(newMarkdown);
      setError('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

    // destroy previous watcher by calling it
    // https://github.com/tauri-apps/tauri-plugin-fs-watch#usage
    destroyWatcher();

    destroyWatcher = await watchImmediate(newFilePath, (event) => {
      const type = event.type as Record<string, any>;

      if (type.create?.kind === 'file') {
        handleProcessFile(newFilePath);
      }

      if (type.modify?.kind === 'data') {
        handleProcessFile(newFilePath);
      }
    });
  }

  async function handleExportFile(saveFilePath: string) {
    const frontmatter = {
      docTitle: 'Test', // TODO
    };
    const bundle = {
      css: await readTextFile(
        await resolveResource('resources/index.css'),
      ),
      js: await readTextFile(
        await resolveResource('resources/runtime.js'),
      ),
    };
    const html = await createRuntimeHtml(markdown, frontmatter, bundle);
    await writeTextFile(saveFilePath, html);
  }

  return (
    <StyledApp>
      <Header
        filePath={filePath}
        loading={loading}
        handleProcessFile={handleProcessFile}
        handleExportFile={handleExportFile}
      />
      <Runtime markdown={markdown} />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;
