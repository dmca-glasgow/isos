import { Gear, TableOfContents } from './icons';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import classNames from 'classnames';
import { useContext } from 'preact/hooks';

import { ViewOptionsContext } from '../context';

export function Menu() {
  const { data, setShowViewOptions } = useContext(ViewOptionsContext);
  return (
    <MenuWrapper>
      <MenuItem
        className={classNames({
          active: !data.showViewOptions.value,
        })}
        onClick={() => setShowViewOptions(false)}>
        <TableOfContents />
      </MenuItem>
      <MenuItem
        className={classNames({
          active: data.showViewOptions.value,
        })}
        onClick={() => setShowViewOptions(true)}>
        <Gear />
      </MenuItem>
    </MenuWrapper>
  );
}

const backgroundMixin = css`
  background: red;
`;

const MenuWrapper = styled.div`
  --diameter: 1.5em;
  --spacing: 0.15em;

  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 4.8em;
  height: var(--diameter);
  border: 1px solid var(--textColor);
  box-shadow: inset 0 0 0 1px var(--textColor);
  border-radius: var(--diameter);
  overflow: hidden;
  ${backgroundMixin}
`;

const MenuItem = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:not(:first-child) {
    box-shadow: inset 1px 0 0#0003;
  }

  svg {
    display: block;
    width: var(--diameter);
    height: var(--diameter);
    fill: var(--textColor);
    transform: scale(0.65);
  }

  &.active {
    background: var(--textColor);
    svg {
      fill: var(--bg);
    }
  }
`;
