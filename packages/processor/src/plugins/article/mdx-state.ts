import { Signal, signal } from '@preact/signals';

export type ArticleStateType = {
  mainWidth: number;
  marginWidth: number;
};

export type ArticleState = {
  mainWidth: Signal<ArticleStateType['mainWidth']>;
  marginWidth: Signal<ArticleStateType['marginWidth']>;
  onResize: (widths: ArticleStateType) => unknown;
};

export const articleInitial: ArticleStateType = {
  mainWidth: 0,
  marginWidth: 0,
};

export function articleSignalState(
  initial: ArticleStateType,
): ArticleState {
  const mainWidth = signal(initial.mainWidth);
  const marginWidth = signal(initial.marginWidth);

  return {
    mainWidth,
    marginWidth,
    onResize: (widths: ArticleStateType) => {
      mainWidth.value = widths.mainWidth;
      marginWidth.value = widths.marginWidth;
    },
  };
}
