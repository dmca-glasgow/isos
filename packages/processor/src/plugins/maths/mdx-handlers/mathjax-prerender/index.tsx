import { useEffect, useState } from 'preact/hooks';

import { MathsState } from '../../mdx-state';
import { mmlToSpeech } from './mml-to-speech';
import { mmlToSvg } from './mml-to-svg';
import { texToMml } from './tex-to-mml';

type MathsProps = {
  expr: string;
  className: string;
  options: MathsState;
};

export type LayoutOptions = {
  containerWidth?: number;
};

const layoutOptions: LayoutOptions = {
  containerWidth: 1000,
};

export function MathJaxPrerender({
  expr,
  className,
  options,
}: MathsProps) {
  const [label, setLabel] = useState<string>();
  const [braille, setBraille] = useState<string>();

  const mml = texToMml(expr);
  const svg = mmlToSvg(mml, options, layoutOptions);
  const brailleOnly = options.ariaMode.value === 'braille-only';

  useEffect(() => {
    (async () => {
      const speech = await mmlToSpeech(mml, options);
      setLabel(speech.label);
      setBraille(speech.braille);
    })();
  }, [options.brailleLocale.value, options.speechLocale.value]);

  return (
    <code
      className={className}
      aria-label={brailleOnly ? braille : label}
      aria-braillelabel={brailleOnly ? undefined : braille}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
