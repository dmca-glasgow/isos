import { styled } from '@linaria/react';

export const Button = styled.button`
  padding: 0.7rem 1rem;
  border-radius: 0.4rem;
  background: #fff2;
  color: #fff;
  cursor: pointer;
  transition: 0.2s background;

  &:hover {
    box-shadow: inset 0 0 0 2px #fff3;
  }
`;
