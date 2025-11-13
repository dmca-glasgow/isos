import { styled } from '@linaria/react';

import { Content } from './content';
import { Template } from './template';

import './styles/global.scss';

type Props = {
  markdown: string;
  onRendered?: () => unknown;
  hide?: boolean;
  setStatus?: (status: string) => unknown;
};

export function Runtime({ markdown, onRendered, hide, setStatus }: Props) {
  // console.log(markdown);
  return (
    <Main hide={hide === true}>
      <Template markdown={markdown} />
      <Content
        markdown={markdown}
        onRendered={onRendered}
        setStatus={setStatus}
      />
    </Main>
  );
}

const Main = styled.main`
  // foreground
  --textBlack: #111;
  --textWhite: #eee;
  --textYellow: #faedcb;
  --textGreen: #c9e4de;
  --textBlue: #c6def1;
  --textPurple: #dbcdf0;
  --textPink: #f2c6de;
  --textOrange: #f7d9c4;

  // background
  --bgBlack: #111;
  --bgWhite: #eee;
  --bgYellow: #faf2de;
  --bgGreen: #e8fef9;
  --bgBlue: #d7e6f1;
  --bgPurple: #f0e6ff;
  --bgPink: #f7daea;
  --bgOrange: #f7e4d7;

  --sidebarBg: color-mix(in srgb, var(--textColor) 6%, var(--bg));
  --errorColor: #d90000;
  --transitionDuration: 0.15s;

  /* width: 200vw; */
  height: 100%;
  display: flex;
  overflow: hidden;

  background-color: var(--bg);
  color: var(--textColor);

  filter: contrast(var(--contrast)) brightness(var(--brightness));
  will-change: filter;

  &.hide {
    visibility: hidden;
  }

  *:focus {
    outline: 2px solid orange !important;
  }
`;
