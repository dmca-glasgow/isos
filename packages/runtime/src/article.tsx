import { useEffect, useMemo, useState } from 'preact/hooks';
import { MDXProvider } from '@mdx-js/preact';
import { EvaluateOptions, evaluateSync } from '@mdx-js/mdx';
import { MDXComponents } from 'mdx/types';
import * as runtime from 'preact/jsx-runtime';

import { getTextArea, getMarkdown } from '@isos/textarea-store';
import { createUnifiedPlugins } from '@isos/markdown-to-html';
// import * as components from './components';
import './styles/index.scss';

// @ts-expect-error preact/jsx-runtime is incompatible for unknown reasons
const options: EvaluateOptions = {
  ...runtime,
};

export function Article() {
  const [mdx, setMdx] = useState(getMarkdown());

  const MDX = useMemo(() => {
    // console.log(mdx);

    const { remarkPlugins, rehypePlugins } = createUnifiedPlugins();
    options.remarkPlugins = remarkPlugins;
    options.rehypePlugins = rehypePlugins;

    return evaluateSync(mdx.replace(/\{/g, '\\{'), options).default;
  }, [mdx]);

  useEffect(() => {
    function cacheChanges() {
      setMdx(getMarkdown());
    }

    // console.log('registering change handlers for', textArea);
    const textArea = getTextArea();
    textArea.addEventListener('input', cacheChanges, false);
    textArea.addEventListener('onchange', cacheChanges, false);

    return () => {
      textArea.removeEventListener('input', cacheChanges);
      textArea.removeEventListener('onchange', cacheChanges);
    };
  }, []);

  return (
    <article>
      <div className="wrapper">
        <MDXProvider components={{} as MDXComponents}>
          <MDX />
        </MDXProvider>
      </div>
    </article>
  );
}

// TODO: MathJax and https://wyw-in-js.dev are currently incompatible
// but it's easy to avoid for now (and maybe not necessary to fix)
// const StyledArticle = styled.article`
//   flex: 1;
// `;
