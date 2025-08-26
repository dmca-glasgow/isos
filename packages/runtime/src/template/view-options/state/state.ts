import { Signal, batch, signal } from '@preact/signals';

import * as constants from './constants';

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
};

export type ViewOptionsState = {
  data: SignalState<ViewOptions>;
  toggleSidebar: () => unknown;
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
};

export function getDefaultViewOptions(): ViewOptions {
  return {
    showSidebar: false,
    showViewOptions: false,
    theme: 'light',
    textColor: 'Black',
    bgColor: 'White',
    contrast: constants.contrast.initial,
    brightness: constants.brightness.initial,
    fontSize: constants.fontSize.initial,
    lineHeight: constants.lineHeight.initial,
    letterSpacing: constants.letterSpacing.initial,
    lineWidth: constants.lineWidth.initial,
  };
}

export function createViewOptionsState(
  initial: ViewOptions,
): ViewOptionsState {
  const data = createStateSignals(initial);
  return {
    data,
    toggleSidebar() {
      data.showSidebar.value = !data.showSidebar.value;
    },
    setShowViewOptions(show: boolean) {
      data.showViewOptions.value = show;
    },
    setTheme(theme: 'light' | 'dark') {
      batch(() => {
        data.theme.value = theme;
        data.textColor.value = theme === 'dark' ? 'White' : 'Black';
        data.bgColor.value = theme === 'dark' ? 'Black' : 'White';
      });
    },
    setTextColor(textColor: string) {
      data.textColor.value = textColor;
    },
    setBgColor(bgColor: string) {
      data.bgColor.value = bgColor;
    },
    setContrast(contrast: string) {
      data.contrast.value = contrast;
    },
    setBrightness(brightness: string) {
      data.brightness.value = brightness;
    },
    setFontSize(fontSize: string) {
      data.fontSize.value = fontSize;
    },
    setLineHeight(lineHeight: string) {
      data.lineHeight.value = lineHeight;
    },
    setLetterSpacing(letterSpacing: string) {
      data.letterSpacing.value = letterSpacing;
    },
    setLineWidth(lineWidth: string) {
      data.lineWidth.value = lineWidth;
    },
  };
}

type SignalState<T> = {
  [Property in keyof T]: Signal<T[Property]>;
};

function createStateSignals<T extends Object>(initial: T) {
  return Object.entries(initial).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: signal(value) }),
    {} as SignalState<T>,
  );
}
