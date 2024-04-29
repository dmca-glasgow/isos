import { styled } from '@linaria/react';
import { open, save } from '@tauri-apps/api/dialog';
import { writeTextFile } from '@tauri-apps/api/fs';
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

  function setMdx(mdx: string) {
    console.log('setting mdx:', mdx);
    textArea.value = mdx;
    textArea.dispatchEvent(new Event('onchange'));
  }

  // allow file to be rendered on load from a locally stored filePath
  useEffect(() => {
    async function run() {
      // console.log('setting mdx for filepath:', filePath);
      if (filePath === null) {
        setMdx('');
      } else {
        setMdx(await latexToMarkdown(filePath));
      }
    }
    run();
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
        async (event) => {
          // @ts-expect-error
          if (event.type.modify.kind === 'data') {
            // console.log('recompiling...')
            setMdx(await latexToMarkdown(filePath));
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
