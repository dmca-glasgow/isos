import { styled } from '@linaria/react';
import { open, save } from '@tauri-apps/api/dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { watchImmediate } from 'tauri-plugin-fs-watch-api';
import { useEffect } from 'preact/hooks';
import classNames from 'classnames';

import { latexToMarkdown } from '@isos/latex-to-markdown';
import { getMarkdown, setMarkdown } from '@isos/textarea-store';

import { createRuntimeHtml } from '../export';
import { useLocalStorage } from './use-local-storage';

async function _setMarkdown(filePath: string) {
  const fileContents = await readTextFile(filePath);
  const markdown = await latexToMarkdown(fileContents);
  setMarkdown(markdown);
}

let watcher: null | (() => unknown) = null;

export function Header() {
  const [filePath, setFilePath] = useLocalStorage('file-path', null);

  async function setFilePathAndWatch(filePath: string | null) {
    setFilePath(filePath);
    watcher = null;

    if (filePath === null) {
      setMarkdown('');
      console.log('stop watching', filePath);
    } else {
      _setMarkdown(filePath);
      console.log('watching', filePath);
      watcher = await watchImmediate(
        filePath,
        (event) => {
          // @ts-expect-error
          if (event.type.modify.kind === 'data') {
            console.log('recompiling...');
            _setMarkdown(filePath);
          }
        },
        {}
      );
    }
  }

  // allow file to be rendered on load from a locally stored filePath
  useEffect(() => {
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
    // const filePath = (await save({
    //   filters: [
    //     {
    //       name: 'HTML',
    //       extensions: ['html'],
    //     },
    //   ],
    // })) as string;
    // const mdx = getMarkdown();
    // // console.log('mdx to save:', mdx);
    // const runtimeHtml = await createRuntimeHtml(mdx, {
    //   docTitle: 'Testing 1 2 3',
    // });
    // // console.log(runtimeHtml);
    // await writeTextFile(filePath, runtimeHtml);
  }

  return (
    <Wrapper>
      <Button onClick={handleOpenFile}>Open File</Button>
      {filePath !== null && (
        <>
          <FilePath>
            {filePath}
            <FileStatus>Watching for changes</FileStatus>
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
`;

const Button = styled.button`
  padding: 0.7rem 1rem;
  border-radius: 0.4rem;
  background: #fff2;
  color: #fff;
  cursor: pointer;
  transition: 0.2s background;
  font-weight: 600;

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
  opacity: 0.5;
  line-height: 1;
`;
