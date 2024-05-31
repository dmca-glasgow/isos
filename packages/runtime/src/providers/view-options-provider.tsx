import { Theme, themes } from '../constants/themes';
import { ComponentChildren, createContext } from 'preact';
import { useEffect, useMemo } from 'preact/hooks';

import { useLocalStorage } from '@isos/use-local-storage';

import * as readability from '../constants/readability';

type ViewOptions = {
  theme: string;
  fontSize: number;
  lineSpacing: number;
  letterSpacing: number;
  lineWidth: number;

  setTheme: (themeValue: Theme['value']) => unknown;
  setFontSize: (fontSize: number) => unknown;
  setLineSpacing: (lineSpacing: number) => unknown;
  setLetterSpacing: (letterSpacing: number) => unknown;
  setLineWidth: (lineWidth: number) => unknown;
};

export const ViewOptionsContext = createContext<ViewOptions>({
  theme: themes[0].value,
  fontSize: readability.fontSize.defaultValue,
  lineSpacing: readability.lineSpacing.defaultValue,
  letterSpacing: readability.letterSpacing.defaultValue,
  lineWidth: readability.lineWidth.defaultValue,

  setTheme: () => {},
  setFontSize: () => {},
  setLineSpacing: () => {},
  setLetterSpacing: () => {},
  setLineWidth: () => {},
});

export function ViewOptionsProvider({
  children,
}: {
  children: ComponentChildren;
}) {
  const [theme, setTheme] = useLocalStorage('theme', themes[0].value);
  const [fontSize, setFontSize] = useLocalStorage('font-size', '1');
  const [lineSp, setLineSp] = useLocalStorage('line-spacing', '1');
  const [letterSp, setLetterSp] = useLocalStorage('letter-spacing', '0');
  const [lineWidth, setLineWidth] = useLocalStorage('line-width', '1');

  // on load
  useEffect(() => {
    document.documentElement.classList.add(`theme-${theme}`);
    document.documentElement.style.setProperty(
      '--fontSize',
      String(fontSize)
    );
    document.documentElement.style.setProperty(
      '--lineSpacing',
      String(lineSp)
    );
    document.documentElement.style.setProperty(
      '--letterSpacing',
      String(letterSp)
    );
    document.documentElement.style.setProperty(
      '--lineWidth',
      String(lineWidth)
    );
  }, []);

  const context = useMemo((): ViewOptions => {
    return {
      theme,
      fontSize: Number(fontSize),
      lineSpacing: Number(lineSp),
      letterSpacing: Number(letterSp),
      lineWidth: Number(lineWidth),

      setTheme(newTheme: string) {
        document.documentElement.classList.replace(
          `theme-${theme}`,
          `theme-${newTheme}`
        );
        setTheme(newTheme);
      },
      setFontSize(newFontSize: number) {
        const str = String(newFontSize);
        document.documentElement.style.setProperty('--fontSize', str);
        setFontSize(str);
      },
      setLineSpacing(newLineSpacing: number) {
        const str = String(newLineSpacing);
        document.documentElement.style.setProperty('--lineSpacing', str);
        setLineSp(str);
      },
      setLetterSpacing(newLetterSpacing: number) {
        const str = String(newLetterSpacing);
        document.documentElement.style.setProperty('--letterSpacing', str);
        setLetterSp(str);
      },
      setLineWidth(newLineWidth: number) {
        const str = String(newLineWidth);
        document.documentElement.style.setProperty('--lineWidth', str);
        setLineWidth(str);
      },
    };
  }, [theme, fontSize, lineSp, letterSp, lineWidth]);

  return (
    <ViewOptionsContext.Provider value={context}>
      {children}
    </ViewOptionsContext.Provider>
  );
}
