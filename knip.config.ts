import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // entry: ['packages/processor/src/index.ts'],
  ignore: ['unified-latex-forks/**', 'src-tauri/**'],
  workspaces: {
    '.': {
      entry: 'src/main.tsx',
      project: 'src/**/*',
    },
    'packages/*': {
      entry: 'src/{index.ts,main.tsx}',
      project: 'src/**/*',
    },
  },
};

export default config;
