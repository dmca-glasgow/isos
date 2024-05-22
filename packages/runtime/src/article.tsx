import { useEffect, useState } from 'preact/hooks';
import { Fragment, jsx, jsxs, jsxDEV } from 'preact/jsx-runtime';
import { RunOptions, run } from '@mdx-js/mdx';
import { MDXModule } from 'mdx/types';
import { MathJax } from 'better-react-mathjax';
import { markdownToJs } from '@isos/processor';
import './styles/index.scss';

const mdxOptions: RunOptions = {
  Fragment,
  // @ts-expect-error: jsx is incompatible for unknown reasons
  jsx,
  // @ts-expect-error: jsxs is incompatible for unknown reasons
  jsxs,
  // @ts-expect-error: jsxDEV is incompatible for unknown reasons
  jsxDEV,
};

type Props = {
  markdown: string;
};

export function Article({ markdown }: Props) {
  const [MDX, setMDX] = useState<MDXModule | null>(null);
  const MDXContent = MDX ? MDX.default : Fragment;

  useEffect(() => {
    (async () => {
      const jsString = await markdownToJs(markdown);
      const newMdx = await run(jsString, mdxOptions);
      setMDX(newMdx);
    })();
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
