import { scrollbarSize } from '../../constants';
import { sidebarRunOptions } from './sidebar-run-options';
import { styled } from '@linaria/react';
import { run } from '@mdx-js/mdx';
// import classNames from 'classnames';
import { MDXModule } from 'mdx/types';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Fragment } from 'preact/jsx-runtime';

import { markdownToTOC } from '@isos/processor';

import { ViewOptionsContext } from '../../context';

// import './table-of-contents.scss';

type Props = {
  markdown: string;
};

export function TableOfContents({ markdown }: Props) {
  const { data } = useContext(ViewOptionsContext);
  const [error, setError] = useState('');
  const [MDX, setMDX] = useState<MDXModule | null>(null);
  const MDXContent = MDX ? MDX.default : Fragment;

  useEffect(() => {
    (async () => {
      try {
        const toc = await markdownToTOC(markdown);
        const mdx = await run(toc, sidebarRunOptions);
        setMDX(mdx);
        setError('');
      } catch (err: any) {
        setError(err);
      }
    })();
  }, [markdown]);

  if (data.showViewOptions.value === true) {
    return null;
  }

  return (
    <>
      {error && (
        <Error>
          <span>Error:</span> {error}
        </Error>
      )}
      <TableOfContentsWrapper>
        <MDXContent />
      </TableOfContentsWrapper>
    </>
  );
}

const Error = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  font-size: 0.6rem;
  color: white;
  background: #b41b1b;
  padding: 0 0.6rem;
  box-sizing: border-box;

  & > span {
    font-weight: bold;
  }
`;

const TableOfContentsWrapper = styled.div`
  $borderSize: 4px;

  ol {
    margin: 0;
    padding: 0 calc(0.7em - ${scrollbarSize}) 2em 0.7em;
  }

  li {
    position: relative;
    list-style: none;
    line-height: 1.5;

    a {
      display: block;
      padding: 0.35rem 0.8rem;
    }

    &.depth-2 {
      margin-top: 1em;

      &:first-child {
        margin-top: 0;
      }

      & > a {
        font-size: 1.2em;
        font-weight: 700;
        color: var(--textColor);
      }
    }

    &.depth-3 {
      font-size: 0.9em;
      & > a {
        // font-weight: 500;
        color: var(--textColor);

        & > .count {
          display: inline-block;
          font-weight: 600;
          // margin-right: 0.1em;
          // position: relative;
          // bottom: 0.1em;
          // padding: 0 0.5em;
          // font-size: 0.8em;
          // background: white;
          // border-radius: 2ex;
          // box-shadow:
          //   0 2px 2px rgba(0, 0, 0, 0.1),
          //   0 0 2px rgba(0, 0, 0, 0.1);
        }

        // &::before {
        //   content: '';
        //   display: inline-block;
        //   position: relative;
        //   top: 0.2em;
        //   $diameter: 7px;
        //   width: $diameter;
        //   height: $diameter;
        //   border-radius: 50%;
        //   margin-right: 0.3em;
        //   background: var(--textColor);
        //   border: 5px solid white;
        //   box-shadow:
        //     0 2px 3px rgba(0, 0, 0, 0.2),
        //     0 0 2px rgba(0, 0, 0, 0.1);
        // }
      }

      // &:not(&.active ~ li) > a > .count {
      //   color: theme.$leaf;
      // }

      // &.active > a > .count {
      //   color: theme.$rust !important;
      // }
    }

    &.active {
      background: rgba(var(--primaryColor), 0.07);
      border-radius: 0.5em;
      a {
        color: var(--textColor);
      }
    }

    // &::before {
    //   content: '';
    //   position: absolute;
    //   top: 0;
    //   bottom: 0;
    //   left: 0;
    //   width: $borderSize;
    //   background: #ddd;
    // }

    // &:first-child::before {
    //   border-radius: $borderSize $borderSize 0 0;
    // }

    // &:last-child::before {
    //   border-radius: 0 0 $borderSize $borderSize;
    // }

    // &:not(&.active ~ li)::before {
    //   background: var(--textColor);
    // }

    a {
      text-decoration: none;
    }
  }
`;

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
