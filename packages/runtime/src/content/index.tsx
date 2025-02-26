import {
  fontSize,
  letterSpacing,
  lineHeight,
  lineWidth,
  mobileLineWidthBase,
  sidebarWidth,
} from '../constants';
import { scrollbar } from '../scrollbars';
import { styled } from '@linaria/react';
import { useState } from 'preact/hooks';

import { RenderMDX } from './render-mdx';

import './styles/index.scss';

type Props = {
  markdown: string;
  onRendered?: () => unknown;
};

export function Content({ markdown, onRendered }: Props) {
  const [error, setError] = useState('');

  // function handleRendered() {
  //   onRendered && onRendered();
  //   console.log('hey!');
  // }

  return (
    <ArticleWrapper>
      {error && (
        <Error>
          <span>Error:</span> {error}
        </Error>
      )}
      <RenderMDX
        markdown={markdown}
        setError={setError}
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

  font-size: 0.6rem;
  color: white;
  background: #b41b1b;
  padding: 0 0.6rem;
  box-sizing: border-box;

  & > span {
    font-weight: bold;
  }
`;

const ArticleWrapper = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 0 0 auto;
  box-sizing: border-box;

  ${scrollbar()};

  & > article {
    width: calc(
      ${lineWidth.base} * var(--lineWidth, ${lineWidth.initial})
    );
    font-size: calc(
      ${fontSize.base} * var(--fontSize, ${fontSize.initial})
    );
    line-height: calc(
      ${lineHeight.base} * var(--lineHeight, ${lineHeight.initial})
    );
    letter-spacing: calc(
      ${letterSpacing.base} *
        var(--letterSpacing, ${letterSpacing.initial})
    );
    padding: 2em 0 5em;
    margin: 0 auto;

    transition: padding-left 0.2s;
    will-change: padding-left;

    &.has-sidenotes {
      $sideNoteWidth: 20vw;
      $sideNoteGap: 4vw;
      padding-right: $sideNoteWidth + $sideNoteGap;
      .sideNote {
        small {
          width: $sideNoteWidth;
          margin-right: -$sideNoteWidth - $sideNoteGap;
        }
      }
    }

    #root.sidebar-show & {
      padding-left: ${sidebarWidth};
    }

    @media (max-width: 1000px) {
      width: calc(${mobileLineWidthBase} * var(--lineWidth, 1));

      #root.sidebar-show & {
        padding-left: 0;
      }
    }
  }
`;
