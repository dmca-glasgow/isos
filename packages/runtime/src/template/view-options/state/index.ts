import { createContext } from 'preact';

import { rootEl } from '../../../constants';
import { getCachedState, setCachedState } from './local-storage';
import { createPrefersEvents, getPrefersState } from './match-media';
import { createSideEffects } from './side-effects';
import { createViewOptionsState, getDefaultViewOptions } from './state';

const initialState = Object.assign(
  getDefaultViewOptions(),
  getPrefersState(),
  getCachedState(),
);

export const viewOptions = createViewOptionsState(initialState);
setCachedState(viewOptions.data);
createPrefersEvents(viewOptions);
createSideEffects(viewOptions, rootEl, setCachedState);

export const ViewOptionsContext = createContext(viewOptions);
