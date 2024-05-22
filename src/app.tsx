import { styled } from '@linaria/react';
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { useContext, useEffect, useState } from 'preact/hooks';

import { createRuntimeHtml } from '@isos/export';
import { inputToMarkdown, parseFilePath } from '@isos/processor';
import { Article, LoadingContext } from '@isos/runtime';

import { Header } from './header';
import { useLocalStorage } from './use-local-storage';

import './styles.scss';

export function App() {
  const [filePath, setFilePath] = useLocalStorage('file-path', null);
  const { loading, setLoading } = useContext(LoadingContext);
  const [markdown, setMarkdown] = useState('');

  // on load
  useEffect(() => {
    if (filePath !== null) {
      handleProcessFile(filePath);
    }
  }, []);

  async function handleProcessFile(newFilePath: string) {
    setLoading(true);
    setFilePath(newFilePath);
    const { type } = parseFilePath(newFilePath);
    const content = await readTextFile(newFilePath);
    const newMarkdown = await inputToMarkdown(type, content);
    // console.log(newMarkdown);
    setMarkdown(newMarkdown);
    setLoading(false);
  }

  async function handleExportFile(saveFilePath: string) {
    const html = await createRuntimeHtml(markdown, {
      docTitle: 'Test', // TODO
    });
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
      <Article markdown={markdown} />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;
