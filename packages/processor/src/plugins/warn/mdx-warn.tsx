import { styled } from '@linaria/react';
import { HTMLAttributes } from 'preact/compat';

// import { RefCallback } from 'preact';
// import { useCallback } from 'preact/hooks';

export function WarnSpan({
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  // console.log(props);
  // const ref: RefCallback<HTMLSpanElement> = useCallback((element) => {
  //   if (element !== null) {
  //     const { y, height } = element.getBoundingClientRect();
  //     console.log('hey!', { y, height });
  //   }
  // }, []);
  // return <Warn {...props} ref={ref} />;
  return <Warn {...props}>{children}</Warn>;
}

const Warn = styled.span`
  display: inline-block;
  padding: 0 0.5em;
  font-size: 0.8em;
  background: orange;
  color: black;
  border-radius: 0.2em;
`;
