import { styled } from '@linaria/react';
import classNames from 'classnames';
import { useContext } from 'preact/hooks';

import { Gear, TableOfContents } from './icons';
import { ViewOptionsContext } from './view-options/state';

export function Menu() {
  const { data, setShowViewOptions } = useContext(ViewOptionsContext);
  return (
    <MenuWrapper role="menu">
      <MenuItem
        className={classNames({
          active: !data.showViewOptions.value,
        })}>
        <a href="#" onClick={() => setShowViewOptions(false)}>
          <TableOfContents />
          <span>Table of contents</span>
        </a>
      </MenuItem>
      <MenuItem
        className={classNames({
          active: data.showViewOptions.value,
        })}>
        <a href="#" onClick={() => setShowViewOptions(true)}>
          <Gear />
          <span>View options</span>
        </a>
      </MenuItem>
    </MenuWrapper>
  );
}

// const backgroundMixin = css`
//   background: red;
// `;

const MenuWrapper = styled.ul`
  --diameter: 1.5em;
  --spacing: 0.15em;

  padding: 0;
  margin: 0;

  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 4.8em;
  height: var(--diameter);
  border: 1px solid var(--textColor);
  box-shadow: inset 0 0 0 1px var(--textColor);
  border-radius: var(--diameter);
`;

const MenuItem = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;

  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:first-child {
    border-radius: var(--diameter) 0 0 var(--diameter);
  }

  &:last-child {
    border-radius: 0 var(--diameter) var(--diameter) 0;
  }

  &:not(:first-child) {
    box-shadow: inset 1px 0 0#0003;
  }

  &.active {
    background: var(--textColor);
    svg {
      fill: var(--bg);
    }
  }

  a {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      display: block;
      width: var(--diameter);
      height: var(--diameter);
      fill: var(--textColor);
      transform: scale(0.65);
    }

    span {
      text-indent: -9999px;
      overflow: hidden;
    }
  }
`;
