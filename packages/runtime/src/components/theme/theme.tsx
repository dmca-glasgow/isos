import { Theme as ThemeType } from '../../constants/themes';
import classNames from 'classnames';

import './theme.scss';

type Props = {
  theme: ThemeType;
  activeTheme: string;
  setTheme: (themeValue: ThemeType['value']) => unknown;
};

export function Theme({ theme, activeTheme, setTheme }: Props) {
  return (
    <label key={theme.value} className={classNames('theme', theme.value)}>
      <input
        type="radio"
        name="theme"
        value={theme.value}
        checked={activeTheme === theme.value}
        onChange={() => setTheme(theme.value)}
      />
      {theme.label}
    </label>
  );
}
