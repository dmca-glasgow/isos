import { run } from '@mdx-js/mdx';
import { MDXModule } from 'mdx/types';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Fragment } from 'preact/jsx-runtime';

import { createRunOptions } from '@isos/processor';

type Props = {
  jsString: string;
  onRendered: () => unknown;
};

export function Article({ jsString, onRendered }: Props) {
  // const [js, setJs] = useState('');
  const [MDX, setMDX] = useState<MDXModule | null>(null);
  const MDXContent = MDX ? MDX.default : Fragment;

  useEffect(() => {
    // if (jsString === js) {
    //   return;
    // }
    (async () => {
      // setJs(jsString);
      setMDX(await run(jsString, createRunOptions()));

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

  const elemRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      onRendered();
    }
  }, []);

  return <MDXContent ref={elemRef} />;
}
