import { styled } from '@linaria/react';
import { useRef, useState } from 'preact/hooks';

import { RenderMDX, markdownToArticle } from '@isos/processor';

import * as constants from '../constants';
import { mdxState } from '../mdx-state';
import { scrollbar } from '../scrollbars';

import './styles/index.scss';

type Props = {
  markdown: string;
  onRendered?: () => unknown;
};

export function Content({ markdown, onRendered }: Props) {
  const [error, setError] = useState('');
  const ref = useRef<HTMLElement>(null);
  return (
    <ArticleWrapper ref={ref}>
      {error && (
        <Error>
          <span>Error:</span> {error}
        </Error>
      )}
      <RenderMDX
        markdown={markdown}
        mdxState={mdxState}
        renderFn={markdownToArticle}
        onError={setError}
        onRendered={onRendered}
      />
    </ArticleWrapper>
  );
}

const Error = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  color: white;
  background: #b41b1b;
  padding: 0.3em 1em;
  box-sizing: border-box;
  text-align: center;

  & > span {
    font-weight: bold;
  }
`;

const ArticleWrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 0 0 auto;
  box-sizing: border-box;

  ${scrollbar()};

  & > article {
    width: calc(
      ${constants.lineWidth.base} *
        var(--lineWidth, ${constants.lineWidth.initial})
    );
    font-size: calc(
      ${constants.fontSize.base} *
        var(--fontSize, ${constants.fontSize.initial})
    );
    line-height: calc(
      ${constants.lineHeight.base} *
        var(--lineHeight, ${constants.lineHeight.initial})
    );
    letter-spacing: calc(
      ${constants.letterSpacing.base} *
        var(--letterSpacing, ${constants.letterSpacing.initial})
    );
    padding: 2em 0 5em;
    margin: 0 auto;

    transition: padding-left 0.2s;
    will-change: padding-left;

    &.has-sidenotes {
      padding-right: ${constants.sideNoteWidth} + ${constants.sideNoteGap};
      .sideNote {
        small {
          width: $sideNoteWidth;
          margin-right: -${constants.sideNoteWidth} -
            ${constants.sideNoteGap};
        }
      }
    }

    #root.sidebar-show & {
      padding-left: ${constants.sidebarWidth};
    }

    @media (max-width: 1000px) {
      width: calc(${constants.mobileLineWidthBase} * var(--lineWidth, 1));

      #root.sidebar-show & {
        padding-left: 0;
      }
    }
  }
`;
