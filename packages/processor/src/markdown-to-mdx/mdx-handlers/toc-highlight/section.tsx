import { useContext, useEffect } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';

import { useObserver } from './intersection-observer';
import { TocHighlightContext } from './toc-highlight-provider';

export function Section(props: JSX.HTMLAttributes<HTMLElement>) {
  const [ref, inView, entry] = useObserver({
    rootMargin: '-50% 0 -50% 0',
    threshold: 0,
  });
  const { setActiveSection } = useContext(TocHighlightContext);

  useEffect(() => {
    const id = String(props.id);
    const height = entry?.boundingClientRect.height || 0;
    setActiveSection(inView, { id, height });
  }, [inView]);

  return <section ref={ref} {...props} />;
}
