import { run } from '@mdx-js/mdx';
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

      // window.MathJax = {
      //   tex: {
      //     inlineMath: [
      //       ['$', '$'],
      //       ['\\(', '\\)'],
      //     ],
      //   },
      //   startup: {
      //     ready() {
      //       window.MathJax.startup.defaultReady();
      //       const article = document.querySelector('article');
      //       window.MathJax.typesetPromise([article]);
      //     },
      //   },
      //   chtml: {
      //     scale: 1.1,
      //   },
      //   // svg: {
      //   //   scale: 1.1,
      //   // },
      // };
    })();
  }, [jsString]);

  return (
    <>
      {/* <MathJax> */}
      <MDXContent />
      {/* </MathJax> */}
    </>
  );
}
