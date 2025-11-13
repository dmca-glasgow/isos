import { MDXModule } from 'mdx/types';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Fragment, JSX } from 'preact/jsx-runtime';

import { logger } from '@isos/logger';

import { createContext } from './context';
import { MdxState } from './mdx-handlers/mdx-state';
import { Options, createDefaultOptions } from './options';

// import { MathsProviderOptions, Providers } from './providers';

const log = logger('runtime');

type Props = {
  markdown: string;
  renderFn: (
    markdown: string,
    options: Options,
    onStatus?: (status: string) => unknown,
  ) => MDXModule | Promise<MDXModule>;
  onError: (err: string) => unknown;
  onRendered?: () => unknown;
  onStatus?: (status: string) => unknown;
  mdxState: MdxState;
  options?: Partial<Options>;
};

// MDXContent needs to be returned on its own for the
// onRendered callback to behave consistently
export function RenderMDX({
  markdown,
  renderFn,
  onRendered,
  onStatus,
  onError,
  mdxState,
  options = {},
}: Props) {
  const [MDX, setMDX] = useState<MDXModule | null>(null);
  const MDXContent = MDX ? MDX.default : Fragment;

  useEffect(() => {
    (async () => {
      // if (markdown === '') {
      //   return;
      // }
      try {
        // console.log({ onStatus });
        onStatus && log.info('converting markdown to html');
        const ctx = createContext();
        const opts = createDefaultOptions(mdxState, ctx, options);
        setMDX(await renderFn(markdown, opts, onStatus));
        onStatus && log.info('rendering');
        onError('');
      } catch (err: any) {
        onError(err?.message || '');
        // throw err;
      }
    })();
  }, [markdown]);

  const mdxRef = useCallback((instance: JSX.Element) => {
    if (instance !== null) {
      onStatus && log.info('✨ Complete');
      onRendered && onRendered();
    }
  }, []);

  return (
    // <Providers options={options}>
    <MDXContent ref={mdxRef} />
    // </Providers>
  );
}
