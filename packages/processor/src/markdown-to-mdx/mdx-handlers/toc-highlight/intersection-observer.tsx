import { Ref } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

export type Entry = IntersectionObserverEntry | undefined;
export type InView = boolean;
export type TriggerOnce = boolean;

export interface ObserverOptions {
  rootMargin?: IntersectionObserverInit['rootMargin'];
  threshold?: IntersectionObserverInit['threshold'];
  defaultInView?: InView;
  triggerOnce?: TriggerOnce;
}

export const useObserver = <T extends HTMLElement>(
  options?: ObserverOptions,
): [ref: Ref<T>, inView: InView, entry: Entry] => {
  const [inView, setInView] = useState<InView>(
    options?.defaultInView || false,
  );
  const observer = useRef<IntersectionObserver>();
  const entry = useRef<Entry>();
  const ref = useRef<T>();

  if (typeof window !== 'undefined') {
    if (!observer.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          entry.current = entries[0];
          setInView(entries[0].isIntersecting);
        },
        {
          ...options,
          root: ref.current,
        },
      );
    }

    useEffect(() => {
      if (!entry.current) {
        observer.current?.observe(ref.current!);
      } else if (options?.triggerOnce && ref.current) {
        observer.current?.unobserve(ref.current);
      }
    }, [ref, inView, options]);
  }

  return [
    // @ts-expect-error ref !== mutableRef
    ref,
    inView,
    entry.current,
  ];
};
