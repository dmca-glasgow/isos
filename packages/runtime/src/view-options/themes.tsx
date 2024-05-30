import { themes } from '../constants/themes';
import { styled } from '@linaria/react';
import classNames from 'classnames';
import { useContext } from 'preact/hooks';

import { ViewOptionsContext } from '../providers/view-options-provider';

export function Themes() {
  const { theme: activeTheme, setTheme } = useContext(ViewOptionsContext);
  return (
    <ThemeList>
      {themes.map((theme) => (
        <ThemeItem
          key={theme.value}
          className={classNames(theme.value, {
            selected: activeTheme === theme.value,
          })}
          onClick={() => setTheme(theme.value)}>
          {theme.label}
        </ThemeItem>
      ))}
    </ThemeList>
  );
}

const ThemeList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  padding: 1rem 0;
`;

const ThemeItem = styled.li`
  list-style: none;
  padding: 0.75rem 0.5rem 0.5rem;
  height: 4.5rem;
  border-radius: 0.3rem;
  line-height: 1.4;
  cursor: pointer;

  &.selected {
    box-shadow: 0 0 0 0.2rem var(--boxoutBg),
      0 0 0 calc(0.2rem + 2px) rgb(var(--primaryColor));
  }
  &.light {
    background: white;
    color: black;
  }
  &.dark {
    background: #111;
    color: white;
  }
  &.yellow-on-black {
    background: black;
    color: #ebd90e;
  }
  &.black-on-yellow {
    background: #ebd90e;
    color: black;
  }
  &.black-on-red {
    background: #de7777;
    color: black;
  }
  &.black-on-blue {
    background: #64a8e1;
    color: black;
  }
`;
