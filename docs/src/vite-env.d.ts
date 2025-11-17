/// <reference types="vite/client" />

interface Window {
  __ENV__: Record<string, string>;
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}
