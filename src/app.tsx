import { useContext, useEffect, useState } from 'preact/hooks';
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { styled } from '@linaria/react';
import { Article, LoadingContext } from '@isos/runtime';
import { inputToMarkdown, parseFilePath } from '@isos/processor';
import { useLocalStorage } from './hooks/use-local-storage';
import { Header } from './header';
import './styles.scss';
import { createRuntimeHtml } from '@isos/export';

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
