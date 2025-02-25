// import { MathsContext } from '@isos/processor';
import * as constants from '../../constants';
import { styled } from '@linaria/react';
import { Signal } from '@preact/signals';
import { useContext } from 'preact/hooks';

import { ViewOptionsContext } from '../../provider';
import { Checkbox } from './checkbox';
import { ColourSelect } from './colour-select';
import { DarkModeToggle } from './dark-mode-toggle';
import { RangeInput } from './range-input';
import { useFullScreenHandle } from './use-fullscreen';

export function ViewOptions() {
  const ctx = useContext(ViewOptionsContext);
  const handle = useFullScreenHandle(document.querySelector('#root')!);
  // const maths = useContext(MathsContext);

  if (ctx.data.showViewOptions.value === false) {
    return null;
  }

  return (
    <ViewOptionsForm>
      <Fieldset>
        <Legend>Theme</Legend>
        <DarkModeToggle
          value={ctx.data.theme as Signal<'light' | 'dark'>}
          onChange={ctx.setTheme}
        />
        {ctx.data.theme.value === 'dark' ? (
          <ColourSelect
            name="textColor"
            label="Text Colour"
            value={ctx.data.textColor as Signal<string>}
            options={constants.colourOptions}
            onChange={ctx.setTextColor}
          />
        ) : (
          <ColourSelect
            name="bgColor"
            label="Background"
            value={ctx.data.bgColor as Signal<string>}
            options={constants.colourOptions}
            onChange={ctx.setBgColor}
          />
        )}
        <RangeInput
          {...constants.contrast}
          value={ctx.data.contrast as Signal<string>}
          onInput={ctx.setContrast}
        />
        <RangeInput
          {...constants.brightness}
          value={ctx.data.brightness as Signal<string>}
          onInput={ctx.setBrightness}
        />
      </Fieldset>
      <Fieldset>
        <Legend>Readability</Legend>
        {handle.active ? (
          <Checkbox
            label="Exit full screen"
            value={true}
            onChange={() => handle.exit()}
          />
        ) : (
          <Checkbox
            label="Enter full screen"
            value={false}
            onChange={() => handle.enter()}
          />
        )}

        <RangeInput
          {...constants.fontSize}
          value={ctx.data.fontSize as Signal<string>}
          onInput={ctx.setFontSize}
        />
        <RangeInput
          {...constants.lineHeight}
          value={ctx.data.lineHeight as Signal<string>}
          onInput={ctx.setLineHeight}
        />
        <RangeInput
          {...constants.letterSpacing}
          value={ctx.data.letterSpacing as Signal<string>}
          onInput={ctx.setLetterSpacing}
        />
        <RangeInput
          {...constants.lineWidth}
          value={ctx.data.lineWidth as Signal<string>}
          onInput={ctx.setLineWidth}
        />
      </Fieldset>
      <Fieldset>
        <Legend>Maths</Legend>
        <Checkbox
          label="Sans-serif font"
          value={true /* maths.fontName === 'fira' */}
          onChange={(sansSerif) => {
            // maths.setFontName(sansSerif ? 'fira' : 'termes')
          }}
        />
        <Checkbox
          label="Maths as LaTeX"
          value={false /* maths.mathsAsTex */}
          onChange={(mathsAsTex) => {
            // maths.setMathsAsTex(mathsAsTex)
          }}
        />
      </Fieldset>
    </ViewOptionsForm>
  );
}

const ViewOptionsForm = styled.form``;

const Fieldset = styled.fieldset`
  padding: 0 0.75em 0 ${constants.actions.x};
  border: 0;
  margin-bottom: 2em;
`;

const Legend = styled.legend`
  padding: 0 0 0.5em 0;
  font-size: 1.2em;
  font-weight: 700;
`;
