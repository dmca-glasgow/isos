import * as constants from '../constants';

import { AppState } from './index';

export function prefersDarkMode() {
  if (prefers('color-scheme', 'dark')) {
    return 'dark';
  }
  return 'light';
}

export function prefersContrast() {
  if (prefers('contrast', 'more')) {
    return constants.contrast.max;
  }
  if (prefers('contrast', 'less')) {
    return constants.contrast.min;
  }
  return constants.contrast.initial;
}

// prefers-reduced-motion

export function createPrefersEvents(viewOptions: AppState) {
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

function prefers(subject: string, value: string) {
  if (!window || !window.matchMedia) {
    return false;
  }
  return window.matchMedia(`(prefers-${subject}: ${value})`).matches;
}
