import { resolveResource } from '@tauri-apps/api/path';
import { useEffect, useState } from 'preact/hooks';

import { createRuntimeHtml } from '@isos/export';
import { readTextFile, watchImmediate, writeTextFile } from '@isos/fs';
import {
  createInputToMarkdownContext,
  createInputToMarkdownOptions,
  embedIncludes,
  inputToMarkdown,
} from '@isos/processor';
import { useLocalStorage } from '@isos/use-local-storage';

import { Runtime } from '../packages/runtime/src';
import { Header } from './header';

import './styles.scss';

const watchers: (() => void)[] = [];

export function App() {
  const [filePath, setFilePath] = useLocalStorage('file-path', '');
  const [subFilePaths, setSubFilePaths] = useState<string[]>([]);
  // const { setError } = useContext(ErrorContext);
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (filePath !== '') {
        await processMarkdown();
      }
    })();
  }, [filePath]);

  async function processMarkdown() {
    try {
      const ctx = await createInputToMarkdownContext(filePath);
      const options = createInputToMarkdownOptions(ctx);
      await embedIncludes(ctx, options);
      const newMarkdown = await inputToMarkdown(ctx.content, options);
      setMarkdown(newMarkdown);
      setSubFilePaths(ctx.subFilePaths);
      createFileWatchers(ctx.subFilePaths);
      // setError('');
    } catch (err: any) {
      console.error(err);
      // setError(err.message);
    }
  }

  async function createFileWatchers(subFiles: string[]) {
    // destroy previous watchers by calling them
    // https://github.com/tauri-apps/tauri-plugin-fs-watch#usage
    watchers.map((fn) => fn()).splice(0, watchers.length);
    const pathsToWatch = [filePath, ...subFiles];

    for (const toWatch of pathsToWatch) {
      try {
        watchers.push(
          await watchImmediate(toWatch, (event) => {
            // can be of type 'any' or 'other'
            if (typeof event.type === 'string') {
              return;
            }
            const type = event.type as Record<string, any>;
            if (
              type.create?.kind === 'file' ||
              type.modify?.kind === 'data'
            ) {
              setLoading(true);
              processMarkdown();
            }
          }),
        );
      } catch (err: any) {
        console.log('[file watcher]:', String(err));
      }
    }
  }

  async function handleProcessFile(newFilePath: string | null) {
    if (newFilePath === null || newFilePath === filePath) {
      return;
    }
    setLoading(true);
    setFilePath(newFilePath);
    // createFileWatcher(newFilePath);
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
        numWatchedFiles={subFilePaths.length + 1}
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
