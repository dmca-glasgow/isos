import { AppState, SideEffects, ViewOptions } from './index';

export function applyAllSideEffects(
  data: AppState['data'],
  sideEffects: SideEffects,
) {
  Object.entries(data).forEach(([_key, signal]) => {
    if (_key in sideEffects) {
      const key = _key as keyof ViewOptions;
      applySideEffect(sideEffects, key, signal.value);
    }
  });
}

export function applySideEffect(
  sideEffects: SideEffects,
  key: keyof ViewOptions,
  value: string | boolean,
) {
  const sideEffectFn = sideEffects[key];
  if (sideEffectFn) {
    sideEffectFn(value);
  }
}
