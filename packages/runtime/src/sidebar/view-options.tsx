import { themes } from '../constants/themes';
import { styled } from '@linaria/react';
import { useContext } from 'preact/hooks';

import { MathsContext } from '@isos/processor';

import * as readability from '../constants/readability';
import { ViewOptionsContext } from '../providers/view-options-provider';
import { Checkbox } from './checkbox';
import { RangeInput } from './range-input';
import { Theme } from './theme';

export function ViewOptions() {
  const ctx = useContext(ViewOptionsContext);
  const maths = useContext(MathsContext);
  return (
    <form>
      <Fieldset>
        <Legend>Theme</Legend>
        <RangeInput
          {...readability.contrast}
          value={ctx.contrast}
          onChange={ctx.setContrast}
        />
        <Grid>
          {themes.map((theme) => (
            <Theme
              key={theme.value}
              theme={theme}
              activeTheme={ctx.theme}
              setTheme={ctx.setTheme}
            />
          ))}
        </Grid>
      </Fieldset>
      <Fieldset>
        <Legend>Readability</Legend>
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
      </Fieldset>
      <Fieldset>
        <Legend>Maths</Legend>
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
      </Fieldset>
    </form>
  );
}

const Fieldset = styled.fieldset`
  padding: 0 0.75em;
  border: 0;
  margin-bottom: 2em;
`;

const Legend = styled.legend`
  padding: 0;
  font-size: 1.3rem;
  font-weight: 700;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6em;
  padding-top: 0.8em;
`;
