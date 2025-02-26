import * as constants from '../constants';
import {
  applyAllSideEffects,
  applySideEffect,
} from './apply-side-effects';
import { Signal, signal } from '@preact/signals';

import { MathsFont } from '@isos/processor';

import { cacheData, mergeCachedData } from './cache-data';
import { prefersContrast, prefersDarkMode } from './match-media';

export type ViewOptions = {
  showSidebar: boolean;
  showViewOptions: boolean;
  theme: 'light' | 'dark';
  textColor: string;
  bgColor: string;
  contrast: string;
  brightness: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  lineWidth: string;
  mathsFontName: MathsFont;
  mathsAsTex: boolean;
};

export type AppState = {
  data: Record<keyof ViewOptions, Signal<string | boolean>>;
  setShowSidebar: (show: boolean) => unknown;
  setShowViewOptions: (show: boolean) => unknown;
  setTheme: (theme: 'light' | 'dark') => unknown;
  setTextColor: (textColor: string) => unknown;
  setBgColor: (bgColor: string) => unknown;
  setContrast: (contrast: string) => unknown;
  setBrightness: (brightness: string) => unknown;
  setFontSize: (fontSize: string) => unknown;
  setLineHeight: (lineHeight: string) => unknown;
  setLineWidth: (lineWidth: string) => unknown;
  setLetterSpacing: (letterSpacing: string) => unknown;
  setMathsFontName: (mathsFontName: string) => unknown;
  setMathsAsTex: (mathsAsTex: boolean) => unknown;
};

export function createAppState(el = document.documentElement): AppState {
  const initialDarkMode = prefersDarkMode();

  const data: AppState['data'] = {
    showSidebar: signal(false),
    showViewOptions: signal(false),
    theme: signal(initialDarkMode),
    textColor: signal(initialDarkMode ? 'White' : 'Black'),
    bgColor: signal(initialDarkMode ? 'Black' : 'White'),
    contrast: signal(prefersContrast()),
    brightness: signal(constants.brightness.initial),
    fontSize: signal(constants.fontSize.initial),
    lineHeight: signal(constants.lineHeight.initial),
    letterSpacing: signal(constants.letterSpacing.initial),
    lineWidth: signal(constants.lineWidth.initial),
    mathsFontName: signal('termes'),
    mathsAsTex: signal(false),
  };

  const sideEffects = createSideEffects(el);
  mergeCachedData(data);

  applyAllSideEffects(data, sideEffects);
  cacheData(data);

  return {
    data,
    setShowSidebar(show: boolean) {
      applySideEffect(sideEffects, 'showSidebar', show);
      data.showSidebar.value = show;
      cacheData(data);
    },
    setShowViewOptions(show: boolean) {
      applySideEffect(sideEffects, 'showViewOptions', show);
      data.showViewOptions.value = show;
      cacheData(data);
    },
    setTheme(theme: 'light' | 'dark') {
      applySideEffect(sideEffects, 'theme', theme);
      data.theme.value = theme;

      const textColor = theme === 'dark' ? 'White' : 'Black';
      const bgColor = theme === 'dark' ? 'Black' : 'White';
      applySideEffect(sideEffects, 'textColor', textColor);
      applySideEffect(sideEffects, 'bgColor', bgColor);
      data.textColor.value = textColor;
      data.bgColor.value = bgColor;

      cacheData(data);
    },
    setTextColor(textColor: string) {
      applySideEffect(sideEffects, 'textColor', textColor);
      data.textColor.value = textColor;
      cacheData(data);
    },
    setBgColor(bgColor: string) {
      applySideEffect(sideEffects, 'bgColor', bgColor);
      data.bgColor.value = bgColor;
      cacheData(data);
    },
    setContrast(contrast: string) {
      applySideEffect(sideEffects, 'contrast', contrast);
      data.contrast.value = contrast;
      cacheData(data);
    },
    setBrightness(brightness: string) {
      applySideEffect(sideEffects, 'brightness', brightness);
      data.brightness.value = brightness;
      cacheData(data);
    },
    setFontSize(fontSize: string) {
      applySideEffect(sideEffects, 'fontSize', fontSize);
      data.fontSize.value = fontSize;
      cacheData(data);
    },
    setLineHeight(lineHeight: string) {
      applySideEffect(sideEffects, 'lineHeight', lineHeight);
      data.lineHeight.value = lineHeight;
      cacheData(data);
    },
    setLetterSpacing(letterSpacing: string) {
      applySideEffect(sideEffects, 'letterSpacing', letterSpacing);
      data.letterSpacing.value = letterSpacing;
      cacheData(data);
    },
    setLineWidth(lineWidth: string) {
      applySideEffect(sideEffects, 'lineWidth', lineWidth);
      data.lineWidth.value = lineWidth;
      cacheData(data);
    },
    setMathsFontName(mathsFontName: string) {
      applySideEffect(sideEffects, 'mathsFontName', mathsFontName);
      data.mathsFontName.value = mathsFontName;
      cacheData(data);
    },
    setMathsAsTex(mathsAsTex: boolean) {
      applySideEffect(sideEffects, 'mathsAsTex', mathsAsTex);
      data.mathsAsTex.value = mathsAsTex;
      cacheData(data);
    },
  };
}

export type SideEffects = Partial<
  Record<keyof ViewOptions, (newValue: any) => void>
>;

function createSideEffects(el: HTMLElement): SideEffects {
  return {
    showSidebar(show: boolean) {
      if (show) {
        el.classList.add('sidebar-show');
      } else {
        el.classList.remove('sidebar-show');
      }
    },
    showViewOptions(show: boolean) {
      if (show) {
        el.classList.add('view-options-show');
      } else {
        el.classList.remove('view-options-show');
      }
    },
    theme(theme: 'light' | 'dark') {
      if (theme === 'dark') {
        el.classList.add('dark-mode');
      } else {
        el.classList.remove('dark-mode');
      }
    },
    textColor(newTextColor: string) {
      el.style.setProperty('--textColor', `var(--text${newTextColor})`);
    },
    bgColor(newBgColor: string) {
      el.style.setProperty('--bg', `var(--bg${newBgColor})`);
    },
    contrast(newContrast: string) {
      el.style.setProperty('--contrast', newContrast);
    },
    brightness(newBrightness: string) {
      el.style.setProperty('--brightness', newBrightness);
    },
    fontSize(newFontSize: string) {
      el.style.setProperty('--fontSize', newFontSize);
    },
    lineHeight(newLineHeight: string) {
      el.style.setProperty('--lineHeight', newLineHeight);
    },
    letterSpacing(newLetterSpacing: string) {
      el.style.setProperty('--letterSpacing', newLetterSpacing);
    },
    lineWidth(newLineWidth: string) {
      el.style.setProperty('--lineWidth', newLineWidth);
    },
  };
}
