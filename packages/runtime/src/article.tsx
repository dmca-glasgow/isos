import { useEffect, useMemo, useState } from 'preact/hooks';
import { MDXProvider } from '@mdx-js/preact';
import { EvaluateOptions, evaluateSync } from '@mdx-js/mdx';
import { MDXComponents } from 'mdx/types';
import * as runtime from 'preact/jsx-runtime';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

import * as components from './components';

const textArea = document.getElementById('article') as HTMLTextAreaElement;
const initialMdx = (textArea?.innerHTML || '').trim();
// .replace('\\\\', '\\');

// @ts-expect-error preact/jsx-runtime is incompatible for unknown reasons
const options: EvaluateOptions = {
  ...runtime,
};

// TODO: MathJax and https://wyw-in-js.dev are currently incompatible
// but it's easy to avoid for now (and maybe not necessary to fix)

options.remarkPlugins = [remarkMath];
options.rehypePlugins = [rehypeMathjax];

export function Article() {
  const [mdx, setMdx] = useState(initialMdx);

  // console.log({ initialMdx });

  const MDX = useMemo(() => {
    return evaluateSync(mdx, options).default;
  }, [mdx]);

  useEffect(() => {
    if (textArea === null) {
      return;
    }

    function cacheChanges() {
      // console.log('caching changes');
      if (textArea !== null) {
        const newMdx = textArea.value || '';
        // console.log('changes:', newMdx);
        setMdx(newMdx.trim());
      }
    }

    // console.log('registering change handlers for', textArea);
    textArea.addEventListener('input', cacheChanges, false);
    textArea.addEventListener('onchange', cacheChanges, false);

    return () => {
      textArea.removeEventListener('input', cacheChanges);
      textArea.removeEventListener('onchange', cacheChanges);
    };
  }, []);

  return (
    <article>
      <MDXProvider components={components as MDXComponents}>
        <MDX />
      </MDXProvider>
    </article>
  );
}
