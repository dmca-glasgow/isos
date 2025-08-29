// import { styled } from '@linaria/react';
import { RefCallback } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { useCallback } from 'preact/hooks';

export function WarnSpan({
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  const ref: RefCallback<HTMLSpanElement> = useCallback((element) => {
    if (element !== null) {
      const { y } = element.getBoundingClientRect();
      const top = Math.round(y);
      window.dispatchEvent(
        new CustomEvent<number>('warning', { detail: top }),
      );
    }
  }, []);
  return (
    <span {...props} className="warn" ref={ref}>
      {children}
    </span>
  );
}

// const Warn = styled.span`
//   display: inline-block;
//   padding: 0 0.5em;
//   font-size: 0.8em;
//   background: orange;
//   color: black;
//   border-radius: 0.2em;
// `;
