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

// const initialMarkdown = getMarkdown();

export function Article() {
  const [mdx, setMdx] = useState(getMarkdown());
  // const [loading, setLoading] = useState(false);

  const MDX = useMemo(() => {
    // setLoading(true)

    // clear context by recreating plugins with fresh context:
    const { remarkPlugins, rehypePlugins } = createUnifiedPlugins();
    options.remarkPlugins = remarkPlugins;
    options.rehypePlugins = rehypePlugins;

    // console.log(mdx);
    const { default: MDXContent } = evaluateSync(
      mdx.replace(/\{/g, '\\{'),
      options
    );

    // setLoading(false)

    return MDXContent;
  }, [mdx]);

  useEffect(() => {
    function cacheChanges() {
      console.log('anything?');
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

  // console.log('loading:', loading);

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
