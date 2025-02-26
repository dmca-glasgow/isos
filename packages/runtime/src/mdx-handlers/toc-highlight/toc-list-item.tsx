import classNames from 'classnames';
import { VNode } from 'preact';
import { useContext } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';

import { TocHighlightContext } from './toc-highlight-provider';

export function TocListItem(props: JSX.HTMLAttributes<HTMLLIElement>) {
  const { activeSectionId } = useContext(TocHighlightContext);
  const child = props?.children as VNode<HTMLAnchorElement>;
  const href = child?.props?.href;
  const className = classNames(props.class, {
    active: href === `#${activeSectionId}`,
  });
  return <li {...props} className={className} />;
}
