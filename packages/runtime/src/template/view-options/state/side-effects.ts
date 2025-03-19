import { effect } from '@preact/signals';

import { ViewOptionsState } from './state';

export function createSideEffects(
  { data }: ViewOptionsState,
  el: HTMLElement,
  cacheFn: (data: ViewOptionsState['data']) => unknown,
) {
  effect(() => {
    if (data.showSidebar.value) {
      el.classList.add('sidebar-show');
    } else {
      el.classList.remove('sidebar-show');
    }
    cacheFn(data);
  });

  effect(() => {
    if (data.showViewOptions.value) {
      el.classList.add('view-options-show');
    } else {
      el.classList.remove('view-options-show');
    }
    cacheFn(data);
  });

  effect(() => {
    switch (data.theme.value) {
      case 'dark':
        el.classList.add('dark-mode');
        break;
      case 'light':
        el.classList.remove('dark-mode');
        break;
      default:
        throw new Error(`theme "${data.theme.value}" not supported`);
    }
    cacheFn(data);
  });

  effect(() => {
    el.style.setProperty(
      '--textColor',
      `var(--text${data.textColor.value})`,
    );
    cacheFn(data);
  });

  effect(() => {
    el.style.setProperty('--bg', `var(--bg${data.bgColor.value})`);
    cacheFn(data);
  });

  effect(() => {
    el.style.setProperty('--contrast', String(data.contrast.value));
    cacheFn(data);
  });

  effect(() => {
    el.style.setProperty('--brightness', String(data.brightness.value));
    cacheFn(data);
  });

  effect(() => {
    el.style.setProperty('--fontSize', String(data.fontSize.value));
    cacheFn(data);
  });

  effect(() => {
    el.style.setProperty('--lineHeight', String(data.lineHeight.value));
    cacheFn(data);
  });

  effect(() => {
    el.style.setProperty(
      '--letterSpacing',
      String(data.letterSpacing.value),
    );
    cacheFn(data);
  });

  effect(() => {
    el.style.setProperty('--lineWidth', String(data.lineWidth.value));
    cacheFn(data);
  });

  // effect(() => {
  //   if (window.MathJax && window.MathJax.setFont) {
  //     window.MathJax.setFont(data.mathsFontName.value);
  //   }
  //   cacheFn(data);
  // });
}
