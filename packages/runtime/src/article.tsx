import { run } from '@mdx-js/mdx';
import { MathJax } from 'better-react-mathjax';
import { MDXModule } from 'mdx/types';
import { useEffect, useState } from 'preact/hooks';
import { Fragment } from 'preact/jsx-runtime';

import { markdownToJs } from '@isos/processor';

import './styles/index.scss';

type Props = {
  markdown: string;
};

export function Article({ markdown }: Props) {
  const [MDX, setMDX] = useState<MDXModule | null>(null);
  const MDXContent = MDX ? MDX.default : Fragment;

  useEffect(() => {
    if (markdown !== '') {
      (async () => {
        const { jsString, runOptions } = await markdownToJs(markdown);
        const newMdx = await run(jsString, runOptions);
        setMDX(newMdx);
      })();
    }
  }, [markdown]);

  return (
    <article>
      <div className="wrapper">
        <MathJax>
          <MDXContent />
        </MathJax>
      </div>
    </article>
  );
}
