import { styled } from '@linaria/react';
import { open, save } from '@tauri-apps/api/dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { watchImmediate } from 'tauri-plugin-fs-watch-api';
import { useContext, useEffect } from 'preact/hooks';

import { latexToMarkdown } from '@isos/latex-to-markdown';
import { getMarkdown, setMarkdown } from '@isos/textarea-store';

import { createRuntimeHtml } from '../export';
import { useLocalStorage } from './use-local-storage';
import { LoadingContext } from '@isos/runtime';

async function setMarkdownFromFilePath(filePath: string) {
  const fileContents = await readTextFile(filePath);
  const markdown = await latexToMarkdown(fileContents);
  setMarkdown(markdown);
}

let watcher = () => {};

export function Header() {
  const [filePath, setFilePath] = useLocalStorage('file-path', null);
  const { loading, setLoading } = useContext(LoadingContext);

  async function setFilePathAndWatch(filePath: string | null) {
    // console.log('setFilePathAndWatch:', filePath);
    setLoading(true);
    setFilePath(filePath);
    watcher();

    if (filePath === null) {
      setMarkdown('');
      // console.log('stop watching', filePath);
    } else {
      setMarkdownFromFilePath(filePath);
      // console.log('watching', filePath);
      watcher = await watchImmediate(
        filePath,
        (event) => {
          // TODO: find a better way to do this
          // @ts-expect-error
          if (event.type.modify.kind === 'data') {
            // console.log('recompiling...');
            setLoading(true);
            setMarkdownFromFilePath(filePath);
          }
        },
        {}
      );
    }
  }

  // allow file to be rendered on load from a locally stored filePath
  useEffect(() => {
    // console.log('useEffect:', filePath);
    setFilePathAndWatch(filePath);
  }, [filePath]);

  async function handleOpenFile() {
    const selected = (await open({
      filters: [
        {
          name: 'TeX',
          extensions: ['tex'],
        },
      ],
    })) as string;
    setFilePathAndWatch(selected);
  }

  async function handleSave() {
    const filePath = (await save({
      filters: [
        {
          name: 'HTML',
          extensions: ['html'],
        },
      ],
    })) as string;
    const mdx = getMarkdown();
    // console.log('mdx to save:', mdx);
    const runtimeHtml = await createRuntimeHtml(mdx, {
      docTitle: 'Testing 1 2 3',
    });
    // console.log(runtimeHtml);
    await writeTextFile(filePath, runtimeHtml);
  }

  return (
    <Wrapper>
      <Button onClick={handleOpenFile}>Open File</Button>
      {filePath !== null && (
        <>
          <FilePath>
            {filePath}
            {loading ? (
              <Loading>Loading changes...</Loading>
            ) : (
              <Watching>Watching for changes</Watching>
            )}
          </FilePath>
          <Button onClick={handleSave}>Save HTML</Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  background: #000;
  /* background: #003865; */
  color: #fff;
  padding: 0.6rem;
  font-weight: 600;
`;

const Button = styled.button`
  padding: 0.7rem 1rem;
  border-radius: 0.4rem;
  background: #fff2;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s background;

  &:hover {
    background: #f50;
  }
`;

const FilePath = styled.span`
  flex: 1;
  padding: 0 1rem 0.1rem;
  font-size: 0.7rem;
`;

const FileStatus = styled.span`
  display: block;
  color: #29e808;
  line-height: 1;
`;

const Watching = styled(FileStatus)`
  color: #29e808;
`;

const Loading = styled(FileStatus)`
  color: #e88308;
`;
