import { themes } from '../../constants/themes';
import { useContext } from 'preact/hooks';

import { MathsContext } from '@isos/processor';

import { Checkbox } from '../../components/checkbox/checkbox';
import { RangeInput } from '../../components/range-input/range-input';
import { Theme } from '../../components/theme/theme';
import * as readability from '../../constants/readability';
import { ViewOptionsContext } from '../../providers/view-options-provider';

export function ViewOptions() {
  const ctx = useContext(ViewOptionsContext);
  const maths = useContext(MathsContext);
  return (
    <form>
      <fieldset>
        <legend>Theme</legend>
        <RangeInput
          {...readability.contrast}
          value={ctx.contrast}
          onChange={ctx.setContrast}
        />
        <div className="grid">
          {themes.map((theme) => (
            <Theme
              key={theme.value}
              theme={theme}
              activeTheme={ctx.theme}
              setTheme={ctx.setTheme}
            />
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Readability</legend>
        <RangeInput
          {...readability.fontSize}
          value={ctx.fontSize}
          onChange={ctx.setFontSize}
        />
        <RangeInput
          {...readability.lineSpacing}
          value={ctx.lineSpacing}
          onChange={ctx.setLineSpacing}
        />
        <RangeInput
          {...readability.letterSpacing}
          value={ctx.letterSpacing}
          onChange={ctx.setLetterSpacing}
        />
        <RangeInput
          {...readability.lineWidth}
          value={ctx.lineWidth}
          onChange={ctx.setLineWidth}
        />
      </fieldset>
      <fieldset>
        <legend>Maths</legend>
        <Checkbox
          label="Sans-serif font"
          value={maths.fontName === 'fira'}
          onChange={(sansSerif) =>
            maths.setFontName(sansSerif ? 'fira' : 'termes')
          }
        />
        <Checkbox
          label="Maths as LaTeX"
          value={maths.mathsAsTex}
          onChange={(mathsAsTex) => maths.setMathsAsTex(mathsAsTex)}
        />
      </fieldset>
    </form>
  );
}
