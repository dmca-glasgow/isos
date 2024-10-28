import { Theme as ThemeType } from '../constants/themes';
import { styled } from '@linaria/react';

type Props = {
  theme: ThemeType;
  activeTheme: string;
  setTheme: (themeValue: ThemeType['value']) => unknown;
};

export function Theme({ theme, activeTheme, setTheme }: Props) {
  return (
    <ThemeItem key={theme.value} className={theme.value}>
      <input
        type="radio"
        name="theme"
        value={theme.value}
        checked={activeTheme === theme.value}
        onChange={() => setTheme(theme.value)}
      />
      {theme.label}
    </ThemeItem>
  );
}

const ThemeItem = styled.label`
  font-size: 0.7em;
  font-weight: 700;
  list-style: none;
  padding: 0.5em 0 0.5em 0.8em;
  border-radius: 0.4em;
  /* line-height: 1.4; */
  cursor: pointer;

  input {
    // https://stackoverflow.com/questions/62107074/#62107188
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  &:has(input:checked) {
    box-shadow:
      0 0 0 0.2em var(--boxoutBg),
      0 0 0 calc(0.2em + 2px) rgba(var(--primaryColor), 0.2);
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
