import { run } from '@mdx-js/mdx';
import classNames from 'classnames';
import { MDXModule } from 'mdx/types';
import { useEffect, useState } from 'preact/hooks';
import { Fragment } from 'preact/jsx-runtime';

import { sidebarRunOptions } from '@isos/processor';

type Props = {
  show: boolean;
  jsString: string;
};

export function TableOfContents({ show, jsString }: Props) {
  const [TOC, setTOC] = useState<MDXModule | null>(null);
  const TOCContent = TOC ? TOC.default : Fragment;

  useEffect(() => {
    (async () => {
      setTOC(await run(jsString, sidebarRunOptions));
    })();
  }, [jsString]);

  return (
    <div className={classNames({ show })}>
      <TOCContent />
    </div>
  );
}

// <ol>
//   {mdast.map((li) => {
//     const p = li.children[0] as Paragraph;
//     const link = p.children[0] as Link;
//     // @ts-expect-error
//     const depth = li.data?.depth;
//     return (
//       <li
//         className={classNames({
//           [`depth-${depth}`]: depth,
//           active: link.url === `#${activeSectionId}`,
//         })}>
//         <a href={link.url}>{toString(link.children)}</a>
//       </li>
//     );
//   })}
// </ol>
