import { ComponentChildren, createContext } from 'preact';
import { useMemo, useState } from 'preact/hooks';

import { FontName } from './mathjax';

const defaultFontName = 'termes';

type Maths = {
  fontName: FontName;
  mathsAsTex: boolean;
  setFontName: (fontName: FontName) => unknown;
  setMathsAsTex: (mathsAsTex: boolean) => unknown;
};

export const MathsContext = createContext<Maths>({
  fontName: defaultFontName,
  mathsAsTex: false,
  setFontName: () => {},
  setMathsAsTex: () => {},
});

export function MathsProvider({
  children,
}: {
  children: ComponentChildren;
}) {
  const [fontName, setFontName] = useState(defaultFontName);
  const [mathsAsTex, setMathsAsTex] = useState(false);

  const context = useMemo((): Maths => {
    return {
      fontName,
      mathsAsTex,
      setFontName,
      setMathsAsTex,
    };
  }, [fontName, mathsAsTex]);

  return (
    <MathsContext.Provider value={context}>
      {children}
    </MathsContext.Provider>
  );
}
