import { AppState, ViewOptions } from './index';

const localStorageKey = 'view-options';

export function mergeCachedData(data: AppState['data']) {
  const cached = localStorage.getItem(localStorageKey);
  if (cached === null) return data;

  const json = JSON.parse(cached) as Partial<ViewOptions>;

  Object.entries(json).forEach(([_key, value]) => {
    if (_key in data) {
      const key = _key as keyof ViewOptions;
      data[key].value = value;
    }
  });
}

export function cacheData(data: AppState['data']) {
  setTimeout(() => {
    const str = JSON.stringify(data);
    localStorage.setItem(localStorageKey, str);
  }, 10);
}
