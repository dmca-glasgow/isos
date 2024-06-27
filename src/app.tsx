import { styled } from '@linaria/react';
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { resolveResource } from '@tauri-apps/api/path';
import { useContext, useEffect, useState } from 'preact/hooks';
import { watchImmediate } from 'tauri-plugin-fs-watch-api';

import { createRuntimeHtml } from '@isos/export';
import { createContext, inputToMarkdown } from '@isos/processor';
import { LoadingContext, Runtime } from '@isos/runtime';
import { useLocalStorage } from '@isos/use-local-storage';

import { Header } from './header';

import './styles.scss';

let destroyWatcher = () => {};

export function App() {
  const [filePath, setFilePath] = useLocalStorage('file-path', '');
  const { loading, setLoading } = useContext(LoadingContext);
  const [markdown, setMarkdown] = useState('');

  // on load
  useEffect(() => {
    if (filePath !== '') {
      handleProcessFile(filePath);
    }
  }, []);

  async function handleProcessFile(newFilePath: string) {
    setLoading(true);
    setFilePath(newFilePath);
    const ctx = await createContext(newFilePath);
    const newMarkdown = await inputToMarkdown(ctx);
    setMarkdown(newMarkdown);
    setLoading(false);

    // destroy previous watcher by calling it
    // https://github.com/tauri-apps/tauri-plugin-fs-watch#usage
    destroyWatcher();

    destroyWatcher = await watchImmediate(newFilePath, async (event) => {
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
        await resolveResource('resources/index.css')
      ),
      js: await readTextFile(
        await resolveResource('resources/runtime.js')
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
