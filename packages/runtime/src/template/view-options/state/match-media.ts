import * as constants from '../../../constants';
import { ViewOptions, ViewOptionsState } from './state';

export function getPrefersState(): Partial<ViewOptions> {
  const theme = prefersDarkMode();
  const contrast = prefersContrast();
  return {
    theme,
    contrast,
    textColor: theme === 'dark' ? 'White' : 'Black',
    bgColor: theme === 'dark' ? 'Black' : 'White',
  };
}

export function createPrefersEvents(viewOptions: ViewOptionsState) {
  if (!window || !window.matchMedia) {
    return;
  }

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
      viewOptions.setTheme(event.matches ? 'dark' : 'light');
    });

  window
    .matchMedia('(prefers-contrast: less)')
    .addEventListener('change', (event) => {
      if (event.matches) {
        viewOptions.setContrast(constants.contrast.min);
      }
    });

  window
    .matchMedia('(prefers-contrast: more)')
    .addEventListener('change', (event) => {
      if (event.matches) {
        viewOptions.setContrast(constants.contrast.max);
      }
    });

  window
    .matchMedia('(prefers-contrast: no-preference)')
    .addEventListener('change', (event) => {
      if (event.matches) {
        viewOptions.setContrast(constants.contrast.initial);
      }
    });

  window
    .matchMedia('(prefers-contrast: custom)')
    .addEventListener('change', (event) => {
      if (event.matches) {
        viewOptions.setContrast(constants.contrast.initial);
      }
    });
}

function prefersDarkMode() {
  if (prefers('color-scheme', 'dark')) {
    return 'dark';
  }
  return 'light';
}

function prefersContrast() {
  if (prefers('contrast', 'more')) {
    return constants.contrast.max;
  }
  if (prefers('contrast', 'less')) {
    return constants.contrast.min;
  }
  return constants.contrast.initial;
}

// prefers-reduced-motion

function prefers(subject: string, value: string) {
  if (!window || !window.matchMedia) {
    return false;
  }
  return window.matchMedia(`(prefers-${subject}: ${value})`).matches;
}
