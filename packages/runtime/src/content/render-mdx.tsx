import { RunOptions, run } from '@mdx-js/mdx';
import { MDXModule } from 'mdx/types';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Fragment, JSX, jsx, jsxDEV, jsxs } from 'preact/jsx-runtime';

import { markdownToArticle } from '@isos/processor';

import { Section } from '../mdx-handlers/toc-highlight/section';
import { Code, Div, Pre } from './mdx-components';

const runOptions: RunOptions = {
  Fragment,
  useMDXComponents() {
    return {
      div: Div,
      code: Code,
      pre: Pre,
      section: Section,
    };
  },

  // @ts-expect-error: jsx is incompatible for unknown reasons
  jsx,
  // @ts-expect-error: jsxs is incompatible for unknown reasons
  jsxs,
  // @ts-expect-error: jsxDEV is incompatible for unknown reasons
  jsxDEV,
};

type Props = {
  markdown: string;
  setError: (err: any) => unknown;
  onRendered?: () => unknown;
};

// MDXContent needs to be returned on it's own for the
// onRendered callback to behave consistently
export function RenderMDX({ markdown, onRendered, setError }: Props) {
  const [MDX, setMDX] = useState<MDXModule | null>(null);
  const MDXContent = MDX ? MDX.default : Fragment;

  useEffect(() => {
    (async () => {
      if (markdown === '') {
        return;
      }
      try {
        const article = await markdownToArticle(markdown);
        const mdx = await run(article, runOptions);
        setMDX(mdx);
        setError('');
      } catch (err: any) {
        setError(err);
      }
    })();
  }, [markdown]);

  const mdxRef = useCallback((instance: JSX.Element) => {
    if (instance !== null) {
      onRendered && onRendered();
    }
  }, []);

  return <MDXContent ref={mdxRef} />;
}
