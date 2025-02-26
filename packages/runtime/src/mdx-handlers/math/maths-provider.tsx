import { ComponentChildren, createContext } from 'preact';
import { useMemo, useState } from 'preact/hooks';

import { MathsFont } from './mathjax';

const defaultFontName = 'termes';

type Maths = {
  fontName: MathsFont;
  mathsAsTex: boolean;
  setFontName: (fontName: MathsFont) => unknown;
  setMathsAsTex: (mathsAsTex: boolean) => unknown;
};

export const MathsContext = createContext<Maths>({
  fontName: defaultFontName,
  setFontName: () => {},
  mathsAsTex: false,
  setMathsAsTex: () => {},
});

export function MathsProvider({
  children,
}: {
  children: ComponentChildren;
}) {
  const [fontName, setFontName] = useState<MathsFont>(defaultFontName);
  const [mathsAsTex, setMathsAsTex] = useState(false);

  const context = useMemo((): Maths => {
    return {
      fontName,
      setFontName,
      mathsAsTex,
      setMathsAsTex,
    };
  }, [fontName, mathsAsTex]);

  return (
    <MathsContext.Provider value={context}>
      {children}
    </MathsContext.Provider>
  );
}
