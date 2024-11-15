/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface Window {
  MathJax: MathJax;
}

declare module '*.svg' {
  const value: any;
  export = value;
}
