import {
  engineReady,
  setupEngine,
  toSpeech,
} from 'speech-rule-engine/js/common/system.js';

import { BrailleLocale, MathsState, SpeechLocale } from '../../mdx-state';

export async function mmlToSpeech(mml: string, options: MathsState) {
  let label;
  let braille;

  if (options.ariaMode.value !== 'braille-only') {
    label = await mmlToLabel(mml, options.speechLocale.value);
  }

  if (options.ariaMode.value !== 'speech-only') {
    braille = await mmlToBraille(mml, options.brailleLocale.value);
  }

  return { label, braille };
}

export async function mmlToLabel(mml: string, locale: SpeechLocale) {
  await setupEngine({ locale, modality: 'speech' });
  await engineReady();
  return toSpeech(mml);
}

export async function mmlToBraille(mml: string, locale: BrailleLocale) {
  await setupEngine({ locale, modality: 'braille' });
  await engineReady();
  return toSpeech(mml);
}
