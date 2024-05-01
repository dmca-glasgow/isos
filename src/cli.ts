import { getMatches } from '@tauri-apps/api/cli';

export function cli() {
  getMatches().then((matches) => {
    console.log('api:', matches);
  });
}
