import { ComponentChildren } from 'preact';
import { createContext } from 'preact';

import { createAppState } from './state';
import { createPrefersEvents } from './state/match-media';

const viewOptions = createAppState(
  document.querySelector<HTMLElement>('#root')!,
);
createPrefersEvents(viewOptions);

export const ViewOptionsContext = createContext(viewOptions);

type Props = {
  children: ComponentChildren;
};

export function ViewOptionsProvider({ children }: Props) {
  return (
    <ViewOptionsContext.Provider value={viewOptions}>
      {children}
    </ViewOptionsContext.Provider>
  );
}
