import {
  fontSize,
  letterSpacing,
  lineHeight,
  lineWidth,
  mobileLineWidthBase,
  sidebarWidth,
} from '../constants';
import { scrollbar } from '../mixins/scrollbars';
import { styled } from '@linaria/react';
import { run } from '@mdx-js/mdx';
import { MDXModule } from 'mdx/types';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Fragment, JSX } from 'preact/jsx-runtime';

import { createRunOptions, markdownToArticle } from '@isos/processor';

import { ViewOptionsProvider } from '../provider';

import './styles/index.scss';

type Props = {
  markdown: string;
  onRendered?: () => unknown;
};

export function Content({ markdown, onRendered }: Props) {
  const [error, setError] = useState('');
  const [MDX, setMDX] = useState<MDXModule | null>(null);
  const MDXContent = MDX ? MDX.default : Fragment;

  useEffect(() => {
    if (markdown === '') {
      return;
    }
    (async () => {
      try {
        const article = await markdownToArticle(markdown);
        const mdx = await run(article, createRunOptions());
        setMDX(mdx);
        setError('');
      } catch (err: any) {
        setError(err);
      }
    })();
  }, [markdown]);

  const mdxRef = useCallback((instance: JSX.Element) => {
    if (instance !== null) {
      onRendered && onRendered();
    }
  }, []);

  return (
    <ViewOptionsProvider>
      {error && (
        <Error>
          <span>Error:</span> {error}
        </Error>
      )}
      <ArticleWrapper>
        <MDXContent ref={mdxRef} />
      </ArticleWrapper>
    </ViewOptionsProvider>
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
