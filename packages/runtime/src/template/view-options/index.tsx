import { styled } from '@linaria/react';
import { Signal } from '@preact/signals';
import { useContext } from 'preact/hooks';

import { actions, rootEl } from '../../constants';
import { mdxState } from '../../mdx-state';
// import { MathsOptionsContext } from '@isos/processor';
import { Checkbox } from './checkbox';
import { ColourSelect } from './colour-select';
import { DarkModeToggle } from './dark-mode-toggle';
import { RangeInput } from './range-input';
import { ViewOptionsContext } from './state';
import * as constants from './state/constants';
import { useFullScreenHandle } from './use-fullscreen';

export function ViewOptions() {
  const viewOptions = useContext(ViewOptionsContext);
  // const mathsOptions = useContext(MathsOptionsContext);
  const handle = useFullScreenHandle(rootEl);

  if (viewOptions.data.showViewOptions.value === false) {
    return null;
  }

  return (
    <ViewOptionsForm>
      <Fieldset>
        <Legend>Theme</Legend>
        <DarkModeToggle
          value={viewOptions.data.theme as Signal<'light' | 'dark'>}
          onChange={viewOptions.setTheme}
        />
        <RangeInput
          {...constants.contrast}
          value={viewOptions.data.contrast as Signal<string>}
          onInput={viewOptions.setContrast}
        />
        <RangeInput
          {...constants.brightness}
          value={viewOptions.data.brightness as Signal<string>}
          onInput={viewOptions.setBrightness}
        />
        {viewOptions.data.theme.value === 'dark' ? (
          <ColourSelect
            name="textColor"
            label="Text Colour"
            value={viewOptions.data.textColor as Signal<string>}
            options={constants.colourOptions}
            onChange={viewOptions.setTextColor}
          />
        ) : (
          <ColourSelect
            name="bgColor"
            label="Background"
            value={viewOptions.data.bgColor as Signal<string>}
            options={constants.colourOptions}
            onChange={viewOptions.setBgColor}
          />
        )}
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
          value={viewOptions.data.fontSize}
          onInput={viewOptions.setFontSize}
        />
        <RangeInput
          {...constants.lineHeight}
          value={viewOptions.data.lineHeight}
          onInput={viewOptions.setLineHeight}
        />
        <RangeInput
          {...constants.letterSpacing}
          value={viewOptions.data.letterSpacing}
          onInput={viewOptions.setLetterSpacing}
        />
        <RangeInput
          {...constants.lineWidth}
          value={viewOptions.data.lineWidth}
          onInput={viewOptions.setLineWidth}
        />
      </Fieldset>
      <Fieldset>
        <Legend>Maths</Legend>
        <Checkbox
          label="Sans-serif font"
          value={mdxState.maths.mathsFontName.value === 'fira'}
          onChange={(sansSerif) => {
            mdxState.maths.mathsFontName.value = sansSerif
              ? 'fira'
              : 'termes';
          }}
        />
        <Checkbox
          label="Maths as LaTeX"
          value={mdxState.maths.mathsAsTex.value}
          onChange={(val: boolean) => {
            mdxState.maths.mathsAsTex.value = val;
          }}
        />
      </Fieldset>
    </ViewOptionsForm>
  );
}

const ViewOptionsForm = styled.form``;

const Fieldset = styled.fieldset`
  padding: 0 0.75em 0 ${actions.x};
  border: 0;
  margin-bottom: 2em;
`;

const Legend = styled.legend`
  padding: 0 0 0.5em 0;
  font-size: 1.2em;
  font-weight: 700;
`;
