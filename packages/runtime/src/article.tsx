import { Fragment } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { MDXProvider } from '@mdx-js/preact';
import { EvaluateOptions, evaluate } from '@mdx-js/mdx';
import { MDXComponents, MDXModule } from 'mdx/types';
import * as runtime from 'preact/jsx-runtime';

import { getTextArea, getMarkdown } from '@isos/textarea-store';
import { createUnifiedPlugins } from '@isos/markdown-to-html';
// import * as components from './components';
import './styles/index.scss';
import { LoadingContext } from './loading-provider';
import classNames from 'classnames';

// @ts-expect-error preact/jsx-runtime is incompatible for unknown reasons
const options: EvaluateOptions = {
  ...runtime,
};

export function Article() {
  const { loading, setLoading } = useContext(LoadingContext);
  const [mdx, setMdx] = useState(getMarkdown());
  const [MDX, setMDX] = useState<MDXModule | null>(null);
  const Content = MDX ? MDX.default : Fragment;

  // on load
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

  useEffect(() => {
    async function run() {
      // clear context by recreating plugins with fresh context:
      const { remarkPlugins, rehypePlugins } = createUnifiedPlugins();
      options.remarkPlugins = remarkPlugins;
      options.rehypePlugins = rehypePlugins;

      // console.log(mdx);
      const MDXContent = await evaluate(
        // TODO: https://github.com/goodproblems/remark-mdx-math-enhanced
        mdx.replace(/\{/g, '\\{'),
        options
      );

      setLoading(false);
      setMDX(MDXContent);
    }
    run();
  }, [mdx]);

  return (
    <article>
      <div className="wrapper">
        <div className={classNames('loading', { active: loading })} />
        <MDXProvider components={{} as MDXComponents}>
          <Content />
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
