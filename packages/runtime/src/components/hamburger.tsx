import { styled } from '@linaria/react';

import HamburgerSvg from '../assets/hamburger.svg';

export const Hamburger = styled(HamburgerSvg)`
  position: absolute;
  width: 22px;
  height: 19px;
  fill: var(--highlightColor);
  top: 2.5rem;
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;
