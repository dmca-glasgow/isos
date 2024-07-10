import { run } from '@mdx-js/mdx';
// import { MathJax } from 'better-react-mathjax';
import { MDXModule } from 'mdx/types';
import { useEffect, useState } from 'preact/hooks';
import { Fragment } from 'preact/jsx-runtime';

import { runOptions } from '@isos/processor';

type Props = {
  jsString: string;
};

export function Article({ jsString }: Props) {
  const [MDX, setMDX] = useState<MDXModule | null>(null);
  const MDXContent = MDX ? MDX.default : Fragment;

  useEffect(() => {
    (async () => {
      setMDX(await run(jsString, runOptions));
    })();
  }, [jsString]);

  return (
    <article>
      {/* <MathJax> */}
      <MDXContent />
      {/* </MathJax> */}
    </article>
  );
}
