import { debounce } from 'lodash';
import { HTMLAttributes } from 'preact/compat';
import { useEffect, useRef } from 'preact/hooks';

import { ArticleState, ArticleStateType } from './mdx-state';

type Props = HTMLAttributes<HTMLElement> & {
  state: ArticleState;
  class?: string;
};

export function Article({ state, ...props }: Props) {
  const ref = useRef<HTMLElement>(null);
  const prevWidthRef = useRef(0);

  useEffect(() => {
    const observeTarget = ref.current;
    if (!observeTarget) return;

    const debouncedCallback = debounce((entry: ResizeObserverEntry) => {
      const width = round(entry.contentRect.width, 10);
      if (width !== prevWidthRef.current) {
        const hasSidenotes = (props.class || '').includes('has-sidenotes');
        state.onResize(calculateWidths(width, hasSidenotes));
        prevWidthRef.current = width;
      }
    }, 100);

    const resizeObserver = new ResizeObserver(([entry]) => {
      debouncedCallback(entry);
    });

    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref, props.class]);

  return <article ref={ref} {...props} />;
}

function round(num: number, pre: number = 0) {
  return Math.floor(Math.round(num) / pre) * pre;
}

function calculateWidths(
  width: number,
  hasSidenotes: boolean,
): ArticleStateType {
  const fullWidth = width * 1.25;
  const margin = fullWidth * 0.2;
  const main = width - margin - fullWidth * 0.04;
  return {
    mainWidth: hasSidenotes ? Math.round(main) : Math.round(width),
    marginWidth: Math.round(margin),
  };
}
