import { ComponentChildren, createContext } from 'preact';
import { useMemo, useState } from 'preact/hooks';

import { FontName } from '@isos/processor';

const defaultFontName = 'termes';

type Maths = {
  fontName: FontName;
  setFontName: (fontName: FontName) => unknown;
};

export const MathsContext = createContext<Maths>({
  fontName: defaultFontName,
  setFontName: () => {},
});

export function MathsProvider({
  children,
}: {
  children: ComponentChildren;
}) {
  const [fontName, setFontName] = useState(defaultFontName);

  const context = useMemo((): Maths => {
    return {
      fontName,
      setFontName,
    };
  }, [fontName]);

  return (
    <MathsContext.Provider value={context}>
      {children}
    </MathsContext.Provider>
  );
}
