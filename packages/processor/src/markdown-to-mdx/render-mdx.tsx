import { MDXModule } from 'mdx/types';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Fragment, JSX } from 'preact/jsx-runtime';

import { MdxState } from './mdx-handlers/mdx-state';
import { Options } from './options';

// import { MathsProviderOptions, Providers } from './providers';

type Props = {
  markdown: string;
  renderFn: (
    markdown: string,
    mdxState: MdxState,
    options: Partial<Options>,
  ) => MDXModule | Promise<MDXModule>;
  onError: (err: string) => unknown;
  onRendered?: () => unknown;
  mdxState: MdxState;
  options?: Partial<Options>;
};

// MDXContent needs to be returned on its own for the
// onRendered callback to behave consistently
export function RenderMDX({
  markdown,
  renderFn,
  onRendered,
  onError,
  mdxState,
  options = {},
}: Props) {
  const [MDX, setMDX] = useState<MDXModule | null>(null);
  const MDXContent = MDX ? MDX.default : Fragment;

  useEffect(() => {
    (async () => {
      if (markdown === '') {
        return;
      }
      try {
        setMDX(await renderFn(markdown, mdxState, options));
        onError('');
      } catch (err: any) {
        onError(err?.message || '');
      }
    })();
  }, [markdown]);

  const mdxRef = useCallback((instance: JSX.Element) => {
    if (instance !== null) {
      onRendered && onRendered();
    }
  }, []);

  return (
    // <Providers options={options}>
    <MDXContent ref={mdxRef} />
    // </Providers>
  );
}
