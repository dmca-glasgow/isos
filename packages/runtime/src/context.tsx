import { createContext } from 'preact';

import { createAppState } from './state';
import { createPrefersEvents } from './state/match-media';

const viewOptions = createAppState(
  document.querySelector<HTMLElement>('#root')!,
);
createPrefersEvents(viewOptions);

export const ViewOptionsContext = createContext(viewOptions);
