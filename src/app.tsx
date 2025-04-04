import { resolveResource } from '@tauri-apps/api/path';
import { useEffect, useState } from 'preact/hooks';

import { createRuntimeHtml } from '@isos/export';
import { readTextFile, watchImmediate, writeTextFile } from '@isos/fs';
import {
  createInputToMarkdownContext,
  createInputToMarkdownOptions,
  inputToMarkdown,
} from '@isos/processor';
import { useLocalStorage } from '@isos/use-local-storage';

import { Runtime } from '../packages/runtime/src';
import { Header } from './header';

import './styles.scss';

let destroyWatcher = () => {};

export function App() {
  const [filePath, setFilePath] = useLocalStorage('file-path', '');
  // const { setError } = useContext(ErrorContext);
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filePath === '') {
      return;
    }
    (async () => {
      await processMarkdown(filePath);
      createFileWatcher(filePath);
    })();
  }, [filePath]);

  async function processMarkdown(newFilePath: string) {
    try {
      const ctx = await createInputToMarkdownContext(newFilePath);
      const options = createInputToMarkdownOptions(ctx);
      const newMarkdown = await inputToMarkdown(ctx.content, options);
      setMarkdown(newMarkdown);
      // setError('');
    } catch (err: any) {
      console.log(err);
      // setError(err.message);
    }
  }

  async function createFileWatcher(newFilePath: string) {
    // destroy previous watcher by calling it
    // https://github.com/tauri-apps/tauri-plugin-fs-watch#usage
    destroyWatcher();

    destroyWatcher = await watchImmediate(newFilePath, (event) => {
      // can be of type 'any' or 'other'
      if (typeof event.type === 'string') {
        return;
      }
      const type = event.type as Record<string, any>;
      if (type.create?.kind === 'file' || type.modify?.kind === 'data') {
        setLoading(true);
        processMarkdown(newFilePath);
      }
    });
  }

  async function handleProcessFile(newFilePath: string | null) {
    if (newFilePath === null || newFilePath === filePath) {
      return;
    }
    setFilePath(newFilePath);
    setLoading(true);
    createFileWatcher(newFilePath);
  }

  async function handleExportFile(saveFilePath: string) {
    const frontmatter = {
      docTitle: 'Test', // TODO
    };
    const bundle = {
      css: await readTextFile(
        await resolveResource('resources/runtime/index.css'),
      ),
      js: await readTextFile(
        await resolveResource('resources/runtime/runtime.js'),
      ),
      font: 'termes',
    };
    const html = await createRuntimeHtml(markdown, frontmatter, bundle);
    await writeTextFile(saveFilePath, html);
  }

  function handleRendered() {
    setLoading(false);
  }

  return (
    <>
      <Header
        filePath={filePath}
        loading={loading}
        handleProcessFile={handleProcessFile}
        handleExportFile={handleExportFile}
      />
      <Runtime
        markdown={markdown}
        hide={loading}
        onRendered={handleRendered}
      />
    </>
  );
}
