import { styled } from '@linaria/react';
import { open, save } from '@tauri-apps/api/dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { watchImmediate } from 'tauri-plugin-fs-watch-api';
import { useEffect } from 'preact/hooks';
import classNames from 'classnames';

import { latexToMarkdown } from '@isos/latex-to-markdown';
import { useLocalStorage } from './use-local-storage';

import { createRuntimeHtml } from '../export';

const textArea = document.getElementById('article') as HTMLTextAreaElement;

let watcher: null | (() => unknown) = null;

export function Header() {
  const [filePath, setFilePath] = useLocalStorage('file-path', null);
  const [isWatching, setIsWatching] = useLocalStorage('watching', 'false');

  // allow file to be rendered on load from a locally stored filePath
  useEffect(() => {
    setMdx(filePath);
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
    setFilePath(selected);
  }

  async function handleWatchToggle() {
    if (filePath === null) {
      return;
    }
    if (isWatching === 'true') {
      // console.log('stopping watcher');
      if (watcher !== null) {
        watcher();
        watcher = null;
      }
      setIsWatching('false');
    } else {
      // console.log('starting watcher');
      watcher = await watchImmediate(
        filePath,
        (event) => {
          // @ts-expect-error
          if (event.type.modify.kind === 'data') {
            // console.log('recompiling...')
            setMdx(filePath);
          }
        },
        {}
      );
      setIsWatching('true');
    }
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

    const mdx = textArea.value.trim();
    // console.log('mdx to save:', mdx);

    const runtimeHtml = await createRuntimeHtml(mdx, {
      docTitle: 'Testing 1 2 3',
    });
    // console.log(runtimeHtml);

    await writeTextFile(filePath, runtimeHtml);
  }

  async function setMdx(filePath: string | null) {
    let markdown = '';

    if (filePath !== null) {
      const fileContents = await readTextFile(filePath);
      markdown = await latexToMarkdown(fileContents);
    }

    // console.log('setting markdown:', markdown);
    textArea.value = markdown;
    textArea.dispatchEvent(new Event('onchange'));
  }

  return (
    <Wrapper>
      <button onClick={handleOpenFile}>Open File</button>
      {filePath !== null && (
        <>
          <FilePathButton>{filePath}</FilePathButton>
          <WatchingButton
            onClick={handleWatchToggle}
            className={classNames({
              watching: isWatching === 'true',
            })}>
            Watch for changes
          </WatchingButton>
          <button onClick={handleSave}>Save HTML</button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  flex: 0 0 auto;
  background: #f2f2f2;
  color: #000;
  padding: 8px;
`;

const FilePathButton = styled.span`
  padding: 0 10px;
`;

const WatchingButton = styled.span`
  flex: 1;
  color: blue;
  text-decoration: underline;
  &.watching {
    color: green;
  }
`;
